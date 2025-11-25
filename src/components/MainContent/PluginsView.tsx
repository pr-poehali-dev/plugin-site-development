import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Plugin, Category } from '@/types';

interface PluginsViewProps {
  activeCategory: string;
  plugins: Plugin[];
  categories: Category[];
  onNavigateToForum?: () => void;
}

export const PluginsView = ({
  activeCategory,
  plugins,
  categories,
  onNavigateToForum
}: PluginsViewProps) => {
  const filteredPlugins = plugins.filter(p => 
    activeCategory === 'all' || p.category_name === categories.find(c => c.slug === activeCategory)?.name
  );

  const sortPlugins = (sortBy: string) => {
    const sorted = [...filteredPlugins];
    if (sortBy === 'newest') sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (sortBy === 'popular') sorted.sort((a, b) => b.downloads - a.downloads);
    if (sortBy === 'rating') sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    return sorted;
  };

  const features = [
    {
      icon: 'MessageSquare',
      title: 'Форум сообщества',
      description: 'Активное криптовалютное сообщество для обсуждения USDT, блокчейн-технологий и обмена опытом',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      features: [
        'Создание тем и обсуждений',
        'Комментарии и ответы',
        'Система категорий',
        'Личные профили участников',
        'Система рангов и репутации'
      ]
    },
    {
      icon: 'Zap',
      title: 'Flash USDT',
      description: 'Магазин Flash USDT для всех популярных сетей — покупка и продажа стейблкоинов',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      features: [
        'Поддержка всех сетей (TRC20, ERC20, BEP20)',
        'Мгновенные транзакции',
        'Безопасные сделки',
        'Конкурентные цены',
        'История операций'
      ]
    },
    {
      icon: 'Gamepad2',
      title: 'Игровой центр',
      description: 'Казино с провably fair системой — честные игры с реальными выигрышами в USDT',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      features: [
        'Crash — ставки на растущий множитель',
        'Mines — сапёр с крипто-ставками',
        'Roulette — классическая рулетка',
        'Lottery — лотереи с джекпотами',
        'Провably fair алгоритмы'
      ]
    },
    {
      icon: 'ShieldCheck',
      title: 'Гарант-сервис',
      description: 'Безопасные сделки между пользователями с защитой от мошенничества',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      features: [
        'Создание защищённых сделок',
        'Эскроу-механизм',
        'Арбитраж споров',
        'История всех сделок',
        'Рейтинг участников'
      ]
    },
    {
      icon: 'ArrowLeftRight',
      title: 'Обменник',
      description: 'Внутренний обменник для конвертации валют и криптовалют',
      color: 'from-teal-500 to-green-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      features: [
        'Обмен USDT между сетями',
        'Конвертация в другие криптовалюты',
        'Актуальные курсы',
        'Низкие комиссии',
        'Мгновенные операции'
      ]
    },
    {
      icon: 'FileCode',
      title: 'Смарт-контракты',
      description: 'Площадка для работы со смарт-контрактами и DeFi',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      features: [
        'Создание смарт-контрактов',
        'Аудит контрактов',
        'Деплой в блокчейн',
        'Готовые шаблоны',
        'Консультации экспертов'
      ]
    },
    {
      icon: 'Mail',
      title: 'Личные сообщения',
      description: 'Приватное общение между пользователями платформы',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      features: [
        'Приватные чаты',
        'Отправка файлов',
        'Уведомления о новых сообщениях',
        'История переписки',
        'Блокировка пользователей'
      ]
    },
    {
      icon: 'Gift',
      title: 'Реферальная программа',
      description: 'Зарабатывайте, приглашая новых пользователей на платформу',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      features: [
        'Уникальная реферальная ссылка',
        'Комиссия с действий рефералов',
        'Статистика приглашённых',
        'Многоуровневая система',
        'Вывод заработка'
      ]
    },
    {
      icon: 'Wallet',
      title: 'Внутренний баланс',
      description: 'Удобная система управления балансом на платформе',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      features: [
        'Пополнение баланса',
        'Вывод средств',
        'История транзакций',
        'Автоматические расчёты',
        'Защита средств'
      ]
    },
    {
      icon: 'HelpCircle',
      title: 'Поддержка 24/7',
      description: 'Круглосуточная техническая поддержка и помощь пользователям',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      features: [
        'Система тикетов',
        'Быстрые ответы',
        'Квалифицированная помощь',
        'База знаний (FAQ)',
        'Отслеживание статуса заявки'
      ]
    },
    {
      icon: 'Bell',
      title: 'Умные уведомления',
      description: 'Не пропускайте важные события на платформе',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
      features: [
        'Push-уведомления в браузере',
        'Оповещения о новых сообщениях',
        'Уведомления о сделках',
        'Системные оповещения',
        'Настройка уведомлений'
      ]
    },
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Многоуровневая защита ваших данных и средств',
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      features: [
        'Шифрование данных',
        'Двухфакторная аутентификация',
        'Защита от DDoS атак',
        'Регулярные аудиты безопасности',
        'Резервное копирование'
      ]
    }
  ];

  const stats = [
    { icon: 'Users', value: '5000+', label: 'Активных пользователей' },
    { icon: 'MessageSquare', value: '10000+', label: 'Обсуждений на форуме' },
    { icon: 'Coins', value: '₮1M+', label: 'Объём транзакций' },
    { icon: 'TrendingUp', value: '99.9%', label: 'Время работы' }
  ];

  return (
    <>
      {activeCategory !== 'all' && (
        <div className="mb-3 sm:mb-4 md:mb-6 animate-slide-up">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
            {activeCategory === 'new' ? 'Новинки' : 
             activeCategory === 'popular' ? 'Популярное' :
             categories.find(c => c.slug === activeCategory)?.name || 'Плагины'}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            {filteredPlugins.length} {filteredPlugins.length === 1 ? 'плагин' : 'плагинов'}
          </p>
        </div>
      )}

      {activeCategory === 'all' ? (
        <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 animate-scale-in pb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-green-900/30 via-teal-900/20 to-cyan-900/30 border border-green-500/30 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-tr from-teal-500/20 to-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 md:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 animate-float">
                  <Icon name="GitBranch" className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent leading-tight mb-2">
                    GIT CRYPTO
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-green-400/80 font-semibold">
                    Криптовалютное сообщество и платформа для работы с USDT
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
                  Добро пожаловать в <span className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent font-bold">GIT CRYPTO</span> — 
                  полнофункциональную платформу для работы со стейблкоинами и криптовалютами. 
                  Мы создали экосистему, объединяющую все необходимые инструменты для безопасной работы с цифровыми активами.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                  {stats.map((stat, index) => (
                    <Card key={index} className="bg-background/60 backdrop-blur-sm border-green-500/20 p-3 md:p-4 text-center hover:border-green-500/40 transition-all hover:scale-105">
                      <Icon name={stat.icon as any} className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-green-400 mb-1">{stat.value}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6 md:mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 md:mb-3 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                Возможности платформы
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Всё необходимое для работы с криптовалютами в одном месте
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`${feature.bgColor} backdrop-blur-sm border ${feature.borderColor} p-5 md:p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon name={feature.icon as any} className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-3 border-t border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Основные функции:</p>
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                        <span className="text-foreground/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-xl p-6 md:p-8 text-center">
            <Icon name="Rocket" className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-green-400" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Готовы начать?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к нашему сообществу, участвуйте в обсуждениях, 
              совершайте безопасные сделки и используйте все возможности платформы
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                onClick={onNavigateToForum}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                <Icon name="MessageSquare" className="mr-2" size={20} />
                Перейти на форум
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-green-500/50 hover:bg-green-500/10 w-full sm:w-auto"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Icon name="ArrowUp" className="mr-2" size={20} />
                Вернуться наверх
              </Button>
            </div>
          </div>

          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="ShieldCheck" className="text-green-400" size={24} />
              Безопасность и надёжность
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Icon name="Lock" size={16} className="text-green-400" />
                  Защита данных
                </h4>
                <p className="text-xs text-muted-foreground">
                  Все данные пользователей шифруются и хранятся на защищённых серверах. 
                  Мы используем современные протоколы безопасности для защиты вашей информации.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Icon name="ShieldAlert" size={16} className="text-green-400" />
                  Защита сделок
                </h4>
                <p className="text-xs text-muted-foreground">
                  Гарант-сервис и эскроу-система обеспечивают безопасность всех финансовых операций. 
                  Ваши средства защищены до завершения сделки.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-green-400" />
                  Мониторинг безопасности
                </h4>
                <p className="text-xs text-muted-foreground">
                  Круглосуточный мониторинг подозрительной активности и автоматическая защита от DDoS атак. 
                  Система безопасности работает 24/7.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Icon name="UserCheck" size={16} className="text-green-400" />
                  Верификация пользователей
                </h4>
                <p className="text-xs text-muted-foreground">
                  Система верификации и рейтингов помогает выявить надёжных участников сообщества. 
                  Репутация пользователей формируется на основе их активности.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {sortPlugins('newest').map((plugin, index) => (
            <div
              key={plugin.id}
              className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-5 hover:border-primary/50 transition-all duration-200 cursor-pointer animate-slide-up hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <h3 className="text-base sm:text-lg font-bold mb-2">{plugin.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">{plugin.description}</p>
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span>{plugin.downloads} загрузок</span>
                <span>⭐ {plugin.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
