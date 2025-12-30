import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FlashBtcHeaderProps {
  onTestPurchase: () => void;
}

export const FlashBtcHeader = ({ onTestPurchase }: FlashBtcHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-yellow-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 space-y-8">
        {/* Header section */}
        <div className="space-y-4">
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-sm font-medium px-4 py-1.5">
            <Icon name="Zap" size={16} className="mr-2" />
            Специальное предложение
          </Badge>
          
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent leading-tight">
              Flash BTC
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Временный Bitcoin со скидкой до 86%
            </p>
          </div>

          {/* Info badge */}
          <div className="inline-flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
            <Icon name="Bitcoin" size={24} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-orange-300">Полная копия BTC на 42 дня</p>
              <p className="text-xs text-muted-foreground mt-1">Работает на всех площадках и биржах</p>
            </div>
          </div>

          <Button
            onClick={onTestPurchase}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl shadow-orange-500/30 text-base font-semibold px-8 py-6 rounded-2xl"
            size="lg"
          >
            <Icon name="TestTube" size={20} className="mr-2" />
            Тестовая покупка — 0.001 BTC
          </Button>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/10 rounded-xl">
                <Icon name="Percent" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold">Скидка</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">до 86%</p>
            <p className="text-sm text-muted-foreground mt-2">от рыночной цены</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-amber-500/10 hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Icon name="Package" size={24} className="text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold">Минимум</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">1 BTC</p>
            <p className="text-sm text-muted-foreground mt-2">Flash Bitcoin</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-500/10 rounded-xl">
                <Icon name="Clock" size={24} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold">Срок жизни</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">42 дн</p>
            <p className="text-sm text-muted-foreground mt-2">после активации</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
