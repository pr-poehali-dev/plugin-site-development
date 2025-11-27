CREATE TABLE IF NOT EXISTS t_p32599880_plugin_site_developm.email_verifications (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON t_p32599880_plugin_site_developm.email_verifications(email);
CREATE INDEX IF NOT EXISTS idx_email_verifications_created_at ON t_p32599880_plugin_site_developm.email_verifications(created_at);