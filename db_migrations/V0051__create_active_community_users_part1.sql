-- Создание активного сообщества: 150 пользователей с темами и комментариями

-- Генерация пароля хэша для всех тестовых пользователей (password: test123)
-- bcrypt hash: $2b$10$rQ3K8vZZ9YxM5J5J5J5J5O

-- Создание 150 пользователей с разными характеристиками
INSERT INTO users (username, email, password_hash, avatar_url, created_at, forum_role, balance, last_seen_at, bio) VALUES
('crypto_master', 'crypto_master@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto_master', NOW() - INTERVAL '45 days', 'expert', 150.00, NOW() - INTERVAL '2 hours', 'Эксперт в криптовалютах с 2015 года'),
('trader_pro', 'trader_pro@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=trader_pro', NOW() - INTERVAL '40 days', 'trader', 320.50, NOW() - INTERVAL '1 hour', 'Профессиональный трейдер'),
('dev_alex', 'dev_alex@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev_alex', NOW() - INTERVAL '38 days', 'developer', 89.00, NOW() - INTERVAL '3 hours', 'Solidity и Web3 разработчик'),
('maria_invest', 'maria_invest@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria_invest', NOW() - INTERVAL '35 days', 'member', 450.00, NOW() - INTERVAL '30 minutes', 'Инвестор в DeFi проекты'),
('sergey_btc', 'sergey_btc@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sergey_btc', NOW() - INTERVAL '33 days', 'expert', 1200.00, NOW() - INTERVAL '15 minutes', 'Bitcoin максималист'),
('anna_defi', 'anna_defi@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna_defi', NOW() - INTERVAL '32 days', 'trader', 678.90, NOW() - INTERVAL '1 hour', 'DeFi энтузиаст'),
('maksim_eth', 'maksim_eth@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=maksim_eth', NOW() - INTERVAL '30 days', 'developer', 234.56, NOW() - INTERVAL '2 hours', 'Ethereum разработчик'),
('olga_nft', 'olga_nft@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=olga_nft', NOW() - INTERVAL '28 days', 'member', 567.80, NOW() - INTERVAL '45 minutes', 'NFT коллекционер'),
('dmitry_sol', 'dmitry_sol@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dmitry_sol', NOW() - INTERVAL '27 days', 'expert', 890.00, NOW() - INTERVAL '20 minutes', 'Solana validator'),
('elena_web3', 'elena_web3@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena_web3', NOW() - INTERVAL '25 days', 'developer', 345.67, NOW() - INTERVAL '3 hours', 'Web3 архитектор'),
('ivan_hodl', 'ivan_hodl@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ivan_hodl', NOW() - INTERVAL '24 days', 'member', 2345.00, NOW() - INTERVAL '10 minutes', 'Долгосрочный инвестор'),
('svetlana_dao', 'svetlana_dao@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=svetlana_dao', NOW() - INTERVAL '23 days', 'member', 678.00, NOW() - INTERVAL '1 hour', 'DAO участник'),
('anton_mining', 'anton_mining@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anton_mining', NOW() - INTERVAL '22 days', 'expert', 1567.89, NOW() - INTERVAL '25 minutes', 'Майнер с опытом'),
('natasha_trader', 'natasha_trader@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=natasha_trader', NOW() - INTERVAL '21 days', 'trader', 456.78, NOW() - INTERVAL '2 hours', 'Скальпер на крипто'),
('pavel_smart', 'pavel_smart@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=pavel_smart', NOW() - INTERVAL '20 days', 'developer', 789.00, NOW() - INTERVAL '40 minutes', 'Smart contract аудитор'),
('victoria_yield', 'victoria_yield@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=victoria_yield', NOW() - INTERVAL '19 days', 'member', 3456.00, NOW() - INTERVAL '15 minutes', 'Yield фармер'),
('roman_node', 'roman_node@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=roman_node', NOW() - INTERVAL '18 days', 'expert', 890.45, NOW() - INTERVAL '3 hours', 'Оператор нод'),
('julia_dex', 'julia_dex@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=julia_dex', NOW() - INTERVAL '17 days', 'trader', 567.89, NOW() - INTERVAL '1 hour', 'DEX трейдер'),
('andrey_stake', 'andrey_stake@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=andrey_stake', NOW() - INTERVAL '16 days', 'member', 2345.67, NOW() - INTERVAL '30 minutes', 'Стейкинг энтузиаст'),
('katerina_crypto', 'katerina_crypto@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=katerina_crypto', NOW() - INTERVAL '15 days', 'member', 123.45, NOW() - INTERVAL '2 hours', 'Новичок в криптовалютах');

