-- Заполняем crypto_transactions существующими exchange-транзакциями
INSERT INTO crypto_transactions (user_id, transaction_type, crypto_symbol, amount, price, total, status, created_at)
SELECT 
    user_id,
    CASE 
        WHEN amount < 0 THEN 'buy'
        ELSE 'sell'
    END as transaction_type,
    CASE 
        WHEN description LIKE '%BTC%' THEN 'BTC'
        WHEN description LIKE '%ETH%' THEN 'ETH'
        WHEN description LIKE '%BNB%' THEN 'BNB'
        WHEN description LIKE '%SOL%' THEN 'SOL'
        WHEN description LIKE '%XRP%' THEN 'XRP'
        WHEN description LIKE '%TRX%' THEN 'TRX'
        ELSE 'UNKNOWN'
    END as crypto_symbol,
    0.01 as amount,
    1000 as price,
    ABS(amount) as total,
    'completed' as status,
    created_at
FROM transactions
WHERE type = 'exchange'
  AND (description LIKE '%BTC%' OR description LIKE '%ETH%' OR description LIKE '%BNB%' OR 
       description LIKE '%SOL%' OR description LIKE '%XRP%' OR description LIKE '%TRX%')
ORDER BY created_at DESC
LIMIT 100;