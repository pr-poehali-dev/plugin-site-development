import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

const BONUSES = [10, 15, 20, 30, 35, 45, 55, 70, 100];
const GARLAND_COUNT = 15;

interface Garland {
  id: number;
  x: number;
  y: number;
  color: string;
  clicked: boolean;
  bonus?: number;
}

const ChristmasTree = () => {
  const navigate = useNavigate();
  const [garlands, setGarlands] = useState<Garland[]>(() => 
    Array.from({ length: GARLAND_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      color: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'][Math.floor(Math.random() * 6)],
      clicked: false
    }))
  );
  const [wonBonus, setWonBonus] = useState<number | null>(null);

  const handleGarlandClick = (id: number) => {
    const garland = garlands.find(g => g.id === id);
    if (!garland || garland.clicked) return;

    const randomBonus = BONUSES[Math.floor(Math.random() * BONUSES.length)];
    
    setGarlands(prev => prev.map(g => 
      g.id === id ? { ...g, clicked: true, bonus: randomBonus } : g
    ));
    
    setWonBonus(randomBonus);
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

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            🎄 Новогодняя Ёлка 🎄
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Нажмите на любую гирлянду и получите бонус!
          </p>
          <p className="text-sm text-gray-400">
            Бонус действует на первое пополнение USDT
          </p>
        </div>

        {wonBonus && (
          <div className="max-w-md mx-auto mb-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg text-center animate-bounce-in">
            <Gift className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold mb-2">Ваш бонус: {wonBonus}%</h3>
            <p className="text-gray-300 mb-4">на первое пополнение USDT</p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            >
              Использовать бонус
            </Button>
          </div>
        )}

        <div className="max-w-4xl mx-auto relative">
          <div className="relative w-full aspect-[3/4] max-h-[600px] mx-auto">
            <svg viewBox="0 0 400 500" className="w-full h-full">
              <polygon 
                points="200,50 100,180 300,180" 
                fill="#1a5f3e" 
                stroke="#0f3a24" 
                strokeWidth="2"
              />
              <polygon 
                points="200,120 120,220 280,220" 
                fill="#1a5f3e" 
                stroke="#0f3a24" 
                strokeWidth="2"
              />
              <polygon 
                points="200,190 140,290 260,290" 
                fill="#1a5f3e" 
                stroke="#0f3a24" 
                strokeWidth="2"
              />
              <polygon 
                points="200,260 160,360 240,360" 
                fill="#1a5f3e" 
                stroke="#0f3a24" 
                strokeWidth="2"
              />
              <rect 
                x="180" 
                y="360" 
                width="40" 
                height="80" 
                fill="#4a2511" 
                stroke="#2a1508" 
                strokeWidth="2"
              />
              <polygon 
                points="200,30 190,50 210,50" 
                fill="#FFD700" 
                className="animate-pulse"
              />

              {garlands.map((garland) => (
                <g key={garland.id}>
                  <circle
                    cx={`${garland.x}%`}
                    cy={`${garland.y}%`}
                    r="8"
                    fill={garland.clicked ? '#888' : garland.color}
                    stroke={garland.clicked ? '#555' : '#fff'}
                    strokeWidth="2"
                    style={{
                      cursor: garland.clicked ? 'default' : 'pointer',
                      filter: garland.clicked ? 'grayscale(1)' : `drop-shadow(0 0 8px ${garland.color})`,
                      animation: garland.clicked ? 'none' : 'pulse 2s infinite',
                      animationDelay: `${garland.id * 0.1}s`,
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => handleGarlandClick(garland.id)}
                    className={garland.clicked ? '' : 'hover:scale-125 transition-transform'}
                  />
                  {garland.clicked && garland.bonus && (
                    <text
                      x={`${garland.x}%`}
                      y={`${garland.y - 3}%`}
                      textAnchor="middle"
                      fill="#FFD700"
                      fontSize="14"
                      fontWeight="bold"
                      className="animate-float-up"
                    >
                      +{garland.bonus}%
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-8 grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {BONUSES.map(bonus => (
              <div key={bonus} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-yellow-400">{bonus}%</div>
                <div className="text-xs text-gray-400">бонус</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .animate-float-up {
          animation: float-up 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChristmasTree;
