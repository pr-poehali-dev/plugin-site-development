ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user';

CREATE INDEX idx_users_role ON users(role);

CREATE TABLE admin_actions (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id INTEGER NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_actions_admin_id ON admin_actions(admin_id);
CREATE INDEX idx_admin_actions_created_at ON admin_actions(created_at);

ALTER TABLE forum_topics ADD COLUMN removed_at TIMESTAMP NULL;
ALTER TABLE forum_topics ADD COLUMN removed_by INTEGER NULL;

ALTER TABLE forum_comments ADD COLUMN removed_at TIMESTAMP NULL;
ALTER TABLE forum_comments ADD COLUMN removed_by INTEGER NULL;

ALTER TABLE users ADD COLUMN is_blocked BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN blocked_at TIMESTAMP NULL;
ALTER TABLE users ADD COLUMN blocked_by INTEGER NULL;
ALTER TABLE users ADD COLUMN block_reason TEXT NULL;