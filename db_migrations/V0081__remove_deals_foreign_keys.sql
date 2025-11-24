-- Удаляем внешние ключи если они есть
ALTER TABLE IF EXISTS deals DROP CONSTRAINT IF EXISTS deals_seller_id_fkey;
ALTER TABLE IF EXISTS deals DROP CONSTRAINT IF EXISTS deals_buyer_id_fkey;
ALTER TABLE IF EXISTS deal_messages DROP CONSTRAINT IF EXISTS deal_messages_deal_id_fkey;
ALTER TABLE IF EXISTS deal_messages DROP CONSTRAINT IF EXISTS deal_messages_user_id_fkey;