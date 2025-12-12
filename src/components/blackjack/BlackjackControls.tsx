import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { User } from '@/types';

interface BlackjackControlsProps {
  gameState: 'betting' | 'playing' | 'dealer' | 'finished';
  bet: string;
  setBet: (bet: string) => void;
  user: User | null;
  isProcessing: boolean;
  result: string;
  onStartNewGame: (e?: React.MouseEvent) => void;
  onHit: (e?: React.MouseEvent) => void;
  onStand: () => void;
  onResetGame: () => void;
}

export const BlackjackControls = ({
  gameState,
  bet,
  setBet,
  user,
  isProcessing,
  result,
  onStartNewGame,
  onHit,
  onStand,
  onResetGame
}: BlackjackControlsProps) => {
  return (
    <>
      {/* Betting Section */}
      {gameState === 'betting' && (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Ставка</label>
              {user && (
                <span className="text-xs text-muted-foreground">
                  Баланс: {Number(user.balance || 0).toFixed(2)} USDT
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                type="number"
                value={bet}
                onChange={(e) => setBet(e.target.value)}
                className="h-10 pr-14"
                min="1"
                step="1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                USDT
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 50, 100, 500].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setBet(amount.toString())}
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={onStartNewGame}
            className="w-full h-12 md:h-14 text-base font-semibold"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Icon name="loader-2" className="w-5 h-5 animate-spin" />
            ) : (
              'Начать игру'
            )}
          </Button>
        </div>
      )}

      {/* Game Actions */}
      {gameState === 'playing' && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onHit}
            className="h-11 text-sm font-semibold"
            disabled={isProcessing}
          >
            Взять карту
          </Button>
          <Button
            onClick={onStand}
            variant="outline"
            className="h-11 text-sm font-semibold"
            disabled={isProcessing}
          >
            Хватит
          </Button>
        </div>
      )}

      {/* Result */}
      {gameState === 'finished' && result && (
        <div className="space-y-3">
          <div className={`text-center text-base font-medium p-3 rounded-lg ${
            result.includes('выиграли') || result.includes('перебрал')
              ? 'bg-green-500/10 text-green-500' 
              : result.includes('Ничья')
              ? 'bg-yellow-500/10 text-yellow-500'
              : 'bg-red-500/10 text-red-500'
          }`}>
            {result}
          </div>
          <Button
            onClick={onResetGame}
            className="w-full h-12 md:h-14 text-base font-semibold"
          >
            Новая игра
          </Button>
        </div>
      )}
    </>
  );
};
