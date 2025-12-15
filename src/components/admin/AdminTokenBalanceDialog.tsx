import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface AdminTokenBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number;
  username: string;
  tokenSymbol: string;
  currentBalance: number;
  onSubmit: (action: 'add' | 'subtract', amount: number) => Promise<void>;
}

const AdminTokenBalanceDialog = ({
  open,
  onOpenChange,
  username,
  tokenSymbol,
  currentBalance,
  onSubmit
}: AdminTokenBalanceDialogProps) => {
  const [action, setAction] = useState<'add' | 'subtract'>('add');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(action, amountNum);
      setAmount('');
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getTokenColor = (symbol: string) => {
    switch (symbol) {
      case 'USDT': return 'text-emerald-500';
      case 'BTC': return 'text-orange-500';
      case 'ETH': return 'text-blue-500';
      case 'TRX': return 'text-red-500';
      case 'TON': return 'text-cyan-500';
      case 'SOL': return 'text-purple-500';
      default: return 'text-foreground';
    }
  };

  const getPrecision = (symbol: string) => {
    switch (symbol) {
      case 'BTC': return 8;
      case 'ETH': return 6;
      case 'SOL': return 4;
      default: return 2;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Coins" size={24} className={getTokenColor(tokenSymbol)} />
            Управление {tokenSymbol} токенами
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-card/50 rounded-lg p-4 border border-border/50">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Пользователь:</span>
                <span className="font-medium">{username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Текущий баланс:</span>
                <span className={`font-bold ${getTokenColor(tokenSymbol)}`}>
                  {currentBalance.toFixed(getPrecision(tokenSymbol))} {tokenSymbol}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                variant={action === 'add' ? 'default' : 'outline'}
                onClick={() => setAction('add')}
                className="flex-1"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Пополнить
              </Button>
              <Button
                variant={action === 'subtract' ? 'default' : 'outline'}
                onClick={() => setAction('subtract')}
                className="flex-1"
              >
                <Icon name="Minus" size={16} className="mr-2" />
                Списать
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Сумма {tokenSymbol}
              </label>
              <Input
                type="number"
                step={getPrecision(tokenSymbol) === 8 ? '0.00000001' : getPrecision(tokenSymbol) === 6 ? '0.000001' : '0.01'}
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Введите сумму ${tokenSymbol}`}
                className="w-full"
              />
            </div>

            {action === 'add' && amount && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p className="text-sm text-green-500">
                  Новый баланс: {(currentBalance + parseFloat(amount || '0')).toFixed(getPrecision(tokenSymbol))} {tokenSymbol}
                </p>
              </div>
            )}

            {action === 'subtract' && amount && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-500">
                  Новый баланс: {Math.max(0, currentBalance - parseFloat(amount || '0')).toFixed(getPrecision(tokenSymbol))} {tokenSymbol}
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            className="w-full"
          >
            {isLoading ? 'Обработка...' : action === 'add' ? 'Пополнить баланс' : 'Списать с баланса'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminTokenBalanceDialog;
