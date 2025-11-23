-- Add BTC balance column to users table
ALTER TABLE t_p32599880_plugin_site_developm.users
ADD COLUMN btc_balance DECIMAL(18, 8) DEFAULT 0.00000000 NOT NULL;

-- Add comment
COMMENT ON COLUMN t_p32599880_plugin_site_developm.users.btc_balance IS 'User BTC balance for exchange';
