'''
Business: Автоматическое повышение роли пользователей с "new" на "member" через 24 часа после регистрации
Args: event - dict с httpMethod
      context - объект с атрибутами: request_id, function_name
Returns: HTTP response dict с количеством обновленных пользователей
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = 't_p32599880_plugin_site_developm'

def get_db_connection():
    """Получить подключение к БД"""
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Обновляем роль пользователей, которые зарегистрированы более 24 часов назад
        cur.execute(f"""
            UPDATE {SCHEMA}.users 
            SET forum_role = 'member'
            WHERE forum_role = 'new' 
            AND created_at < NOW() - INTERVAL '24 hours'
            AND email NOT LIKE '%@test.com'
            RETURNING id, username
        """)
        
        updated_users = cur.fetchall()
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'updated_count': len(updated_users),
                'users': [dict(u) for u in updated_users]
            }, default=str),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            }),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()
