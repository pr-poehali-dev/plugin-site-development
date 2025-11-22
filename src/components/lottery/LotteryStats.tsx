import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LotteryStatsProps {
  ticketsCount: number;
  maxTickets: number;
  prizePool: number;
  timeLeft: string;
  isDrawing: boolean;
  isCompleted: boolean;
  availableTickets: number;
}

const LotteryStats = ({
  ticketsCount,
  maxTickets,
  prizePool,
  timeLeft,
  isDrawing,
  isCompleted,
  availableTickets
}: LotteryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-600/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-yellow-600/30 flex items-center justify-center">
            <Icon name="Ticket" size={20} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Билетов продано</p>
            <p className="text-2xl font-bold">{ticketsCount} / {maxTickets}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-600/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-green-600/30 flex items-center justify-center">
            <Icon name="DollarSign" size={20} className="text-green-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Призовой фонд</p>
            <p className="text-2xl font-bold">{prizePool} USDT</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-600/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-purple-600/30 flex items-center justify-center">
            <Icon name="Timer" size={20} className="text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {isDrawing ? 'До розыгрыша' : isCompleted ? 'Статус' : 'Билетов осталось'}
            </p>
            <p className="text-2xl font-bold">
              {isDrawing ? timeLeft : isCompleted ? 'Завершено' : availableTickets}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LotteryStats;
