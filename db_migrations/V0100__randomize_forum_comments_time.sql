-- Добавление случайных часов к комментариям для более естественного распределения времени
-- Вместо комментариев минута в минуту, будут разрывы от 1 до 10 часов

-- Обновляем время создания всех комментариев, добавляя случайные часы
WITH ranked_comments AS (
    SELECT 
        id,
        topic_id,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY topic_id ORDER BY created_at DESC, id) as rn
    FROM forum_comments
)
UPDATE forum_comments fc
SET created_at = rc.created_at + (rc.rn * (1 + floor(random() * 10)) || ' hours')::INTERVAL
FROM ranked_comments rc
WHERE fc.id = rc.id;