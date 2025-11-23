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
}

interface FlashUsdtPackagesProps {
  packages: Package[];
  onPurchase: (pkg: Package) => void;
  selectedPackageId?: number | null;
}

export const FlashUsdtPackages = ({ packages, onPurchase, selectedPackageId }: FlashUsdtPackagesProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Доступные пакеты</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Выберите количество Flash USDT для покупки</p>
        </div>
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-sm sm:text-base md:text-lg px-3 sm:px-4 py-1.5 sm:py-2">
          Скидка 80%
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative overflow-hidden transition-all duration-300 sm:hover:scale-105 ${
              pkg.popular ? 'ring-2 ring-yellow-500/50' : ''
            } ${selectedPackageId === pkg.id ? 'ring-2 ring-green-500/50' : ''} ${pkg.borderColor}`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="bg-yellow-500 text-black rounded-tl-none rounded-br-none">
                  <Icon name="Star" size={14} className="mr-1" />
                  Популярный
                </Badge>
              </div>
            )}

            <div className={`bg-gradient-to-br ${pkg.color} p-4 sm:p-5 md:p-6 text-white`}>
              <Icon name={pkg.icon as any} size={36} className="mb-3 sm:mb-4 opacity-80 sm:w-12 sm:h-12" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                {pkg.amount.toLocaleString('ru-RU')}
              </h3>
              <p className="text-xs sm:text-sm opacity-80">Flash USDT</p>
            </div>

            <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Номинал:</span>
                  <span className="font-semibold line-through text-muted-foreground">
                    ${pkg.amount.toLocaleString('ru-RU')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Скидка:</span>
                  <Badge variant="destructive">{pkg.discount}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-semibold">Ваша цена:</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-400">
                    ${pkg.price.toLocaleString('ru-RU')}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={12} className="text-green-400 sm:w-[14px] sm:h-[14px]" />
                  <span>Мгновенная активация</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={12} className="text-green-400 sm:w-[14px] sm:h-[14px]" />
                  <span>120 дней использования</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={12} className="text-green-400 sm:w-[14px] sm:h-[14px]" />
                  <span>Поддержка бирж и DEX</span>
                </div>
              </div>

              <Button
                onClick={() => onPurchase(pkg)}
                className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 text-sm sm:text-base`}
              >
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Купить
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};