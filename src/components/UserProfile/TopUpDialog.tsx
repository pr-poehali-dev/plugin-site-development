import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface TopUpDialogProps {
  open: boolean;
  isLoading: boolean;
  topUpAmount: string;
  onOpenChange: (open: boolean) => void;
  onAmountChange: (amount: string) => void;
  onTopUp: () => void;
  onCardPayment?: (amount: number) => void;
}

const quickAmounts = [10, 50, 100, 500];

type PaymentMethod = 'crypto' | 'card';

export const TopUpDialog = ({
  open,
  isLoading,
  topUpAmount,
  onOpenChange,
  onAmountChange,
  onTopUp,
  onCardPayment
}: TopUpDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('crypto');

  const handlePayment = () => {
    if (paymentMethod === 'card' && onCardPayment) {
      onCardPayment(parseFloat(topUpAmount));
    } else {
      onTopUp();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Пополнение баланса</DialogTitle>
          <DialogDescription>
            Выберите способ оплаты и сумму
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Выбор способа оплаты */}
          <div className="space-y-2">
            <Label>Способ оплаты</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={paymentMethod === 'crypto' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('crypto')}
                className="h-12"
              >
                <Icon name="Bitcoin" size={18} className="mr-2" />
                Криптовалюта
              </Button>
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('card')}
                className="h-12"
              >
                <Icon name="CreditCard" size={18} className="mr-2" />
                Банковская карта
              </Button>
            </div>
          </div>

          {/* Быстрый выбор суммы */}
          <div className="grid grid-cols-2 gap-3">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => onAmountChange(amount.toString())}
                className="h-16 text-lg font-semibold"
              >
                {amount} USDT
              </Button>
            ))}
          </div>

          {/* Ввод своей суммы */}
          <div className="space-y-2">
            <Label htmlFor="amount">Другая сумма</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Введите сумму"
              value={topUpAmount}
              onChange={(e) => onAmountChange(e.target.value)}
              min="1"
              step="1"
            />
          </div>

          {/* Кнопка оплаты */}
          <Button 
            onClick={handlePayment}
            disabled={isLoading || !topUpAmount}
            className="w-full bg-gradient-to-r from-green-800 to-green-900 hover:from-green-700 hover:to-green-800"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Обработка...
              </>
            ) : (
              <>
                <Icon name={paymentMethod === 'card' ? 'CreditCard' : 'Bitcoin'} size={18} className="mr-2" />
                Пополнить на {topUpAmount || '0'} USDT
              </>
            )}
          </Button>

          {/* Описание способа оплаты */}
          <p className="text-xs text-muted-foreground text-center">
            {paymentMethod === 'crypto' 
              ? 'Откроется окно с адресом для перевода USDT' 
              : 'Вы будете перенаправлены на безопасную страницу оплаты'}
          </p>
          
          {paymentMethod === 'card' && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Принимаем карты Visa, Mastercard, Maestro европейских банков
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};