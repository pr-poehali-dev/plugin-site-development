// Универсальный менеджер кэширования запросов с дедупликацией

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  promise?: Promise<T>;
}

interface CacheConfig {
  ttl: number; // Время жизни кэша в мс
  minInterval: number; // Минимальный интервал между обновлениями
}

type SubscriberCallback<T> = (data: T) => void;

class RequestCacheManager {
  private caches: Map<string, CacheEntry<any>> = new Map();
  private lastUpdateTimes: Map<string, number> = new Map();
  private subscribers: Map<string, Set<SubscriberCallback<any>>> = new Map();
  private configs: Map<string, CacheConfig> = new Map();

  // Регистрация конфигурации для ключа кэша
  registerConfig(key: string, config: CacheConfig) {
    this.configs.set(key, config);
  }

  // Подписка на обновления кэша
  subscribe<T>(key: string, callback: SubscriberCallback<T>): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(callback);

    // Если есть кэш, сразу вызываем callback
    const cached = this.caches.get(key);
    if (cached) {
      callback(cached.data);
    }

    // Возвращаем функцию отписки
    return () => {
      const subs = this.subscribers.get(key);
      if (subs) {
        subs.delete(callback);
        if (subs.size === 0) {
          this.subscribers.delete(key);
        }
      }
    };
  }

  // Уведомление подписчиков об обновлении
  private notifySubscribers<T>(key: string, data: T) {
    const subs = this.subscribers.get(key);
    if (subs) {
      subs.forEach(callback => callback(data));
    }
  }

  // Получение данных с кэшированием и дедупликацией
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    force: boolean = false
  ): Promise<T | null> {
    const now = Date.now();
    const config = this.configs.get(key);
    
    if (!config) {
      console.warn(`[RequestCache] No config for key: ${key}`);
      return fetcher();
    }

    const cached = this.caches.get(key);
    const lastUpdate = this.lastUpdateTimes.get(key) || 0;

    // Проверяем кэш
    if (!force && cached && (now - cached.timestamp) < config.ttl) {
      return cached.data;
    }

    // Проверяем минимальный интервал
    if (!force && (now - lastUpdate) < config.minInterval) {
      return cached?.data || null;
    }

    // Дедупликация: если запрос уже выполняется, возвращаем существующий промис
    if (cached?.promise) {
      return cached.promise;
    }

    // Создаем новый запрос
    const promise = fetcher();
    
    // Сохраняем промис для дедупликации
    this.caches.set(key, {
      data: cached?.data,
      timestamp: cached?.timestamp || 0,
      promise
    } as any);

    try {
      const data = await promise;
      
      // Сохраняем результат
      this.caches.set(key, {
        data,
        timestamp: now,
        promise: undefined
      });
      this.lastUpdateTimes.set(key, now);
      
      // Уведомляем подписчиков
      this.notifySubscribers(key, data);
      
      return data;
    } catch (error) {
      // При ошибке удаляем промис, но сохраняем старые данные
      if (cached) {
        this.caches.set(key, {
          data: cached.data,
          timestamp: cached.timestamp,
          promise: undefined
        });
      } else {
        this.caches.delete(key);
      }
      throw error;
    }
  }

  // Принудительное обновление кэша
  async refresh<T>(key: string, fetcher: () => Promise<T>): Promise<T | null> {
    return this.get(key, fetcher, true);
  }

  // Инвалидация кэша
  invalidate(key: string) {
    this.caches.delete(key);
    this.lastUpdateTimes.delete(key);
  }

  // Получение кэшированных данных без запроса
  getCached<T>(key: string): T | null {
    return this.caches.get(key)?.data || null;
  }

  // Очистка всего кэша
  clear() {
    this.caches.clear();
    this.lastUpdateTimes.clear();
  }

  // Очистка старого кэша (можно вызывать периодически)
  clearExpired() {
    const now = Date.now();
    for (const [key, entry] of this.caches.entries()) {
      const config = this.configs.get(key);
      if (config && (now - entry.timestamp) > config.ttl * 2) {
        this.caches.delete(key);
      }
    }
  }
}

export const requestCache = new RequestCacheManager();

// Автоочистка старого кэша каждые 5 минут
setInterval(() => {
  requestCache.clearExpired();
}, 5 * 60 * 1000);
