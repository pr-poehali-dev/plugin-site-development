import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WithdrawFormProps {
  btcBalance: number;
  withdrawAddress: string;
  withdrawAmount: string;
  onAddressChange: (address: string) => void;
  onAmountChange: (amount: string) => void;
  onWithdraw: () => void;
  loading: boolean;
}

export const WithdrawForm = ({
  btcBalance,
  withdrawAddress,
  withdrawAmount,
  onAddressChange,
  onAmountChange,
  onWithdraw,
  loading
}: WithdrawFormProps) => {
  const networkFee = 0.0001;
  const willReceive = parseFloat(withdrawAmount) ? (parseFloat(withdrawAmount) - networkFee).toFixed(8) : '0.00000000';

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-blue-500">Важная информация о выводе BTC</p>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>Минимальная сумма вывода: 0.001 BTC</li>
              <li>Комиссия сети: 0.0001 BTC</li>
              <li>Проверьте адрес перед отправкой</li>
              <li>Транзакции BTC необратимы</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="withdraw-address">BTC адрес получателя</Label>
          <Input
            id="withdraw-address"
            type="text"
            placeholder="bc1q..."
            value={withdrawAddress}
            onChange={(e) => onAddressChange(e.target.value)}
            disabled={loading}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Укажите корректный BTC адрес. Транзакция необратима!
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="withdraw-amount">Сумма вывода (BTC)</Label>
          <Input
            id="withdraw-amount"
            type="number"
            placeholder="0.00000000"
            value={withdrawAmount}
            onChange={(e) => onAmountChange(e.target.value)}
            disabled={loading}
            min="0"
            step="0.00000001"
          />
          <p className="text-xs text-muted-foreground">
            Доступно: <span className="text-primary font-semibold">{btcBalance.toFixed(8)} BTC</span>
          </p>
        </div>

        <Card className="p-4 bg-muted/30 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Сумма вывода:</span>
            <span className="font-semibold">{withdrawAmount || '0.00000000'} BTC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Комиссия сети:</span>
            <span className="font-semibold">{networkFee.toFixed(8)} BTC</span>
          </div>
          <div className="pt-2 border-t border-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Получатель получит:</span>
              <span className="font-bold text-primary">{willReceive} BTC</span>
            </div>
          </div>
        </Card>

        <Button
          onClick={onWithdraw}
          disabled={loading || !withdrawAddress || !withdrawAmount || parseFloat(withdrawAmount) <= 0}
          variant="default"
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
              Вывод...
            </>
          ) : (
            <>
              <Icon name="Send" size={18} className="mr-2" />
              Вывести BTC
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
