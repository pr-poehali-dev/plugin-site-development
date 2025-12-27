import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

const BONUSES = [10, 15, 20, 30, 35, 45, 55, 70, 100];

interface Garland {
  id: number;
  x: number;
  y: number;
  color: string;
}

const ChristmasTree = () => {
  const navigate = useNavigate();
  const [hasPlayed, setHasPlayed] = useState(false);
  const [wonBonus, setWonBonus] = useState<number | null>(null);
  const [clickedGarlandId, setClickedGarlandId] = useState<number | null>(null);
  
  const [garlands] = useState<Garland[]>(() => {
    const lights: Garland[] = [];
    const colors = ['#FF0000', '#FFD700', '#00FF00', '#0000FF', '#FF00FF', '#FFA500'];
    
    const layers = [
      { y: 18, count: 3, spread: 12 },
      { y: 28, count: 4, spread: 22 },
      { y: 40, count: 5, spread: 32 },
      { y: 53, count: 6, spread: 40 },
      { y: 67, count: 5, spread: 35 }
    ];
    
    let id = 0;
    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const spacing = layer.spread * 2 / (layer.count + 1);
        lights.push({
          id: id++,
          x: 50 + (i - (layer.count - 1) / 2) * spacing,
          y: layer.y,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    });
    
    return lights;
  });

  useEffect(() => {
    const played = localStorage.getItem('christmas_tree_played');
    if (played) {
      setHasPlayed(true);
      const savedBonus = localStorage.getItem('christmas_tree_bonus');
      const savedGarlandId = localStorage.getItem('christmas_tree_garland');
      if (savedBonus) {
        setWonBonus(Number(savedBonus));
      }
      if (savedGarlandId) {
        setClickedGarlandId(Number(savedGarlandId));
      }
    }
  }, []);

  const handleGarlandClick = (id: number) => {
    if (hasPlayed) {
      toast.error('Вы уже получили свой бонус! Каждый пользователь может участвовать только один раз.', {
        duration: 4000,
      });
      return;
    }

    const randomBonus = BONUSES[Math.floor(Math.random() * BONUSES.length)];
    
    setClickedGarlandId(id);
    setWonBonus(randomBonus);
    setHasPlayed(true);
    
    localStorage.setItem('christmas_tree_played', 'true');
    localStorage.setItem('christmas_tree_bonus', randomBonus.toString());
    localStorage.setItem('christmas_tree_garland', id.toString());
    
    toast.success(`🎉 Поздравляем! Вы выиграли бонус ${randomBonus}% на пополнение USDT!`, {
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Button
          variant="ghost"
          className="mb-6 text-white hover:text-purple-300"
          onClick={() => navigate('/')}
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          На главную
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            🎄 Новогодняя Ёлка 🎄
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-2">
            {hasPlayed ? 'Вы уже использовали свой шанс!' : 'Нажмите на любую гирлянду и получите бонус!'}
          </p>
          <p className="text-sm text-gray-400">
            {hasPlayed ? `Ваш бонус ${wonBonus}% ждёт вас` : 'Бонус действует на первое пополнение USDT • Только одна попытка!'}
          </p>
        </div>

        {wonBonus && (
          <div className="max-w-md mx-auto mb-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg text-center animate-bounce-in">
            <Gift className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Ваш бонус: {wonBonus}%
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </h3>
            <p className="text-gray-300 mb-4">на первое пополнение USDT</p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            >
              Пополнить баланс
            </Button>
          </div>
        )}

        <div className="max-w-4xl mx-auto relative">
          <div className="relative w-full max-w-md mx-auto">
            <svg viewBox="0 0 300 420" className="w-full h-auto drop-shadow-2xl">
              <defs>
                <radialGradient id="treeGradient1" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#2d8659" />
                  <stop offset="100%" stopColor="#1a5f3e" />
                </radialGradient>
                <radialGradient id="treeGradient2" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#2d8659" />
                  <stop offset="100%" stopColor="#165233" />
                </radialGradient>
                <radialGradient id="treeGradient3" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#2d8659" />
                  <stop offset="100%" stopColor="#0f3a24" />
                </radialGradient>
                <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3d1f0f" />
                  <stop offset="50%" stopColor="#5a2f1a" />
                  <stop offset="100%" stopColor="#3d1f0f" />
                </linearGradient>
              </defs>

              <polygon 
                points="150,30 80,120 220,120" 
                fill="url(#treeGradient1)" 
                stroke="#0f3a24" 
                strokeWidth="1.5"
              />
              <polygon 
                points="150,85 95,165 205,165" 
                fill="url(#treeGradient2)" 
                stroke="#0f3a24" 
                strokeWidth="1.5"
              />
              <polygon 
                points="150,140 110,220 190,220" 
                fill="url(#treeGradient2)" 
                stroke="#0f3a24" 
                strokeWidth="1.5"
              />
              <polygon 
                points="150,195 125,275 175,275" 
                fill="url(#treeGradient3)" 
                stroke="#0f3a24" 
                strokeWidth="1.5"
              />
              
              <rect 
                x="135" 
                y="275" 
                width="30" 
                height="70" 
                fill="url(#trunkGradient)" 
                stroke="#2a1508" 
                strokeWidth="1.5"
                rx="2"
              />
              
              <polygon 
                points="150,15 143,30 157,30" 
                fill="#FFD700" 
                stroke="#FFA500"
                strokeWidth="1"
              >
                <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
              </polygon>
              <circle cx="150" cy="22" r="8" fill="#FFD700" opacity="0.3">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>

              {garlands.map((garland) => {
                const isClicked = clickedGarlandId === garland.id;
                const shouldGrayOut = hasPlayed && !isClicked;
                
                return (
                  <g key={garland.id}>
                    <circle
                      cx={`${garland.x}%`}
                      cy={`${garland.y}%`}
                      r="6"
                      fill={shouldGrayOut ? '#444' : garland.color}
                      stroke={isClicked ? '#FFD700' : shouldGrayOut ? '#333' : '#fff'}
                      strokeWidth={isClicked ? '3' : '1.5'}
                      style={{
                        cursor: hasPlayed ? 'not-allowed' : 'pointer',
                        filter: shouldGrayOut 
                          ? 'grayscale(1) opacity(0.4)' 
                          : isClicked 
                            ? 'drop-shadow(0 0 12px #FFD700)' 
                            : `drop-shadow(0 0 6px ${garland.color})`,
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handleGarlandClick(garland.id)}
                      className={hasPlayed ? '' : 'hover:scale-150 transition-transform'}
                    >
                      {!hasPlayed && (
                        <animate 
                          attributeName="opacity" 
                          values="1;0.4;1" 
                          dur={`${1.5 + garland.id * 0.1}s`} 
                          repeatCount="indefinite" 
                        />
                      )}
                      {isClicked && (
                        <animate 
                          attributeName="r" 
                          values="6;10;6" 
                          dur="1s" 
                          repeatCount="indefinite" 
                        />
                      )}
                    </circle>
                    
                    {isClicked && wonBonus && (
                      <text
                        x={`${garland.x}%`}
                        y={`${garland.y - 5}%`}
                        textAnchor="middle"
                        fill="#FFD700"
                        fontSize="16"
                        fontWeight="bold"
                        className="animate-float-bounce"
                      >
                        +{wonBonus}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-8 grid grid-cols-3 md:grid-cols-5 gap-3 text-center">
            {BONUSES.map(bonus => (
              <div key={bonus} className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-colors">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">{bonus}%</div>
                <div className="text-xs text-gray-400">бонус</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
            <p className="text-sm text-gray-300">
              ℹ️ После получения бонуса пополните баланс USDT и бонус автоматически применится к вашей первой транзакции
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes float-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-float-bounce {
          animation: float-bounce 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChristmasTree;
