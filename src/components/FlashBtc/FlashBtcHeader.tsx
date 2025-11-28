import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FlashBtcHeaderProps {
  onTestPurchase: () => void;
}

export const FlashBtcHeader = ({ onTestPurchase }: FlashBtcHeaderProps) => {
  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-orange-900/10 border-orange-500/20 p-4 sm:p-6 md:p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-orange-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3 flex-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Icon name="Bitcoin" size={24} className="text-white sm:w-7 sm:h-7 md:w-10 md:h-10" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                Flash BTC
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Полная копия BTC на 42 дня</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5">
              <Icon name="Zap" size={12} className="mr-1 sm:mr-1.5 sm:w-3.5 sm:h-3.5" />
              Быстрая доставка
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5">
              <Icon name="Shield" size={12} className="mr-1 sm:mr-1.5 sm:w-3.5 sm:h-3.5" />
              Безопасно
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5">
              <Icon name="Clock" size={12} className="mr-1 sm:mr-1.5 sm:w-3.5 sm:h-3.5" />
              42 дня
            </Badge>
          </div>
        </div>

        <Button
          onClick={onTestPurchase}
          className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-800 hover:opacity-90 shadow-lg shadow-orange-500/20 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 h-auto"
        >
          <Icon name="TestTube" size={18} className="mr-2 sm:w-5 sm:h-5" />
          Тестовая покупка
        </Button>
      </div>
    </Card>
  );
};