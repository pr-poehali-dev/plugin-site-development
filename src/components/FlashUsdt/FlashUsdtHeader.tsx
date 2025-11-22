import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FlashUsdtHeaderProps {
  onTestPurchase: () => void;
}

export const FlashUsdtHeader = ({ onTestPurchase }: FlashUsdtHeaderProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-800/20 via-yellow-900/10 to-background border border-yellow-800/30 rounded-2xl p-8 md:p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          <Icon name="Zap" size={16} className="mr-1" />
          Специальное предложение
        </Badge>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Flash USDT Token
            </h1>
            <p className="text-xl text-muted-foreground">
              Временный токен TRC20 со скидкой 80% от номинала
            </p>
          </div>
          <Button
            onClick={onTestPurchase}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg shadow-blue-500/30 whitespace-nowrap"
            size="lg"
          >
            <Icon name="CircleDollarSign" size={20} className="mr-2" />
            Купить тестовую сумму (100 USDT)
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur border-yellow-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Percent" size={24} className="text-yellow-400" />
              <h3 className="text-lg font-semibold">Цена</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">20%</p>
            <p className="text-sm text-muted-foreground mt-1">от номинальной стоимости</p>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur border-yellow-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="ShoppingCart" size={24} className="text-yellow-400" />
              <h3 className="text-lg font-semibold">Минимум</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">100,000</p>
            <p className="text-sm text-muted-foreground mt-1">Flash USDT к покупке</p>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur border-yellow-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Clock" size={24} className="text-yellow-400" />
              <h3 className="text-lg font-semibold">Срок жизни</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">120 дней</p>
            <p className="text-sm text-muted-foreground mt-1">после покупки</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
