-- Обновление expires_at для всех записей без него
UPDATE withdrawal_requests 
SET expires_at = created_at + INTERVAL '1 hour'
WHERE expires_at IS NULL;