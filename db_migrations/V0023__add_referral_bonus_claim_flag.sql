-- Добавление отслеживания бонуса для приглашенных пользователей
ALTER TABLE t_p32599880_plugin_site_developm.users 
ADD COLUMN referral_bonus_claimed BOOLEAN DEFAULT FALSE;