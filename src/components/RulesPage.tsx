import Icon from '@/components/ui/icon';

const RulesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-slide-up">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
          Правила сообщества
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Ознакомьтесь с правилами использования платформы GIT CRYPTO
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-6">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-800/20 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" className="text-green-400" size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-green-400">Правила форума</h2>
          </div>
          
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-400 font-bold">1</span>
              </div>
              <p className="text-foreground/90">
                <span className="font-semibold text-foreground">Взаимное уважение:</span> Общайтесь вежливо, избегайте оскорблений, угроз и агрессивного поведения по отношению к другим участникам
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-400 font-bold">2</span>
              </div>
              <p className="text-foreground/90">
                <span className="font-semibold text-foreground">Запрещён спам:</span> Не публикуйте повторяющиеся сообщения, рекламу сторонних ресурсов без согласования с администрацией
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-400 font-bold">3</span>
              </div>
              <p className="text-foreground/90">
                <span className="font-semibold text-foreground">Только легальный контент:</span> Запрещено обсуждение и распространение незаконных схем, мошеннических методов
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-400 font-bold">4</span>
              </div>
              <p className="text-foreground/90">
                <span className="font-semibold text-foreground">Релевантность тем:</span> Создавайте темы в соответствующих разделах, используйте осмысленные заголовки
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-green-400 font-bold">5</span>
              </div>
              <p className="text-foreground/90">
                <span className="font-semibold text-foreground">Запрет на флуд:</span> Избегайте бессмысленных сообщений, не засоряйте темы офтопиком
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-border pt-6">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-800/20 rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" className="text-cyan-400" size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-cyan-400">Правила игр</h2>
            </div>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-cyan-400 font-bold">1</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Честная игра:</span> Использование ботов, скриптов или эксплойтов для манипуляции игрой строго запрещено
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-cyan-400 font-bold">2</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Один аккаунт:</span> Каждому пользователю разрешён только один игровой аккаунт. Мультиаккаунтинг запрещён
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-cyan-400 font-bold">3</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Ответственная игра:</span> Играйте только на средства, которые готовы потерять. Администрация не несёт ответственность за ваши потери
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-cyan-400 font-bold">4</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Возрастные ограничения:</span> Участие в играх доступно только пользователям старше 18 лет
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-cyan-400 font-bold">5</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Споры:</span> В случае технических проблем или споров окончательное решение принимает администрация
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-border pt-6">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-800/20 rounded-lg flex items-center justify-center">
                <Icon name="ShieldCheck" className="text-orange-400" size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-orange-400">Правила гарант-сервиса</h2>
            </div>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-orange-400 font-bold">1</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Полное описание сделки:</span> Указывайте все детали сделки (сумма, условия, сроки) перед началом гарант-сервиса
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-orange-400 font-bold">2</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Проверка контрагента:</span> Изучите профиль, рейтинг и историю сделок партнёра перед началом сотрудничества
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-orange-400 font-bold">3</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Комиссия сервиса:</span> Гарант-сервис взимает комиссию за услуги, размер которой указывается при открытии сделки
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-orange-400 font-bold">4</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Соблюдение сроков:</span> Выполняйте обязательства в согласованные сроки. Задержки должны согласовываться с гарантом
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-orange-400 font-bold">5</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Споры:</span> При возникновении спора предоставьте все доказательства (скриншоты, переписку). Решение гаранта является окончательным
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-orange-400 font-bold">6</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Запрет на мошенничество:</span> Попытки обмана, подделки документов или предоставления ложной информации караются блокировкой
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-border pt-6">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-800/20 rounded-lg flex items-center justify-center">
                <Icon name="DollarSign" className="text-purple-400" size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-purple-400">Условия использования сервиса</h2>
            </div>
            
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-purple-400 font-bold">1</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Верификация для вывода:</span> Для вывода средств свыше 100 USDT необходимо пройти верификацию личности
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-purple-400 font-bold">2</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Комиссии платформы:</span> При использовании гарант-сервиса взимается комиссия 3% от суммы сделки
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-purple-400 font-bold">3</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Сроки обработки:</span> Заявки на вывод обрабатываются в течение 24-48 часов в рабочие дни
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-purple-400 font-bold">4</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">AML-политика:</span> Платформа соблюдает правила по борьбе с отмыванием денег. Подозрительные транзакции блокируются
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-purple-400 font-bold">5</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Конфиденциальность:</span> Мы защищаем ваши данные и не передаём их третьим лицам без вашего согласия
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-purple-400 font-bold">6</span>
                </div>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">Реферальные средства:</span> Деньги, полученные через реферальную программу, можно вывести только после увеличения суммы в 5 раз через игры в казино. Альтернативно, реферальными средствами можно оплачивать любые товары и услуги на платформе
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-border pt-6">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-800/20 rounded-lg flex items-center justify-center">
                <Icon name="Ban" className="text-red-400" size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-400">Причины для блокировки</h2>
            </div>
            
            <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4 mb-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Администрация оставляет за собой право заблокировать аккаунт пользователя без предупреждения при нарушении правил платформы
              </p>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Мошенничество и обман</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Попытки обмана других пользователей, невыполнение обязательств по сделкам, использование поддельных документов
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Использование читов и эксплойтов</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Применение ботов, скриптов, багов для получения нечестного преимущества в играх или на платформе
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Создание мультиаккаунтов</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Регистрация нескольких аккаунтов для обхода правил, получения бонусов или манипуляции системой
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Оскорбления и угрозы</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Агрессивное поведение, оскорбления, угрозы в адрес других пользователей или администрации
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Спам и реклама</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Массовая рассылка сообщений, реклама сторонних ресурсов без согласования с администрацией
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Незаконная деятельность</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Продажа наркотиков, оружия, боеприпасов, взрывчатых веществ, торговля органами и любая другая запрещённая законом деятельность
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Попытки взлома</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Попытки несанкционированного доступа к чужим аккаунтам, взлом системы, DDoS-атаки
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-800/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="AlertTriangle" className="text-red-400" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-red-400">Нарушение возрастных ограничений</p>
                  <p className="text-foreground/80 text-xs sm:text-sm mt-1">
                    Участие в играх казино пользователями младше 18 лет, предоставление ложных данных о возрасте
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-border pt-6">
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="text-primary flex-shrink-0 mt-1" size={20} />
              <div className="text-xs sm:text-sm text-foreground/80 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">Важно:</span> Незнание правил не освобождает от ответственности. Перед использованием платформы обязательно ознакомьтесь со всеми правилами.
                </p>
                <p>
                  Администрация имеет право изменять правила без предварительного уведомления. Актуальная версия правил всегда доступна на этой странице.
                </p>
                <p>
                  При возникновении вопросов обращайтесь в службу поддержки через раздел "Поддержка" в меню.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;