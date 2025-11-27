import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ReferralBonusCardProps {
  canClaimBonus: boolean;
  claimingBonus: boolean;
  onClaimBonus: () => void;
}

export const ReferralBonusCard = ({ canClaimBonus, claimingBonus, onClaimBonus }: ReferralBonusCardProps) => {
  if (!canClaimBonus) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <Icon name="Gift" size={24} className="text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Бонус за регистрацию по реферальной ссылке</h3>
            <p className="text-sm text-muted-foreground">Получите 5 USDT за регистрацию</p>
          </div>
        </div>
        <Button
          onClick={onClaimBonus}
          disabled={claimingBonus}
          className="bg-green-600 hover:bg-green-700"
        >
          {claimingBonus ? 'Получение...' : 'Получить 5 USDT'}
        </Button>
      </div>
    </Card>
  );
};
