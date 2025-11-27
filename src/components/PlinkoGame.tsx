import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';

interface PlinkoGameProps {
  user: User | null;
  onShowAuthDialog: () => void;
  onRefreshUserBalance?: () => void;
}

const MULTIPLIERS = [16, 9, 2, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 2, 9, 16];
const ROWS = 12;

const PlinkoGame = ({ user, onShowAuthDialog, onRefreshUserBalance }: PlinkoGameProps) => {
  const { toast } = useToast();
  const [bet, setBet] = useState('10');
  const [gameState, setGameState] = useState<'betting' | 'dropping' | 'finished'>('betting');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ballPosition, setBallPosition] = useState<number>(6);
  const [finalSlot, setFinalSlot] = useState<number | null>(null);

  const simulateDrop = (): number => {
    const shouldWin = Math.random() < 0.4;
    
    if (shouldWin) {
      const winningSlots = [0, 1, 2, 10, 11, 12];
      return winningSlots[Math.floor(Math.random() * winningSlots.length)];
    } else {
      const losingSlots = [4, 5, 6, 7, 8];
      return losingSlots[Math.floor(Math.random() * losingSlots.length)];
    }
  };

  const drop = async () => {
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
    setGameState('dropping');
    setBallPosition(6);
    setFinalSlot(null);

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
          game_type: 'Plinko'
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
        setGameState('betting');
        return;
      }

      onRefreshUserBalance?.();

      const targetSlot = simulateDrop();
      let currentPos = 6;

      const dropInterval = setInterval(() => {
        if (currentPos < targetSlot) {
          currentPos += Math.random() > 0.5 ? 1 : 0.5;
        } else if (currentPos > targetSlot) {
          currentPos -= Math.random() > 0.5 ? 1 : 0.5;
        }
        setBallPosition(Math.min(12, Math.max(0, currentPos)));
      }, 100);

      setTimeout(() => {
        clearInterval(dropInterval);
        setBallPosition(targetSlot);
        setFinalSlot(targetSlot);
        finishGame(targetSlot, betAmount);
      }, 2000);

    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка соединения с сервером',
        variant: 'destructive'
      });
      setIsProcessing(false);
      setGameState('betting');
    }
  };

  const finishGame = async (slot: number, betAmount: number) => {
    const multiplier = MULTIPLIERS[slot];
    const won = multiplier >= 1;
    const winAmount = betAmount * multiplier;

    try {
      await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user!.id.toString()
        },
        body: JSON.stringify({
          action: 'complete_game',
          won: multiplier > 1,
          amount: won ? winAmount : 0,
          bet_amount: betAmount,
          game_type: 'Plinko'
        })
      });

      if (multiplier > 1) {
        setResult(`🎯 Множитель ${multiplier}x! Выигрыш: ${winAmount.toFixed(2)} USDT`);
        toast({
          title: '🎉 Победа!',
          description: `+${winAmount.toFixed(2)} USDT (${multiplier}x)`,
          variant: 'default'
        });
      } else if (multiplier === 1) {
        setResult(`⚖️ Множитель 1x. Ставка возвращена: ${betAmount.toFixed(2)} USDT`);
        toast({
          title: '↩️ Возврат',
          description: `Ставка возвращена: ${betAmount.toFixed(2)} USDT`,
          variant: 'default'
        });
      } else {
        setResult(`😔 Множитель ${multiplier}x. Получено: ${winAmount.toFixed(2)} USDT`);
        toast({
          title: '😔 Проигрыш',
          description: `Множитель ${multiplier}x`,
          variant: 'destructive'
        });
      }

      setGameState('finished');

      if (onRefreshUserBalance) {
        onRefreshUserBalance();
      }
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
    setResult('');
    setFinalSlot(null);
    setBallPosition(6);
  };

  const getMultiplierColor = (multiplier: number): string => {
    if (multiplier >= 9) return 'text-yellow-400 bg-yellow-900/30 border-yellow-600';
    if (multiplier >= 2) return 'text-green-400 bg-green-900/30 border-green-600';
    if (multiplier > 1) return 'text-blue-400 bg-blue-900/30 border-blue-600';
    if (multiplier === 1) return 'text-gray-400 bg-gray-900/30 border-gray-600';
    return 'text-red-400 bg-red-900/30 border-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">🎯 Plinko</h1>
        <p className="text-muted-foreground">
          Сбросьте шарик и смотрите, куда он упадет. Выигрыш до 16x!
        </p>
      </div>

      <Card className="p-8 bg-gradient-to-b from-indigo-950/40 via-indigo-900/30 to-indigo-950/40 border-indigo-800/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800/5 via-transparent to-transparent"></div>
        
        <div className="relative space-y-6">
          <div className="bg-gradient-to-b from-indigo-900/40 to-indigo-950/40 rounded-2xl p-6 border-2 border-indigo-700/50">
            <div className="relative h-64 flex items-end justify-center">
              {gameState === 'dropping' && (
                <div
                  className="absolute top-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl animate-bounce transition-all duration-100"
                  style={{
                    left: `${(ballPosition / 12) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              )}
              
              <div className="flex gap-1 w-full justify-center">
                {MULTIPLIERS.map((multiplier, index) => (
                  <div
                    key={index}
                    className={`flex-1 max-w-[60px] h-16 rounded-lg border-2 flex flex-col items-center justify-center font-bold transition-all duration-300 ${
                      getMultiplierColor(multiplier)
                    } ${finalSlot === index ? 'scale-110 shadow-2xl animate-pulse' : ''}`}
                  >
                    <div className="text-lg">{multiplier}x</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <Card className={`p-4 text-center ${
              result.includes('Выигрыш') ? 'bg-green-800/20 border-green-800/30' : 
              result.includes('возвращена') ? 'bg-gray-800/20 border-gray-800/30' :
              'bg-red-800/20 border-red-800/30'
            }`}>
              <p className="text-lg font-semibold">{result}</p>
            </Card>
          )}

          {gameState === 'betting' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 p-4 bg-indigo-800/20 border border-indigo-700/30 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Ставка (USDT)</label>
                  <Input
                    type="number"
                    value={bet}
                    onChange={(e) => setBet(e.target.value)}
                    min="0.1"
                    step="0.1"
                    placeholder="Введите ставку"
                    disabled={!user}
                    className="w-40"
                  />
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Ваш баланс</div>
                  <div className="text-2xl font-bold text-primary">
                    {user ? `${Number(user.balance || 0).toFixed(2)} USDT` : '0.00 USDT'}
                  </div>
                </div>
              </div>

              <Button
                onClick={drop}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-xl py-6"
                disabled={!user || isProcessing}
              >
                <Icon name="ArrowDown" size={24} className="mr-2" />
                {user ? 'Сбросить шарик' : 'Войдите для игры'}
              </Button>
            </div>
          )}

          {gameState === 'finished' && (
            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900"
              disabled={isProcessing}
            >
              <Icon name="RotateCcw" size={18} className="mr-2" />
              Новая игра
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-card/50">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="Info" size={20} className="text-indigo-400" />
          Таблица множителей
        </h3>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-yellow-900/30 border border-yellow-600 flex items-center justify-center text-yellow-400 font-bold text-xs">16x</div>
              <span className="text-muted-foreground">Крайние позиции</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-yellow-900/30 border border-yellow-600 flex items-center justify-center text-yellow-400 font-bold text-xs">9x</div>
              <span className="text-muted-foreground">Близко к краям</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-green-900/30 border border-green-600 flex items-center justify-center text-green-400 font-bold text-xs">2x</div>
              <span className="text-muted-foreground">Средние</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gray-900/30 border border-gray-600 flex items-center justify-center text-gray-400 font-bold text-xs">1x</div>
              <span className="text-muted-foreground">Возврат ставки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-red-900/30 border border-red-600 flex items-center justify-center text-red-400 font-bold text-xs">0.5x</div>
              <span className="text-muted-foreground">Центральная</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-4">
            • <strong>Правило:</strong> шарик случайно падает в один из слотов с разными множителями
          </p>
          <p className="text-muted-foreground">
            • <strong>Максимальный выигрыш:</strong> 16x от ставки
          </p>
          <p className="text-muted-foreground">
            • <strong>Минимальная ставка:</strong> 0.1 USDT
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PlinkoGame;
