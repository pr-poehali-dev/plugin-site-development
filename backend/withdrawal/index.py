"""
Business: Система вывода USDT для пользователей
Args: event с httpMethod, body, queryStringParameters; context с request_id
Returns: HTTP response с информацией о заявках на вывод
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timezone
from typing import Dict, Any

def serialize_datetime(obj):
    """Сериализация datetime объектов в ISO формат с UTC"""
    if isinstance(obj, datetime):
        if obj.tzinfo is None:
            obj = obj.replace(tzinfo=timezone.utc)
        return obj.isoformat()
    return str(obj)

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
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            action = params.get('action', 'my_withdrawals')
            
            if action == 'my_withdrawals':
                cursor.execute("""
                    SELECT * FROM withdrawal_requests
                    WHERE user_id = %s
                    ORDER BY created_at DESC
                """, (user_id,))
                
                withdrawals = cursor.fetchall()
                cursor.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'withdrawals': [dict(w) for w in withdrawals]}, default=serialize_datetime),
                    'isBase64Encoded': False
                }
            
            elif action == 'all_withdrawals':
                cursor.execute('SELECT role FROM users WHERE id = %s', (user_id,))
                user_role = cursor.fetchone()
                
                if not user_role or user_role['role'] != 'admin':
                    cursor.close()
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Access denied'}),
                        'isBase64Encoded': False
                    }
                
                status_filter = params.get('status', 'all')
                
                if status_filter == 'all':
                    query = """
                        SELECT wr.*, u.username, u.email
                        FROM withdrawal_requests wr
                        LEFT JOIN users u ON wr.user_id = u.id
                        ORDER BY wr.created_at DESC
                    """
                    cursor.execute(query)
                else:
                    query = """
                        SELECT wr.*, u.username, u.email
                        FROM withdrawal_requests wr
                        LEFT JOIN users u ON wr.user_id = u.id
                        WHERE wr.status = %s
                        ORDER BY wr.created_at DESC
                    """
                    cursor.execute(query, (status_filter,))
                
                withdrawals = cursor.fetchall()
                cursor.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'withdrawals': [dict(w) for w in withdrawals]}, default=serialize_datetime),
                    'isBase64Encoded': False
                }
            
            elif action == 'get_notifications':
                cursor.execute("""
                    SELECT * FROM withdrawal_notifications
                    WHERE user_id = %s AND is_read = false
                    ORDER BY created_at DESC
                """, (user_id,))
                
                notifications = cursor.fetchall()
                cursor.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'notifications': [dict(n) for n in notifications]}, default=serialize_datetime),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'create_withdrawal':
                amount = body.get('amount')
                usdt_wallet = body.get('usdt_wallet', '').strip()
                
                if not amount or not usdt_wallet:
                    cursor.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Amount and wallet required'}),
                        'isBase64Encoded': False
                    }
                
                amount = float(amount)
                
                if amount < 100:
                    cursor.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Minimum withdrawal amount is 100 USDT'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute('SELECT balance FROM users WHERE id = %s', (user_id,))
                user = cursor.fetchone()
                
                if not user or user['balance'] < amount:
                    cursor.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Insufficient balance'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute('UPDATE users SET balance = balance - %s WHERE id = %s', (amount, user_id))
                
                cursor.execute("""
                    INSERT INTO withdrawal_requests (user_id, amount, usdt_wallet, status)
                    VALUES (%s, %s, %s, 'processing')
                    RETURNING id
                """, (user_id, amount, usdt_wallet))
                
                withdrawal_id = cursor.fetchone()['id']
                
                cursor.execute("""
                    INSERT INTO transactions (user_id, amount, type, description)
                    VALUES (%s, %s, 'withdrawal_request', %s)
                """, (user_id, -amount, f'Заявка на вывод #{withdrawal_id}'))
                
                cursor.execute("""
                    INSERT INTO withdrawal_notifications (user_id, withdrawal_id, message)
                    VALUES (%s, %s, %s)
                """, (user_id, withdrawal_id, f'Ваша заявка на вывод {amount} USDT находится в обработке. Пожалуйста, ожидайте.'))
                
                conn.commit()
                cursor.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'withdrawal_id': withdrawal_id}),
                    'isBase64Encoded': False
                }
            
            elif action == 'process_withdrawal':
                cursor.execute('SELECT role FROM users WHERE id = %s', (user_id,))
                user_role = cursor.fetchone()
                
                if not user_role or user_role['role'] != 'admin':
                    cursor.close()
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Access denied'}),
                        'isBase64Encoded': False
                    }
                
                withdrawal_id = body.get('withdrawal_id')
                new_status = body.get('status')
                admin_comment = body.get('comment', '')
                
                if new_status not in ['completed', 'rejected']:
                    cursor.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Invalid status'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    SELECT user_id, amount, status FROM withdrawal_requests
                    WHERE id = %s
                """, (withdrawal_id,))
                
                withdrawal = cursor.fetchone()
                
                if not withdrawal:
                    cursor.close()
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Withdrawal not found'}),
                        'isBase64Encoded': False
                    }
                
                if withdrawal['status'] not in ['pending', 'processing']:
                    cursor.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Withdrawal already processed'}),
                        'isBase64Encoded': False
                    }
                
                if new_status == 'rejected':
                    cursor.execute('UPDATE users SET balance = balance + %s WHERE id = %s', 
                                 (withdrawal['amount'], withdrawal['user_id']))
                    
                    cursor.execute("""
                        INSERT INTO transactions (user_id, amount, type, description)
                        VALUES (%s, %s, 'withdrawal_rejected', %s)
                    """, (withdrawal['user_id'], withdrawal['amount'], f'Возврат средств (заявка #{withdrawal_id} отклонена)'))
                
                cursor.execute("""
                    UPDATE withdrawal_requests
                    SET status = %s, admin_comment = %s, processed_by = %s, 
                        completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (new_status, admin_comment, user_id, withdrawal_id))
                
                if new_status == 'completed':
                    notif_msg = f'Ваша заявка на вывод {withdrawal["amount"]} USDT успешно обработана! Средства отправлены на ваш кошелек.'
                    cursor.execute("""
                        INSERT INTO transactions (user_id, amount, type, description)
                        VALUES (%s, %s, 'withdrawal_completed', %s)
                    """, (withdrawal['user_id'], 0, f'Вывод #{withdrawal_id} завершен'))
                else:
                    notif_msg = f'Ваша заявка на вывод {withdrawal["amount"]} USDT отклонена.'
                    if admin_comment:
                        notif_msg += f' Причина: {admin_comment}'
                
                cursor.execute("""
                    INSERT INTO withdrawal_notifications (user_id, withdrawal_id, message)
                    VALUES (%s, %s, %s)
                """, (withdrawal['user_id'], withdrawal_id, notif_msg))
                
                conn.commit()
                cursor.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif action == 'mark_notifications_read':
                cursor.execute("""
                    UPDATE withdrawal_notifications
                    SET is_read = true
                    WHERE user_id = %s AND is_read = false
                """, (user_id,))
                
                conn.commit()
                cursor.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            cursor.close()
    
    finally:
        conn.close()
    
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Invalid action'}),
        'isBase64Encoded': False
    }
