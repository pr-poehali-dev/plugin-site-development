import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

const TICKETS_URL = 'https://functions.poehali.dev/f2a5cbce-6afc-4ef1-91a6-f14075db8567';

interface TicketMessage {
  id: number;
  ticket_id: number;
  user_id: number | null;
  author_username: string;
  message: string;
  is_admin: boolean;
  created_at: string;
}

interface SupportTicket {
  id: number;
  user_id: number;
  username: string;
  category: string;
  subject: string;
  message: string;
  status: 'open' | 'answered' | 'closed';
  created_at: string;
  admin_response?: string;
  answered_at?: string;
  answered_by?: string;
}

interface UserTicketsPageProps {
  user: User;
}

const UserTicketsPage = ({ user }: UserTicketsPageProps) => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const categoryLabels: Record<string, string> = {
    account: 'Аккаунт',
    payment: 'Платежи',
    exchange: 'Обменник',
    smart_contracts: 'Смарт-контракты',
    flash_btc: 'Flash BTC',
    garant: 'Гарант сделка',
    flash: 'Flash USDT',
    complaint: 'Жалобы, обман',
    forum: 'Форум',
    technical: 'Технические',
    other: 'Другое'
  };

  const statusLabels: Record<string, { label: string; color: string; icon: string }> = {
    open: { label: 'Открыт', color: 'text-yellow-500 bg-yellow-500/20', icon: 'Clock' },
    answered: { label: 'Отвечен', color: 'text-blue-500 bg-blue-500/20', icon: 'MessageCircle' },
    closed: { label: 'Закрыт', color: 'text-green-500 bg-green-500/20', icon: 'CheckCircle' }
  };

  useEffect(() => {
    loadTickets();
  }, [user.id]);

  useEffect(() => {
    if (selectedTicket) {
      loadMessages(selectedTicket.id);
    }
  }, [selectedTicket]);

  const loadTickets = async () => {
    try {
      const response = await fetch(`${TICKETS_URL}?action=user_tickets&user_id=${user.id}`, {
        headers: { 'X-User-Id': user.id.toString() }
      });
      const data = await response.json();
      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки тикетов:', error);
    }
  };

  const loadMessages = async (ticketId: number) => {
    try {
      const response = await fetch(TICKETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'get_messages',
          ticket_id: ticketId
        })
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error);
    }
  };

  const sendMessage = async () => {
    if (!selectedTicket || !newMessage.trim()) return;

    setSendingMessage(true);
    try {
      const response = await fetch(TICKETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'send_message',
          ticket_id: selectedTicket.id,
          user_id: user.id,
          author_username: user.username,
          message: newMessage.trim(),
          is_admin: false
        })
      });

      const data = await response.json();
      if (data.success) {
        setNewMessage('');
        loadMessages(selectedTicket.id);
        loadTickets();
        toast({
          title: 'Отправлено',
          description: 'Ваше сообщение отправлено администратору'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить сообщение',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение',
        variant: 'destructive'
      });
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">📬 Мои обращения</h1>
        <p className="text-muted-foreground">
          Здесь вы можете отслеживать статус ваших обращений в поддержку
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</p>
              <p className="text-xs text-muted-foreground">Ожидают ответа</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Icon name="MessageCircle" size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'answered').length}</p>
              <p className="text-xs text-muted-foreground">Получен ответ</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'closed').length}</p>
              <p className="text-xs text-muted-foreground">Закрыто</p>
            </div>
          </div>
        </Card>
      </div>

      {tickets.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="Inbox" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">У вас пока нет обращений</h3>
          <p className="text-muted-foreground mb-4">
            Если у вас возникнут вопросы, создайте тикет в разделе "Поддержка"
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card 
              key={ticket.id}
              className={`p-4 transition-all hover:shadow-lg ${
                selectedTicket?.id === ticket.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusLabels[ticket.status].color}`}>
                        <Icon name={statusLabels[ticket.status].icon as any} size={14} />
                        {statusLabels[ticket.status].label}
                      </span>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {categoryLabels[ticket.category] || ticket.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        #{ticket.id}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{ticket.subject}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {new Date(ticket.created_at).toLocaleString('ru-RU')}
                    </p>
                    {ticket.status === 'answered' && ticket.answered_by && (
                      <div className="mt-3 p-2.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-l-2 border-green-500/50 rounded-r">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon name="UserCheck" size={12} className="text-green-400" />
                          <span className="text-xs font-bold text-green-400">
                            Администратор {ticket.answered_by} ответил
                          </span>
                          {ticket.answered_at && (
                            <span className="text-xs text-muted-foreground">
                              • {new Date(ticket.answered_at).toLocaleString('ru-RU', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Откройте тикет ниже, чтобы прочитать все сообщения</p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
                  >
                    <Icon name={selectedTicket?.id === ticket.id ? 'ChevronUp' : 'ChevronDown'} size={16} />
                  </Button>
                </div>

                {selectedTicket?.id === ticket.id && (
                  <div className="pt-3 border-t space-y-4">
                    <div className="bg-muted/20 rounded-lg p-3 max-h-[400px] overflow-y-auto space-y-3">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-start gap-2 ${msg.is_admin ? '' : 'flex-row-reverse'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.is_admin ? 'bg-gradient-to-br from-green-500 to-emerald-600 ring-2 ring-green-500/30' : 'bg-primary/20'
                          }`}>
                            <Icon name={msg.is_admin ? 'UserCheck' : 'User'} size={16} className={msg.is_admin ? 'text-white' : 'text-primary'} />
                          </div>
                          <div className="flex-1">
                            <div className={`rounded-lg p-3 ${
                              msg.is_admin 
                                ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-l-4 border-green-500/50 shadow-sm' 
                                : 'bg-primary/10 border border-primary/20'
                            }`}>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-xs font-semibold">{msg.author_username}</span>
                                {msg.is_admin && (
                                  <span className="px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-[10px] rounded-full font-bold border border-green-500/30 uppercase">
                                    ★ Администратор
                                  </span>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {new Date(msg.created_at).toLocaleString('ru-RU', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className={`text-sm whitespace-pre-wrap ${msg.is_admin ? 'text-foreground font-medium' : ''}`}>{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {ticket.status !== 'closed' && (
                      <div className="space-y-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Напишите ваше сообщение администратору..."
                          rows={3}
                          maxLength={1000}
                          disabled={sendingMessage}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {newMessage.length}/1000 символов
                          </span>
                          <Button
                            onClick={sendMessage}
                            disabled={!newMessage.trim() || sendingMessage}
                            size="sm"
                          >
                            {sendingMessage ? (
                              <>
                                <Icon name="Loader2" size={16} className="animate-spin mr-1" />
                                Отправка...
                              </>
                            ) : (
                              <>
                                <Icon name="Send" size={16} className="mr-1" />
                                Отправить
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {ticket.status === 'closed' && (
                      <div className="bg-muted/50 border border-border p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Lock" size={16} />
                          <span>Тикет закрыт. Создайте новый тикет, если у вас есть вопросы.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTicketsPage;