-- Финальные темы для заполнения остальных категорий

INSERT INTO forum_topics (title, content, author_id, category_id, views, is_pinned, created_at, updated_at) VALUES
-- Темы в категории BTC монеты
('Fantom BTC: альтернатива обычному Bitcoin?', 'Кто-нибудь использует Fantom BTC? Интересует:
- Ликвидность  
- Где торговать
- Как работает бридж с обычным BTC
- Комиссии за транзакции

Стоит ли переводить часть BTC в Fantom сеть?',
(SELECT id FROM users WHERE username = 'sergey_btc'), 8, 156, FALSE, NOW() - INTERVAL '23 days', NOW() - INTERVAL '1 day'),

('BTCBR токен: что это?', 'Увидел BTCBR в списке монет. Это какой-то wrapped Bitcoin для бразильского рынка?

Кто-нибудь знает детали? Отзывы?',
(SELECT id FROM users WHERE username = 'user_103'), 13, 89, FALSE, NOW() - INTERVAL '17 days', NOW() - INTERVAL '2 days'),

-- Темы в категории стейблкоинов
('EURC: европейский стейблкоин', 'Начал использовать EURC для европейских платежей.

**Плюсы:**
- Привязка к евро 1:1
- Регулируемый стейблкоин
- Удобно для EU рынка

**Минусы:**  
- Меньше ликвидности чем USDT
- Не все биржи поддерживают

Кто еще работает с EURC?',
(SELECT id FROM users WHERE username = 'user_116'), 10, 178, FALSE, NOW() - INTERVAL '19 days', NOW() - INTERVAL '3 days'),

('USD.Z vs USD.T: практические отличия', 'Помогите разобраться в практической разнице между USD.Z и USD.T?

Оба вроде стейблкоины, оба привязаны к доллару. В чем фишка?',
(SELECT id FROM users WHERE username = 'user_128'), 11, 134, FALSE, NOW() - INTERVAL '12 days', NOW() - INTERVAL '1 day'),

-- Темы в инвестициях (разные суммы)
('Первые инвестиции: 1000$ стратегия', 'У меня впервые появилась 1000$ для инвестиций в крипту.

План новичка:
- 50% Bitcoin (держать год минимум)
- 30% Ethereum
- 20% изучаю и выбираю альткоин

Правильный ли подход для первого раза?',
(SELECT id FROM users WHERE username = 'user_135'), 25, 267, FALSE, NOW() - INTERVAL '27 days', NOW() - INTERVAL '2 days'),

('25k портфель: balanced подход', 'Делюсь своей стратегией на 25 тысяч:

**Blue chips (60%):**
- BTC - 35%
- ETH - 25%

**DeFi tokens (25%):**
- UNI, AAVE, MKR

**Emerging tech (15%):**
- AI projects, Gaming, RWA

Цель: рост 50-100% за год при умеренном риске.',
(SELECT id FROM users WHERE username = 'user_111'), 29, 389, FALSE, NOW() - INTERVAL '31 days', NOW() - INTERVAL '4 days'),

('40k для агрессивной стратегии', 'Готов рисковать с 40 тысячами. Стратегия:

**Conservative (30%):** BTC
**Moderate (40%):** Top-20 альткоины
**Aggressive (30%):** Новые проекты, IDO, мем-коины

Слишком рискованно? Или норм для crypto?',
(SELECT id FROM users WHERE username = 'user_127'), 30, 445, FALSE, NOW() - INTERVAL '36 days', NOW() - INTERVAL '5 days'),

('75k инвестиций: диверсификация важнее всего', 'После года в крипте понял главное - диверсификация спасает.

Мой портфель на 75k:
- Layer 1: 40%
- Layer 2: 20%
- DeFi: 15%
- Stablecoins: 15%
- Альты: 10%

Никогда не держу больше 15% в одном проекте!',
(SELECT id FROM users WHERE username = 'user_117'), 32, 678, TRUE, NOW() - INTERVAL '39 days', NOW() - INTERVAL '3 days'),

-- Темы в разработке (остальные категории)
('Разработка сайта для крипто-проекта', 'Создаю лендинг для DeFi протокола. Какие секции обязательны?

Думаю про:
- Hero с понятным value prop
- How it works
- Tokenomics
- Roadmap  
- Team
- Audit reports

Что еще важно добавить?',
(SELECT id FROM users WHERE username = 'user_134'), 36, 234, FALSE, NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 days'),

('Создание мобильного кошелька: технологии', 'Начинаю разработку кошелька для iOS и Android.

Выбрал стек:
- React Native (кросс-платформа)
- WalletConnect (интеграция с dApps)
- Secure Enclave (хранение ключей)
- ethers.js (blockchain interaction)

Опытные разработчики, правильный ли выбор?',
(SELECT id FROM users WHERE username = 'user_124'), 39, 345, FALSE, NOW() - INTERVAL '18 days', NOW() - INTERVAL '1 day'),

('Аудит смарт-контракта: сколько стоит?', 'Написал контракт для NFT маркетплейса. Нужен профессиональный аудит.

Вопросы:
- Кто проводит аудиты?
- Сколько стоит?
- Сколько времени занимает?
- Что входит в аудит?

Поделитесь опытом!',
(SELECT id FROM users WHERE username = 'user_114'), 40, 267, FALSE, NOW() - INTERVAL '21 days', NOW() - INTERVAL '3 days'),

-- Темы в других контрактах
('Контракты на других сетях: опыт', 'Кто деплоил контракты на менее популярных сетях?

Интересует опыт с:
- Near Protocol
- Cosmos
- Algorand
- Tezos

Есть ли смысл или лучше держаться EVM?',
(SELECT id FROM users WHERE username = 'user_94'), 49, 178, FALSE, NOW() - INTERVAL '24 days', NOW() - INTERVAL '2 days'),

-- Еще темы в разном
('Лучшие YouTube каналы про крипту', 'Посоветуйте качественные каналы про криптовалюты на русском и английском.

Мои фавориты:
- Coin Bureau (en)
- Ivan on Tech (en)
- Benjamin Cowen (en)

Кого еще стоит смотреть?',
(SELECT id FROM users WHERE username = 'user_138'), 47, 356, FALSE, NOW() - INTERVAL '10 days', NOW() - INTERVAL '1 day'),

('Telegram боты для трейдинга', 'Пользуюсь ботами для получения сигналов.

Какие боты рекомендуете:
- Для мониторинга цен
- Для whale alerts  
- Для новых листингов
- Для газа Ethereum

Делитесь ссылками!',
(SELECT id FROM users WHERE username = 'user_141'), 47, 289, FALSE, NOW() - INTERVAL '8 days', NOW() - INTERVAL '12 hours'),

('Безопасность: как защитить крипту?', 'После взлома друга стал параноиком по безопасности.

Мои правила:
1. Hardware wallet для хранения
2. Разные пароли везде
3. 2FA на всех сервисах
4. Никогда не кликать на ссылки в DM
5. Проверять адреса контрактов

Что еще добавить в список?',
(SELECT id FROM users WHERE username = 'user_109'), 47, 567, TRUE, NOW() - INTERVAL '34 days', NOW() - INTERVAL '1 week');