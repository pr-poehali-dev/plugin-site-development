-- Add vip_until column to users table
ALTER TABLE t_p32599880_plugin_site_developm.users 
ADD COLUMN vip_until TIMESTAMP;

-- Add comment
COMMENT ON COLUMN t_p32599880_plugin_site_developm.users.vip_until IS 'VIP subscription expiration date';