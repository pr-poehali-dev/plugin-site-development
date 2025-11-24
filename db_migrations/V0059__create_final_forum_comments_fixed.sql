-- Комментарии к финальным темам (исправлено)

INSERT INTO forum_comments (topic_id, author_id, content, created_at) VALUES
-- Комментарии к Fantom BTC
((SELECT id FROM forum_topics WHERE title LIKE 'Fantom BTC%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_69'),
  'Fantom BTC работает через Multichain bridge. Ликвидность нормальная, комиссии копеечные!',
  NOW() - INTERVAL '22 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Fantom BTC%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'roman_node'),
  'Использую для DeFi операций на Fantom. Намного дешевле чем работать с обычным BTC на Bitcoin сети.',
  NOW() - INTERVAL '21 days'),

-- Комментарии к BTCBR
((SELECT id FROM forum_topics WHERE title LIKE 'BTCBR токен%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_82'),
  'BTCBR - это бразильский проект. Не очень популярен, лучше держаться обычного BTC.',
  NOW() - INTERVAL '16 days'),

-- Комментарии к EURC
((SELECT id FROM forum_topics WHERE title LIKE 'EURC%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'maria_invest'),
  'Для европейских платежей очень удобно! Не нужна конвертация EUR->USD->USDT.',
  NOW() - INTERVAL '18 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'EURC%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_91'),
  'Circle выпускает EURC, так что регуляция на уровне. Доверяю больше чем мелким стейблкоинам.',
  NOW() - INTERVAL '17 days'),

-- Комментарии к USD.Z vs USD.T
((SELECT id FROM forum_topics WHERE title LIKE 'USD.Z vs USD.T%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'maksim_eth'),
  'USD.Z для приватности (zero-knowledge), USD.T для обычных платежей. Разные use cases.',
  NOW() - INTERVAL '11 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'USD.Z vs USD.T%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_77'),
  'Спасибо! Теперь понятно. Буду использовать USD.T для повседневных транзакций.',
  NOW() - INTERVAL '10 days'),

-- Комментарии к стратегии 1000$
((SELECT id FROM forum_topics WHERE title LIKE 'Первые инвестиции: 1000$%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'ivan_hodl'),
  'Отличная стратегия для новичка! Главное не паниковать при просадках.',
  NOW() - INTERVAL '26 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Первые инвестиции: 1000$%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_45'),
  'Я бы 5-10% оставил в стейблах на всякий случай. Для докупа на дипах.',
  NOW() - INTERVAL '25 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Первые инвестиции: 1000$%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_135'),
  'Хорошая идея! Оставлю 10% в USDC.',
  NOW() - INTERVAL '25 days'),

-- Комментарии к 25k портфелю
((SELECT id FROM forum_topics WHERE title LIKE '25k портфель%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'victoria_yield'),
  'Balanced подход - самый разумный. Сам использую похожую стратегию.',
  NOW() - INTERVAL '30 days'),

((SELECT id FROM forum_topics WHERE title LIKE '25k портфель%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_87'),
  'UNI, AAVE, MKR - solid выбор для DeFi. Проверенные временем протоколы.',
  NOW() - INTERVAL '29 days'),

-- Комментарии к 40k агрессивной стратегии  
((SELECT id FROM forum_topics WHERE title LIKE '40k для агрессивной%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'trader_pro'),
  '30% в новые проекты это много! Я бы не больше 15% рисковал. Слишком много scam проектов.',
  NOW() - INTERVAL '35 days'),

((SELECT id FROM forum_topics WHERE title LIKE '40k для агрессивной%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_127'),
  'Понял. Уменьшу до 15% в новые проекты, остальное в BTC добавлю.',
  NOW() - INTERVAL '34 days'),

-- Комментарии к 75k диверсификации
((SELECT id FROM forum_topics WHERE title LIKE '75k инвестиций%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'sergey_btc'),
  'Золотое правило! Я тоже никогда не держу больше 10-15% в одном активе.',
  NOW() - INTERVAL '38 days'),

((SELECT id FROM forum_topics WHERE title LIKE '75k инвестиций%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_142'),
  '15% в стейблах - умно. Всегда есть возможность докупить на коррекции.',
  NOW() - INTERVAL '37 days'),

-- Комментарии к разработке сайта
((SELECT id FROM forum_topics WHERE title LIKE 'Разработка сайта для крипто%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'elena_web3'),
  'Добавь секцию FAQ! Люди всегда спрашивают одно и то же.',
  NOW() - INTERVAL '14 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Разработка сайта для крипто%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'dev_alex'),
  'И documentation раздел обязательно. Разработчики должны понимать как интегрироваться.',
  NOW() - INTERVAL '13 days'),

-- Комментарии к мобильному кошельку
((SELECT id FROM forum_topics WHERE title LIKE 'Создание мобильного кошелька%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'pavel_smart'),
  'React Native хороший выбор! Но тестируй безопасность очень тщательно. Это ответственность.',
  NOW() - INTERVAL '17 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Создание мобильного кошелька%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_99'),
  'Рекомендую добавить биометрическую аутентификацию. Пользователи это оценят.',
  NOW() - INTERVAL '16 days'),

-- Комментарии к аудиту
((SELECT id FROM forum_topics WHERE title LIKE 'Аудит смарт-контракта%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'maksim_eth'),
  'CertiK стоит от $10k, OpenZeppelin от $15k. Зависит от сложности контракта.',
  NOW() - INTERVAL '20 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Аудит смарт-контракта%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_114'),
  'Спасибо! Начну искать аудиторов.',
  NOW() - INTERVAL '19 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Аудит смарт-контракта%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_64'),
  'Можно начать с автоматических сканеров - Mythril, Slither. Это бесплатно и найдет базовые уязвимости.',
  NOW() - INTERVAL '18 days'),

-- Комментарии к контрактам на других сетях
((SELECT id FROM forum_topics WHERE title LIKE 'Контракты на других сетях%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'dev_alex'),
  'Near Protocol интересный! Rust вместо Solidity, но экосистема меньше.',
  NOW() - INTERVAL '23 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Контракты на других сетях%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_94'),
  'Спасибо! Посмотрю Near поближе.',
  NOW() - INTERVAL '22 days'),

-- Комментарии к YouTube каналам
((SELECT id FROM forum_topics WHERE title LIKE 'Лучшие YouTube каналы%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'crypto_master'),
  'Добавлю: Crypto Banter, Bankless, The Daily Gwei - отличные каналы!',
  NOW() - INTERVAL '9 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Лучшие YouTube каналы%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_138'),
  'Супер, подписался на всех! 🔥',
  NOW() - INTERVAL '8 days'),

-- Комментарии к Telegram ботам
((SELECT id FROM forum_topics WHERE title LIKE 'Telegram боты для трейдинга' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'trader_pro'),
  'Для whale alerts используй @whale_alert_io. Для газа - @ethgasstation_bot.',
  NOW() - INTERVAL '7 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Telegram боты для трейдинга' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_141'),
  'Спасибо! Именно то что нужно 👍',
  NOW() - INTERVAL '6 days'),

-- Комментарии к безопасности
((SELECT id FROM forum_topics WHERE title LIKE 'Безопасность: как защитить%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'sergey_btc'),
  'Добавлю: НИКОГДА не вводи seed phrase на сайтах. Только в официальном кошельке!',
  NOW() - INTERVAL '33 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Безопасность: как защитить%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_109'),
  'Точно! Видел много историй как людей обманывали через фишинг сайты.',
  NOW() - INTERVAL '32 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Безопасность: как защитить%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'user_137'),
  'Еще совет: используй отдельный компьютер/телефон для крипто операций если сумма большая.',
  NOW() - INTERVAL '31 days'),

((SELECT id FROM forum_topics WHERE title LIKE 'Безопасность: как защитить%' ORDER BY id DESC LIMIT 1),
  (SELECT id FROM users WHERE username = 'pavel_smart'),
  'И регулярно обновляй все софт! Старые версии кошельков могут иметь уязвимости.',
  NOW() - INTERVAL '30 days');