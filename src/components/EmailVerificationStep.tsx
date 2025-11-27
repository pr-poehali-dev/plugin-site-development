import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const EMAIL_VERIFY_URL = 'https://functions.poehali.dev/d1025e8d-68f1-4eec-b8e9-30ec5c80d63f';

interface EmailVerificationStepProps {
  email: string;
  onVerified: () => void;
}

const EmailVerificationStep = ({ email, onVerified }: EmailVerificationStepProps) => {
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendCode = async () => {
    setIsSending(true);
    try {
      const response = await fetch(EMAIL_VERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_code',
          email
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '✅ Код отправлен',
          description: 'Проверьте вашу почту'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить код',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка подключения к серверу',
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = async () => {
    if (code.length !== 6) {
      toast({
        title: 'Ошибка',
        description: 'Код должен содержать 6 цифр',
        variant: 'destructive'
      });
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch(EMAIL_VERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_code',
          email,
          code
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '✅ Email подтверждён',
          description: 'Завершаем регистрацию...'
        });
        onVerified();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Неверный код',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка подключения к серверу',
        variant: 'destructive'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-5 pt-2">
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3 mb-3">
          <Icon name="Mail" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Подтвердите email</h3>
            <p className="text-sm text-muted-foreground">
              Мы отправили код на <span className="font-medium">{email}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/90">Код из письма</label>
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="123456"
          className="h-11 rounded-xl border-border/50 focus:border-primary transition-all text-center text-2xl tracking-widest font-bold"
          maxLength={6}
          autoFocus
        />
      </div>

      <Button
        onClick={verifyCode}
        disabled={code.length !== 6 || isVerifying}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg shadow-primary/25"
      >
        {isVerifying ? (
          <>
            <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
            Проверяем...
          </>
        ) : (
          'Подтвердить'
        )}
      </Button>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={sendCode}
          disabled={isSending}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          {isSending ? 'Отправка...' : 'Отправить повторно'}
        </button>
      </div>

      <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          Не пришло письмо? Проверьте папку "Спам" или запросите код повторно
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationStep;