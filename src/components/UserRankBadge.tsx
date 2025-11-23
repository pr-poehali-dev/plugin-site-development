import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UserRankBadgeProps {
  forumRole?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getRankConfig = (role?: string) => {
  const configs: Record<string, { label: string; icon: string; gradient: string; border: string }> = {
    admin: {
      label: 'Администратор',
      icon: 'Shield',
      gradient: 'from-red-500 to-orange-500',
      border: 'border-red-500/30'
    },
    moderator: {
      label: 'Модератор',
      icon: 'ShieldCheck',
      gradient: 'from-purple-500 to-pink-500',
      border: 'border-purple-500/30'
    },
    vip: {
      label: 'VIP',
      icon: 'Crown',
      gradient: 'from-yellow-500 to-amber-500',
      border: 'border-yellow-500/30'
    },
    member: {
      label: 'Участник',
      icon: 'Users',
      gradient: 'from-blue-500 to-cyan-500',
      border: 'border-blue-500/30'
    },
    newbie: {
      label: 'Новичок',
      icon: 'User',
      gradient: 'from-gray-500 to-gray-600',
      border: 'border-gray-500/30'
    }
  };

  return configs[role || 'newbie'] || configs.newbie;
};

const UserRankBadge = ({ forumRole, size = 'md', className = '' }: UserRankBadgeProps) => {
  const config = getRankConfig(forumRole);
  
  const sizes = {
    sm: {
      badge: 'px-1 py-0.5 text-[7px] sm:text-[8px] gap-0.5',
      icon: 8,
      hideLabel: true
    },
    md: {
      badge: 'px-1.5 py-0.5 text-[9px] sm:text-[10px] gap-1',
      icon: 10,
      hideLabel: false
    },
    lg: {
      badge: 'px-2 py-0.5 text-[10px] gap-1',
      icon: 12,
      hideLabel: false
    }
  };

  return (
    <Badge 
      className={`
        bg-gradient-to-r ${config.gradient}
        border ${config.border}
        text-white font-semibold
        shadow-lg shadow-black/30
        ${sizes[size].badge}
        inline-flex items-center justify-center
        whitespace-nowrap
        backdrop-blur-sm
        ${size === 'lg' ? 'shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]' : ''}
        ${className}
      `}
      variant="outline"
      style={size === 'lg' ? {
        boxShadow: `0 0 15px ${config.gradient.includes('red') ? 'rgba(239,68,68,0.6)' : 
                                config.gradient.includes('purple') ? 'rgba(168,85,247,0.6)' : 
                                config.gradient.includes('yellow') ? 'rgba(234,179,8,0.6)' : 
                                config.gradient.includes('blue') ? 'rgba(59,130,246,0.6)' : 
                                'rgba(107,114,128,0.6)'}`
      } : undefined}
    >
      <Icon name={config.icon as any} size={sizes[size].icon} />
      {!sizes[size].hideLabel && <span>{config.label}</span>}
      {sizes[size].hideLabel && <span className="sr-only">{config.label}</span>}
    </Badge>
  );
};

export default UserRankBadge;