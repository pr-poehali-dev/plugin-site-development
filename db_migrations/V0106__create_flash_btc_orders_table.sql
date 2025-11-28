CREATE TABLE IF NOT EXISTS flash_btc_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    package_id INTEGER NOT NULL,
    amount NUMERIC(20, 8) NOT NULL,
    price NUMERIC(20, 2) NOT NULL,
    wallet_address VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_flash_btc_orders_user_id ON flash_btc_orders(user_id);
CREATE INDEX idx_flash_btc_orders_status ON flash_btc_orders(status);
CREATE INDEX idx_flash_btc_orders_created_at ON flash_btc_orders(created_at);