-- Исправление ролей тестовых пользователей на форуме

-- Меняем developer на member (большинство)
UPDATE users 
SET forum_role = 'member' 
WHERE email LIKE '%@test.com' AND forum_role = 'developer';

-- Меняем expert на member
UPDATE users 
SET forum_role = 'member' 
WHERE email LIKE '%@test.com' AND forum_role = 'expert';

-- Меняем trader на member
UPDATE users 
SET forum_role = 'member' 
WHERE email LIKE '%@test.com' AND forum_role = 'trader';

-- Часть пользователей делаем новичками для разнообразия (примерно 30%)
UPDATE users 
SET forum_role = 'new' 
WHERE email LIKE '%@test.com' 
AND id IN (
  SELECT id FROM users 
  WHERE email LIKE '%@test.com' 
  ORDER BY id 
  LIMIT 45
);