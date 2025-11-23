-- Create admin_notifications table
CREATE TABLE t_p32599880_plugin_site_developm.admin_notifications (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_id INTEGER,
    related_type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE t_p32599880_plugin_site_developm.admin_notifications IS 'Admin notifications for actions requiring admin attention';
COMMENT ON COLUMN t_p32599880_plugin_site_developm.admin_notifications.type IS 'Type of notification: btc_withdrawal, verification_request, etc.';
COMMENT ON COLUMN t_p32599880_plugin_site_developm.admin_notifications.related_id IS 'ID of related entity (withdrawal_id, user_id, etc.)';
COMMENT ON COLUMN t_p32599880_plugin_site_developm.admin_notifications.related_type IS 'Type of related entity: withdrawal, user, etc.';

CREATE INDEX idx_admin_notifications_is_read ON t_p32599880_plugin_site_developm.admin_notifications(is_read);
CREATE INDEX idx_admin_notifications_created_at ON t_p32599880_plugin_site_developm.admin_notifications(created_at DESC);