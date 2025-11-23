-- Изменяем тип колонки avatar_url на TEXT для хранения base64 изображений
ALTER TABLE t_p32599880_plugin_site_developm.users 
ALTER COLUMN avatar_url TYPE TEXT;