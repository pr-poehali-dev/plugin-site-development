CREATE TABLE IF NOT EXISTS lottery_rounds (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'drawing', 'completed')),
    total_tickets INTEGER DEFAULT 0,
    prize_pool DECIMAL(10, 2) DEFAULT 0,
    draw_time TIMESTAMP,
    winner_ticket_number INTEGER,
    winner_user_id INTEGER,
    winner_username VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lottery_tickets (
    id SERIAL PRIMARY KEY,
    round_id INTEGER NOT NULL REFERENCES lottery_rounds(id),
    user_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    ticket_number INTEGER NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lottery_chat (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lottery_tickets_round_id ON lottery_tickets(round_id);
CREATE INDEX IF NOT EXISTS idx_lottery_tickets_user_id ON lottery_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_lottery_chat_created_at ON lottery_chat(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lottery_rounds_status ON lottery_rounds(status);

INSERT INTO lottery_rounds (status, total_tickets, prize_pool) 
SELECT 'active', 0, 0
WHERE NOT EXISTS (SELECT 1 FROM lottery_rounds WHERE status = 'active');
