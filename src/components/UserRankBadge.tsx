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
      badge: 'px-1.5 py-0.5 text-[8px]',
      icon: 10
    },
    md: {
      badge: 'px-2 py-0.5 text-[10px]',
      icon: 12
    },
    lg: {
      badge: 'px-2.5 py-1 text-xs',
      icon: 14
    }
  };

  return (
    <Badge 
      className={`
        bg-gradient-to-r ${config.gradient}
        border ${config.border}
        text-white font-semibold
        shadow-lg shadow-black/20
        ${sizes[size].badge}
        ${className}
      `}
      variant="outline"
    >
      <Icon name={config.icon as any} size={sizes[size].icon} className="mr-1" />
      {config.label}
    </Badge>
  );
};

export default UserRankBadge;
