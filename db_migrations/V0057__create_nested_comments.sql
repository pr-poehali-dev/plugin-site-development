-- Добавление вложенных комментариев (ответы на существующие комментарии)

-- Получаем ID некоторых комментариев и создаем ответы на них
-- Ответы на комментарии в теме "Как работает Flash USDT?"
INSERT INTO forum_comments (topic_id, author_id, content, parent_id, created_at) VALUES
-- Находим parent комментарий и создаем ответ
(40, (SELECT id FROM users WHERE username = 'user_96'), 
  'Согласен! Я тоже использую для обучения клиентов. Очень удобно показывать на реальных примерах.', 
  (SELECT id FROM forum_comments WHERE topic_id = 40 AND author_id = (SELECT id FROM users WHERE username = 'trader_pro') LIMIT 1),
  NOW() - INTERVAL '28 days' + INTERVAL '2 hours'),

(40, (SELECT id FROM users WHERE username = 'user_116'),
  'Лучше использовать TestNet токены для обучения. Они бесплатные и не истекают.',
  (SELECT id FROM forum_comments WHERE topic_id = 40 AND author_id = (SELECT id FROM users WHERE username = 'anna_defi') LIMIT 1),
  NOW() - INTERVAL '26 days' + INTERVAL '3 hours'),

-- Ответы в теме про TRC-20
(43, (SELECT id FROM users WHERE username = 'user_144'),
  'TronScan API действительно полезен! Использую его для аналитики газа.',
  (SELECT id FROM forum_comments WHERE topic_id = 43 AND author_id = (SELECT id FROM users WHERE username = 'maksim_eth') LIMIT 1),
  NOW() - INTERVAL '26 days' + INTERVAL '1 hour'),

(43, (SELECT id FROM users WHERE username = 'user_78'),
  'Отличный совет про freeze! Экономлю кучу на энергии таким способом.',
  (SELECT id FROM forum_comments WHERE topic_id = 43 AND author_id = (SELECT id FROM users WHERE username = 'roman_node') LIMIT 1),
  NOW() - INTERVAL '24 days' + INTERVAL '4 hours'),

-- Ответы в теме про Ethereum газ
(45, (SELECT id FROM users WHERE username = 'user_137'),
  'Добавлю что в праздники тоже обычно дешевле. Меньше активности = меньше газ.',
  (SELECT id FROM forum_comments WHERE topic_id = 45 AND author_id = (SELECT id FROM users WHERE username = 'maksim_eth') LIMIT 1),
  NOW() - INTERVAL '24 days' + INTERVAL '2 hours'),

(45, (SELECT id FROM users WHERE username = 'user_105'),
  'Arbitrum рулит! Перевел все свои DeFi операции туда.',
  (SELECT id FROM forum_comments WHERE topic_id = 45 AND author_id = (SELECT id FROM users WHERE username = 'elena_web3') LIMIT 1),
  NOW() - INTERVAL '22 days' + INTERVAL '5 hours'),

-- Ответы в теме про портфель 50k
(53, (SELECT id FROM users WHERE username = 'user_141'),
  'У меня тоже была Luna... Урок на всю жизнь 😔',
  (SELECT id FROM forum_comments WHERE topic_id = 53 AND author_id = (SELECT id FROM users WHERE username = 'user_87') LIMIT 1),
  NOW() - INTERVAL '18 days' + INTERVAL '3 hours'),

(53, (SELECT id FROM users WHERE username = 'user_97'),
  'Celestia интересный проект! Modular blockchain - будущее scalability.',
  (SELECT id FROM forum_comments WHERE topic_id = 53 AND author_id = (SELECT id FROM users WHERE username = 'user_122') LIMIT 1),
  NOW() - INTERVAL '16 days' + INTERVAL '6 hours'),

-- Ответы в теме про DCA
(54, (SELECT id FROM users WHERE username = 'user_149'),
  'Я делаю еще проще - автоматический DCA через биржу. Настроил и забыл!',
  (SELECT id FROM forum_comments WHERE topic_id = 54 AND author_id = (SELECT id FROM users WHERE username = 'trader_pro') LIMIT 1),
  NOW() - INTERVAL '14 days' + INTERVAL '8 hours'),

(54, (SELECT id FROM users WHERE username = 'user_106'),
  'Отличная стратегия! Эмоции - главный враг трейдера.',
  (SELECT id FROM forum_comments WHERE topic_id = 54 AND author_id = (SELECT id FROM users WHERE username = 'ivan_hodl') LIMIT 1),
  NOW() - INTERVAL '15 days' + INTERVAL '2 hours'),

-- Ответы в мемы теме
(56, (SELECT id FROM users WHERE username = 'user_147'),
  'Ахахах! У меня все портфолио состоит из "проектов с собачками" 🐶😂',
  (SELECT id FROM forum_comments WHERE topic_id = 56 AND author_id = (SELECT id FROM users WHERE username = 'user_141') LIMIT 1),
  NOW() - INTERVAL '2 days' + INTERVAL '4 hours'),

