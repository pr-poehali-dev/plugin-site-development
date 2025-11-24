-- Создаём таблицу категорий форума
CREATE TABLE IF NOT EXISTS forum_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем колонку category_id в forum_topics
ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS category_id INTEGER;

-- Создаём индекс для быстрого поиска по категориям
CREATE INDEX IF NOT EXISTS idx_forum_topics_category_id ON forum_topics(category_id);

-- Вставляем стандартные категории
INSERT INTO forum_categories (name, slug, description, icon, color, display_order) VALUES
  ('Общее обсуждение', 'general', 'Общие темы и вопросы', 'MessageSquare', '#3b82f6', 1),
  ('Flash USDT', 'flash-usdt', 'Обсуждение Flash USDT токенов', 'Zap', '#10b981', 2),
  ('Казино', 'casino', 'Темы про игры казино', 'Gamepad2', '#8b5cf6', 3),
  ('Гарант-сервис', 'escrow', 'Вопросы по сделкам через гарант', 'ShieldCheck', '#f59e0b', 4),
  ('Помощь и поддержка', 'support', 'Помощь новым пользователям', 'HelpCircle', '#ef4444', 5)
ON CONFLICT (slug) DO NOTHING;