#!/usr/bin/env python3
"""
Скрипт для автоматического исправления CORS во всех backend функциях
Оборачивает handler() каждой функции в CORS middleware
"""
import os
import re

def fix_cors_in_file(filepath: str) -> bool:
    """Исправить CORS в одном файле"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Проверяем, не обернута ли уже функция в fix_cors_middleware
        if 'fix_cors_middleware' in content or '_original_handler' in content:
            return False
        
        # 1. Добавить импорт fix_cors_response (если его еще нет)
        if 'from cors_helper import' not in content or 'fix_cors_response' not in content:
            # Найти последний import
            import_pattern = r'((?:^import [^\n]+$|^from [^\n]+$)\n)(?!^import |^from )'
            matches = list(re.finditer(import_pattern, content, flags=re.MULTILINE))
            if matches:
                last_import_end = matches[-1].end()
                import_lines = '\nimport sys\nsys.path.append(os.path.dirname(os.path.dirname(__file__)))\nfrom cors_helper import fix_cors_response\n'
                content = content[:last_import_end] + import_lines + content[last_import_end:]
        
        # 2. Найти handler функцию и обернуть её в middleware
        # Ищем def handler(...) -> ...:
        handler_pattern = r'(def handler\([^)]+\)[^:]*:\n)((?:    """[^"]*"""\n)?)'
        
        match = re.search(handler_pattern, content)
        if not match:
            print(f"  WARNING: Не найдена handler функция в {filepath}")
            return False
        
        # Вставляем wrapper в конец файла
        wrapper_code = '''

# CORS Middleware - автоматически исправляет CORS в ответах
_original_handler = handler

def handler(event, context):
    """Wrapper для автоматического исправления CORS"""
    response = _original_handler(event, context)
    return fix_cors_response(response, event, include_credentials=True)
'''
        
        # Добавляем wrapper в конец файла
        content = content + wrapper_code
        
        # Если контент изменился, сохранить файл
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Обработать все backend функции"""
    backend_dir = os.path.dirname(__file__)
    functions_fixed = 0
    
    # Получить список всех директорий с index.py
    for item in os.listdir(backend_dir):
        item_path = os.path.join(backend_dir, item)
        if os.path.isdir(item_path):
            index_path = os.path.join(item_path, 'index.py')
            if os.path.exists(index_path):
                print(f"Processing {item}/index.py...")
                if fix_cors_in_file(index_path):
                    print(f"  ✓ Fixed CORS in {item}")
                    functions_fixed += 1
                else:
                    print(f"  - No changes needed in {item}")
    
    print(f"\nTotal functions fixed: {functions_fixed}")

if __name__ == '__main__':
    main()