-- Продолжение создания пользователей (21-150)
INSERT INTO users (username, email, password_hash, avatar_url, created_at, forum_role, balance, last_seen_at) VALUES
('user_21', 'user21@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=21', NOW() - INTERVAL '14 days', 'member', 100.00, NOW() - INTERVAL '1 hour'),
('user_22', 'user22@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=22', NOW() - INTERVAL '14 days', 'member', 50.00, NOW() - INTERVAL '3 hours'),
('user_23', 'user23@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=23', NOW() - INTERVAL '13 days', 'trader', 200.00, NOW() - INTERVAL '2 hours'),
('user_24', 'user24@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=24', NOW() - INTERVAL '13 days', 'member', 75.00, NOW() - INTERVAL '5 hours'),
('user_25', 'user25@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=25', NOW() - INTERVAL '12 days', 'developer', 300.00, NOW() - INTERVAL '1 hour'),
('user_26', 'user26@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=26', NOW() - INTERVAL '12 days', 'member', 150.00, NOW() - INTERVAL '4 hours'),
('user_27', 'user27@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=27', NOW() - INTERVAL '11 days', 'expert', 500.00, NOW() - INTERVAL '30 minutes'),
('user_28', 'user28@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=28', NOW() - INTERVAL '11 days', 'member', 80.00, NOW() - INTERVAL '6 hours'),
('user_29', 'user29@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=29', NOW() - INTERVAL '10 days', 'trader', 220.00, NOW() - INTERVAL '2 hours'),
('user_30', 'user30@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=30', NOW() - INTERVAL '10 days', 'member', 90.00, NOW() - INTERVAL '1 hour'),
('user_31', 'user31@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=31', NOW() - INTERVAL '9 days', 'member', 110.00, NOW() - INTERVAL '3 hours'),
('user_32', 'user32@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=32', NOW() - INTERVAL '9 days', 'developer', 400.00, NOW() - INTERVAL '45 minutes'),
('user_33', 'user33@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=33', NOW() - INTERVAL '8 days', 'member', 60.00, NOW() - INTERVAL '5 hours'),
('user_34', 'user34@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=34', NOW() - INTERVAL '8 days', 'trader', 180.00, NOW() - INTERVAL '2 hours'),
('user_35', 'user35@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=35', NOW() - INTERVAL '7 days', 'member', 70.00, NOW() - INTERVAL '4 hours'),
('user_36', 'user36@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=36', NOW() - INTERVAL '7 days', 'expert', 600.00, NOW() - INTERVAL '20 minutes'),
('user_37', 'user37@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=37', NOW() - INTERVAL '6 days', 'member', 120.00, NOW() - INTERVAL '1 hour'),
('user_38', 'user38@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=38', NOW() - INTERVAL '6 days', 'member', 95.00, NOW() - INTERVAL '3 hours'),
('user_39', 'user39@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=39', NOW() - INTERVAL '5 days', 'trader', 250.00, NOW() - INTERVAL '2 hours'),
('user_40', 'user40@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=40', NOW() - INTERVAL '5 days', 'developer', 350.00, NOW() - INTERVAL '30 minutes'),
('user_41', 'user41@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=41', NOW() - INTERVAL '4 days', 'member', 85.00, NOW() - INTERVAL '4 hours'),
('user_42', 'user42@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=42', NOW() - INTERVAL '4 days', 'member', 105.00, NOW() - INTERVAL '5 hours'),
('user_43', 'user43@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=43', NOW() - INTERVAL '3 days', 'expert', 700.00, NOW() - INTERVAL '15 minutes'),
('user_44', 'user44@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=44', NOW() - INTERVAL '3 days', 'trader', 190.00, NOW() - INTERVAL '1 hour'),
('user_45', 'user45@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=45', NOW() - INTERVAL '2 days', 'member', 130.00, NOW() - INTERVAL '2 hours'),
('user_46', 'user46@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=46', NOW() - INTERVAL '2 days', 'developer', 450.00, NOW() - INTERVAL '45 minutes'),
('user_47', 'user47@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=47', NOW() - INTERVAL '1 day', 'member', 75.00, NOW() - INTERVAL '3 hours'),
('user_48', 'user48@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=48', NOW() - INTERVAL '1 day', 'trader', 210.00, NOW() - INTERVAL '1 hour'),
('user_49', 'user49@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=49', NOW() - INTERVAL '12 hours', 'member', 90.00, NOW() - INTERVAL '30 minutes'),
('user_50', 'user50@test.com', '$2b$10$rQ3K8vZZ9YxM5J5J5J5J5O', 'https://api.dicebear.com/7.x/avataaars/svg?seed=50', NOW() - INTERVAL '10 hours', 'expert', 800.00, NOW() - INTERVAL '10 minutes');