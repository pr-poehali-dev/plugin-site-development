-- Обновляем даты комментариев к новым темам

-- Комментарии к "Стейкинг vs Lending" (тема 5 дней назад)
UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '4 days'
WHERE content LIKE '%Я за стейкинг! Меньше рисков%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '4 days'
WHERE content LIKE '%комбинирую: 60% стейкинг%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '4 days'
WHERE content LIKE '%не держать всё на одной платформе%';

-- Комментарии к "Крипто-портфель для пенсионера" (4 дня назад)
UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '3 days'
WHERE content LIKE '%80% держала в стейблах%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '3 days'
WHERE content LIKE '%базовой безопасности - 2FA%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '3 days'
WHERE content LIKE '%Ledger + инструкция большими буквами%';

-- Комментарии к "Топ-5 ошибок" (6 дней назад)
UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '5 days'
WHERE content LIKE '%6-ю ошибку: инвестировать деньги%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '5 days'
WHERE content LIKE '%слушать "экспертов" в твиттере%';

-- Комментарии к остальным темам
UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '2 days'
WHERE content LIKE '%Pишу на Rust для NEAR Protocol%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '2 days'
WHERE content LIKE '%экосистема пока сырая%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '1 day'
WHERE content LIKE '%Отличная идея! Готов присоединиться%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '1 day'
WHERE content LIKE '%как планируете распределять токены%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '1 day'
WHERE content LIKE '%По результатам через bounty систему%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '7 days'
WHERE content LIKE '%Использую zkSync для своих проектов%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '6 days'
WHERE content LIKE '%как с безопасностью? Слышала что в ZK%';

UPDATE forum_comments 
SET created_at = NOW() - INTERVAL '6 days'
WHERE content LIKE '%Математика проверена. Риск в реализации%';