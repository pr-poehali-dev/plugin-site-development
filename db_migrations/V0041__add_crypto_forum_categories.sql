-- Add cryptocurrency categories to forum
INSERT INTO t_p32599880_plugin_site_developm.forum_categories (name, slug, description, icon, color, display_order)
VALUES 
  ('USDT.z', 'usdt-z', 'Обсуждение USDT.z - Tether на zkSync', 'Coins', '#26A17B', 10),
  ('fUSDT', 'fusdt', 'Обсуждение fUSDT - Tether на Fantom', 'DollarSign', '#1969FF', 11),
  ('Fantom BTC', 'fantom-btc', 'Обсуждение Fantom BTC - Bitcoin на Fantom', 'Bitcoin', '#FF9F0A', 12),
  ('wUSDT', 'wusdt', 'Обсуждение wUSDT - Wrapped USDT', 'Wallet', '#50AF95', 13),
  ('EURC', 'eurc', 'Обсуждение EURC - Euro Coin', 'CircleDollarSign', '#0052FF', 14),
  ('USD.Z', 'usd-z', 'Обсуждение USD.Z - USD на zkSync', 'BadgeDollarSign', '#8247E5', 15),
  ('USD.T', 'usd-t', 'Обсуждение USD.T - USD на различных сетях', 'CreditCard', '#22C55E', 16),
  ('BTCBR', 'btcbr', 'Обсуждение BTCBR - Bitcoin Wrapped', 'Gem', '#F7931A', 17),
  ('DEGO', 'dego', 'Обсуждение DEGO - Decentralized Finance', 'Sparkles', '#8B5CF6', 18)
ON CONFLICT (slug) DO NOTHING;