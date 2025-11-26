interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export class CookieManager {
  static set(name: string, value: string, options: CookieOptions = {}): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const expires = typeof options.expires === 'number'
        ? new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000)
        : options.expires;
      cookieString += `; expires=${expires.toUTCString()}`;
    }

    cookieString += `; path=${options.path || '/'}`;

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += '; secure';
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  static get(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  }

  static remove(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    this.set(name, '', {
      ...options,
      expires: new Date(0)
    });
  }

  static exists(name: string): boolean {
    return this.get(name) !== null;
  }

  static getAll(): Record<string, string> {
    const cookies: Record<string, string> = {};
    const cookieArray = document.cookie.split(';');

    for (const cookie of cookieArray) {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }

    return cookies;
  }

  static clear(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    const cookies = this.getAll();
    for (const name in cookies) {
      this.remove(name, options);
    }
  }
}

export class SessionManager {
  private static readonly SESSION_KEY = 'session_id';
  private static readonly SESSION_DURATION = 30;
  private static readonly ACTIVITY_KEY = 'last_activity';

  static initSession(): string {
    let sessionId = CookieManager.get(this.SESSION_KEY);

    if (!sessionId || this.isSessionExpired()) {
      sessionId = this.generateSessionId();
      CookieManager.set(this.SESSION_KEY, sessionId, {
        expires: this.SESSION_DURATION,
        secure: true,
        sameSite: 'lax'
      });
    }

    this.updateActivity();
    return sessionId;
  }

  static getSessionId(): string | null {
    return CookieManager.get(this.SESSION_KEY);
  }

  static updateActivity(): void {
    const now = Date.now().toString();
    CookieManager.set(this.ACTIVITY_KEY, now, {
      expires: this.SESSION_DURATION,
      secure: true,
      sameSite: 'lax'
    });
  }

  static isSessionExpired(): boolean {
    const lastActivity = CookieManager.get(this.ACTIVITY_KEY);
    if (!lastActivity) return true;

    const lastActivityTime = parseInt(lastActivity, 10);
    const now = Date.now();
    const expirationTime = this.SESSION_DURATION * 24 * 60 * 60 * 1000;

    return now - lastActivityTime > expirationTime;
  }

  static destroySession(): void {
    CookieManager.remove(this.SESSION_KEY);
    CookieManager.remove(this.ACTIVITY_KEY);
  }

  private static generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }
}

export class PreferencesManager {
  private static readonly PREFERENCES_PREFIX = 'pref_';

  static setPreference(key: string, value: string, expires: number = 365): void {
    CookieManager.set(`${this.PREFERENCES_PREFIX}${key}`, value, {
      expires,
      secure: true,
      sameSite: 'lax'
    });
  }

  static getPreference(key: string): string | null {
    return CookieManager.get(`${this.PREFERENCES_PREFIX}${key}`);
  }

  static removePreference(key: string): void {
    CookieManager.remove(`${this.PREFERENCES_PREFIX}${key}`);
  }

  static syncWithLocalStorage(key: string): void {
    const localValue = localStorage.getItem(key);
    if (localValue) {
      this.setPreference(key, localValue);
    }
  }

  static restoreToLocalStorage(key: string): void {
    const cookieValue = this.getPreference(key);
    if (cookieValue) {
      localStorage.setItem(key, cookieValue);
    }
  }
}

export class PerformanceTracker {
  private static readonly VISIT_COUNT_KEY = 'visit_count';
  private static readonly FIRST_VISIT_KEY = 'first_visit';
  private static readonly LAST_VISIT_KEY = 'last_visit';

  static trackVisit(): void {
    const now = Date.now().toString();
    const visitCount = this.getVisitCount();

    if (!CookieManager.exists(this.FIRST_VISIT_KEY)) {
      CookieManager.set(this.FIRST_VISIT_KEY, now, {
        expires: 3650,
        secure: true,
        sameSite: 'lax'
      });
    }

    CookieManager.set(this.LAST_VISIT_KEY, now, {
      expires: 365,
      secure: true,
      sameSite: 'lax'
    });

    CookieManager.set(this.VISIT_COUNT_KEY, (visitCount + 1).toString(), {
      expires: 365,
      secure: true,
      sameSite: 'lax'
    });
  }

  static getVisitCount(): number {
    const count = CookieManager.get(this.VISIT_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
  }

  static getFirstVisit(): Date | null {
    const timestamp = CookieManager.get(this.FIRST_VISIT_KEY);
    return timestamp ? new Date(parseInt(timestamp, 10)) : null;
  }

  static getLastVisit(): Date | null {
    const timestamp = CookieManager.get(this.LAST_VISIT_KEY);
    return timestamp ? new Date(parseInt(timestamp, 10)) : null;
  }

  static isReturningUser(): boolean {
    return this.getVisitCount() > 1;
  }
}
