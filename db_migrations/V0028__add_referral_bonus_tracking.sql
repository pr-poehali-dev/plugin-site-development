-- Добавляем колонку для отслеживания заработанных бонусов по рефералам
ALTER TABLE t_p32599880_plugin_site_developm.referrals 
ADD COLUMN IF NOT EXISTS bonus_earned NUMERIC(10,2) DEFAULT 0;

-- Создаем индекс для быстрого поиска активных рефералов
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_status 
ON t_p32599880_plugin_site_developm.referrals(referred_user_id, status);