import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarGradient } from '@/utils/avatarColors';
import Icon from '@/components/ui/icon';

interface MessagesChatItemProps {
  userId: number;
  username: string;
  avatar?: string;
  role?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isSelected: boolean;
  onClick: () => void;
  onUserClick?: (userId: number) => void;
}

const MessagesChatItem = ({
  userId,
  username,
  avatar,
  role,
  lastMessage,
  lastMessageTime,
  unreadCount,
  isSelected,
  onClick,
  onUserClick
}: MessagesChatItemProps) => {
  const formatTime = (time: string) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Вчера';
    } else if (days < 7) {
      return `${days}д назад`;
    } else {
      return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    }
  };

  const getRoleBadge = (userRole?: string) => {
    if (userRole === 'admin') return { icon: 'Shield', color: 'text-red-500', label: 'Admin' };
    if (userRole === 'moderator') return { icon: 'Star', color: 'text-blue-500', label: 'Moderator' };
    return null;
  };

  const roleBadge = getRoleBadge(role);

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/10' : 'hover:bg-muted/50'
      }`}
    >
      <div className="relative flex-shrink-0">
        <Avatar 
          className="h-12 w-12 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onUserClick?.(userId);
          }}
        >
          {avatar ? (
            <AvatarImage src={avatar} alt={username} />
          ) : (
            <AvatarFallback 
              className="text-lg font-bold"
              style={{ background: getAvatarGradient(username) }}
            >
              {username[0]?.toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        {roleBadge && (
          <div className={`absolute -bottom-1 -right-1 bg-background rounded-full p-1 ${roleBadge.color}`}>
            <Icon name={roleBadge.icon as any} size={12} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-2 mb-1">
          <span className="font-medium text-sm truncate">{username}</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">{formatTime(lastMessageTime)}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>
      {unreadCount > 0 && (
        <div className="flex-shrink-0 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1.5 font-medium">
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default MessagesChatItem;
