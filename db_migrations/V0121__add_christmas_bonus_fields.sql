-- Add christmas bonus fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS bonus_percent INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS christmas_bonus_used BOOLEAN DEFAULT false;

-- Add comment
COMMENT ON COLUMN users.bonus_percent IS 'Christmas promo bonus percentage (10-100)';
COMMENT ON COLUMN users.christmas_bonus_used IS 'Whether user has used their christmas bonus';
