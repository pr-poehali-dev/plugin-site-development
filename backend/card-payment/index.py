"""
Business: Обработка платежей банковскими картами для пополнения баланса
Args: event - dict с httpMethod, body (action, amount, user_id)
      context - объект с атрибутами: request_id, function_name
Returns: HTTP response dict с URL для оплаты или статусом платежа
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

SCHEMA = 't_p32599880_plugin_site_developm'
TELEGRAM_NOTIFY_URL = 'https://functions.poehali.dev/02d813a8-279b-4a13-bfe4-ffb7d0cf5a3f'

def escape_sql_string(s: str) -> str:
    if s is None:
        return 'NULL'
    return "'" + str(s).replace("\\", "\\\\").replace("'", "''") + "'"

def send_telegram_notification(event_type: str, user_info: Dict, details: Dict):
    """Отправить уведомление в Telegram"""
    try:
        requests.post(
            TELEGRAM_NOTIFY_URL,
            json={
                'event_type': event_type,
                'user_info': user_info,
                'details': details
            },
            timeout=5
        )
    except Exception as e:
        print(f'Failed to send telegram notification: {e}')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Business: Обработка платежей банковскими картами
    Args: event - dict с httpMethod, body (action, amount, user_id, payment_id)
          context - объект с атрибутами: request_id, function_name
    Returns: HTTP response dict
    """
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'success': False, 'error': 'DATABASE_URL not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        conn = psycopg2.connect(dsn)
        conn.autocommit = True
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if action == 'create_payment':
            user_id = body_data.get('user_id')
            amount = body_data.get('amount', 0)
            
            if not user_id or amount <= 0:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'error': 'Invalid parameters'}),
                    'isBase64Encoded': False
                }
            
            # Получаем информацию о пользователе
            cur.execute(f"SELECT username, email FROM {SCHEMA}.users WHERE id = {int(user_id)}")
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'error': 'User not found'}),
                    'isBase64Encoded': False
                }
            
            # Создаем запись о платеже в БД
            cur.execute(f"""
                INSERT INTO {SCHEMA}.card_payments 
                (user_id, amount, status, created_at)
                VALUES ({int(user_id)}, {float(amount)}, 'pending', NOW())
                RETURNING id
            """)
            payment = cur.fetchone()
            payment_id = payment['id']
            
            # В реальной интеграции здесь был бы вызов Stripe API
            # Для демо возвращаем mock URL
            payment_url = f"https://payment.example.com/pay/{payment_id}"
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'payment_id': payment_id,
                    'payment_url': payment_url,
                    'amount': amount
                }),
                'isBase64Encoded': False
            }
        
        elif action == 'confirm_payment':
            payment_id = body_data.get('payment_id')
            
            if not payment_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'error': 'Payment ID required'}),
                    'isBase64Encoded': False
                }
            
            # Получаем информацию о платеже
            cur.execute(f"""
                SELECT cp.*, u.username 
                FROM {SCHEMA}.card_payments cp
                JOIN {SCHEMA}.users u ON cp.user_id = u.id
                WHERE cp.id = {int(payment_id)} AND cp.status = 'pending'
            """)
            payment = cur.fetchone()
            
            if not payment:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'error': 'Payment not found or already processed'}),
                    'isBase64Encoded': False
                }
            
            # Обновляем статус платежа
            cur.execute(f"""
                UPDATE {SCHEMA}.card_payments
                SET status = 'completed', completed_at = NOW()
                WHERE id = {int(payment_id)}
            """)
            
            # Пополняем баланс пользователя
            cur.execute(f"""
                UPDATE {SCHEMA}.users
                SET balance = balance + {float(payment['amount'])}
                WHERE id = {int(payment['user_id'])}
            """)
            
            # Записываем транзакцию
            cur.execute(f"""
                INSERT INTO {SCHEMA}.transactions
                (user_id, amount, type, description, created_at)
                VALUES ({int(payment['user_id'])}, {float(payment['amount'])}, 
                        'deposit', {escape_sql_string(f'Пополнение картой #{payment_id}')}, NOW())
            """)
            
            # Отправляем уведомление в Telegram
            send_telegram_notification(
                'balance_topup',
                {'username': payment['username'], 'user_id': payment['user_id']},
                {'amount': payment['amount'], 'method': 'card'}
            )
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'message': 'Payment confirmed',
                    'amount': payment['amount']
                }),
                'isBase64Encoded': False
            }
        
        elif action == 'check_status':
            payment_id = body_data.get('payment_id')
            
            if not payment_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'error': 'Payment ID required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(f"""
                SELECT id, user_id, amount, status, created_at, completed_at
                FROM {SCHEMA}.card_payments
                WHERE id = {int(payment_id)}
            """)
            payment = cur.fetchone()
            
            if not payment:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'error': 'Payment not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'payment': {
                        'id': payment['id'],
                        'amount': float(payment['amount']),
                        'status': payment['status'],
                        'created_at': payment['created_at'].isoformat() if payment['created_at'] else None
                    }
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'success': False, 'error': 'Invalid action'}),
                'isBase64Encoded': False
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'success': False, 'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'conn' in locals():
            conn.close()
