import { useState, useEffect, useCallback } from 'react';
import { CookieManager, SessionManager, PreferencesManager, PerformanceTracker } from '@/utils/cookies';

export const useCookie = (key: string, defaultValue: string = '') => {
  const [value, setValue] = useState<string>(() => {
    return CookieManager.get(key) || defaultValue;
  });

  const updateCookie = useCallback((newValue: string, expires?: number) => {
    setValue(newValue);
    CookieManager.set(key, newValue, {
      expires: expires || 365,
      secure: true,
      sameSite: 'lax'
    });
  }, [key]);

  const removeCookie = useCallback(() => {
    setValue(defaultValue);
    CookieManager.remove(key);
  }, [key, defaultValue]);

  return [value, updateCookie, removeCookie] as const;
};

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = SessionManager.initSession();
    setSessionId(id);

    const handleActivity = () => {
      SessionManager.updateActivity();
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  const destroySession = useCallback(() => {
    SessionManager.destroySession();
    setSessionId(null);
  }, []);

  return { sessionId, destroySession };
};

export const usePreferences = () => {
  const setPreference = useCallback((key: string, value: string, expires?: number) => {
    PreferencesManager.setPreference(key, value, expires);
  }, []);

  const getPreference = useCallback((key: string): string | null => {
    return PreferencesManager.getPreference(key);
  }, []);

  const removePreference = useCallback((key: string) => {
    PreferencesManager.removePreference(key);
  }, []);

  const syncToLocalStorage = useCallback((key: string) => {
    PreferencesManager.syncWithLocalStorage(key);
  }, []);

  const restoreFromCookie = useCallback((key: string) => {
    PreferencesManager.restoreToLocalStorage(key);
  }, []);

  return {
    setPreference,
    getPreference,
    removePreference,
    syncToLocalStorage,
    restoreFromCookie
  };
};

export const usePerformanceTracking = () => {
  const [stats, setStats] = useState({
    visitCount: 0,
    isReturning: false,
    firstVisit: null as Date | null,
    lastVisit: null as Date | null
  });

  useEffect(() => {
    PerformanceTracker.trackVisit();

    setStats({
      visitCount: PerformanceTracker.getVisitCount(),
      isReturning: PerformanceTracker.isReturningUser(),
      firstVisit: PerformanceTracker.getFirstVisit(),
      lastVisit: PerformanceTracker.getLastVisit()
    });
  }, []);

  return stats;
};
