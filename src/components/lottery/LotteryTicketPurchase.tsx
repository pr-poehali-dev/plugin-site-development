import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { User } from '@/types';

interface LotteryTicketPurchaseProps {
  user: User | null;
  myTickets: number[];
  ticketPrice: number;
  isProcessing: boolean;
  availableTickets: number;
  isDrawing: boolean;
  isCompleted: boolean;
  timeLeft: string;
  onBuyTicket: () => void;
}

const LotteryTicketPurchase = ({
  user,
  myTickets,
  ticketPrice,
  isProcessing,
  availableTickets,
  isDrawing,
  isCompleted,
  timeLeft,
  onBuyTicket
}: LotteryTicketPurchaseProps) => {
  return (
    <Card className="p-8 bg-gradient-to-b from-indigo-950/40 via-indigo-900/30 to-indigo-950/40 border-indigo-800/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800/5 via-transparent to-transparent"></div>
      
      <div className="relative space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-indigo-600/20 rounded-2xl">
            <Icon name="Ticket" size={48} className="text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold">Купить билет</h3>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold">
            <span className="text-yellow-400">{ticketPrice}</span>
            <span className="text-muted-foreground">USDT</span>
          </div>
        </div>

        {myTickets.length > 0 && (
          <Card className="p-4 bg-indigo-800/20 border-indigo-800/30">
            <p className="text-center mb-3 font-semibold">Ваши билеты ({myTickets.length}):</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {myTickets.map((num) => (
                <div
                  key={num}
                  className="w-12 h-12 rounded-lg bg-indigo-600/30 border-2 border-indigo-600/50 flex items-center justify-center font-bold text-lg"
                >
                  {num}
                </div>
              ))}
            </div>
          </Card>
        )}

        <Button
          type="button"
          onClick={onBuyTicket}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-lg h-14"
          disabled={!user || isProcessing || availableTickets === 0 || isDrawing || isCompleted}
        >
          <Icon name="Ticket" size={20} className="mr-2" />
          {!user ? 'Войдите для покупки' : 
           isDrawing ? 'Идет розыгрыш' :
           isCompleted ? 'Лотерея завершена' :
           availableTickets === 0 ? 'Все билеты проданы' : 
           `Купить билет (${ticketPrice} USDT)`}
        </Button>

        {isDrawing && (
          <Card className="p-4 bg-orange-800/20 border-orange-800/30">
            <div className="flex items-center gap-3">
              <Icon name="Clock" size={24} className="text-orange-400 animate-pulse" />
              <div>
                <p className="font-semibold">Розыгрыш начнется через:</p>
                <p className="text-2xl font-bold text-orange-400">{timeLeft}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};

export default LotteryTicketPurchase;
