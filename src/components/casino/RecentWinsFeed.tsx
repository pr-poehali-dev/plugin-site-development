import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WinEntry {
  id: string;
  username: string;
  avatar_url?: string;
  amount: number;
  game: string;
  timestamp: Date;
}

const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';

const RecentWinsFeed = () => {
  const [wins, setWins] = useState<WinEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentWins();
    const interval = setInterval(fetchRecentWins, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentWins = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'get_recent_wins',
          limit: 10
        })
      });

      const data = await response.json();
      if (data.success && data.wins) {
        setWins(data.wins.map((win: any) => ({
          ...win,
          amount: parseFloat(win.amount),
          timestamp: new Date(win.created_at)
        })));
      }
    } catch (error) {
      console.error('Ошибка загрузки выигрышей:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGameIcon = (game: string) => {
    const icons: Record<string, string> = {
      'dice': 'Dices',
      'roulette': 'CircleDot',
      'blackjack': 'Spade',
      'baccarat': 'Diamond',
      'lottery': 'Ticket'
    };
    return icons[game.toLowerCase()] || 'Trophy';
  };

  const getGameColor = (game: string) => {
    const colors: Record<string, string> = {
      'dice': 'text-orange-400',
      'roulette': 'text-green-400',
      'blackjack': 'text-green-400',
      'baccarat': 'text-purple-400',
      'lottery': 'text-indigo-400'
    };
    return colors[game.toLowerCase()] || 'text-yellow-400';
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин назад`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч назад`;
    return `${Math.floor(seconds / 86400)} д назад`;
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-yellow-950/40 via-yellow-900/30 to-orange-950/40 border-yellow-800/30">
        <div className="flex items-center justify-center h-32">
          <Icon name="Loader2" size={32} className="animate-spin text-yellow-400" />
        </div>
      </Card>
    );
  }

  if (wins.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-br from-yellow-950/40 via-yellow-900/30 to-orange-950/40 border-yellow-800/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={20} className="text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold">🏆 Последние выигрыши</h3>
        </div>
        <p className="text-muted-foreground text-center py-4">
          Пока никто не выиграл. Будьте первым!
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-yellow-950/40 via-yellow-900/30 to-orange-950/40 border-yellow-800/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-600/5 via-transparent to-transparent"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={16} className="text-yellow-400" />
          </div>
          <h3 className="text-base font-bold">🏆 Последние выигрыши</h3>
        </div>

        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar-horizontal">
            {wins.map((win) => (
              <div
                key={win.id}
                className="flex-shrink-0 w-32 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-all hover:scale-105 border border-yellow-800/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    {win.avatar_url ? (
                      <img
                        src={win.avatar_url}
                        alt={win.username}
                        className="w-12 h-12 rounded-full border-2 border-yellow-500/30"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full flex items-center justify-center border-2 border-yellow-500/30">
                        <Icon name="User" size={20} className="text-yellow-400" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/50">
                      <Icon name={getGameIcon(win.game)} size={10} className={getGameColor(win.game)} />
                    </div>
                  </div>

                  <div className="text-center w-full">
                    <p className="font-semibold text-xs truncate">{win.username}</p>
                    <p className="text-xs text-muted-foreground truncate">{win.game}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-400 font-bold">
                      <Icon name="TrendingUp" size={12} />
                      <span className="text-sm">+{win.amount.toFixed(0)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(win.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecentWinsFeed;