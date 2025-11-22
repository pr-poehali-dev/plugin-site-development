-- Создаем таблицу для уведомлений о разрешении споров
CREATE TABLE IF NOT EXISTS escrow_dispute_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    deal_id INTEGER NOT NULL REFERENCES escrow_deals(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dispute_notifications_user ON escrow_dispute_notifications(user_id, is_read);