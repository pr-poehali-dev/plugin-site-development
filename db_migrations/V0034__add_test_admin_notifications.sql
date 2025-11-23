-- Сбросить уведомление в непрочитанное для тестирования
UPDATE t_p32599880_plugin_site_developm.admin_notifications 
SET is_read = FALSE 
WHERE id = 1;

-- Добавить еще одно тестовое уведомление
INSERT INTO t_p32599880_plugin_site_developm.admin_notifications 
(type, title, message, related_id, related_type, is_read) 
VALUES 
('balance_topup', '💰 Пополнение баланса', 'Тестовое уведомление о пополнении баланса', 1, 'user', FALSE);