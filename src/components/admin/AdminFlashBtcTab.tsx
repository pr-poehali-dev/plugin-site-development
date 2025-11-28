import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface FlashBtcOrder {
  id: number;
  user_id: number;
  username: string;
  email: string;
  package_id: number;
  amount: number;
  price: number;
  wallet_address: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminFlashBtcTab = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<FlashBtcOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
      const response = await fetch('https://functions.poehali.dev/66bb459b-0c13-41ae-b1cf-c50711528da2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        }
      });

      const data = await response.json();

      if (response.ok && data.orders) {
        setOrders(data.orders);
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось загрузить заказы',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заказы',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.wallet_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.amount.toString()), 0);
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.price.toString()), 0);

  const getPackageName = (packageId: number) => {
    if (packageId === 0) return 'Тестовая покупка';
    return `Пакет #${packageId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'pending': return 'В обработке';
      case 'failed': return 'Ошибка';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Icon name="Bitcoin" size={28} className="text-orange-400" />
            Модерирование Flash BTC
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Управление заказами Flash Bitcoin</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors"
        >
          <Icon name="RefreshCw" size={16} />
          Обновить
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Всего заказов</p>
              <p className="text-3xl font-bold">{totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={24} className="text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Продано BTC</p>
              <p className="text-3xl font-bold">{totalAmount.toFixed(4)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Icon name="Bitcoin" size={24} className="text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Выручка</p>
              <p className="text-3xl font-bold">${totalRevenue.toLocaleString('ru-RU')}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Search" size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по пользователю, email, кошельку или ID заказа..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm"
          />
        </div>
      </Card>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="p-8 text-center">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              {searchTerm ? 'Заказы не найдены' : 'Заказов пока нет'}
            </p>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="p-6 border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">Заказ #{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                        {order.package_id === 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            <Icon name="TestTube" size={12} className="mr-1" />
                            Тест
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="User" size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Пользователь</p>
                          <p className="font-medium">{order.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-medium text-sm">{order.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="Package" size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Пакет</p>
                          <p className="font-medium">{getPackageName(order.package_id)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Bitcoin" size={16} className="text-orange-400" />
                        <div>
                          <p className="text-xs text-muted-foreground">Количество</p>
                          <p className="font-bold text-orange-400">{order.amount} BTC</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Icon name="Wallet" size={16} className="text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Bitcoin кошелек</p>
                        <code className="text-xs bg-muted px-2 py-1 rounded break-all font-mono">
                          {order.wallet_address}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:text-right space-y-2 lg:pl-6 lg:border-l">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Сумма</p>
                    <p className="text-3xl font-bold text-green-400">
                      ${order.price.toLocaleString('ru-RU')}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ID: {order.user_id}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFlashBtcTab;
