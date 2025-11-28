import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const FlashBtcInfo = () => {
  const features = [
    {
      icon: 'Wallet',
      title: 'Любые кошельки',
      description: 'Поддержка всех популярных Bitcoin кошельков и адресов'
    },
    {
      icon: 'Network',
      title: 'Поддержка сетей',
      description: 'Bitcoin, Lightning Network и другие совместимые протоколы'
    },
    {
      icon: 'TrendingUp',
      title: 'Торговля',
      description: 'Используйте на биржах и P2P платформах'
    },
    {
      icon: 'Lock',
      title: 'Безопасность',
      description: 'Токены полностью имитируют поведение настоящего BTC'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {features.map((feature, index) => (
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
  );
};
