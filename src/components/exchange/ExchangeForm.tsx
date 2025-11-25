import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ExchangeFormProps {
  usdtAmount: string;
  btcAmount: string;
  usdtBalance: number;
  btcBalance: number;
  onUsdtToBtcChange: (value: string) => void;
  onBtcToUsdtChange: (value: string) => void;
  onExchangeUsdtToBtc: () => void;
  onExchangeBtcToUsdt: () => void;
  loading: boolean;
  btcPrice: number;
}

export const ExchangeForm = ({
  usdtAmount,
  btcAmount,
  usdtBalance,
  btcBalance,
  onUsdtToBtcChange,
  onBtcToUsdtChange,
  onExchangeUsdtToBtc,
  onExchangeBtcToUsdt,
  loading,
  btcPrice
}: ExchangeFormProps) => {
  const usdtCommission = parseFloat(usdtAmount) ? (parseFloat(usdtAmount) * 0.005).toFixed(2) : '0.00';
  const btcCommission = parseFloat(btcAmount) ? (parseFloat(btcAmount) * btcPrice * 0.005).toFixed(2) : '0.00';

  return (
    <Card className="p-6">
      <Tabs defaultValue="usdt-to-btc" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="usdt-to-btc">
            <Icon name="ArrowRight" size={16} className="mr-2" />
            USDT → BTC
          </TabsTrigger>
          <TabsTrigger value="btc-to-usdt">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            BTC → USDT
          </TabsTrigger>
        </TabsList>

        <TabsContent value="usdt-to-btc" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usdt-amount">Сумма в USDT</Label>
            <div className="relative">
              <Input
                id="usdt-amount"
                type="number"
                placeholder="0.00"
                value={usdtAmount}
                onChange={(e) => onUsdtToBtcChange(e.target.value)}
                disabled={loading}
                min="0"
                step="0.01"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                USDT
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Доступно: <span className="text-primary font-semibold">{usdtBalance.toFixed(2)} USDT</span>
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="ArrowDown" size={20} className="text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Вы получите (BTC)</Label>
            <div className="relative">
              <Input
                type="text"
                value={btcAmount}
                disabled
                className="bg-muted/50"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                BTC
              </div>
            </div>
          </div>

          <Card className="p-4 bg-muted/30 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Комиссия (0.5%):</span>
              <span className="font-semibold">{usdtCommission} USDT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Курс BTC:</span>
              <span className="font-semibold">${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Минимальная сумма обмена: <span className="text-primary font-semibold">10 USDT</span>
              </p>
            </div>
          </Card>

          <Button
            onClick={onExchangeUsdtToBtc}
            disabled={loading || !usdtAmount || parseFloat(usdtAmount) <= 0}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Обмен...
              </>
            ) : (
              <>
                <Icon name="Repeat" size={18} className="mr-2" />
                Обменять USDT на BTC
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="btc-to-usdt" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="btc-amount">Сумма в BTC</Label>
            <div className="relative">
              <Input
                id="btc-amount"
                type="number"
                placeholder="0.00000000"
                value={btcAmount}
                onChange={(e) => onBtcToUsdtChange(e.target.value)}
                disabled={loading}
                min="0"
                step="0.00000001"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                BTC
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Доступно: <span className="text-primary font-semibold">{btcBalance.toFixed(8)} BTC</span>
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="ArrowDown" size={20} className="text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Вы получите (USDT)</Label>
            <div className="relative">
              <Input
                type="text"
                value={usdtAmount}
                disabled
                className="bg-muted/50"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                USDT
              </div>
            </div>
          </div>

          <Card className="p-4 bg-muted/30 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Комиссия (0.5%):</span>
              <span className="font-semibold">{btcCommission} USDT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Курс BTC:</span>
              <span className="font-semibold">${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Минимальная сумма обмена: <span className="text-primary font-semibold">0.0001 BTC</span>
              </p>
            </div>
          </Card>

          <Button
            onClick={onExchangeBtcToUsdt}
            disabled={loading || !btcAmount || parseFloat(btcAmount) <= 0}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Обмен...
              </>
            ) : (
              <>
                <Icon name="Repeat" size={18} className="mr-2" />
                Обменять BTC на USDT
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
