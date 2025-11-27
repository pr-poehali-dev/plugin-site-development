import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';
import { ReferralStatsCard } from '@/components/referral/ReferralStatsCard';
import { ReferralCodeCard } from '@/components/referral/ReferralCodeCard';
import { ReferralBonusCard } from '@/components/referral/ReferralBonusCard';
import { ReferralsList } from '@/components/referral/ReferralsList';

const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';

interface Referral {
  id: number;
  status: string;
  total_deposited: number;
  created_at: string;
  completed_at?: string;
  referred_username: string;
  bonus_earned: number;
}

interface ReferralStats {
  total_referrals: number;
  completed: number;
  pending: number;
  active: number;
  can_claim: boolean;
  total_earned: number;
  total_claimed: number;
}

interface ReferralProgramPageProps {
  user: User;
}

const ReferralProgramPage = ({ user }: ReferralProgramPageProps) => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string>('');
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    total_referrals: 0,
    completed: 0,
    pending: 0,
    active: 0,
    can_claim: false,
    total_earned: 0,
    total_claimed: 0
  });
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [canClaimBonus, setCanClaimBonus] = useState(false);
  const [claimingBonus, setClaimingBonus] = useState(false);

  useEffect(() => {
    loadReferralInfo();
    checkBonusAvailability();
  }, [user.id]);

  const checkBonusAvailability = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const hasReferralCode = userData.referred_by_code && userData.referred_by_code.length > 0;
      const bonusClaimed = userData.referral_bonus_claimed === true;
      setCanClaimBonus(hasReferralCode && !bonusClaimed);
    }
  };

  const loadReferralInfo = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'get_referral_info'
        })
      });

      const data = await response.json();

      if (data.success) {
        setReferralCode(data.referral_code || '');
        setReferrals(data.referrals || []);
        
        const activeCount = data.referrals.filter((r: Referral) => r.status === 'active').length;
        const totalBonus = data.referrals.reduce((sum: number, r: Referral) => sum + (r.bonus_earned || 0), 0);
        
        setStats({
          ...data.stats,
          active: activeCount,
          total_earned: totalBonus
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки реферальной информации:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast({
        title: 'Скопировано',
        description: 'Реферальный код скопирован в буфер обмена'
      });
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = referralCode;
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }
      
      try {
        document.execCommand('copy');
        toast({
          title: 'Скопировано',
          description: 'Реферальный код скопирован в буфер обмена'
        });
      } catch (err) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось скопировать код',
          variant: 'destructive'
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const copyReferralLink = async () => {
    const link = `https://gitcrypto.pro/?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: 'Скопировано',
        description: 'Реферальная ссылка скопирована в буфер обмена'
      });
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }
      
      try {
        document.execCommand('copy');
        toast({
          title: 'Скопировано',
          description: 'Реферальная ссылка скопирована в буфер обмена'
        });
      } catch (err) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось скопировать ссылку',
          variant: 'destructive'
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const handleClaimBonus = async () => {
    setClaimingBonus(true);
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'claim_referral_bonus'
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '🎁 Бонус получен!',
          description: `Вам начислено ${data.bonus_amount} USDT. Новый баланс: ${data.new_balance} USDT`
        });
        
        const updatedUser = { ...user, balance: data.new_balance, referral_bonus_claimed: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        Object.assign(user, updatedUser);
        
        setCanClaimBonus(false);
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Ошибка получения бонуса',
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
      setClaimingBonus(false);
    }
  };

  const handleClaimReward = async () => {
    setClaiming(true);
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id.toString()
        },
        body: JSON.stringify({
          action: 'claim_referral_reward'
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '🎉 Награда получена!',
          description: `Вам начислено ${data.reward_amount} USDT. Новый баланс: ${data.new_balance} USDT`
        });
        
        const updatedUser = { ...user, balance: data.new_balance };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        Object.assign(user, updatedUser);
        
        loadReferralInfo();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Ошибка получения награды',
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
      setClaiming(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Реферальная программа
          </h1>
          <p className="text-muted-foreground">
            Приглашайте друзей и зарабатывайте вместе
          </p>
        </div>

        <ReferralStatsCard stats={stats} loading={loading} />

        <div className="grid md:grid-cols-1 gap-6">
          <ReferralCodeCard
            referralCode={referralCode}
            onCopyCode={copyReferralCode}
            onCopyLink={copyReferralLink}
          />
        </div>

        <ReferralBonusCard
          canClaimBonus={canClaimBonus}
          claimingBonus={claimingBonus}
          onClaimBonus={handleClaimBonus}
        />

        <ReferralsList
          referrals={referrals}
          stats={stats}
          claiming={claiming}
          onClaimReward={handleClaimReward}
        />
      </div>
    </div>
  );
};

export default ReferralProgramPage;
