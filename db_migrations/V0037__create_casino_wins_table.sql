CREATE TABLE IF NOT EXISTS t_p32599880_plugin_site_developm.casino_wins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    amount DECIMAL(15, 2) NOT NULL,
    game VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_casino_wins_created_at ON t_p32599880_plugin_site_developm.casino_wins(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_casino_wins_user_id ON t_p32599880_plugin_site_developm.casino_wins(user_id);
