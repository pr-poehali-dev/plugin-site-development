# Система Cookie для GitCrypto

## Обзор

Система cookie реализует полноценное управление cookie для оптимизации работы сайта, сохранения предпочтений пользователей и аналитики.

## Компоненты системы

### 1. Утилиты (src/utils/cookies.ts)

#### CookieManager
Базовый класс для работы с cookie:
```typescript
// Установить cookie
CookieManager.set('key', 'value', { expires: 30, secure: true });

// Получить значение
const value = CookieManager.get('key');

// Удалить cookie
CookieManager.remove('key');

// Проверить существование
const exists = CookieManager.exists('key');

// Получить все cookie
const all = CookieManager.getAll();
```

#### SessionManager
Управление сессиями пользователей:
```typescript
// Инициализация сессии
SessionManager.initSession();

// Получить ID сессии
const sessionId = SessionManager.getSessionId();

// Обновить активность
SessionManager.updateActivity();

// Проверить истечение сессии
const expired = SessionManager.isSessionExpired();

// Завершить сессию
SessionManager.destroySession();
```

#### PreferencesManager
Сохранение пользовательских предпочтений:
```typescript
// Установить предпочтение
PreferencesManager.setPreference('theme', 'dark', 365);

// Получить предпочтение
const theme = PreferencesManager.getPreference('theme');

// Синхронизировать с localStorage
PreferencesManager.syncWithLocalStorage('theme');

// Восстановить из cookie в localStorage
PreferencesManager.restoreToLocalStorage('theme');
```

#### PerformanceTracker
Отслеживание статистики посещений:
```typescript
// Зафиксировать визит
PerformanceTracker.trackVisit();

// Получить количество визитов
const count = PerformanceTracker.getVisitCount();

// Проверить, вернувшийся ли пользователь
const returning = PerformanceTracker.isReturningUser();

// Получить даты визитов
const firstVisit = PerformanceTracker.getFirstVisit();
const lastVisit = PerformanceTracker.getLastVisit();
```

### 2. React Hooks (src/hooks/useCookies.ts)

#### useCookie
Хук для работы с отдельным cookie:
```typescript
const [value, setValue, removeCookie] = useCookie('key', 'default');

// Установить значение
setValue('new value', 365); // 365 дней

// Удалить cookie
removeCookie();
```

#### useSession
Хук для управления сессией:
```typescript
const { sessionId, destroySession } = useSession();

// Использовать sessionId
console.log(sessionId);

// Завершить сессию
destroySession();
```

#### usePreferences
Хук для работы с предпочтениями:
```typescript
const {
  setPreference,
  getPreference,
  removePreference,
  syncToLocalStorage,
  restoreFromCookie
} = usePreferences();

setPreference('language', 'ru');
const lang = getPreference('language');
```

#### usePerformanceTracking
Хук для получения статистики:
```typescript
const { visitCount, isReturning, firstVisit, lastVisit } = usePerformanceTracking();
```

### 3. Компоненты

#### CookieConsent
Уведомление о согласии на использование cookie (GDPR):
- Автоматически показывается при первом посещении
- Запоминает выбор пользователя на 365 дней
- Красивая анимация появления

#### CookieDebugPanel
Панель отладки для разработчиков:
- Показывает все активные cookie
- Отображает статистику сессий
- Позволяет очистить cookie
- Доступна только для тестирования

### 4. Контекст (src/contexts/CookieContext.tsx)

#### CookieProvider
Глобальный провайдер для управления cookie:
```typescript
const { syncPreferences, restorePreferences, clearAllCookies } = useCookieContext();

// Синхронизировать все предпочтения
syncPreferences();

// Восстановить предпочтения из cookie
restorePreferences();

// Очистить все cookie
clearAllCookies();
```

## Автоматические функции

### Синхронизация с localStorage
Система автоматически синхронизирует следующие ключи:
- `activeCategory` - активная категория
- `activeView` - текущий вид (plugins/forum)
- `sidebarOpen` - состояние сайдбара
- `language` - выбранный язык

Синхронизация происходит:
- При загрузке страницы
- Каждые 60 секунд автоматически
- При изменении значений

### Отслеживание активности
Система автоматически отслеживает:
- Движения мыши
- Нажатия клавиш
- Прокрутку страницы
- Касания экрана

И обновляет время последней активности для продления сессии.

### Управление сессиями
- Сессия действительна 30 дней
- Автоматически продлевается при активности
- Уничтожается при выходе из системы

## Безопасность

Все cookie создаются с параметрами:
- `secure: true` - только HTTPS
- `sameSite: 'lax'` - защита от CSRF
- `expires` - срок действия

## Примеры использования

### Сохранение темы оформления
```typescript
import { usePreferences } from '@/hooks/useCookies';

const { setPreference, getPreference } = usePreferences();

// Сохранить тему
setPreference('theme', 'dark', 365);

// Получить тему
const theme = getPreference('theme') || 'light';
```

### Отслеживание новых пользователей
```typescript
import { usePerformanceTracking } from '@/hooks/useCookies';

const { isReturning, visitCount } = usePerformanceTracking();

if (!isReturning) {
  // Показать приветственное сообщение
  console.log('Добро пожаловать!');
} else {
  console.log(`Вы посетили сайт ${visitCount} раз`);
}
```

### Работа с пользовательскими cookie
```typescript
import { useCookie } from '@/hooks/useCookies';

const [lastSearch, setLastSearch] = useCookie('last_search', '');

// Сохранить последний поиск
setLastSearch('flash usdt', 7); // 7 дней

// Использовать сохранённое значение
console.log('Последний поиск:', lastSearch);
```

## Оптимизация производительности

Система cookie помогает оптимизировать работу сайта:

1. **Кэширование предпочтений** - быстрое восстановление настроек
2. **Уменьшение запросов** - сохранение данных локально
3. **Персонализация** - адаптация интерфейса под пользователя
4. **Аналитика** - понимание поведения пользователей

## Соответствие GDPR

Система полностью соответствует требованиям GDPR:
- Уведомление пользователя о cookie
- Возможность принять или отклонить
- Прозрачность использования данных
- Контроль над персональными данными
