import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CookieManager } from '@/utils/cookies';

const CONSENT_KEY = 'cookie_consent';
const CONSENT_VERSION = '1.0';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = CookieManager.get(CONSENT_KEY);
    if (!consent || consent !== CONSENT_VERSION) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    CookieManager.set(CONSENT_KEY, CONSENT_VERSION, {
      expires: 365,
      secure: true,
      sameSite: 'lax'
    });
    setVisible(false);
  };

  const handleDecline = () => {
    CookieManager.set(CONSENT_KEY, 'declined', {
      expires: 30,
      secure: true,
      sameSite: 'lax'
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-in slide-in-from-bottom-5">
      <Card className="max-w-4xl mx-auto p-6 border-primary/20 bg-background/95 backdrop-blur-lg shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Icon name="Cookie" className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Мы используем cookie
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Этот сайт использует cookie для улучшения производительности, оптимизации работы и аналитики. 
              Мы сохраняем ваши предпочтения, данные сессии и статистику посещений. 
              Никакая личная информация не передаётся третьим лицам.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Check" className="h-4 w-4 mr-2" />
                Принять
              </Button>
              
              <Button
                onClick={handleDecline}
                variant="outline"
              >
                Отклонить
              </Button>
              
              <Button
                variant="ghost"
                className="text-xs"
                onClick={() => setVisible(false)}
              >
                <Icon name="X" className="h-3 w-3 mr-1" />
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
