import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <Icon name="Info" size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">О нас</h1>
          <p className="text-sm text-muted-foreground">Git Crypto — надежный партнер в мире криптовалют</p>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Icon name="Award" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Более 8 лет на рынке криптовалют</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Git Crypto — это команда профессионалов с многолетним опытом работы в сфере блокчейн-технологий 
              и криптовалют. С 2016 года мы успешно развиваемся и помогаем нашим клиентам достигать их целей 
              в быстро меняющемся мире цифровых активов.
            </p>
            <div className="flex items-start gap-3 mt-4 pt-4 border-t border-primary/20">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                <Icon name="MapPin" size={20} className="text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">Наше расположение</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Компания Git Crypto базируется в Макао, Китай — одном из ведущих финансовых и технологических 
                  центров Азии. Наш офис расположен в специальной экономической зоне: провинция Гуандун, 
                  город Чжухай, остров Малый Хэнцинь (Small Hengqin Island). Это стратегическое расположение 
                  позволяет нам быть в эпицентре инноваций в сфере блокчейна и криптовалют, а также обеспечивает 
                  доступ к передовым технологиям и высококвалифицированным специалистам региона.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
              <Icon name="Search" size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Исследования и анализ</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Мы постоянно изучаем новые блокчейн-проекты, анализируем рынок криптовалют и отслеживаем 
            последние тенденции в индустрии. Наша исследовательская команда изучает перспективные 
            технологии, проводит аудит смарт-контрактов и оценивает потенциал новых криптоактивов. 
            Это позволяет нам предоставлять клиентам актуальную информацию и надежные решения.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
              <Icon name="Code" size={20} className="text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Разработка смарт-контрактов</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Специализируемся на создании и внедрении смарт-контрактов для различных блокчейн-платформ. 
            Наши разработчики имеют глубокие знания Solidity, Web3 и других технологий децентрализованных 
            приложений. Мы создаем надежные, безопасные и оптимизированные смарт-контракты для DeFi-проектов, 
            NFT-платформ, DAO и других криптовалютных решений.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
              <Icon name="TrendingUp" size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Криптовалютная деятельность</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Активно участвуем в криптовалютной экосистеме: торгуем цифровыми активами, участвуем в стейкинге 
            и майнинге, инвестируем в перспективные блокчейн-проекты. Наш опыт позволяет понимать реальные 
            потребности рынка и создавать продукты, которые действительно нужны криптосообществу. Мы работаем 
            с различными блокчейнами: Ethereum, BSC, Polygon, Solana и другими.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
              <Icon name="Shield" size={20} className="text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Безопасность и надежность</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Безопасность наших клиентов — наш главный приоритет. Мы используем проверенные методы защиты 
            данных, многофакторную аутентификацию и регулярно проводим аудит безопасности наших систем. 
            За 8 лет работы мы построили репутацию надежной компании, которой доверяют тысячи пользователей. 
            Каждая транзакция защищена, каждый смарт-контракт протестирован.
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
            <Icon name="Users" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3">Наши услуги</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Flash USDT</p>
                  <p className="text-sm text-muted-foreground">
                    Инновационное решение для быстрых транзакций с минимальными комиссиями
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Гарант-сервис</p>
                  <p className="text-sm text-muted-foreground">
                    Безопасные сделки между пользователями с использованием эскроу смарт-контрактов
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Разработка смарт-контрактов</p>
                  <p className="text-sm text-muted-foreground">
                    Создание надежных и эффективных смарт-контрактов под ваши задачи
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Консультации и обучение</p>
                  <p className="text-sm text-muted-foreground">
                    Помогаем разобраться в криптовалютах и блокчейн-технологиях
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
            <Icon name="Target" size={24} className="text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Наша миссия</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Мы стремимся сделать мир криптовалют доступным и безопасным для каждого. Наша цель — 
              предоставлять качественные услуги, которые помогают людям и бизнесу эффективно работать 
              с цифровыми активами. Мы верим в будущее децентрализованных технологий и активно 
              способствуем их развитию.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              За 8 лет работы мы накопили огромный опыт, построили сильную команду специалистов и 
              завоевали доверие тысяч клиентов. Мы продолжаем развиваться, внедрять новые технологии 
              и расширять спектр наших услуг, чтобы оставаться на передовой криптоиндустрии.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold mb-1">8+</p>
          <p className="text-xs text-muted-foreground">Лет на рынке</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" size={20} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold mb-1">10K+</p>
          <p className="text-xs text-muted-foreground">Клиентов</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="FileCode" size={20} className="text-green-400" />
          </div>
          <p className="text-2xl font-bold mb-1">500+</p>
          <p className="text-xs text-muted-foreground">Смарт-контрактов</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Shield" size={20} className="text-purple-400" />
          </div>
          <p className="text-2xl font-bold mb-1">100%</p>
          <p className="text-xs text-muted-foreground">Безопасность</p>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Icon name="Rocket" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Присоединяйтесь к нам</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Станьте частью растущего сообщества Git Crypto. Мы предлагаем выгодные условия для 
              новых пользователей, реферальную программу с щедрыми бонусами и круглосуточную 
              поддержку. Начните свой путь в криптовалютах с надежным партнером, который имеет 
              многолетний опыт и безупречную репутацию.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                <Icon name="Zap" size={14} className="inline mr-1" />
                Быстрые транзакции
              </div>
              <div className="px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                <Icon name="Lock" size={14} className="inline mr-1" />
                Максимальная безопасность
              </div>
              <div className="px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                <Icon name="Headphones" size={14} className="inline mr-1" />
                24/7 Поддержка
              </div>
              <div className="px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                <Icon name="Gift" size={14} className="inline mr-1" />
                Бонусы и акции
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;