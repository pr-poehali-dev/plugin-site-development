-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица категорий плагинов
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(50) NOT NULL
);

-- Таблица плагинов
CREATE TABLE IF NOT EXISTS plugins (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    author_id INTEGER REFERENCES users(id),
    downloads INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'active',
    tags TEXT[],
    gradient_from VARCHAR(20),
    gradient_to VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_plugins_category ON plugins(category_id);
CREATE INDEX idx_plugins_author ON plugins(author_id);
CREATE INDEX idx_plugins_created ON plugins(created_at DESC);

-- Вставка базовых категорий
INSERT INTO categories (name, slug, color) VALUES
    ('Сборки', 'builds', 'from-purple-500 to-pink-500'),
    ('Плагины', 'plugins', 'from-cyan-500 to-blue-500'),
    ('Карты', 'maps', 'from-red-500 to-orange-500'),
    ('Статьи', 'articles', 'from-orange-500 to-yellow-500'),
    ('ТП Плагины', 'tp-plugins', 'from-green-500 to-lime-500');

-- Вставка тестовых плагинов
INSERT INTO plugins (title, description, category_id, downloads, rating, status, tags, gradient_from, gradient_to) VALUES
    ('Premium сборка RUST только для достойных серверов!', 'Полная сборка для RUST сервера с уникальными плагинами', 1, 1523, 4.8, 'premium', ARRAY['Раст', 'Premium'], '#a855f7', '#ec4899'),
    ('Уникальный дизайн для GameStores Time Rust', 'Профессиональный дизайн магазина для вашего сервера', 2, 892, 4.5, 'new', ARRAY['Раст', 'Design'], '#06b6d4', '#3b82f6'),
    ('DeathMessages by VooDoo', 'Система красивых сообщений о смерти игроков', 2, 2341, 4.9, 'active', ARRAY['Раст'], '#ef4444', '#f97316'),
    ('Convoy Reloaded', 'Обновленная версия популярного плагина Convoy', 2, 1876, 4.7, 'new', ARRAY['Раст', 'Event'], '#f97316', '#facc15'),
    ('TPFest', 'Плагин для проведения фестивалей на сервере', 5, 945, 4.6, 'active', ARRAY['Sempai'], '#22c55e', '#84cc16'),
    ('ipdlink', 'Связь Discord с игровым сервером', 2, 1234, 4.4, 'new', ARRAY['Раст'], '#06b6d4', '#3b82f6'),
    ('npace', 'Управление пространством на сервере', 2, 876, 4.3, 'new', ARRAY['Раст'], '#22c55e', '#84cc16'),
    ('Traffic Drivers', 'Плагин для управления NPC водителями', 2, 1567, 4.8, 'active', ARRAY['Раст'], '#ef4444', '#f97316');