import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';
import { BtcPriceCard } from './exchange/BtcPriceCard';
import { ExchangeForm } from './exchange/ExchangeForm';
import { WithdrawForm } from './exchange/WithdrawForm';

const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';
const BTC_PRICE_URL = 'https://functions.poehali.dev/bdf92326-10c7-4f4f-bc94-761a9ea4ed96';

interface ExchangePageProps {
  user: User;
  onRefreshUserBalance?: () => void;
}

const ExchangePage = ({ user, onRefreshUserBalance }: ExchangePageProps) => {
  const { toast } = useToast();
  const [usdtAmount, setUsdtAmount] = useState<string>('');
  const [btcAmount, setBtcAmount] = useState<string>('');
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [prevBtcPrice, setPrevBtcPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<'up' | 'down' | 'neutral'>('neutral');
  const [loading, setLoading] = useState(false);
  const [btcBalance, setBtcBalance] = useState<number>(0);
  const [priceLoading, setPriceLoading] = useState(true);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  useEffect(() => {
    loadBtcBalance();
    loadBtcPrice();
    const interval = setInterval(loadBtcPrice, 1000);
    return () => clearInterval(interval);
  }, [user.id]);

  const loadBtcPrice = async () => {
    try {
      const response = await fetch(BTC_PRICE_URL);
      const data = await response.json();
      
      if (!data.success || !data.btc_price) {
        throw new Error('Invalid response from BTC price API');
      }
      
      const newPrice = data.btc_price;
      
      if (btcPrice > 0) {
        setPrevBtcPrice(btcPrice);
        if (newPrice > btcPrice) {
          setPriceChange('up');
        } else if (newPrice < btcPrice) {
          setPriceChange('down');
        } else {
          setPriceChange('neutral');
        }
        
        setTimeout(() => setPriceChange('neutral'), 2000);
      }
      
      setBtcPrice(newPrice);
    } catch (error) {
      console.error('Ошибка загрузки курса BTC:', error);
    } finally {
      setPriceLoading(false);
    }
  };

  const loadBtcBalance = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'get_btc_balance'
        })
      });

      const data = await response.json();
      if (data.success) {
        setBtcBalance(data.btc_balance || 0);
      }
    } catch (error) {
      console.error('Ошибка загрузки BTC баланса:', error);
    }
  };

  const handleUsdtToBtcChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setUsdtAmount(value);
    if (btcPrice > 0 && numValue > 0) {
      const commission = numValue * 0.005;
      const afterCommission = numValue - commission;
      const btcResult = afterCommission / btcPrice;
      setBtcAmount(btcResult > 0 ? btcResult.toFixed(8) : '0.00000000');
    } else {
      setBtcAmount('');
    }
  };

  const handleBtcToUsdtChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setBtcAmount(value);
    if (btcPrice > 0 && numValue > 0) {
      const gross = numValue * btcPrice;
      const commission = gross * 0.005;
      const afterCommission = gross - commission;
      setUsdtAmount(afterCommission > 0 ? afterCommission.toFixed(2) : '0.00');
    } else {
      setUsdtAmount('');
    }
  };

  const handleExchangeUsdtToBtc = async () => {
    const usdt = parseFloat(usdtAmount);
    
    if (!usdt || usdt <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму',
        variant: 'destructive'
      });
      return;
    }

    if (usdt > Number(user.balance || 0)) {
      toast({
        title: 'Недостаточно средств',
        description: 'На вашем балансе недостаточно USDT',
        variant: 'destructive'
      });
      return;
    }

    if (usdt < 10) {
      toast({
        title: 'Минимальная сумма',
        description: 'Минимальная сумма обмена: 10 USDT',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'exchange_usdt_to_btc',
          usdt_amount: usdt,
          btc_price: btcPrice
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '✅ Обмен выполнен!',
          description: `Вы обменяли ${usdt} USDT на ${data.btc_received} BTC`
        });
        
        if (onRefreshUserBalance) {
          onRefreshUserBalance();
        }
        
        loadBtcBalance();
        setUsdtAmount('');
        setBtcAmount('');
      } else {
        if (data.current_price) {
          setBtcPrice(data.current_price);
          toast({
            title: 'Курс обновлён',
            description: data.error || 'Цена BTC устарела. Попробуйте снова.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Ошибка',
            description: data.error || 'Ошибка обмена',
            variant: 'destructive'
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка подключения к серверу',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExchangeBtcToUsdt = async () => {
    const btc = parseFloat(btcAmount);
    
    if (!btc || btc <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму',
        variant: 'destructive'
      });
      return;
    }

    if (btc > btcBalance) {
      toast({
        title: 'Недостаточно средств',
        description: 'На вашем балансе недостаточно BTC',
        variant: 'destructive'
      });
      return;
    }

    if (btc < 0.0001) {
      toast({
        title: 'Минимальная сумма',
        description: 'Минимальная сумма обмена: 0.0001 BTC',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'exchange_btc_to_usdt',
          btc_amount: btc,
          btc_price: btcPrice
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '✅ Обмен выполнен!',
          description: `Вы обменяли ${btc} BTC на ${data.usdt_received} USDT`
        });
        
        if (onRefreshUserBalance) {
          onRefreshUserBalance();
        }
        
        loadBtcBalance();
        setUsdtAmount('');
        setBtcAmount('');
      } else {
        if (data.current_price) {
          setBtcPrice(data.current_price);
          toast({
            title: 'Курс обновлён',
            description: data.error || 'Цена BTC устарела. Попробуйте снова.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Ошибка',
            description: data.error || 'Ошибка обмена',
            variant: 'destructive'
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка подключения к серверу',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму',
        variant: 'destructive'
      });
      return;
    }

    if (amount > btcBalance) {
      toast({
        title: 'Недостаточно средств',
        description: 'На вашем балансе недостаточно BTC',
        variant: 'destructive'
      });
      return;
    }

    if (amount < 0.001) {
      toast({
        title: 'Минимальная сумма',
        description: 'Минимальная сумма вывода: 0.001 BTC',
        variant: 'destructive'
      });
      return;
    }

    if (!withdrawAddress || withdrawAddress.length < 26) {
      toast({
        title: 'Некорректный адрес',
        description: 'Укажите корректный BTC адрес',
        variant: 'destructive'
      });
      return;
    }

    setWithdrawLoading(true);

    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'withdraw_btc',
          btc_amount: amount,
          address: withdrawAddress
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '✅ Вывод инициирован',
          description: `Отправка ${amount} BTC на адрес ${withdrawAddress.substring(0, 10)}...`
        });
        
        loadBtcBalance();
        setWithdrawAddress('');
        setWithdrawAmount('');
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Ошибка вывода',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка подключения к серверу',
        variant: 'destructive'
      });
    } finally {
      setWithdrawLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Обмен валют</h1>
        <p className="text-muted-foreground">
          Обменивайте USDT на BTC по актуальному курсу
        </p>
      </div>

      <BtcPriceCard 
        btcPrice={btcPrice}
        priceChange={priceChange}
        priceLoading={priceLoading}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="Repeat" size={20} className="text-primary" />
            <h2 className="text-xl font-bold">Обмен</h2>
          </div>
          
          <ExchangeForm
            usdtAmount={usdtAmount}
            btcAmount={btcAmount}
            usdtBalance={user.balance || 0}
            btcBalance={btcBalance}
            onUsdtToBtcChange={handleUsdtToBtcChange}
            onBtcToUsdtChange={handleBtcToUsdtChange}
            onExchangeUsdtToBtc={handleExchangeUsdtToBtc}
            onExchangeBtcToUsdt={handleExchangeBtcToUsdt}
            loading={loading}
            btcPrice={btcPrice}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="Send" size={20} className="text-primary" />
            <h2 className="text-xl font-bold">Вывод BTC</h2>
          </div>

          <WithdrawForm
            btcBalance={btcBalance}
            withdrawAddress={withdrawAddress}
            withdrawAmount={withdrawAmount}
            onAddressChange={setWithdrawAddress}
            onAmountChange={setWithdrawAmount}
            onWithdraw={handleWithdraw}
            loading={withdrawLoading}
          />
        </div>
      </div>

      <Card className="p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Обмен происходит по текущему рыночному курсу</p>
            <p>• Комиссия за обмен: 0.5%</p>
            <p>• Минимальная сумма обмена: 10 USDT или 0.0001 BTC</p>
            <p>• Минимальная сумма вывода: 0.001 BTC</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExchangePage;
