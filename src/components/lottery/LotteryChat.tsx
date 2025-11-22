import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { User } from '@/types';

interface ChatMessage {
  id: number;
  user_id: number;
  username: string;
  message: string;
  created_at: string;
}

interface LotteryChatProps {
  user: User | null;
  chatMessages: ChatMessage[];
  chatMessage: string;
  isSendingMessage: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  onChatMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

const LotteryChat = ({
  user,
  chatMessages,
  chatMessage,
  isSendingMessage,
  chatEndRef,
  onChatMessageChange,
  onSendMessage,
  onKeyDown
}: LotteryChatProps) => {
  return (
    <Card className="p-6 bg-card/50 flex flex-col">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Icon name="MessageSquare" size={20} className="text-blue-400" />
        Чат участников
      </h3>
      
      <div className="flex-1 overflow-y-auto max-h-[400px] mb-4 space-y-3">
        {chatMessages.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Нет сообщений. Будьте первым!
          </p>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg ${
                msg.user_id === user?.id
                  ? 'bg-indigo-600/20 border border-indigo-600/30 ml-8'
                  : 'bg-card/80 border border-border/50 mr-8'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{msg.username}</span>
                <span className="text-xs text-muted-foreground">{formatTime(msg.created_at)}</span>
              </div>
              <p className="text-sm">{msg.message}</p>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <Input
          value={chatMessage}
          onChange={(e) => onChatMessageChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={user ? 'Введите сообщение...' : 'Войдите для отправки'}
          disabled={!user || isSendingMessage}
          maxLength={500}
          autoFocus={false}
        />
        <Button
          type="button"
          onClick={onSendMessage}
          disabled={!user || isSendingMessage || !chatMessage.trim()}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Icon name="Send" size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default LotteryChat;
