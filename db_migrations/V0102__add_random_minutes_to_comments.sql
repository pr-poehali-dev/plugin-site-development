-- Добавление случайных минут к комментариям для ещё более естественного распределения
-- Это дополнение к предыдущей миграции с часами

UPDATE forum_comments
SET created_at = created_at + (floor(random() * 60) || ' minutes')::INTERVAL;