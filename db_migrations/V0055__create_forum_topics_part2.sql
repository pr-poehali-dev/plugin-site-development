-- Дополнительные темы форума для всех категорий

-- Темы про инвестиции
INSERT INTO forum_topics (title, content, author_id, category_id, views, is_pinned, created_at, updated_at) VALUES
('Инвестиции на 10k: мой план', 'Копил год и собрал 10 тысяч долларов. Вот мой план распределения:

**50% - Bitcoin** (защитный актив)
**25% - Ethereum** (умные контракты)
**15% - Layer 2** (Arbitrum, Optimism)
**10% - Перспективные проекты** (AI токены, Gaming)

Что думаете? Может что-то добавить или убрать?',
(SELECT id FROM users WHERE username = 'user_51'), 27, 445, FALSE, NOW() - INTERVAL '35 days', NOW() - INTERVAL '2 days'),

('Passive income: 15k годовых через крипту', 'Делюсь своей стратегией пассивного дохода с 15 тысяч:

1. **Staking ETH** - 5k в Lido (4.5% APY)
2. **DeFi Lending** - 5k в Aave (8% APY)
3. **LP pools** - 3k в Uniswap (15% APY)
4. **Резерв** - 2k в USDC

Средний доход: **$1200-1500/год**

Риски есть, но диверсификация помогает их минимизировать.',
(SELECT id FROM users WHERE username = 'andrey_stake'), 28, 789, TRUE, NOW() - INTERVAL '40 days', NOW() - INTERVAL '5 days'),

('100k инвестиций: стратегия на 5 лет', 'У меня есть 100 тысяч для долгосрочных инвестиций. План:

**Год 1-2:** Накопление позиций
- 60% BTC+ETH
- 40% альткоины

**Год 3-4:** Удержание и DeFi
- Стейкинг основных позиций
- Yield farming на стейблах

**Год 5:** Постепенный выход
- Фиксация прибыли по частям
- Ребалансировка в стейблы

Цель: **3x минимум** к 2029 году',
(SELECT id FROM users WHERE username = 'user_107'), 33, 1234, TRUE, NOW() - INTERVAL '42 days', NOW() - INTERVAL '1 week'),

-- Темы про разработку
('Open-source проект: нужны разработчики!', 'Запускаю open-source DeFi dashboard для отслеживания портфеля.

**Стек:**
- Frontend: React + TypeScript
- Backend: Node.js + PostgreSQL  
- Web3: ethers.js, web3.js
- UI: Tailwind CSS

**Нужны:**
- Frontend разработчики
- Дизайнеры
- Тестировщики

Кто хочет присоединиться к команде?',
(SELECT id FROM users WHERE username = 'elena_web3'), 37, 456, FALSE, NOW() - INTERVAL '16 days', NOW() - INTERVAL '3 days'),

