-- Создание таблицы для хранения платежей банковскими картами
CREATE TABLE IF NOT EXISTS t_p32599880_plugin_site_developm.card_payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p32599880_plugin_site_developm.users(id),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    payment_provider VARCHAR(50) DEFAULT 'stripe',
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    CONSTRAINT check_amount_positive CHECK (amount > 0),
    CONSTRAINT check_status_valid CHECK (status IN ('pending', 'completed', 'failed', 'cancelled'))
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_card_payments_user_id ON t_p32599880_plugin_site_developm.card_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_card_payments_status ON t_p32599880_plugin_site_developm.card_payments(status);
CREATE INDEX IF NOT EXISTS idx_card_payments_created_at ON t_p32599880_plugin_site_developm.card_payments(created_at DESC);
