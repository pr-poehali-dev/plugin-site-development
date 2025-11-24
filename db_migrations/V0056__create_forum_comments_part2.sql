-- Комментарии к новым темам форума

-- Комментарии к теме про 10k инвестиций (последние созданные темы начинаются с topic_id ~57+)
INSERT INTO forum_comments (topic_id, author_id, content, created_at) VALUES
-- Ищем ID тем по их содержанию через подзапросы
((SELECT id FROM forum_topics WHERE title = 'Инвестиции на 10k: мой план' ORDER BY id DESC LIMIT 1), 
  (SELECT id FROM users WHERE username = 'victoria_yield'), 
  'Солидный план! Я бы еще добавил 5% в AI токены - сейчас горячая тема.', 
  NOW() - INTERVAL '34 days'),

((SELECT id FROM forum_topics WHERE title = 'Инвестиции на 10k: мой план' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_81'),
  'А какие именно L2 смотришь? Arbitrum или Optimism?',
  NOW() - INTERVAL '33 days'),

((SELECT id FROM forum_topics WHERE title = 'Инвестиции на 10k: мой план' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_51'),
  'Думаю разделить 50/50 между Arbitrum и Optimism. Оба перспективные.',
  NOW() - INTERVAL '33 days'),

-- Комментарии к Passive income
((SELECT id FROM forum_topics WHERE title LIKE 'Passive income%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'ivan_hodl'),
  'Отличные цифры! А на каком риске LP пулы? Импермент лосс не страшен?',
  NOW() - INTERVAL '39 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Passive income%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'andrey_stake'),
  'Использую стабильные пары типа USDC-USDT, там IL минимальный. Волатильные пары рискованнее.',
  NOW() - INTERVAL '38 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Passive income%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_91'),
  'Спасибо за идею! Сам хочу начать стейкать.',
  NOW() - INTERVAL '37 days'),

-- Комментарии к 100k стратегии
((SELECT id FROM forum_topics WHERE title LIKE '100k инвестиций%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'sergey_btc'),
  'Разумный план. 5 лет - достаточный срок для роста. Главное дисциплина!',
  NOW() - INTERVAL '41 days'),

((SELECT id FROM forum_topics WHERE title LIKE '100k инвестиций%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_132'),
  'Цель 3x довольно консервативная. В прошлом цикле можно было 10x сделать.',
  NOW() - INTERVAL '40 days'),

((SELECT id FROM forum_topics WHERE title LIKE '100k инвестиций%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_107'),
  'Именно поэтому ставлю 3x. Реалистичные цели лучше чем мечты о 100x 😊',
  NOW() - INTERVAL '40 days'),

-- Комментарии к open-source проекту
((SELECT id FROM forum_topics WHERE title LIKE 'Open-source проект%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'dev_alex'),
  'Звучит круто! Есть GitHub репозиторий?',
  NOW() - INTERVAL '15 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Open-source проект%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'elena_web3'),
  'Да, вот ссылка: github.com/defi-dashboard (пример). Буду рад contributors!',
  NOW() - INTERVAL '15 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Open-source проект%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_94'),
  'Могу помочь с дизайном UI. Написал в Discord.',
  NOW() - INTERVAL '14 days'),

-- Комментарии к NFT контракту
((SELECT id FROM forum_topics WHERE title LIKE 'Код ревью%NFT%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'pavel_smart'),
  'Неплохо для первого контракта! Рекомендации:
1. Добавь ограничение на max supply
2. Добавь права доступа (Ownable)
3. Добавь uri для metadata
4. Сделай функцию mint платной',
  NOW() - INTERVAL '10 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Код ревью%NFT%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_84'),
  'Спасибо! Буду дорабатывать 👍',
  NOW() - INTERVAL '10 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Код ревью%NFT%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'maksim_eth'),
  'Также рекомендую посмотреть ERC721A - он оптимизирован для batch minting.',
  NOW() - INTERVAL '9 days'),

-- Комментарии к dApp серии
((SELECT id FROM forum_topics WHERE title LIKE 'Создание decentralized приложения%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_119'),
  'Ждем первый пост! 🔥',
  NOW() - INTERVAL '20 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Создание decentralized приложения%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_74'),
  '+1 очень интересно! Давно хотел научиться.',
  NOW() - INTERVAL '19 days'),

((SELECT id FROM users WHERE username = 'dev_alex'), 
  (SELECT id FROM users WHERE username = 'user_129'),
  'Подписался! Буду следить за обновлениями.',
  NOW() - INTERVAL '18 days'),

-- Комментарии к арбитражному боту
((SELECT id FROM forum_topics WHERE title LIKE '%арбитража на DEX' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'trader_pro'),
  'Круто! А как часто находятся profitable возможности? Конкуренция не мешает?',
  NOW() - INTERVAL '12 days'),

((SELECT id FROM forum_topics WHERE title LIKE '%арбитража на DEX' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_99'),
  'Примерно 2-3 возможности в день. Конкуренция есть, нужна быстрая инфраструктура.',
  NOW() - INTERVAL '12 days'),

((SELECT id FROM forum_topics WHERE title LIKE '%арбитража на DEX' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'julia_dex'),
  'Можешь поделиться кодом? Или хотя бы базовой логикой?',
  NOW() - INTERVAL '11 days'),

((SELECT id FROM forum_topics WHERE title LIKE '%арбитража на DEX' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_99'),
  'Базовая логика: мониторишь цены на разных DEX, если разница > 0.5% + газ = профит. Запускаешь atomic swap.',
  NOW() - INTERVAL '11 days'),

-- Комментарии к fUSDT
((SELECT id FROM forum_topics WHERE title LIKE 'fUSDT%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'crypto_master'),
  'fUSDT - это форк USDT для использования в определенных DeFi протоколах. Имеет полную привязку к USDT.',
  NOW() - INTERVAL '8 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'fUSDT%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_108'),
  'Понял, спасибо! А где можно обменять обычный USDT на fUSDT?',
  NOW() - INTERVAL '8 days'),

-- Комментарии к USDT.z
((SELECT id FROM forum_topics WHERE title LIKE 'USDT.z%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'anna_defi'),
  'USDT.z - это версия для zero-knowledge протоколов. Больше анонимности транзакций.',
  NOW() - INTERVAL '6 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'USDT.z%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_133'),
  'Спасибо! А для обычных платежей лучше обычный USDT использовать?',
  NOW() - INTERVAL '6 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'USDT.z%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'maksim_eth'),
  'Да, для простых платежей обычный TRC-20 USDT самый оптимальный.',
  NOW() - INTERVAL '5 days'),

-- Комментарии к wUSDT
((SELECT id FROM forum_topics WHERE title LIKE 'Wrapped USDT%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_67'),
  'Отличное объяснение! Теперь понял зачем нужны wrapped токены.',
  NOW() - INTERVAL '32 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Wrapped USDT%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'dev_alex'),
  'Важно добавить: unwrap обратно в USDT можно в любой момент без потерь.',
  NOW() - INTERVAL '31 days'),

-- Комментарии к BSC
((SELECT id FROM forum_topics WHERE title LIKE 'BNB Smart Chain%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'pavel_smart'),
  'BSC отличный выбор для MVP и тестирования. Потом можно мигрировать на более децентрализованные сети.',
  NOW() - INTERVAL '28 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'BNB Smart Chain%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_91'),
  'Согласен! Начинал с BSC, потом перенес на Polygon.',
  NOW() - INTERVAL '27 days'),

-- Комментарии к Fantom
((SELECT id FROM forum_topics WHERE title LIKE 'Fantom Opera%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_82'),
  'Fantom недооценен! Технология крутая, но маркетинга мало.',
  NOW() - INTERVAL '25 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Fantom Opera%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'roman_node'),
  'Запускаю валидатор на Fantom. Технически одна из лучших сетей.',
  NOW() - INTERVAL '24 days'),

-- Комментарии к сравнению блокчейнов
((SELECT id FROM forum_topics WHERE title LIKE 'Сравнение блокчейнов%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'dev_alex'),
  'Отличная таблица! Сохранил себе. Для нового проекта я бы выбрал Polygon или Arbitrum.',
  NOW() - INTERVAL '37 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Сравнение блокчейнов%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_54'),
  'А как насчет Avalanche? Слышал что у них C-Chain очень быстрая.',
  NOW() - INTERVAL '36 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Сравнение блокчейнов%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'pavel_smart'),
  'Avalanche хороша, но экосистема DeFi меньше чем на Ethereum L2. Зависит от целей проекта.',
  NOW() - INTERVAL '35 days'),

-- Комментарии к налогам
((SELECT id FROM forum_topics WHERE title LIKE 'Налоги на крипту%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'sergey_btc'),
  'Лучше проконсультироваться с налоговым юристом. В разных странах разные правила.',
  NOW() - INTERVAL '5 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Налоги на крипту%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_142'),
  'Я декларирую все. Лучше спать спокойно чем потом проблемы с налоговой.',
  NOW() - INTERVAL '5 days'),

-- Комментарии к книгам
((SELECT id FROM forum_topics WHERE title LIKE 'Книги по криптовалютам%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'crypto_master'),
  'Рекомендую "Mastering Bitcoin" от Antonopoulos. Классика!',
  NOW() - INTERVAL '3 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Книги по криптовалютам%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_143'),
  'Спасибо! Закажу на Amazon 📚',
  NOW() - INTERVAL '3 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Книги по криптовалютам%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'maria_invest'),
  'Еще советую "The Bitcoin Standard" - про экономику криптовалют.',
  NOW() - INTERVAL '2 days'),

-- Комментарии к трендам 2024
((SELECT id FROM forum_topics WHERE title LIKE 'Криптовалюта в 2024%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'maksim_eth'),
  'Согласен со всеми пунктами! Еще добавлю: Real World Assets (RWA) будут большой темой.',
  NOW() - INTERVAL '40 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Криптовалюта в 2024%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_127'),
  'Bitcoin ETF одобрят 100%. BlackRock не зря подал заявку.',
  NOW() - INTERVAL '39 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Криптовалюта в 2024%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'victoria_yield'),
  'Жду DeFi 2.0 - более безопасные и user-friendly протоколы.',
  NOW() - INTERVAL '38 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Криптовалюта в 2024%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'trader_pro'),
  'Главное что крипта становится мейнстримом. Это уже не остановить! 🚀',
  NOW() - INTERVAL '37 days');