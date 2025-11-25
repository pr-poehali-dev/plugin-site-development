import { useEffect, useRef, useState, memo } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { getAvatarGradient } from '@/utils/avatarColors';
import { User } from '@/types';

interface Message {
  id: number;
  user_id?: number;
  username?: string;
  avatar_url?: string;
  message: string;
  created_at: string;
  is_system: boolean;
}

interface ChatVirtualizedProps {
  messages: Message[];
  currentUser: User | null;
  onLoadMore?: () => void;
}

const MessageItem = memo(({ msg, isCurrentUser }: { msg: Message; isCurrentUser: boolean }) => {
  if (msg.is_system) {
    return (
      <div className="flex justify-center py-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Icon name="Info" size={12} className="text-blue-400" />
          <p className="text-xs text-blue-400 font-semibold">{msg.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} py-1`}>
      <div
        className={`max-w-[85%] ${
          isCurrentUser
            ? 'bg-gradient-to-br from-green-800/40 to-green-900/30 border border-green-700/40'
            : 'bg-gradient-to-br from-card to-muted/50 border border-border'
        } p-2.5 rounded-2xl space-y-1`}
      >
        <div className="flex items-center gap-1.5">
          <Avatar className="w-5 h-5 ring-1 ring-border/50">
            <AvatarImage src={msg.avatar_url} />
            <AvatarFallback
              className={`bg-gradient-to-br ${getAvatarGradient(msg.username || '')} text-white text-[9px]`}
            >
              {msg.username?.[0]?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-bold truncate">{msg.username}</span>
          <span className="text-[10px] text-muted-foreground/60 ml-auto">
            {new Date(msg.created_at).toLocaleString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <p className="text-sm leading-relaxed break-words pl-6">{msg.message}</p>
      </div>
    </div>
  );
});

MessageItem.displayName = 'MessageItem';

export const ChatVirtualized = ({ messages, currentUser, onLoadMore }: ChatVirtualizedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setAutoScroll(isAtBottom);

    if (scrollTop < 100 && onLoadMore) {
      onLoadMore();
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto space-y-2 pb-4"
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
      }}
    >
      {messages.map((msg, index) => (
        <div key={msg.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
          <MessageItem msg={msg} isCurrentUser={msg.user_id === currentUser?.id} />
        </div>
      ))}
    </div>
  );
};
