-- Создание таблицы для хранения покупок TON Flash пакетов
CREATE TABLE IF NOT EXISTS ton_flash_purchases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    package_id INTEGER NOT NULL,
    package_name VARCHAR(100) NOT NULL,
    price DECIMAL(20, 2) NOT NULL,
    amount DECIMAL(20, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_ton_flash_purchases_user_id ON ton_flash_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_ton_flash_purchases_created_at ON ton_flash_purchases(created_at);

-- Комментарии к таблице и колонкам
COMMENT ON TABLE ton_flash_purchases IS 'История покупок TON Flash USDT пакетов';
COMMENT ON COLUMN ton_flash_purchases.user_id IS 'ID пользователя';
COMMENT ON COLUMN ton_flash_purchases.package_id IS 'ID купленного пакета';
COMMENT ON COLUMN ton_flash_purchases.package_name IS 'Название пакета';
COMMENT ON COLUMN ton_flash_purchases.price IS 'Стоимость пакета в USDT';
COMMENT ON COLUMN ton_flash_purchases.amount IS 'Полученная сумма Flash USDT';
COMMENT ON COLUMN ton_flash_purchases.status IS 'Статус покупки';
COMMENT ON COLUMN ton_flash_purchases.created_at IS 'Дата и время покупки';
