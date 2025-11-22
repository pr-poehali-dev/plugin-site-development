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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Доступные пакеты</h2>
          <p className="text-muted-foreground">Выберите количество Flash USDT для покупки</p>
        </div>
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-lg px-4 py-2">
          Скидка 80%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
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

            <div className={`bg-gradient-to-br ${pkg.color} p-6 text-white`}>
              <Icon name={pkg.icon as any} size={48} className="mb-4 opacity-80" />
              <h3 className="text-3xl font-bold mb-2">
                {pkg.amount.toLocaleString('ru-RU')}
              </h3>
              <p className="text-sm opacity-80">Flash USDT</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
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
                  <span className="text-2xl font-bold text-green-400">
                    ${pkg.price.toLocaleString('ru-RU')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-400" />
                  <span>Мгновенная активация</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-400" />
                  <span>120 дней использования</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-400" />
                  <span>Поддержка бирж и DEX</span>
                </div>
              </div>

              <Button
                onClick={() => onPurchase(pkg)}
                className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90`}
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
