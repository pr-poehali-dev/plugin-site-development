import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export interface Package {
  id: number;
  amount: number;
  price: number;
  discount: string;
  color: string;
  borderColor: string;
  icon: string;
  popular: boolean;
  soldOut?: boolean;
}

interface FlashBtcPackagesProps {
  packages: Package[];
  onPurchase: (pkg: Package) => void;
  selectedPackageId?: number | null;
}

export const FlashBtcPackages = ({ packages, onPurchase, selectedPackageId }: FlashBtcPackagesProps) => {
  const getGradientColors = (id: number) => {
    const colors = {
      1: { from: 'from-orange-500/20', to: 'to-amber-500/20', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' },
      2: { from: 'from-amber-500/20', to: 'to-yellow-500/20', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
      3: { from: 'from-yellow-500/20', to: 'to-orange-500/20', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/20' },
      4: { from: 'from-red-500/20', to: 'to-orange-500/20', border: 'border-red-500/30', glow: 'shadow-red-500/20' },
    };
    return colors[id as keyof typeof colors] || colors[1];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Выберите пакет</h2>
          <p className="text-muted-foreground mt-1">Доступно для покупки</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => {
          const colors = getGradientColors(pkg.id);
          const isDisabled = pkg.soldOut;
          
          return (
            <Card 
              key={pkg.id}
              className={`relative overflow-hidden transition-all duration-500 group ${
                isDisabled ? 'opacity-60' : 'hover:-translate-y-2 hover:shadow-2xl cursor-pointer'
              } ${colors.border} border-2 ${!isDisabled && colors.glow}`}
            >
              {/* Badges */}
              {pkg.soldOut && (
                <div className="absolute top-3 right-3 z-20">
                  <Badge className="bg-red-500/90 text-white backdrop-blur-sm text-xs px-3 py-1 shadow-lg">
                    <Icon name="X" size={14} className="mr-1" />
                    Продано
                  </Badge>
                </div>
              )}
              {pkg.popular && !pkg.soldOut && (
                <div className="absolute top-3 right-3 z-20">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-black backdrop-blur-sm text-xs px-3 py-1 font-bold shadow-lg">
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    Популярный
                  </Badge>
                </div>
              )}

              {/* Header with gradient */}
              <div className={`relative bg-gradient-to-br ${colors.from} ${colors.to} p-8 border-b ${colors.border}`}>
                <div className="absolute inset-0 bg-grid-white/5"></div>
                <div className="relative z-10 text-center space-y-3">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${colors.from} ${colors.to} ${colors.border} border-2`}>
                    <Icon name={pkg.icon as any} size={32} className="text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                      {pkg.amount}
                    </h3>
                    <p className="text-sm text-white/70 mt-1">Flash BTC</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Price section */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Номинал:</span>
                    <span className="text-lg line-through text-muted-foreground">
                      ${(pkg.amount * 100000).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">Скидка:</span>
                    <Badge variant="destructive" className="text-sm px-3 py-1">{pkg.discount}</Badge>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-baseline justify-between">
                      <span className="text-base font-semibold">Ваша цена:</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                        ${pkg.price.toLocaleString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Zap" size={16} className="text-orange-400" />
                    <span>Мгновенная доставка</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Clock" size={16} className="text-amber-400" />
                    <span>42 дня использования</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Bitcoin" size={16} className="text-yellow-400" />
                    <span>Полная копия BTC</span>
                  </div>
                </div>

                {/* Action button */}
                {pkg.soldOut ? (
                  <Button disabled className="w-full" size="lg">
                    <Icon name="X" size={18} className="mr-2" />
                    Распродано
                  </Button>
                ) : (
                  <Button 
                    onClick={() => onPurchase(pkg)} 
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg"
                    size="lg"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить пакет
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
