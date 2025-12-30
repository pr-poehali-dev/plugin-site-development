import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FlashUsdtHeaderProps {
  onTestPurchase: () => void;
}

export const FlashUsdtHeader = ({ onTestPurchase }: FlashUsdtHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 space-y-8">
        {/* Header section */}
        <div className="space-y-4">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-sm font-medium px-4 py-1.5">
            <Icon name="Zap" size={16} className="mr-2" />
            Специальное предложение
          </Badge>
          
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
              Flash USDT
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Временный токен TRC20 со скидкой до 84%
            </p>
          </div>

          {/* Contract info */}
          <div className="inline-flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 backdrop-blur-sm">
            <Icon name="Shield" size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-300">Прокси-контракт USDT TRC20</p>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="text-xs text-emerald-400 bg-black/30 px-3 py-1.5 rounded-lg font-mono">
                  TR7NHq...gjLj6t
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors p-1.5 hover:bg-blue-500/10 rounded-lg"
                  title="Скопировать адрес контракта"
                >
                  <Icon name="Copy" size={16} />
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={onTestPurchase}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/30 text-base font-semibold px-8 py-6 rounded-2xl"
            size="lg"
          >
            <Icon name="TestTube" size={20} className="mr-2" />
            Тестовая покупка — 100 USDT
          </Button>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <Icon name="Percent" size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold">Скидка</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">до 84%</p>
            <p className="text-sm text-muted-foreground mt-2">от номинала</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-xl">
                <Icon name="Package" size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold">Минимум</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">100K</p>
            <p className="text-sm text-muted-foreground mt-2">Flash USDT</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-teal-500/10 hover:border-teal-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-teal-500/10 rounded-xl">
                <Icon name="Clock" size={24} className="text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold">Срок жизни</h3>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">120 дн</p>
            <p className="text-sm text-muted-foreground mt-2">после активации</p>
          </Card>
        </div>
      </div>
    </div>
  );
};