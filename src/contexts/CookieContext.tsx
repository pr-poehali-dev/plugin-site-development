import { createContext, useContext, useEffect, ReactNode } from 'react';
import { SessionManager, PreferencesManager, CookieManager } from '@/utils/cookies';

interface CookieContextType {
  syncPreferences: () => void;
  restorePreferences: () => void;
  clearAllCookies: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookieContext = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieContext must be used within CookieProvider');
  }
  return context;
};

interface CookieProviderProps {
  children: ReactNode;
}

export const CookieProvider = ({ children }: CookieProviderProps) => {
  useEffect(() => {
    SessionManager.initSession();

    const keysToSync = [
      'activeCategory',
      'activeView',
      'sidebarOpen',
      'language'
    ];

    keysToSync.forEach(key => {
      const cookieValue = PreferencesManager.getPreference(key);
      const localValue = localStorage.getItem(key);

      if (cookieValue && !localValue) {
        localStorage.setItem(key, cookieValue);
      } else if (localValue && !cookieValue) {
        PreferencesManager.setPreference(key, localValue);
      }
    });

    const syncInterval = setInterval(() => {
      SessionManager.updateActivity();
      
      keysToSync.forEach(key => {
        const localValue = localStorage.getItem(key);
        if (localValue) {
          PreferencesManager.setPreference(key, localValue);
        }
      });
    }, 60000);

    return () => clearInterval(syncInterval);
  }, []);

  const syncPreferences = () => {
    const keysToSync = [
      'activeCategory',
      'activeView',
      'sidebarOpen',
      'language',
      'user'
    ];

    keysToSync.forEach(key => {
      PreferencesManager.syncWithLocalStorage(key);
    });
  };

  const restorePreferences = () => {
    const keysToRestore = [
      'activeCategory',
      'activeView',
      'sidebarOpen',
      'language'
    ];

    keysToRestore.forEach(key => {
      PreferencesManager.restoreToLocalStorage(key);
    });
  };

  const clearAllCookies = () => {
    CookieManager.clear();
    SessionManager.destroySession();
  };

  const value: CookieContextType = {
    syncPreferences,
    restorePreferences,
    clearAllCookies
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};
