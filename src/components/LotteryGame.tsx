import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import LotteryStats from './lottery/LotteryStats';
import LotteryTicketPurchase from './lottery/LotteryTicketPurchase';
import LotteryChat from './lottery/LotteryChat';
import LotteryParticipants from './lottery/LotteryParticipants';

const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';

interface LotteryGameProps {
  user: User | null;
  onShowAuthDialog: () => void;
  onRefreshUserBalance?: () => void;
}

interface LotteryTicket {
  id: number;
  user_id: number;
  username: string;
  ticket_number: number;
  purchased_at: string;
}

interface LotteryRound {
  id: number;
  status: 'active' | 'drawing' | 'completed';
  total_tickets: number;
  prize_pool: number;
  draw_time: string | null;
  winner_ticket_number: number | null;
  winner_username: string | null;
  created_at: string;
}

interface ChatMessage {
  id: number;
  user_id: number;
  username: string;
  message: string;
  created_at: string;
}

interface LotteryNotification {
  id: number;
  round_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface LotteryHistory {
  id: number;
  status: string;
  total_tickets: number;
  prize_pool: number;
  winner_ticket_number: number;
  winner_user_id: number;
  winner_username: string;
  created_at: string;
  completed_at: string;
}

const TICKET_PRICE = 50;
const MAX_TICKETS = 10;
const DRAW_DELAY_MINUTES = 1;
const PRIZE_AMOUNT = 400;

const LotteryGame = ({ user, onShowAuthDialog, onRefreshUserBalance }: LotteryGameProps) => {
  const { toast } = useToast();
  const [currentRound, setCurrentRound] = useState<LotteryRound | null>(null);
  const [tickets, setTickets] = useState<LotteryTicket[]>([]);
  const [myTickets, setMyTickets] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<LotteryNotification[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<LotteryHistory[]>([]);
  const [prevChatLength, setPrevChatLength] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLottery();
    loadChat();
    checkDraw();
    if (user) {
      loadNotifications();
    }
    const lotteryInterval = setInterval(loadLottery, 5000);
    const chatInterval = setInterval(loadChat, 3000);
    const drawInterval = setInterval(checkDraw, 10000);
    const notifInterval = user ? setInterval(loadNotifications, 10000) : null;
    return () => {
      clearInterval(lotteryInterval);
      clearInterval(chatInterval);
      clearInterval(drawInterval);
      if (notifInterval) clearInterval(notifInterval);
    };
  }, [user]);

  useEffect(() => {
    if (currentRound?.draw_time) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const drawTime = new Date(currentRound.draw_time!).getTime();
        const diff = drawTime - now;

        if (diff <= 0) {
          setTimeLeft('Идет розыгрыш...');
        } else {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft('');
    }
  }, [currentRound]);

  useEffect(() => {
    setPrevChatLength(chatMessages.length);
  }, [chatMessages]);

