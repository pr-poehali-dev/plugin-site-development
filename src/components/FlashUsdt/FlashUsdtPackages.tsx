import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Warp } from '@paper-design/shaders-react';

export interface Package {
  id: number;
  amount: number;
  price: number;
  discount: string;
  color: string;
  borderColor: string;
  icon: string;
  popular: boolean;
}

interface FlashUsdtPackagesProps {
  packages: Package[];
  onPurchase: (pkg: Package) => void;
  selectedPackageId?: number | null;
}

export const FlashUsdtPackages = ({ packages, onPurchase, selectedPackageId }: FlashUsdtPackagesProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4 md:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">Доступные пакеты</h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Выберите количество Flash USDT</p>
        </div>
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs sm:text-sm md:text-base px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5">
          Скидка 76.6%
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {packages.map((pkg) => {
          const borderColors = [
            'border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/30',
            'border-2 border-cyan-500/60 shadow-lg shadow-cyan-500/30',
            'border-2 border-teal-500/60 shadow-lg shadow-teal-500/30',
            'border-2 border-blue-500/60 shadow-lg shadow-blue-500/30'
          ];
          const borderClass = borderColors[(pkg.id - 1) % borderColors.length];
          
          return (
          <Card 
            key={pkg.id}
            className={`relative overflow-hidden transition-all duration-300 sm:hover:scale-105 ${borderClass} ${
              pkg.popular ? 'ring-2 ring-yellow-500/50' : ''
            } ${selectedPackageId === pkg.id ? 'ring-2 ring-green-500/50' : ''}`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 z-10">
                <Badge className="bg-yellow-500 text-black rounded-tl-none rounded-br-none text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1">
                  <Icon name="Star" size={12} className="mr-0.5 sm:mr-1 sm:w-[14px] sm:h-[14px]" />
                  Популярный
                </Badge>
              </div>
            )}

            <div className="relative overflow-hidden">
              <div className="absolute inset-0">
                <Warp
                  style={{ height: '100%', width: '100%' }}
                  proportion={0.3 + (pkg.id * 0.05)}
                  softness={0.8 + (pkg.id * 0.1)}
                  distortion={0.15 + (pkg.id * 0.02)}
                  swirl={0.6 + (pkg.id * 0.05)}
                  swirlIterations={8 + pkg.id}
                  shape={pkg.id % 2 === 0 ? 'checks' : 'dots'}
                  shapeScale={0.08 + (pkg.id * 0.01)}
                  scale={1}
                  rotation={0}
                  speed={0.5}
                  colors={[
                    pkg.id === 1 ? 'hsl(160, 85%, 25%)' : pkg.id === 2 ? 'hsl(180, 90%, 30%)' : pkg.id === 3 ? 'hsl(170, 80%, 28%)' : 'hsl(190, 85%, 32%)',
                    pkg.id === 1 ? 'hsl(140, 90%, 45%)' : pkg.id === 2 ? 'hsl(185, 95%, 50%)' : pkg.id === 3 ? 'hsl(165, 85%, 48%)' : pkg.id === 4 ? 'hsl(200, 90%, 52%)' : 'hsl(175, 88%, 50%)',
                    pkg.id === 1 ? 'hsl(150, 100%, 35%)' : pkg.id === 2 ? 'hsl(175, 90%, 38%)' : pkg.id === 3 ? 'hsl(168, 88%, 36%)' : 'hsl(195, 92%, 40%)',
                    pkg.id === 1 ? 'hsl(155, 95%, 55%)' : pkg.id === 2 ? 'hsl(190, 100%, 60%)' : pkg.id === 3 ? 'hsl(172, 92%, 58%)' : 'hsl(205, 95%, 62%)'
                  ]}
                />
              </div>
              <div className="relative z-10 bg-black/70 p-3 sm:p-4 md:p-5 lg:p-6 text-white">
                <Icon name={pkg.icon as any} size={28} className="mb-2 sm:mb-3 md:mb-4 opacity-80 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 drop-shadow-lg" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 drop-shadow-lg">
                  {pkg.amount.toLocaleString('ru-RU')}
                </h3>
                <p className="text-[10px] sm:text-xs opacity-80">Flash USDT</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-3">
              <div className="mb-2 sm:mb-3">
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 w-full justify-center">
                  <Icon name="TrendingUp" size={10} className="mr-1 sm:w-3 sm:h-3" />
                  Подорожание из-за новогодних праздников
                </Badge>
              </div>
              
              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Номинал:</span>
                  <span className="text-xs sm:text-sm font-semibold line-through text-muted-foreground">
                    ${pkg.amount.toLocaleString('ru-RU')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Скидка:</span>
                  <Badge variant="destructive" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">{pkg.discount}</Badge>
                </div>
                <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t">
                  <span className="text-xs sm:text-sm font-semibold">Ваша цена:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                    ${pkg.price.toLocaleString('ru-RU')}
                  </span>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Icon name="Check" size={10} className="text-green-400 sm:w-3 sm:h-3" />
                  <span>Мгновенная активация</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Check" size={10} className="text-green-400 sm:w-3 sm:h-3" />
                  <span>120 дней использования</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Check" size={10} className="text-green-400 sm:w-3 sm:h-3" />
                  <span>Поддержка бирж и DEX</span>
                </div>
              </div>

              <Button
                onClick={() => onPurchase(pkg)}
                className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 text-xs sm:text-sm md:text-base py-2 sm:py-2.5`}
              >
                <Icon name="ShoppingCart" size={14} className="mr-1.5 sm:mr-2 sm:w-4 sm:h-4" />
                Купить
              </Button>
            </div>
          </Card>
        )}))}
      </div>
    </div>
  );
};