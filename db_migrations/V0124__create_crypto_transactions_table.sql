-- Create new table for crypto exchange transactions
CREATE TABLE crypto_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    crypto_symbol VARCHAR(10) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    price DECIMAL(20, 2) NOT NULL,
    total DECIMAL(20, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    wallet_address TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_transaction_type CHECK (transaction_type IN ('buy', 'sell', 'withdraw')),
    CONSTRAINT chk_status CHECK (status IN ('completed', 'pending', 'cancelled'))
);

CREATE INDEX idx_crypto_transactions_user_id ON crypto_transactions(user_id);
CREATE INDEX idx_crypto_transactions_created_at ON crypto_transactions(created_at DESC);
CREATE INDEX idx_crypto_transactions_user_created ON crypto_transactions(user_id, created_at DESC);