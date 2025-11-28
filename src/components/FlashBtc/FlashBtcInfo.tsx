import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const FlashBtcInfo = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <Card className="p-4 sm:p-6 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={20} className="text-orange-400 sm:w-6 sm:h-6" />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-bold text-base sm:text-lg md:text-xl">Что такое Flash BTC?</h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              Flash BTC — это точная копия оригинального Bitcoin, которая ничем не отличается от настоящего BTC. 
              Токены работают во всех кошельках, биржах и сервисах, поддерживающих Bitcoin. 
              Единственное отличие — срок действия составляет 42 дня с момента получения, 
              после чего токены автоматически исчезают из сети.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            icon: 'Copy',
            title: '100% идентичен BTC',
            description: 'Полная копия оригинального Bitcoin без каких-либо отличий'
          },
          {
            icon: 'Clock',
            title: 'Срок действия 42 дня',
            description: 'Токены работают 42 дня, затем автоматически удаляются'
          },
          {
            icon: 'Wallet',
            title: 'Любые кошельки',
            description: 'Поддержка всех Bitcoin кошельков и адресов'
          },
          {
            icon: 'TrendingUp',
            title: 'Биржи и P2P',
            description: 'Используйте на всех платформах как обычный BTC'
          }
        ].map((feature, index) => (
          <Card 
            key={index}
            className="p-3 sm:p-4 md:p-5 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent hover:from-orange-500/10 transition-all duration-300"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon as any} size={16} className="text-orange-400 sm:w-5 sm:h-5" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base">{feature.title}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};