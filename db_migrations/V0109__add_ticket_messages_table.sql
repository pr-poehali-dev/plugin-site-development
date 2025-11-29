-- Создание таблицы для переписки в тикетах поддержки
CREATE TABLE IF NOT EXISTS t_p32599880_plugin_site_developm.ticket_messages (
    id SERIAL PRIMARY KEY,
    ticket_id INTEGER NOT NULL REFERENCES t_p32599880_plugin_site_developm.support_tickets(id),
    user_id INTEGER REFERENCES t_p32599880_plugin_site_developm.users(id),
    author_username VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ticket_messages_ticket_id ON t_p32599880_plugin_site_developm.ticket_messages(ticket_id);
CREATE INDEX idx_ticket_messages_created_at ON t_p32599880_plugin_site_developm.ticket_messages(created_at);