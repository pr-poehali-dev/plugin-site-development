import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface BtcPriceCardProps {
  btcPrice: number;
  priceChange: 'up' | 'down' | 'neutral';
  priceLoading: boolean;
}

export const BtcPriceCard = ({ btcPrice, priceChange, priceLoading }: BtcPriceCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
            <Icon name="Bitcoin" className="text-orange-500" size={28} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Курс BTC</p>
            {priceLoading ? (
              <div className="flex items-center gap-2">
                <Icon name="Loader2" size={18} className="animate-spin text-orange-500" />
                <p className="text-sm text-muted-foreground">Загрузка...</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className={`text-2xl font-bold transition-colors duration-300 ${
                  priceChange === 'up' ? 'text-green-500' : 
                  priceChange === 'down' ? 'text-red-500' : 
                  'text-foreground'
                }`}>
                  ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                {priceChange === 'up' && (
                  <Icon name="TrendingUp" size={20} className="text-green-500 animate-pulse" />
                )}
                {priceChange === 'down' && (
                  <Icon name="TrendingDown" size={20} className="text-red-500 animate-pulse" />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
