import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

const BONUSES = [10, 15, 20, 30, 35, 45, 55, 70, 100];

const ChristmasTree = () => {
  const navigate = useNavigate();
  const [hasPlayed, setHasPlayed] = useState(false);
  const [wonBonus, setWonBonus] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const played = localStorage.getItem('christmas_tree_played');
    if (played) {
      setHasPlayed(true);
      const savedBonus = localStorage.getItem('christmas_tree_bonus');
      if (savedBonus) {
        setWonBonus(Number(savedBonus));
      }
    }
  }, []);

  const handleSpin = async () => {
    if (hasPlayed) {
      toast.error('Вы уже получили свою скидку! Каждый пользователь может участвовать только один раз.', {
        duration: 4000,
      });
      return;
    }

    setIsSpinning(true);
    
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentNumber(BONUSES[counter % BONUSES.length]);
      counter++;
    }, 80);

    setTimeout(async () => {
      clearInterval(interval);
      const randomBonus = BONUSES[Math.floor(Math.random() * BONUSES.length)];
      
      setCurrentNumber(randomBonus);
      setWonBonus(randomBonus);
      setHasPlayed(true);
      setIsSpinning(false);
      setShowConfetti(true);
      
      localStorage.setItem('christmas_tree_played', 'true');
      localStorage.setItem('christmas_tree_bonus', randomBonus.toString());
      
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        try {
          await fetch('https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-User-Id': user.id.toString()
            },
            body: JSON.stringify({
              action: 'update_christmas_bonus',
              bonus_percent: randomBonus
            })
          });
        } catch (error) {
          console.error('Failed to save bonus:', error);
        }
      }
      
      setTimeout(() => setShowConfetti(false), 3000);
      
      toast.success(`🎉 Поздравляем! Вы выиграли скидку ${randomBonus}% на пополнение USDT!`, {
        duration: 5000,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0520] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 0.5 + 's',
                animationDuration: Math.random() * 2 + 2 + 's',
              }}
            >
              {['🎉', '✨', '🎊', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <Button
          variant="ghost"
          className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => navigate('/')}
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад
        </Button>

        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-red-500/20 to-green-500/20 border border-red-500/30 rounded-full">
            <p className="text-sm font-semibold text-red-400 flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              Новогодняя акция 2025
              <Star className="w-4 h-4 fill-current" />
            </p>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 relative">
            <span className="bg-gradient-to-r from-yellow-200 via-red-300 to-green-300 bg-clip-text text-transparent drop-shadow-lg">
              НОВОГОДНЯЯ АКЦИЯ
            </span>
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-4xl sm:text-6xl animate-bounce">🎄</div>
          </h1>
          
          <p className="text-lg sm:text-2xl text-gray-300 mb-3 font-medium">
            {hasPlayed ? '🎁 Ваш новогодний подарок готов!' : '🎲 Получите скидку до 100%'}
          </p>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            {hasPlayed 
              ? `Используйте скидку ${wonBonus}% при первом пополнении USDT TRC20` 
              : 'Один клик — один шанс. Испытайте удачу и получите новогоднюю скидку на пополнение!'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 h-full">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Gift className="w-6 h-6 text-yellow-400" />
                  Возможные призы
                </h3>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {BONUSES.map((bonus, index) => (
                    <div 
                      key={bonus} 
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                        wonBonus === bonus 
                          ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400 shadow-lg shadow-yellow-500/50 scale-105' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      style={{
                        animation: isSpinning ? `pulse-item 0.5s ease-in-out infinite ${index * 0.1}s` : 'none'
                      }}
                    >
                      {wonBonus === bonus && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Icon name="Check" size={14} className="text-black" />
                        </div>
                      )}
                      <div className={`text-2xl sm:text-3xl font-black ${wonBonus === bonus ? 'text-yellow-300' : 'text-white'}`}>
                        {bonus}%
                      </div>
                      <div className="text-xs text-gray-400">скидка</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Icon name="Info" size={18} className="text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-white">Как участвовать:</span> Нажмите кнопку один раз и получите случайную скидку
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <Icon name="Zap" size={18} className="text-green-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-white">Применение:</span> Скидка активируется при первом пополнении USDT
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <Icon name="AlertCircle" size={18} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-white">Важно:</span> Только одна попытка на пользователя
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              {wonBonus && !isSpinning ? (
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border-2 border-yellow-400 rounded-2xl p-8 text-center animate-prize-reveal shadow-2xl shadow-yellow-500/30 h-full flex flex-col justify-center">
                  <div className="relative inline-block mx-auto mb-6">
                    <Gift className="w-24 h-24 text-yellow-300 animate-bounce" />
                    <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
                    <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-orange-400 animate-spin-slow" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  <h2 className="text-5xl sm:text-6xl font-black mb-2">
                    <span className="bg-gradient-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">
                      {wonBonus}%
                    </span>
                  </h2>
                  <p className="text-xl text-yellow-100 mb-6 font-medium">Ваша новогодняя скидка!</p>
                  
                  <Button
                    onClick={() => {
                      localStorage.setItem('open_topup_dialog', 'true');
                      navigate('/');
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <Zap className="mr-2" />
                    Использовать скидку
                  </Button>
                  
                  <p className="text-sm text-yellow-200/80 mt-4">
                    Пополните баланс и получите {wonBonus}% бонусом
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-400/30 rounded-2xl p-8 sm:p-12 shadow-2xl h-full flex flex-col justify-center">
                  <div className="text-center mb-8">
                    <div className={`text-7xl sm:text-8xl lg:text-9xl font-black mb-4 transition-all duration-200 ${isSpinning ? 'scale-110 blur-sm' : 'scale-100'}`}>
                      <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                        {isSpinning ? currentNumber : '?'}
                        <span className="text-5xl sm:text-6xl">%</span>
                      </span>
                    </div>
                    
                    <p className="text-lg sm:text-xl text-gray-300 font-medium">
                      {isSpinning ? (
                        <span className="flex items-center justify-center gap-2">
                          <Icon name="Loader2" className="animate-spin" size={20} />
                          Определяем вашу скидку...
                        </span>
                      ) : (
                        'Нажмите кнопку ниже'
                      )}
                    </p>
                  </div>

                  <Button
                    onClick={handleSpin}
                    disabled={isSpinning || hasPlayed}
                    size="lg"
                    className={`w-full py-6 sm:py-8 text-xl sm:text-2xl font-black rounded-xl transition-all duration-300 ${
                      hasPlayed 
                        ? 'bg-gray-600/50 cursor-not-allowed text-gray-400' 
                        : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 shadow-lg shadow-green-500/50 hover:shadow-green-500/70 hover:scale-105'
                    }`}
                  >
                    {hasPlayed ? (
                      <span className="flex items-center justify-center gap-3">
                        <Icon name="CheckCircle2" size={28} />
                        Приз получен
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <Zap size={28} />
                        Получить скидку
                        <Zap size={28} />
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        @keyframes pulse-item {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }
        @keyframes prize-reveal {
          0% { transform: scale(0.8) rotate(-5deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes confetti {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-prize-reveal {
          animation: prize-reveal 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-confetti {
          animation: confetti ease-in forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ChristmasTree;