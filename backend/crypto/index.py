'''
Business: Обработка криптовалютных платежей USDT для пополнения баланса
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами: request_id, function_name
Returns: HTTP response dict с адресом кошелька или статусом платежа
'''

import json
import os
from typing import Dict, Any
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Получить подключение к БД"""
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action', '')
            
            headers = event.get('headers', {})
            user_id = headers.get('X-User-Id') or headers.get('x-user-id')
            
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется авторизация'}),
                    'isBase64Encoded': False
                }
            
            if action == 'create_payment':
                amount = body_data.get('amount')
                network = body_data.get('network', 'TRC20')
                
                if not amount or float(amount) <= 0:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Некорректная сумма'}),
                        'isBase64Encoded': False
                    }
                
                wallet_address = os.environ.get('USDT_WALLET_ADDRESS', 'TDemo123WalletAddressForTestingOnly')
                
                expires_at = datetime.utcnow() + timedelta(hours=1)
                
                cur.execute(
                    """INSERT INTO crypto_payments 
                       (user_id, wallet_address, amount, currency, network, status, expires_at) 
                       VALUES (%s, %s, %s, %s, %s, %s, %s) 
                       RETURNING id""",
                    (int(user_id), wallet_address, float(amount), 'USDT', network, 'pending', expires_at)
                )
                payment_id = cur.fetchone()['id']
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'payment_id': payment_id,
                        'wallet_address': wallet_address,
                        'amount': float(amount),
                        'network': network,
                        'expires_at': expires_at.isoformat()
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'confirm_payment':
                payment_id = body_data.get('payment_id')
                tx_hash = body_data.get('tx_hash', '')
                
                if not payment_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Отсутствует ID платежа'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    "SELECT * FROM crypto_payments WHERE id = %s AND user_id = %s",
                    (int(payment_id), int(user_id))
                )
                payment = cur.fetchone()
                
                if not payment:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Платеж не найден'}),
                        'isBase64Encoded': False
                    }
                
                if payment['status'] == 'confirmed':
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': True, 'message': 'Платеж уже подтвержден'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    """UPDATE crypto_payments 
                       SET status = %s, confirmed_at = CURRENT_TIMESTAMP, tx_hash = %s 
                       WHERE id = %s""",
                    ('confirmed', tx_hash, int(payment_id))
                )
                
                cur.execute(
                    "UPDATE users SET balance = COALESCE(balance, 0) + %s WHERE id = %s RETURNING balance",
                    (float(payment['amount']), int(user_id))
                )
                result = cur.fetchone()
                
                cur.execute(
                    "INSERT INTO transactions (user_id, amount, type, description) VALUES (%s, %s, %s, %s)",
                    (int(user_id), float(payment['amount']), 'crypto_deposit', f"Пополнение через {payment['network']}")
                )
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'new_balance': float(result['balance']) if result else 0
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'GET':
            params = event.get('queryStringParameters', {})
            payment_id = params.get('payment_id')
            
            headers = event.get('headers', {})
            user_id = headers.get('X-User-Id') or headers.get('x-user-id')
            
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется авторизация'}),
                    'isBase64Encoded': False
                }
            
            if payment_id:
                cur.execute(
                    "SELECT * FROM crypto_payments WHERE id = %s AND user_id = %s",
                    (int(payment_id), int(user_id))
                )
                payment = cur.fetchone()
                
                if not payment:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Платеж не найден'}),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'payment': dict(payment)}, default=str),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "SELECT * FROM crypto_payments WHERE user_id = %s ORDER BY created_at DESC LIMIT 10",
                (int(user_id),)
            )
            payments = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'payments': [dict(p) for p in payments]}, default=str),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