('Код ревью: мой первый NFT контракт', 'Написал свой первый NFT смарт-контракт на Solidity. Буду благодарен за code review!

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 private _tokenIds;
    
    constructor() ERC721("MyNFT", "MNFT") {}
    
    function mint(address to) public returns (uint256) {
        _tokenIds++;
        _mint(to, _tokenIds);
        return _tokenIds;
    }
}
```

Что можно улучшить?',
(SELECT id FROM users WHERE username = 'user_84'), 42, 234, FALSE, NOW() - INTERVAL '11 days', NOW() - INTERVAL '1 day'),

('Создание decentralized приложения с нуля', 'Начинаю серию постов о создании dApp с нуля.

**План серии:**
1. Выбор блокчейна и инструментов
2. Написание смарт-контрактов
3. Создание frontend интерфейса
4. Интеграция с кошельками
5. Тестирование и деплой
6. Продвижение и рост

Первый пост напишу на этой неделе. Кому интересно?',
(SELECT id FROM users WHERE username = 'dev_alex'), 41, 567, TRUE, NOW() - INTERVAL '21 days', NOW() - INTERVAL '2 days'),

('Программа для арбитража на DEX', 'Написал бота который находит арбитражные возможности между Uniswap и Sushiswap.

**Результаты за месяц:**
- Profitable сделок: 47
- Убыточных: 3  
- Средняя прибыль: $12 на сделку
- Общий профит: **$534**

Написано на Python с использованием web3.py. Кому интересны детали реализации?',
(SELECT id FROM users WHERE username = 'user_99'), 48, 891, FALSE, NOW() - INTERVAL '13 days', NOW() - INTERVAL '6 hours'),

-- Темы про разные монеты
('fUSDT: что это и зачем?', 'Видел категорию fUSDT в списке монет. Кто-нибудь может объяснить что это за токен?

Насколько понимаю это какая-то обертка над USDT? Для чего она нужна?',
(SELECT id FROM users WHERE username = 'user_108'), 7, 123, FALSE, NOW() - INTERVAL '9 days', NOW() - INTERVAL '2 days'),

('USDT.z vs обычный USDT: в чем разница?', 'Новичок здесь. Вижу разные виды USDT - обычный, USDT.z, wUSDT...

В чем различия? Какой лучше использовать для обычных платежей?',
(SELECT id FROM users WHERE username = 'user_133'), 6, 234, FALSE, NOW() - INTERVAL '7 days', NOW() - INTERVAL '1 day'),

('Wrapped USDT (wUSDT): зачем заворачивать?', 'Объясню для новичков что такое wrapped токены.

**Зачем нужен wUSDT?**
Обычный USDT работает на стандарте TRC-20 (TRON). Но некоторые DEX и протоколы работают только со своими стандартами.

**Wrapped токен** - это обертка которая позволяет использовать USDT в других сетях.

**Преимущества:**
- Кросс-чейн транзакции
- Доступ к DeFi на других сетях
- Единая ликвидность

**1 USDT = 1 wUSDT всегда**',
(SELECT id FROM users WHERE username = 'maksim_eth'), 9, 456, TRUE, NOW() - INTERVAL '33 days', NOW() - INTERVAL '4 days'),

-- Темы в категории Контракты  
('BNB Smart Chain: быстро и дешево', 'Перешел с Ethereum на BSC и не жалею!

**Плюсы:**
- Газ стоит центы
- Транзакции за 3 секунды
- Много DeFi проектов

**Минусы:**
- Меньше децентрализации
- Иногда проблемы с RPC

Кто еще использует BSC для деплоя контрактов?',
(SELECT id FROM users WHERE username = 'user_64'), 23, 345, FALSE, NOW() - INTERVAL '29 days', NOW() - INTERVAL '3 days'),

('Fantom Opera: недооцененная платформа', 'Fantom - один из самых быстрых блокчейнов. Почему о нем мало говорят?

**Характеристики:**
- Скорость: 1-2 секунды
- Газ: ~$0.01 за транзакцию
- EVM совместим
- Уникальный консенсус Lachesis

Использую для запуска своих DeFi контрактов. Очень рекомендую!',
(SELECT id FROM users WHERE username = 'user_69'), 22, 267, FALSE, NOW() - INTERVAL '26 days', NOW() - INTERVAL '2 days'),

('Сравнение блокчейнов для смарт-контрактов 2024', 'Составил таблицу сравнения популярных блокчейнов:

| Сеть | TPS | Газ | Финальность | DeFi TVL |
|------|-----|-----|-------------|----------|
| Ethereum | 15 | Высокий | 15 мин | $50B |
| BSC | 160 | Низкий | 3 сек | $5B |
| Solana | 3000 | Очень низкий | 0.4 сек | $2B |
| Polygon | 65000 | Низкий | 2 сек | $1B |
| Avalanche | 4500 | Средний | 1 сек | $1.5B |

Какую сеть выбрать для нового проекта?',
(SELECT id FROM users WHERE username = 'pavel_smart'), 49, 678, TRUE, NOW() - INTERVAL '38 days', NOW() - INTERVAL '5 days'),

-- Еще темы в разном
('Налоги на крипту: как правильно платить?', 'Заработал на криптовалюте и теперь думаю про налоги. 

Как вы решаете этот вопрос? Декларируете доходы? Какие есть легальные способы оптимизации?',
(SELECT id FROM users WHERE username = 'user_113'), 47, 445, FALSE, NOW() - INTERVAL '6 days', NOW() - INTERVAL '12 hours'),

('Книги по криптовалютам: что почитать?', 'Хочу углубить знания. Посоветуйте хорошие книги про:
- Блокчейн технологию
- Инвестиции в крипту
- Техническийанализ
- DeFi

Что читали и рекомендуете?',
(SELECT id FROM users WHERE username = 'user_143'), 47, 234, FALSE, NOW() - INTERVAL '4 days', NOW() - INTERVAL '8 hours'),

('Криптовалюта в 2024: главные тренды', 'Давайте обсудим что будет актуально в 2024:

**Мои предсказания:**
1. Массовое внедрение Layer 2
2. Рост AI + Crypto проектов  
3. Регуляция станет четче
4. NFT трансформируются в utility
5. Bitcoin ETF одобрят

Что думаете? Какие тренды я упустил?',
(SELECT id FROM users WHERE username = 'crypto_master'), 47, 1567, TRUE, NOW() - INTERVAL '41 days', NOW() - INTERVAL '6 days');