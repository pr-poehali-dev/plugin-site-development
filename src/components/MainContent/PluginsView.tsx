import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  return (
    <>
      {activeCategory !== 'all' && (
        <div className="mb-4 sm:mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {activeCategory === 'new' ? 'Новинки' : 
             activeCategory === 'popular' ? 'Популярное' :
             categories.find(c => c.slug === activeCategory)?.name || 'Плагины'}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {filteredPlugins.length} {filteredPlugins.length === 1 ? 'плагин' : 'плагинов'}
          </p>
        </div>
      )}

      {activeCategory === 'all' ? (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-scale-in">
          <div className="relative overflow-hidden bg-gradient-to-br from-green-800/20 via-teal-800/10 to-cyan-900/10 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-green-600/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon name="GitBranch" size={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    GIT CRYPTO
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Криптовалютное сообщество</p>
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-foreground/90 mb-4 sm:mb-6 leading-relaxed">
                Добро пожаловать в <span className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent font-bold">GIT CRYPTO</span> — сообщество энтузиастов, 
                увлечённых миром стейблкоинов и криптовалют. Сообщество создано с целью изучения информационной 
                безопасности в сфере криптовалют. Здесь мы обсуждаем всё, что связано с USDT: 
                от технических аспектов работы с различными блокчейн-сетями до практических советов 
                по безопасному хранению и использованию цифровых активов.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="bg-background/50 backdrop-blur-sm border border-green-800/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-green-700/40 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageSquare" size={14} className="text-green-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold">Обсуждения</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                    Делитесь опытом работы с USDT, задавайте вопросы и находите единомышленников
                  </p>
                </div>

                <div className="bg-background/50 backdrop-blur-sm border border-green-800/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-green-700/40 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="ShieldCheck" size={16} className="text-green-400 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold">Гарант-сервис</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                    Наша платформа предоставляет услуги гарант-сервиса для безопасных сделок
                  </p>
                </div>

                <div className="bg-background/50 backdrop-blur-sm border border-green-800/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-green-700/40 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Shield" size={16} className="text-green-400 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold">Безопасность</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                    Узнайте о лучших практиках защиты ваших криптоактивов и безопасных транзакциях
                  </p>
                </div>

                <div className="bg-background/50 backdrop-blur-sm border border-green-800/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-green-700/40 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="TrendingUp" size={16} className="text-green-400 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold">Новости</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                    Следите за последними обновлениями, трендами и изменениями в мире криптовалют
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-800/10 border border-green-800/20 rounded-lg">
                  <Icon name="Check" size={14} className="text-green-400 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">TRC20 / ERC20</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-800/10 border border-green-800/20 rounded-lg">
                  <Icon name="Check" size={14} className="text-green-400 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">DeFi & Стейблкоины</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-800/10 border border-green-800/20 rounded-lg">
                  <Icon name="Check" size={14} className="text-green-400 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">P2P торговля</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-800/10 border border-green-800/20 rounded-lg">
                  <Icon name="Check" size={14} className="text-green-400 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Кошельки & Биржи</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Compass" size={24} className="text-primary" />
              Начните с форума
            </h2>
            <p className="text-muted-foreground mb-4">
              Перейдите в раздел <span className="text-green-400 font-medium">Форум</span> в боковом меню, 
              чтобы присоединиться к обсуждениям, задать вопросы или поделиться своим опытом работы с USDT и другими криптовалютами.
            </p>
            <Button 
              onClick={onNavigateToForum}
              className="bg-gradient-to-r from-green-800 to-green-900 hover:from-green-700 hover:to-green-800"
            >
              <Icon name="MessageSquare" size={18} className="mr-2" />
              Перейти к форуму
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {sortPlugins('newest').map((plugin, index) => (
            <div
              key={plugin.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer group animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${plugin.gradient_from}, ${plugin.gradient_to})`
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {plugin.status === 'premium' && (
                          <Badge variant="default" className="bg-primary">
                            СБОРКА
                          </Badge>
                        )}
                        {plugin.status === 'new' && (
                          <Badge variant="secondary" className="bg-accent">
                            НОВЫЙ
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                        {plugin.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {plugin.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Icon name="Download" size={14} />
                        <span>{plugin.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                        <span>{plugin.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        <span>{new Date(plugin.created_at).toLocaleDateString('ru')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {plugin.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};