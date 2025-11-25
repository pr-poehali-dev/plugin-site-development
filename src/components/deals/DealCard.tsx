import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { getAvatarGradient } from '@/utils/avatarColors';
import { Deal, User } from '@/types';

interface DealCardProps {
  deal: Deal;
  user: User | null;
  onClick: (deal: Deal) => void;
}

export const DealCard = ({ deal, user, onClick }: DealCardProps) => {
  const isMyDeal = user && (deal.seller_id === user.id || deal.buyer_id === user.id);
  const isSeller = user && deal.seller_id === user.id;
  const isBuyer = user && deal.buyer_id === user.id;

  const getStatusBadge = () => {
    if (deal.status === 'active') {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активна</Badge>;
    }
    if (deal.status === 'paid') {
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Оплачена</Badge>;
    }
    if (deal.status === 'sent') {
      return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Отправлена</Badge>;
    }
    if (deal.status === 'completed') {
      return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Завершена</Badge>;
    }
    if (deal.status === 'cancelled') {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Отменена</Badge>;
    }
    if (deal.status === 'dispute') {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Спор</Badge>;
    }
    return null;
  };

  const getStatusDescription = () => {
    if (deal.status === 'active') return 'Ожидает покупателя';
    if (deal.status === 'paid') return isSeller ? 'Покупатель оплатил, передайте товар' : 'Вы оплатили, ожидайте товар';
    if (deal.status === 'sent') return isSeller ? 'Вы отправили товар, ожидайте подтверждения' : 'Продавец отправил товар, подтвердите получение';
    if (deal.status === 'completed') return 'Сделка успешно завершена';
    if (deal.status === 'cancelled') return 'Сделка отменена';
    if (deal.status === 'dispute') return 'Сделка в споре, ожидайте решения администрации';
    return '';
  };

  return (
    <Card
      className="p-4 sm:p-6 cursor-pointer hover:bg-card/80 transition-colors border-primary/20"
      onClick={() => onClick(deal)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              {deal.seller_avatar_url ? (
                <AvatarImage src={deal.seller_avatar_url} alt={deal.seller_username} />
              ) : (
                <AvatarFallback className={getAvatarGradient(deal.seller_id)}>
                  {deal.seller_username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold truncate">{deal.seller_username}</span>
                {isMyDeal && (
                  <Badge variant="outline" className="text-xs">
                    {isSeller ? 'Вы продавец' : 'Вы покупатель'}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(deal.created_at).toLocaleString('ru-RU')}
              </p>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2">{deal.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{deal.description}</p>
          
          <div className="flex flex-wrap items-center gap-3">
            {getStatusBadge()}
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Icon name="DollarSign" size={20} />
              {deal.price.toFixed(2)} USDT
            </div>
          </div>

          {isMyDeal && (
            <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-400">{getStatusDescription()}</p>
            </div>
          )}
        </div>

        <Icon name="ChevronRight" size={20} className="text-muted-foreground flex-shrink-0" />
      </div>
    </Card>
  );
};
