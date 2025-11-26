import { useCookie, useSession, usePreferences, usePerformanceTracking } from '@/hooks/useCookies';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const CookieUsageExample = () => {
  const [theme, setTheme] = useCookie('user_theme', 'light');
  const { sessionId } = useSession();
  const { setPreference, getPreference } = usePreferences();
  const { visitCount, isReturning } = usePerformanceTracking();

  return (
    <div className="p-6 space-y-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Пример 1: Простой Cookie</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Текущая тема: {theme}
        </p>
        <div className="flex gap-2">
          <Button onClick={() => setTheme('dark', 365)}>
            Тёмная тема
          </Button>
          <Button onClick={() => setTheme('light', 365)}>
            Светлая тема
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Пример 2: Информация о сессии</h3>
        <p className="text-sm text-muted-foreground">
          ID сессии: <code className="bg-muted px-2 py-1 rounded">{sessionId}</code>
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Пример 3: Предпочтения</h3>
        <Button onClick={() => {
          setPreference('notifications', 'enabled', 365);
          alert('Предпочтение сохранено!');
        }}>
          <Icon name="Bell" className="h-4 w-4 mr-2" />
          Включить уведомления
        </Button>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Пример 4: Статистика посещений</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Количество визитов: {visitCount}</p>
          <p>Статус: {isReturning ? 'Вернувшийся пользователь' : 'Новый пользователь'}</p>
        </div>
      </Card>
    </div>
  );
};

export default CookieUsageExample;
