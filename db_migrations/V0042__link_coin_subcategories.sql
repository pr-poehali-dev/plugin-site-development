-- Связываем все монеты с родительской категорией "Монеты" (id=15)
UPDATE t_p32599880_plugin_site_developm.forum_categories 
SET parent_id = 15
WHERE slug IN ('flash-usdt', 'usdt-z', 'fusdt', 'fantom-btc', 'wusdt', 'eurc', 'usd-z', 'usd-t', 'btcbr', 'dego');