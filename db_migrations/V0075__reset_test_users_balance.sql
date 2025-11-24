-- Обнуляем баланс у всех тестовых пользователей (ботов)
UPDATE users 
SET balance = 0.00 
WHERE email LIKE '%@test.com';