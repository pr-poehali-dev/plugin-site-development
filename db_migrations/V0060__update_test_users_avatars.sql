-- Обновление аватарок всех тестовых пользователей на дефолтные

UPDATE users 
SET avatar_url = '/default-avatar.png' 
WHERE email LIKE '%@test.com';