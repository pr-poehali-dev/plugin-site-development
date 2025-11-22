'''
Business: Получение списка плагинов для каталога с фильтрацией
Args: event - dict с httpMethod, queryStringParameters (category, sort, search)
      context - объект с атрибутами: request_id, function_name
Returns: HTTP response dict со списком плагинов
'''

import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Получить подключение к БД"""
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {}) or {}
    category = params.get('category')
    sort_by = params.get('sort', 'newest')
    search = params.get('search', '').strip()
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Базовый запрос
        query = """
            SELECT 
                p.id, p.title, p.description, p.downloads, p.rating, 
                p.status, p.tags, p.gradient_from, p.gradient_to, p.created_at,
                c.name as category_name, c.slug as category_slug
            FROM plugins p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE 1=1
        """
        query_params: List[Any] = []
        
        # Фильтр по категории
        if category:
            query += " AND c.slug = %s"
            query_params.append(category)
        
        # Поиск
        if search:
            query += " AND (p.title ILIKE %s OR p.description ILIKE %s)"
            search_param = f'%{search}%'
            query_params.extend([search_param, search_param])
        
        # Сортировка
        if sort_by == 'newest':
            query += " ORDER BY p.created_at DESC"
        elif sort_by == 'popular':
            query += " ORDER BY p.downloads DESC"
        elif sort_by == 'rating':
            query += " ORDER BY p.rating DESC"
        else:
            query += " ORDER BY p.created_at DESC"
        
        query += " LIMIT 50"
        
        cur.execute(query, query_params)
        plugins = cur.fetchall()
        
        # Получение всех категорий
        cur.execute("SELECT id, name, slug, color FROM categories ORDER BY name")
        categories = cur.fetchall()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'plugins': [dict(p) for p in plugins],
                'categories': [dict(c) for c in categories]
            }, default=str),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
