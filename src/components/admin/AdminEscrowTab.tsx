import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { EscrowDeal, User } from '@/types';
import { useToast } from '@/hooks/use-toast';

const ESCROW_URL = 'https://functions.poehali.dev/82c75fbc-83e4-4448-9ff8-1c8ef9bbec09';

interface AdminEscrowTabProps {
  deals: EscrowDeal[];
  currentUser: User;
  onUpdate: () => void;
}

const AdminEscrowTab = ({ deals, currentUser, onUpdate }: AdminEscrowTabProps) => {
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Открытая</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">В процессе</Badge>;
      case 'completed':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Завершена</Badge>;
      case 'dispute':
        return <Badge variant="destructive">Спор</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDeleteDeal = async (dealId: number, dealTitle: string) => {
    if (!confirm(`Удалить сделку "${dealTitle}"? Это действие нельзя отменить.`)) return;

    try {
      const response = await fetch(ESCROW_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': currentUser.id.toString()
        },
        body: JSON.stringify({
          action: 'delete_deal',
          deal_id: dealId
        })
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Успешно',
          description: 'Сделка удалена'
        });
        onUpdate();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Ошибка удаления сделки',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Ошибка удаления сделки:', error);
      toast({
        title: 'Ошибка',
        description: 'Ошибка удаления сделки',
        variant: 'destructive'
      });
    }
  };

  const openDeals = deals.filter(d => d.status === 'open' || d.status === 'in_progress');
  const completedDeals = deals.filter(d => d.status === 'completed');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="ShoppingCart" size={24} className="text-green-400" />
          Открытые сделки ({openDeals.length})
        </h3>
        {openDeals.length === 0 ? (
          <Card className="p-8 text-center">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Нет открытых сделок</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {openDeals.map((deal) => (
              <Card key={deal.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{deal.title}</h4>
                      {getStatusBadge(deal.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Store" size={16} className="text-green-400" />
                        <span>{deal.seller_name}</span>
                      </div>
                      {deal.buyer_name && (
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-blue-400" />
                          <span>{deal.buyer_name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" size={16} className="text-yellow-400" />
                        <span>{deal.price} USDT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span>{new Date(deal.created_at).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteDeal(deal.id, deal.title)}
                    variant="destructive"
                    size="sm"
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="CheckCircle2" size={24} className="text-purple-400" />
          Завершенные сделки ({completedDeals.length})
        </h3>
        {completedDeals.length === 0 ? (
          <Card className="p-8 text-center">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Нет завершенных сделок</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {completedDeals.map((deal) => (
              <Card key={deal.id} className="p-4 bg-purple-500/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{deal.title}</h4>
                      {getStatusBadge(deal.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Store" size={16} className="text-green-400" />
                        <span>{deal.seller_name}</span>
                      </div>
                      {deal.buyer_name && (
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-blue-400" />
                          <span>{deal.buyer_name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" size={16} className="text-yellow-400" />
                        <span>{deal.price} USDT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span>{new Date(deal.created_at).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteDeal(deal.id, deal.title)}
                    variant="destructive"
                    size="sm"
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEscrowTab;
