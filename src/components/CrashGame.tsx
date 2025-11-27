import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';

interface CrashGameProps {
  user: User | null;
  onShowAuthDialog: () => void;
  onRefreshUserBalance?: () => void;
}

const CrashGame = ({ user, onShowAuthDialog, onRefreshUserBalance }: CrashGameProps) => {
  const { toast } = useToast();
  const [bet, setBet] = useState('10');
  const [autoCashout, setAutoCashout] = useState('2.00');
  const [gameState, setGameState] = useState<'betting' | 'flying' | 'crashed'>('betting');
  const [multiplier, setMultiplier] = useState(1.00);
  const [crashPoint, setCrashPoint] = useState(1.00);
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const generateCrashPoint = (): number => {
    const shouldWin = Math.random() < 0.4;
    
    if (shouldWin) {
      const autoCashoutValue = parseFloat(autoCashout) || 2.0;
      const minMultiplier = Math.max(autoCashoutValue, 1.5);
      return minMultiplier + Math.random() * 3;
    } else {
      const random = Math.random();
      if (random < 0.4) return 1.0 + Math.random() * 0.5;
      if (random < 0.7) return 1.5 + Math.random() * 1.0;
      return 2.5 + Math.random() * 2.0;
    }
  };

  const startGame = async () => {
    if (!user) {
      onShowAuthDialog();
      return;
    }

    const betAmount = parseFloat(bet);
    if (isNaN(betAmount) || betAmount <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную ставку',
        variant: 'destructive'
      });
      return;
    }

    if (betAmount > user.balance) {
      toast({
        title: 'Недостаточно средств',
        description: 'Пополните баланс',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      const betResponse = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'place_bet',
          amount: betAmount,
          game_type: 'Crash'
        })
      });

      const betData = await betResponse.json();
      if (!betData.success) {
        toast({
          title: 'Ошибка',
          description: betData.message || 'Не удалось сделать ставку',
          variant: 'destructive'
        });
        setIsProcessing(false);
        return;
      }

      onRefreshUserBalance?.();

      const crash = generateCrashPoint();
      setCrashPoint(crash);
      setMultiplier(1.00);
      setHasCashedOut(false);
      setGameState('flying');
      setResult('');

      let currentMultiplier = 1.00;
      const autoCashoutValue = parseFloat(autoCashout);

      let localHasCashedOut = false;
      
      intervalRef.current = setInterval(() => {
        currentMultiplier += 0.01;
        setMultiplier(currentMultiplier);

        if (!isNaN(autoCashoutValue) && currentMultiplier >= autoCashoutValue && !localHasCashedOut) {
          localHasCashedOut = true;
          setHasCashedOut(true);
          cashout(currentMultiplier, betAmount, true);
        }

        if (currentMultiplier >= crash) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (!localHasCashedOut) {
            handleCrash(betAmount);
          }
        }
      }, 100);

    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка соединения с сервером',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };

  const cashout = async (currentMultiplier: number, betAmount: number, auto: boolean = false) => {
    if (hasCashedOut || gameState !== 'flying') return;

    setHasCashedOut(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const winAmount = betAmount * currentMultiplier;

    try {
      await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user!.id.toString()
        },
        body: JSON.stringify({
          action: 'complete_game',
          won: true,
          amount: winAmount,
          bet_amount: betAmount,
          game_type: 'Crash'
        })
      });

      setResult(`${auto ? '🤖 Авто-вывод' : '💰 Вывод'} на ${currentMultiplier.toFixed(2)}x! Выигрыш: ${winAmount.toFixed(2)} USDT`);
      setGameState('crashed');
      
      toast({
        title: '🎉 Успешный вывод!',
        description: `+${winAmount.toFixed(2)} USDT (${currentMultiplier.toFixed(2)}x)`,
        variant: 'default'
      });

      onRefreshUserBalance?.();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка при выводе',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCrash = async (betAmount: number) => {
    setGameState('crashed');

    try {
      await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user!.id.toString()
        },
        body: JSON.stringify({
          action: 'complete_game',
          won: false,
          amount: 0,
          bet_amount: betAmount,
          game_type: 'Crash'
        })
      });

      setResult(`💥 Крах на ${crashPoint.toFixed(2)}x! Вы проиграли ${betAmount.toFixed(2)} USDT`);
      
      toast({
        title: '😔 Крах!',
        description: `-${betAmount.toFixed(2)} USDT на ${crashPoint.toFixed(2)}x`,
        variant: 'destructive'
      });

      onRefreshUserBalance?.();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка при завершении игры',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetGame = () => {
    setGameState('betting');
    setMultiplier(1.00);
    setCrashPoint(1.00);
    setResult('');
    setHasCashedOut(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">🚀 Crash</h1>
        <p className="text-muted-foreground">
          Ракета взлетает и множитель растет. Выведите до краха!
        </p>
      </div>

      <Card className="p-8 bg-gradient-to-b from-blue-950/40 via-blue-900/30 to-blue-950/40 border-blue-800/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/5 via-transparent to-transparent"></div>
        
        <div className="relative space-y-8">
          <div className="flex justify-center items-center py-12 relative">
            <div className={`text-8xl font-bold transition-all duration-300 ${
              gameState === 'flying' ? 'text-green-400 animate-pulse scale-110' : 
              gameState === 'crashed' ? 'text-red-400' : 'text-blue-400'
            }`}>
              {multiplier.toFixed(2)}x
            </div>
            {gameState === 'flying' && (
              <div className="absolute text-6xl animate-bounce">
                🚀
              </div>
            )}
            {gameState === 'crashed' && !hasCashedOut && (
              <div className="absolute text-6xl animate-ping">
                💥
              </div>
            )}
          </div>

          {result && (
            <Card className={`p-4 text-center ${
              result.includes('Выигрыш') || result.includes('Вывод') ? 'bg-green-800/20 border-green-800/30' : 
              'bg-red-800/20 border-red-800/30'
            }`}>
              <p className="text-lg font-semibold">{result}</p>
            </Card>
          )}

          {gameState === 'betting' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-800/20 border border-blue-700/30 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Ставка (USDT)</label>
                  <Input
                    type="number"
                    value={bet}
                    onChange={(e) => setBet(e.target.value)}
                    min="0.1"
                    step="0.1"
                    placeholder="Введите ставку"
                    disabled={!user}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Авто-вывод при (x)</label>
                  <Input
                    type="number"
                    value={autoCashout}
                    onChange={(e) => setAutoCashout(e.target.value)}
                    min="1.01"
                    step="0.1"
                    placeholder="Например: 2.00"
                    disabled={!user}
                  />
                </div>
              </div>
              
              <div className="text-right text-sm text-muted-foreground">
                Ваш баланс: {user ? `${Number(user.balance || 0).toFixed(2)} USDT` : '0.00 USDT'}
              </div>

              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                disabled={!user || isProcessing}
              >
                <Icon name="Rocket" size={18} className="mr-2" />
                {user ? 'Запустить ракету' : 'Войдите для игры'}
              </Button>
            </div>
          )}

          {gameState === 'flying' && !hasCashedOut && (
            <Button
              onClick={() => {
                setHasCashedOut(true);
                cashout(multiplier, parseFloat(bet), false);
              }}
              className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-xl py-6"
              disabled={isProcessing || hasCashedOut}
            >
              <Icon name="DollarSign" size={24} className="mr-2" />
              Забрать {(parseFloat(bet) * multiplier).toFixed(2)} USDT
            </Button>
          )}

          {gameState === 'crashed' && (
            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            >
              <Icon name="RotateCcw" size={18} className="mr-2" />
              Новая игра
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-card/50">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="Info" size={20} className="text-blue-400" />
          Правила игры
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• <strong>Цель:</strong> вывести средства до того, как ракета упадет</p>
          <p>• <strong>Множитель:</strong> начинается с 1.00x и растет каждые 0.1 секунды</p>
          <p>• <strong>Крах:</strong> может произойти в любой момент</p>
          <p>• <strong>Авто-вывод:</strong> автоматически выводит при достижении заданного множителя</p>
          <p>• <strong>Выигрыш:</strong> ставка × множитель на момент вывода</p>
          <p>• <strong>Минимальная ставка:</strong> 0.1 USDT</p>
        </div>
      </Card>
    </div>
  );
};

export default CrashGame;