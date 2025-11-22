CREATE TABLE IF NOT EXISTS flash_usdt_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    package_id INTEGER NOT NULL,
    amount NUMERIC(20, 2) NOT NULL,
    price NUMERIC(20, 2) NOT NULL,
    wallet_address VARCHAR(34) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_flash_usdt_orders_user_id ON flash_usdt_orders(user_id);
CREATE INDEX idx_flash_usdt_orders_status ON flash_usdt_orders(status);
CREATE INDEX idx_flash_usdt_orders_created_at ON flash_usdt_orders(created_at);
