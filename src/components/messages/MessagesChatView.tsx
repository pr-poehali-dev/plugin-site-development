import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Message } from '@/types';
import { getAvatarGradient } from '@/utils/avatarColors';

interface MessagesChatViewProps {
  messages: Message[];
  currentUserId: number;
  selectedChatUserId: number;
  selectedChatUsername: string;
  selectedChatAvatar?: string;
  selectedChatUserRole: string;
  selectedChatUserLastSeen: string;
  newMessageText: string;
  isSending: boolean;
  keyboardHeight: number;
  onSendMessage: () => void;
  onMessageTextChange: (text: string) => void;
  onBack: () => void;
  onUserClick?: (userId: number) => void;
}

const MessagesChatView = ({
  messages,
  currentUserId,
  selectedChatUserId,
  selectedChatUsername,
  selectedChatAvatar,
  selectedChatUserRole,
  selectedChatUserLastSeen,
  newMessageText,
  isSending,
  keyboardHeight,
  onSendMessage,
  onMessageTextChange,
  onBack,
  onUserClick
}: MessagesChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  };

  const handleInputFocus = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  const formatMessageTime = (time: string) => {
    const date = new Date(time);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }) + ' ' +
             date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getOnlineStatus = (lastSeen?: string) => {
    if (!lastSeen) return { text: 'Был(а) давно', color: 'text-gray-500' };
    
    const lastSeenDate = new Date(lastSeen);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60));
    
    if (diffMinutes < 5) return { text: 'В сети', color: 'text-green-500' };
    if (diffMinutes < 60) return { text: `Был(а) ${diffMinutes} мин назад`, color: 'text-gray-500' };
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return { text: `Был(а) ${diffHours} ч назад`, color: 'text-gray-500' };
    
    const diffDays = Math.floor(diffHours / 24);
    return { text: `Был(а) ${diffDays} д назад`, color: 'text-gray-500' };
  };

  const getRoleBadge = (role?: string) => {
    if (role === 'admin') return { icon: 'Shield', color: 'text-red-500', label: 'Admin' };
    if (role === 'moderator') return { icon: 'Star', color: 'text-blue-500', label: 'Moderator' };
    return null;
  };

  const onlineStatus = getOnlineStatus(selectedChatUserLastSeen);
  const roleBadge = getRoleBadge(selectedChatUserRole);

  const handleSend = () => {
    if (!newMessageText.trim() || isSending) return;
    onSendMessage();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="lg:hidden flex-shrink-0"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div className="relative flex-shrink-0">
          <Avatar 
            className="h-10 w-10 cursor-pointer"
            onClick={() => onUserClick?.(selectedChatUserId)}
          >
            {selectedChatAvatar ? (
              <AvatarImage src={selectedChatAvatar} alt={selectedChatUsername} />
            ) : (
              <AvatarFallback 
                className="text-base font-bold"
                style={{ background: getAvatarGradient(selectedChatUsername) }}
              >
                {selectedChatUsername[0]?.toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          {roleBadge && (
            <div className={`absolute -bottom-1 -right-1 bg-background rounded-full p-1 ${roleBadge.color}`}>
              <Icon name={roleBadge.icon as any} size={10} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 
            className="font-medium truncate cursor-pointer hover:underline"
            onClick={() => onUserClick?.(selectedChatUserId)}
          >
            {selectedChatUsername}
          </h3>
          <p className={`text-xs ${onlineStatus.color}`}>{onlineStatus.text}</p>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ paddingBottom: keyboardHeight > 0 ? `${keyboardHeight}px` : undefined }}
      >
        {messages.map((msg, idx) => {
          const isMyMessage = msg.from_user_id === currentUserId;
          const showAvatar = idx === 0 || messages[idx - 1].from_user_id !== msg.from_user_id;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isMyMessage ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!isMyMessage && showAvatar ? (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  {msg.from_avatar ? (
                    <AvatarImage src={msg.from_avatar} alt={msg.from_username} />
                  ) : (
                    <AvatarFallback 
                      className="text-xs font-bold"
                      style={{ background: getAvatarGradient(msg.from_username) }}
                    >
                      {msg.from_username[0]?.toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              ) : !isMyMessage ? (
                <div className="h-8 w-8 flex-shrink-0" />
              ) : null}
              
              <div className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'} max-w-[75%]`}>
                <div
                  className={`rounded-2xl px-4 py-2 break-words ${
                    isMyMessage
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-2">
                  {formatMessageTime(msg.created_at)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={newMessageText}
            onChange={(e) => onMessageTextChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            onFocus={handleInputFocus}
            placeholder="Написать сообщение..."
            disabled={isSending}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessageText.trim() || isSending}
            size="icon"
            className="flex-shrink-0"
          >
            {isSending ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <Icon name="Send" size={20} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagesChatView;