  const loadLottery = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user ? { 'X-User-Id': user.id.toString() } : {})
        },
        body: JSON.stringify({
          action: 'get_lottery'
        })
      });

      if (!response.ok) {
        console.error('Failed to load lottery:', response.status);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setCurrentRound(data.round);
        setTickets(data.tickets || []);
        if (user) {
          const userTickets = (data.tickets || [])
            .filter((t: LotteryTicket) => t.user_id === user.id)
            .map((t: LotteryTicket) => t.ticket_number);
          setMyTickets(userTickets);
        }
      }
    } catch (error) {
      console.error('Error loading lottery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChat = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'get_lottery_chat'
        })
      });

      if (!response.ok) {
        console.error('Failed to load chat:', response.status);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setChatMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const checkDraw = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'check_lottery_draw'
        })
      });

      if (!response.ok) {
        console.error('Failed to check lottery draw:', response.status);
        return;
      }

      const data = await response.json();
      if (data.success && data.processed_rounds > 0) {
        loadLottery();
        if (user) {
          loadNotifications();
        }
        if (onRefreshUserBalance) {
          onRefreshUserBalance();
        }
      }
    } catch (error) {
      console.error('Error checking lottery draw:', error);
    }
  };

  const loadNotifications = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'get_lottery_notifications'
        })
      });

      if (!response.ok) {
        console.error('Failed to load notifications:', response.status);
        return;
      }

      const data = await response.json();
      if (data.success) {
        const unreadNotifs = data.notifications.filter((n: LotteryNotification) => !n.is_read);
        setNotifications(unreadNotifs);
        
        unreadNotifs.forEach((notif: LotteryNotification) => {
          toast({
            title: 'Результат лотереи',
            description: notif.message,
            duration: 10000
          });
        });

        if (unreadNotifs.length > 0) {
          await fetch(AUTH_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-User-Id': user.id.toString()
            },
            body: JSON.stringify({
              action: 'mark_notifications_read'
            })
          });
        }
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'get_lottery_history'
        })
      });

      if (!response.ok) {
        console.error('Failed to load history:', response.status);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const sendMessage = async () => {
    if (!user) {
      onShowAuthDialog();
      return;
    }

    const trimmedMessage = chatMessage.trim();
    if (!trimmedMessage) {
      return;
    }

    if (trimmedMessage.length > 500) {
      toast({
        title: 'Ошибка',
        description: 'Сообщение слишком длинное (макс. 500 символов)',
        variant: 'destructive'
      });
      return;
    }

    setIsSendingMessage(true);

    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'send_lottery_chat',
          message: trimmedMessage
        })
      });

      const data = await response.json();
      if (data.success) {
        setChatMessage('');
        loadChat();
      } else {
        toast({
          title: 'Ошибка',
          description: data.message || 'Не удалось отправить сообщение',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка соединения с сервером',
        variant: 'destructive'
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  const buyTicket = async () => {
    if (!user) {
      onShowAuthDialog();
      return;
    }

    if (user.balance < TICKET_PRICE) {
      toast({
        title: 'Недостаточно средств',
        description: `Цена билета: ${TICKET_PRICE} USDT`,
        variant: 'destructive'
      });
      return;
    }

    if (tickets.length >= MAX_TICKETS) {
      toast({
        title: 'Лотерея заполнена',
        description: 'Все билеты проданы',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'buy_lottery_ticket',
          amount: TICKET_PRICE
        })
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Билет куплен!',
          description: `Ваш номер: ${data.ticket_number}`
        });
        loadLottery();
        if (onRefreshUserBalance) {
          onRefreshUserBalance();
        }
      } else {
        toast({
          title: 'Ошибка',
          description: data.message || 'Не удалось купить билет',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка соединения с сервером',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) loadHistory();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">🎫 Лотерея</h1>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  const availableTickets = MAX_TICKETS - tickets.length;
  const prizePool = tickets.length * TICKET_PRICE;
  const isDrawing = currentRound?.status === 'drawing';
  const isCompleted = currentRound?.status === 'completed';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">🎫 Лотерея</h1>
          <p className="text-muted-foreground">
            10 билетов по 50 USDT. Победитель получает 400 USDT
          </p>
        </div>
        <Button
          type="button"
          onClick={handleToggleHistory}
          variant="outline"
          className="gap-2"
        >
          <Icon name="History" size={18} />
          {showHistory ? 'Скрыть историю' : 'История победителей'}
        </Button>
      </div>

      <LotteryStats
        ticketsCount={tickets.length}
        maxTickets={MAX_TICKETS}
        prizePool={prizePool}
        timeLeft={timeLeft}
        isDrawing={isDrawing}
        isCompleted={isCompleted}
        availableTickets={availableTickets}
      />

      {isCompleted && currentRound?.winner_username && (
        <Card className="p-6 bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-yellow-600/30">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-yellow-600/30 flex items-center justify-center">
                <Icon name="Trophy" size={40} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold">🎉 Победитель определен!</h3>
            <p className="text-lg">
              <strong className="text-yellow-400">{currentRound.winner_username}</strong> выиграл{' '}
              <strong className="text-green-400">{PRIZE_AMOUNT} USDT</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Выигрышный билет: #{currentRound.winner_ticket_number}
            </p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LotteryTicketPurchase
          user={user}
          myTickets={myTickets}
          ticketPrice={TICKET_PRICE}
          isProcessing={isProcessing}
          availableTickets={availableTickets}
          isDrawing={isDrawing}
          isCompleted={isCompleted}
          timeLeft={timeLeft}
          onBuyTicket={buyTicket}
        />

        <LotteryChat
          user={user}
          chatMessages={chatMessages}
          chatMessage={chatMessage}
          isSendingMessage={isSendingMessage}
          chatEndRef={chatEndRef}
          onChatMessageChange={setChatMessage}
          onSendMessage={sendMessage}
          onKeyDown={(e) => e.key === 'Enter' && !isSendingMessage && sendMessage()}
        />
      </div>

      <LotteryParticipants
        tickets={tickets}
        maxTickets={MAX_TICKETS}
        ticketPrice={TICKET_PRICE}
        showHistory={showHistory}
        history={history}
        prizeAmount={PRIZE_AMOUNT}
        onToggleHistory={handleToggleHistory}
      />

      <Card className="p-6 bg-card/50">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="Info" size={20} className="text-indigo-400" />
          Правила лотереи
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• <strong>Билетов:</strong> всего 10 мест в каждом розыгрыше</p>
          <p>• <strong>Цена билета:</strong> {TICKET_PRICE} USDT</p>
          <p>• <strong>Приз:</strong> фиксированная сумма {PRIZE_AMOUNT} USDT победителю</p>
          <p>• <strong>Покупка:</strong> один игрок может купить неограниченное количество билетов</p>
          <p>• <strong>Розыгрыш:</strong> через {DRAW_DELAY_MINUTES} минуту после продажи всех билетов</p>
          <p>• <strong>Победитель:</strong> выбирается случайно из всех купленных билетов</p>
          <p>• <strong>Выплата:</strong> моментально на баланс победителя</p>
          <p>• <strong>Уведомления:</strong> все участники получат результаты розыгрыша</p>
          <p>• <strong>Чат:</strong> общайтесь с другими участниками во время ожидания розыгрыша</p>
        </div>
      </Card>
    </div>
  );
};

export default LotteryGame;
