import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TopUpDialogProps {
  open: boolean;
  isLoading: boolean;
  topUpAmount: string;
  onOpenChange: (open: boolean) => void;
  onAmountChange: (amount: string) => void;
  onTopUp: () => void;
}

const quickAmounts = [1000, 3500, 5000, 10000, 15000, 50000, 100000];

export const TopUpDialog = ({
  open,
  isLoading,
  topUpAmount,
  onOpenChange,
  onAmountChange,
  onTopUp
}: TopUpDialogProps) => {
  const [sliderValue, setSliderValue] = useState([parseFloat(topUpAmount) || 100]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onAmountChange(value[0].toString());
  };

  const handleQuickAmount = (amount: number) => {
    setSliderValue([amount]);
    onAmountChange(amount.toString());
  };

  const currentAmount = parseFloat(topUpAmount) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="space-y-4 pb-6">
          <DialogTitle className="text-3xl font-bold">
            Пополнение баланса
          </DialogTitle>
          <DialogDescription className="text-base">
            Выберите сумму для пополнения вашего баланса USDT
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Amount display and slider */}
          <div className="space-y-6">
            {/* Current amount display */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-8 text-center">
              <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                Сумма пополнения
              </Label>
              <div className="text-5xl font-bold text-foreground mb-2">
                {currentAmount.toLocaleString('ru-RU')}
              </div>
              <div className="text-2xl font-semibold text-primary">
                USDT
              </div>
              <div className="text-sm text-muted-foreground mt-4 pt-4 border-t border-primary/10">
                ≈ ${currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </div>
            </div>

            {/* Slider section */}
            <div className="space-y-6 rounded-xl bg-muted/30 p-6 border border-border">
              <div>
                <Label className="text-sm font-medium mb-4 block">
                  Точная сумма
                </Label>
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span className="font-medium">100</span>
                  <span className="font-medium">300,000</span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  min={100}
                  max={300000}
                  step={100}
                  className="w-full"
                />
              </div>
            </div>

            {/* Info block */}
            <div className="flex items-start gap-3 text-sm text-muted-foreground bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
              <Icon name="Info" size={18} className="shrink-0 mt-0.5 text-blue-500" />
              <div>
                <p className="font-medium text-foreground mb-1">Способ оплаты</p>
                <p className="text-xs">
                  После подтверждения откроется окно с адресом кошелька для перевода USDT (TRC-20)
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Quick amounts and button */}
          <div className="space-y-6">
            {/* Quick amounts */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">
                Быстрый выбор суммы
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => handleQuickAmount(amount)}
                    className={cn(
                      "h-24 flex flex-col items-center justify-center gap-2 text-base font-semibold transition-all",
                      currentAmount === amount 
                        ? "bg-primary text-primary-foreground border-primary shadow-md" 
                        : "hover:bg-muted hover:border-primary/50"
                    )}
                  >
                    <Icon 
                      name={amount >= 50000 ? "Trophy" : amount >= 10000 ? "Star" : "Coins"} 
                      size={24} 
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-bold">
                        {amount >= 1000 ? `${(amount / 1000)}K` : amount}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        USDT
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment button */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={onTopUp}
                disabled={isLoading || !topUpAmount || currentAmount < 100}
                size="lg"
                className="w-full h-16 text-lg font-bold"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Обработка платежа...
                  </>
                ) : (
                  <>
                    <Icon name="ArrowRight" size={20} className="mr-2" />
                    Пополнить на {currentAmount.toLocaleString('ru-RU')} USDT
                  </>
                )}
              </Button>
              
              {currentAmount < 100 && (
                <p className="text-xs text-center text-destructive">
                  Минимальная сумма пополнения: 100 USDT
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