(56, (SELECT id FROM users WHERE username = 'user_93'),
  'Знакомая ситуация! YOLO монетки иногда приносят больше профита чем серьезные инвестиции 🎲',
  (SELECT id FROM forum_comments WHERE topic_id = 56 AND author_id = (SELECT id FROM users WHERE username = 'user_119') LIMIT 1),
  NOW() - INTERVAL '1 day' + INTERVAL '12 hours'),

-- Создание новых обсуждений в популярных темах
(51, (SELECT id FROM users WHERE username = 'user_150'),
  'А что насчет маркетинга токена? Где лучше продвигаться?',
  NULL,
  NOW() - INTERVAL '27 days'),

(51, (SELECT id FROM users WHERE username = 'crypto_master'),
  'Twitter, Telegram, Discord - must have. Потом можно на Reddit и специализированные форумы.',
  (SELECT MAX(id) FROM forum_comments WHERE topic_id = 51),
  NOW() - INTERVAL '26 days'),

(51, (SELECT id FROM users WHERE username = 'user_150'),
  'Спасибо! Начну с соцсетей тогда.',
  (SELECT MAX(id) FROM forum_comments WHERE topic_id = 51),
  NOW() - INTERVAL '26 days' + INTERVAL '2 hours'),

-- Дополнительные комментарии в тему про 10k инвестиции
(57, (SELECT id FROM users WHERE username = 'user_92'),
  'А стоит ли сейчас входить в рынок? Не поздно?',
  NULL,
  NOW() - INTERVAL '32 days'),

(57, (SELECT id FROM users WHERE username = 'sergey_btc'),
  'Для Bitcoin никогда не поздно. Но используй DCA стратегию, не входи всей суммой сразу.',
  (SELECT MAX(id) FROM forum_comments WHERE topic_id = 57),
  NOW() - INTERVAL '31 days'),

-- Обсуждение в теме про Solana DEX
(48, (SELECT id FROM users WHERE username = 'user_124'),
  'А Marinade Finance кто-нибудь пробовал? Там вроде хорошие ставки на стейкинг.',
  NULL,
  NOW() - INTERVAL '14 days'),

(48, (SELECT id FROM users WHERE username = 'dmitry_sol'),
  'Да, Marinade отличный протокол! Liquid staking - можешь стейкать и при этом использовать mSOL в DeFi.',
  (SELECT MAX(id) FROM forum_comments WHERE topic_id = 48),
  NOW() - INTERVAL '13 days'),

-- Обсуждение в теме про разработку кошелька
(50, (SELECT id FROM users WHERE username = 'user_118'),
  'Кто-нибудь знает как реализовать мультисиг кошелек?',
  NULL,
  NOW() - INTERVAL '10 days'),

(50, (SELECT id FROM users WHERE username = 'pavel_smart'),
  'Нужен смарт-контракт с несколькими подписантами. Есть готовые решения типа Gnosis Safe, можешь взять за основу.',
  (SELECT MAX(id) FROM forum_comments WHERE topic_id = 50),
  NOW() - INTERVAL '9 days'),

-- Обсуждение про сравнение блокчейнов
((SELECT id FROM forum_topics WHERE title LIKE 'Сравнение блокчейнов%' LIMIT 1), 
  (SELECT id FROM users WHERE username = 'user_146'),
  'Почему Solana показывает 3000 TPS но на практике часто падает?',
  NULL,
  NOW() - INTERVAL '34 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Сравнение блокчейнов%' LIMIT 1),
  (SELECT id FROM users WHERE username = 'roman_node'),
  'Проблема не в TPS а в консенсусе. Когда все валидаторы не согласованы - сеть останавливается.',
  (SELECT MAX(id) FROM forum_comments WHERE topic_id = (SELECT id FROM forum_topics WHERE title LIKE 'Сравнение блокчейнов%' LIMIT 1)),
  NOW() - INTERVAL '33 days'),

-- Обсуждение трендов 2024
((SELECT id FROM forum_topics WHERE title LIKE 'Криптовалюта в 2024%' LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_104'),
  'А как думаете, мем-коины еще будут актуальны?',
  NULL,
  NOW() - INTERVAL '36 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Криптовалюта в 2024%' LIMIT 1),
  (SELECT id FROM users WHERE username = 'trader_pro'),
  'Мемы никуда не денутся! Но важно заходить рано и фиксировать прибыль вовремя.',
  (SELECT MAX(id) FROM forum_comments WHERE topic_id = (SELECT id FROM forum_topics WHERE title LIKE 'Криптовалюта в 2024%' LIMIT 1)),
  NOW() - INTERVAL '35 days');