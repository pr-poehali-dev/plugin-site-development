import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CookieManager, SessionManager, PerformanceTracker } from '@/utils/cookies';
import { usePerformanceTracking } from '@/hooks/useCookies';

export const CookieDebugPanel = () => {
  const [visible, setVisible] = useState(false);
  const [cookies, setCookies] = useState<Record<string, string>>({});
  const stats = usePerformanceTracking();

  const refreshCookies = () => {
    setCookies(CookieManager.getAll());
  };

  const clearAllCookies = () => {
    CookieManager.clear();
    SessionManager.destroySession();
    refreshCookies();
  };

  if (!visible) {
    return (
      <Button
        onClick={() => {
          setVisible(true);
          refreshCookies();
        }}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-[9998]"
      >
        <Icon name="Cookie" className="h-4 w-4 mr-2" />
        Cookie Debug
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-[9998] p-4 max-w-md max-h-96 overflow-auto bg-background/95 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Icon name="Cookie" className="h-5 w-5" />
          Cookie Debug Panel
        </h3>
        <Button
          onClick={() => setVisible(false)}
          variant="ghost"
          size="sm"
        >
          <Icon name="X" className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Статистика посещений</h4>
          <div className="text-sm space-y-1 text-muted-foreground">
            <div>Всего визитов: {stats.visitCount}</div>
            <div>Тип: {stats.isReturning ? 'Вернувшийся' : 'Новый'}</div>
            {stats.firstVisit && (
              <div>Первый визит: {stats.firstVisit.toLocaleString('ru')}</div>
            )}
            {stats.lastVisit && (
              <div>Последний визит: {stats.lastVisit.toLocaleString('ru')}</div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Сессия</h4>
          <div className="text-sm text-muted-foreground">
            ID: {SessionManager.getSessionId() || 'Нет активной сессии'}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Все Cookie ({Object.keys(cookies).length})</h4>
          <div className="max-h-32 overflow-auto text-xs space-y-1">
            {Object.entries(cookies).map(([key, value]) => (
              <div key={key} className="flex gap-2 text-muted-foreground">
                <span className="font-mono">{key}:</span>
                <span className="truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={refreshCookies}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Icon name="RefreshCw" className="h-3 w-3 mr-2" />
            Обновить
          </Button>
          <Button
            onClick={clearAllCookies}
            variant="destructive"
            size="sm"
            className="flex-1"
          >
            <Icon name="Trash2" className="h-3 w-3 mr-2" />
            Очистить
          </Button>
        </div>
      </div>
    </Card>
  );
};
