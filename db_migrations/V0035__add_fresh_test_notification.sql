-- Добавить новое тестовое уведомление для проверки toast
INSERT INTO t_p32599880_plugin_site_developm.admin_notifications 
(type, title, message, related_id, related_type, is_read, created_at) 
VALUES 
('withdrawal_request', '💸 Заявка на вывод', 'Тестовое уведомление о выводе средств для проверки toast', 999, 'withdrawal', FALSE, NOW());