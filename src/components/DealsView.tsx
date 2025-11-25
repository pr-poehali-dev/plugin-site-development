import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Deal, User } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { DealCard } from './deals/DealCard';
import { DealDialog } from './deals/DealDialog';
import { CreateDealDialog } from './deals/CreateDealDialog';

const DEALS_URL = 'https://functions.poehali.dev/8a665174-b0af-4138-82e0-a9422dbb8fc4';

interface DealsViewProps {
  user: User | null;
  onShowAuthDialog: () => void;
  onRefreshUserBalance?: () => void;
}

export const DealsView = ({ user, onShowAuthDialog, onRefreshUserBalance }: DealsViewProps) => {
  const { toast } = useToast();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [dealMessages, setDealMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const [statusFilter, setStatusFilter] = useState<'active' | 'my_deals' | 'completed'>('active');
  
  const [newDeal, setNewDeal] = useState({
    title: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchDeals();
  }, [statusFilter, user]);

  useEffect(() => {
    if (selectedDeal) {
      const interval = setInterval(() => {
        fetchDealDetails(selectedDeal.id);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedDeal]);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const url = new URL(DEALS_URL);
      url.searchParams.set('action', 'list');
      url.searchParams.set('status', statusFilter);
      
      const headers: HeadersInit = {};
      if (user && statusFilter !== 'active') {
        headers['X-User-Id'] = user.id.toString();
      }
      
      const response = await fetch(url.toString(), { headers });
      const data = await response.json();
      if (data.deals) {
        setDeals(data.deals);
      }
    } catch (error) {
      console.error('Ошибка загрузки сделок:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDealDetails = async (dealId: number) => {
    try {
      const headers: HeadersInit = {};
      if (user) {
        headers['X-User-Id'] = user.id.toString();
      }
      
      const response = await fetch(`${DEALS_URL}?action=deal&id=${dealId}`, { headers });
      const data = await response.json();
      if (data.deal) {
        setSelectedDeal(data.deal);
        setDealMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки деталей сделки:', error);
    }
  };

  const createDeal = async () => {
    if (!user) {
      onShowAuthDialog();
      return;
    }

    if (!newDeal.title || !newDeal.description || !newDeal.price) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    if (creating) return;
    setCreating(true);

    try {
      const response = await fetch(DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'create_deal',
          title: newDeal.title,
          description: newDeal.description,
          price: parseFloat(newDeal.price)
        })
      });

      const data = await response.json();
      if (data.success) {
        setShowCreateDialog(false);
        setNewDeal({ title: '', description: '', price: '' });
        toast({
          title: 'Успешно',
          description: 'Объявление создано!'
        });
        fetchDeals();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Ошибка создания объявления',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Ошибка создания сделки:', error);
      toast({
        title: 'Ошибка',
        description: 'Ошибка создания объявления',
        variant: 'destructive'
      });
    } finally {
      setCreating(false);
    }
  };

  const handleBuyerPay = async () => {
    if (!user || !selectedDeal) return;
    if (actionLoading) return;
    
    if ((user.balance || 0) < selectedDeal.price) {
      toast({
        title: 'Недостаточно средств',
        description: `У вас: ${(user.balance || 0).toFixed(2)} USDT, требуется: ${selectedDeal.price} USDT`,
        variant: 'destructive'
      });
      return;
    }
    
    setActionLoading(true);

    try {
      const response = await fetch(DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'buyer_pay',
          deal_id: selectedDeal.id
        })
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: '✅ Успешно',
          description: 'Средства заблокированы. Ожидайте передачи товара от продавца',
          duration: 5000
        });
        onRefreshUserBalance?.();
        await fetchDealDetails(selectedDeal.id);
        setStatusFilter('my_deals');
        fetchDeals();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Ошибка оплаты',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        title: 'Ошибка',
        description: 'Ошибка подключения к серверу',
        variant: 'destructive'
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSellerSent = async () => {
    if (!user || !selectedDeal || actionLoading) return;
    setActionLoading(true);

    try {
      const response = await fetch(DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'seller_sent',
          deal_id: selectedDeal.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Отлично!',
          description: 'Покупатель уведомлен. Ожидайте подтверждения получения'
        });
        await fetchDealDetails(selectedDeal.id);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBuyerConfirm = async () => {
    if (!user || !selectedDeal || actionLoading) return;
    setShowConfirmDialog(true);
  };

  const confirmBuyerConfirm = async () => {
    if (!user || !selectedDeal || actionLoading) return;
    
    setShowConfirmDialog(false);
    setActionLoading(true);

    try {
      const response = await fetch(DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'buyer_confirm',
          deal_id: selectedDeal.id
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: '🎉 Сделка завершена!',
          description: 'Средства переведены продавцу',
          duration: 5000
        });
        
        onRefreshUserBalance?.();
        await fetchDealDetails(selectedDeal.id);
        fetchDeals();
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDispute = async () => {
    if (!user || !selectedDeal || actionLoading) return;
    setActionLoading(true);

    try {
      const response = await fetch(DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'open_dispute',
          deal_id: selectedDeal.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Спор открыт',
          description: 'Администрация рассмотрит ваш случай в течение 24 часов'
        });
        await fetchDealDetails(selectedDeal.id);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelDeal = async () => {
    if (!user || !selectedDeal || actionLoading) return;
    setActionLoading(true);

    try {
      const response = await fetch(DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'cancel_deal',
          deal_id: selectedDeal.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Объявление отменено',
          description: 'Объявление удалено'
        });
        setSelectedDeal(null);
        fetchDeals();
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!user || !selectedDeal || !newMessage.trim()) return;

    try {
      const response = await fetch(DEALS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'send_message',
          deal_id: selectedDeal.id,
          message: newMessage.trim()
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setNewMessage('');
        await fetchDealDetails(selectedDeal.id);
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Сделки P2P</h1>
        <p className="text-muted-foreground">
          Безопасная покупка и продажа с гарантом
        </p>
      </div>

      <Card className="p-6 bg-card/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Как это работает?</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>1️⃣ Продавец создает объявление о продаже</p>
              <p>2️⃣ Покупатель оплачивает — средства блокируются на платформе</p>
              <p>3️⃣ Продавец передает товар покупателю</p>
              <p>4️⃣ Покупатель подтверждает получение — средства переводятся продавцу</p>
              <p className="text-primary font-medium mt-2">💡 Все сделки защищены. В случае спора — арбитраж администрации</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === 'active' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('active')}
            size="sm"
          >
            <Icon name="ShoppingBag" size={16} className="mr-2" />
            Активные
          </Button>
          <Button
            variant={statusFilter === 'my_deals' ? 'default' : 'outline'}
            onClick={() => {
              if (!user) {
                onShowAuthDialog();
                return;
              }
              setStatusFilter('my_deals');
            }}
            size="sm"
          >
            <Icon name="User" size={16} className="mr-2" />
            Мои сделки
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'default' : 'outline'}
            onClick={() => {
              if (!user) {
                onShowAuthDialog();
                return;
              }
              setStatusFilter('completed');
            }}
            size="sm"
          >
            <Icon name="CheckCircle2" size={16} className="mr-2" />
            Завершенные
          </Button>
        </div>
        
        <Button
          onClick={() => {
            if (!user) {
              onShowAuthDialog();
              return;
            }
            setShowCreateDialog(true);
          }}
        >
          <Icon name="Plus" size={18} className="mr-2" />
          Создать объявление
        </Button>
      </div>

      {loading ? (
        <Card className="p-8">
          <div className="flex items-center justify-center gap-3">
            <Icon name="Loader2" size={24} className="animate-spin text-primary" />
            <p className="text-muted-foreground">Загрузка сделок...</p>
          </div>
        </Card>
      ) : deals.length === 0 ? (
        <Card className="p-8">
          <div className="text-center space-y-3">
            <Icon name="PackageOpen" size={48} className="mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              {statusFilter === 'active' && 'Нет активных объявлений'}
              {statusFilter === 'my_deals' && 'У вас пока нет сделок'}
              {statusFilter === 'completed' && 'Нет завершенных сделок'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              user={user}
              onClick={(deal) => {
                setSelectedDeal(deal);
                fetchDealDetails(deal.id);
              }}
            />
          ))}
        </div>
      )}

      <CreateDealDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        newDeal={newDeal}
        onDealChange={setNewDeal}
        onSubmit={createDeal}
        creating={creating}
      />

      <DealDialog
        open={!!selectedDeal}
        onOpenChange={(open) => !open && setSelectedDeal(null)}
        deal={selectedDeal}
        user={user}
        messages={dealMessages}
        newMessage={newMessage}
        onMessageChange={setNewMessage}
        onSendMessage={sendMessage}
        onBuyerPay={handleBuyerPay}
        onSellerSent={handleSellerSent}
        onBuyerConfirm={handleBuyerConfirm}
        onDispute={handleDispute}
        onCancelDeal={handleCancelDeal}
        actionLoading={actionLoading}
      />

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердить получение товара?</DialogTitle>
            <DialogDescription>
              После подтверждения средства будут переведены продавцу. Это действие нельзя отменить.
              Подтверждайте только если вы действительно получили товар/услугу.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowConfirmDialog(false)}
              variant="outline"
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={confirmBuyerConfirm}
              className="flex-1"
            >
              Подтвердить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
