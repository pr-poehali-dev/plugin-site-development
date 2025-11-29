import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ReferralStats {
  total_referrals: number;
  completed: number;
  pending: number;
  active: number;
  can_claim: boolean;
  total_earned: number;
  total_claimed: number;
}

interface ReferralStatsCardProps {
  stats: ReferralStats;
  loading: boolean;
}

export const ReferralStatsCard = ({ stats, loading }: ReferralStatsCardProps) => {
  const statCards = [
    {
      icon: 'Users',
      label: 'Всего рефералов',
      value: stats.total_referrals,
      color: 'text-blue-400'
    },
    {
      icon: 'CheckCircle',
      label: 'Выполнили условие',
      value: stats.completed,
      color: 'text-green-400'
    },
    {
      icon: 'Clock',
      label: 'Ожидают выполнения',
      value: stats.pending,
      color: 'text-yellow-400'
    },
    {
      icon: 'Activity',
      label: 'Активны',
      value: stats.active,
      color: 'text-purple-400'
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon name="TrendingUp" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Статистика</h2>
          <p className="text-sm text-muted-foreground">Ваши рефералы</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
            <Icon name={stat.icon as any} size={20} className={`mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold mb-1">{loading ? '...' : stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2">
            <Icon name="DollarSign" size={20} className="text-green-400" />
            <span className="text-sm text-muted-foreground">Всего заработано</span>
          </div>
          <span className="text-lg font-bold text-green-400">
            {loading ? '...' : Number(stats.total_earned || 0).toFixed(2)} USDT
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-2">
            <Icon name="Wallet" size={20} className="text-blue-400" />
            <span className="text-sm text-muted-foreground">Получено</span>
          </div>
          <span className="text-lg font-bold text-blue-400">
            {loading ? '...' : Number(stats.total_claimed || 0).toFixed(2)} USDT
          </span>
        </div>
      </div>
    </Card>
  );
};