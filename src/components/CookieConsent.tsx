import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CookieManager } from '@/utils/cookies';

const CONSENT_KEY = 'cookie_consent';
const CONSENT_VERSION = '1.0';

interface CookieConsentProps {
  isAuthenticated: boolean;
}

export const CookieConsent = ({ isAuthenticated }: CookieConsentProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setVisible(false);
      return;
    }

    const consent = CookieManager.get(CONSENT_KEY);
    if (!consent || consent !== CONSENT_VERSION) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, [isAuthenticated]);

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
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 animate-in slide-in-from-bottom-5">
      <Card className="max-w-4xl mx-auto p-3 sm:p-4 border-primary/20 bg-background/98 backdrop-blur-lg shadow-2xl">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <Icon name="Cookie" className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-foreground">
              Мы используем cookie
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
              Для оптимизации работы и сохранения настроек. Данные не передаются третьим лицам.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleAccept}
                size="sm"
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                <Icon name="Check" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                <span className="text-xs sm:text-sm">Принять</span>
              </Button>
              
              <Button
                onClick={handleDecline}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                <span className="text-xs sm:text-sm">Отклонить</span>
              </Button>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-shrink-0 h-7 w-7 p-0 hover:bg-muted/50"
            onClick={() => setVisible(false)}
          >
            <Icon name="X" className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
