CREATE TABLE IF NOT EXISTS lottery_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    round_id INTEGER NOT NULL REFERENCES lottery_rounds(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lottery_notifications_user_id ON lottery_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_lottery_notifications_is_read ON lottery_notifications(is_read);