import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Message } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { triggerNotificationUpdate } from '@/utils/notificationEvents';
import { requestCache } from '@/utils/requestCache';
import MessagesChatList from './messages/MessagesChatList';
import MessagesChatView from './messages/MessagesChatView';

const NOTIFICATIONS_URL = 'https://functions.poehali.dev/6c968792-7d48-41a9-af0a-c92adb047acb';

interface MessagesPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number;
  userRole: string;
  initialRecipientId?: number | null;
  onUserClick?: (userId: number) => void;
}

interface Chat {
  userId: number;
  username: string;
  avatar?: string;
  role?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  lastSeenAt?: string;
}

const MessagesPanel = ({ open, onOpenChange, userId, userRole, initialRecipientId, onUserClick }: MessagesPanelProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [currentChatMessages, setCurrentChatMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024);
  const [selectedChatUserRole, setSelectedChatUserRole] = useState<string>('');
  const [selectedChatUserLastSeen, setSelectedChatUserLastSeen] = useState<string>('');
  
  useEffect(() => {
    requestCache.registerConfig(`messages:${userId}`, {
      ttl: 30000,
      minInterval: 20000
    });
  }, [userId]);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      if (window.visualViewport) {
        const vHeight = window.visualViewport.height;
        const wHeight = window.innerHeight;
        const kbHeight = wHeight - vHeight;
        setKeyboardHeight(kbHeight);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [open]);

  const buildChats = useCallback((allMessages: Message[]) => {
    const chatsMap = new Map<number, Chat>();

    allMessages.forEach(msg => {
      const isFromMe = msg.from_user_id === userId;
      const otherUserId = isFromMe ? msg.to_user_id : msg.from_user_id;
      const otherUsername = isFromMe ? msg.to_username : msg.from_username;
      const otherAvatar = isFromMe ? (msg as any).to_avatar : msg.from_avatar;
      const otherRole = isFromMe ? (msg as any).to_role : (msg as any).from_role;
      const otherLastSeen = isFromMe ? (msg as any).to_last_seen : (msg as any).from_last_seen;

      if (!chatsMap.has(otherUserId)) {
        chatsMap.set(otherUserId, {
          userId: otherUserId,
          username: otherUsername,
          avatar: otherAvatar,
          role: otherRole,
          lastMessage: msg.content,
          lastMessageTime: msg.created_at,
          unreadCount: 0,
          lastSeenAt: otherLastSeen
        });
      }

      const chat = chatsMap.get(otherUserId)!;
      const msgTime = new Date(msg.created_at).getTime();
      const lastMsgTime = new Date(chat.lastMessageTime).getTime();

      if (msgTime > lastMsgTime) {
        chat.lastMessage = msg.content;
        chat.lastMessageTime = msg.created_at;
      }

      if (msg.to_user_id === userId && !msg.is_read) {
        chat.unreadCount++;
      }
    });

    const chatsList = Array.from(chatsMap.values()).sort(
      (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );

    setChats(chatsList);
  }, [userId]);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await requestCache.get(
        `messages:${userId}`,
        async () => {
          const response = await fetch(`${NOTIFICATIONS_URL}?action=messages`, {
            headers: { 'X-User-Id': userId.toString() }
          });
          if (response.ok) {
            return await response.json();
          }
          return null;
        }
      );
      
      if (data) {
        setMessages(data.messages || []);
        buildChats(data.messages || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, buildChats]);

  useEffect(() => {
    if (open) {
      fetchMessages();
      if (initialRecipientId) {
        setSelectedChat(initialRecipientId);
        setShowChatList(false);
      }
    }
  }, [open, initialRecipientId, fetchMessages]);

  const markMessageRead = useCallback(async (messageId: number) => {
    try {
      await fetch(NOTIFICATIONS_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify({ action: 'mark_message_read', message_id: messageId }),
        keepalive: true
      });
      requestCache.invalidate(`messages:${userId}`);
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedChat && messages.length > 0) {
      const chatMessages = messages.filter(
        m => (m.from_user_id === selectedChat && m.to_user_id === userId) ||
             (m.from_user_id === userId && m.to_user_id === selectedChat)
      ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      
      setCurrentChatMessages(chatMessages);
      
      const selectedChatUser = chatMessages.find(m => m.from_user_id === selectedChat || m.to_user_id === selectedChat);
      if (selectedChatUser) {
        const role = selectedChatUser.from_user_id === selectedChat 
          ? (selectedChatUser as any).from_role 
          : (selectedChatUser as any).to_role;
        const lastSeen = selectedChatUser.from_user_id === selectedChat 
          ? (selectedChatUser as any).from_last_seen 
          : (selectedChatUser as any).to_last_seen;
        setSelectedChatUserRole(role || '');
        setSelectedChatUserLastSeen(lastSeen || '');
      }
      
      chatMessages.forEach(msg => {
        if (!msg.is_read && msg.to_user_id === userId) {
          markMessageRead(msg.id);
        }
      });
    }
  }, [selectedChat, messages, userId, markMessageRead]);

  const handleSendMessage = async () => {
    if (!newMessageText.trim() || !selectedChat || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch(NOTIFICATIONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify({
          action: 'send_message',
          recipient_id: selectedChat,
          content: newMessageText
        })
      });

      const data = await response.json();

      if (data.success) {
        setNewMessageText('');
        requestCache.invalidate(`messages:${userId}`);
        await fetchMessages();
        triggerNotificationUpdate(selectedChat, userRole);
      } else {
        toast({ title: 'Ошибка', description: data.error || 'Не удалось отправить сообщение', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить сообщение', variant: 'destructive' });
    } finally {
      setIsSending(false);
    }
  };

  const handleChatSelect = (chatUserId: number) => {
    setSelectedChat(chatUserId);
    setShowChatList(false);
  };

  const handleNewChatCreated = (recipientId: number) => {
    setSelectedChat(recipientId);
    setShowChatList(false);
  };

  const handleBack = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  const selectedChatData = chats.find(chat => chat.userId === selectedChat);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl h-[90vh] p-0 gap-0 flex flex-col"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>Сообщения</DialogTitle>
        </VisuallyHidden>

        <div className="flex-1 flex overflow-hidden">
          {isDesktop ? (
            <>
              <div className="w-80 border-r flex-shrink-0">
                <MessagesChatList
                  chats={chats}
                  selectedChat={selectedChat}
                  userId={userId}
                  userRole={userRole}
                  loading={loading}
                  onChatSelect={handleChatSelect}
                  onNewChatCreated={handleNewChatCreated}
                  onUserClick={onUserClick}
                />
              </div>
              
              <div className="flex-1">
                {selectedChat && selectedChatData ? (
                  <MessagesChatView
                    messages={currentChatMessages}
                    currentUserId={userId}
                    selectedChatUserId={selectedChat}
                    selectedChatUsername={selectedChatData.username}
                    selectedChatAvatar={selectedChatData.avatar}
                    selectedChatUserRole={selectedChatUserRole}
                    selectedChatUserLastSeen={selectedChatUserLastSeen}
                    newMessageText={newMessageText}
                    isSending={isSending}
                    keyboardHeight={keyboardHeight}
                    onSendMessage={handleSendMessage}
                    onMessageTextChange={setNewMessageText}
                    onBack={handleBack}
                    onUserClick={onUserClick}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Выберите чат для начала общения
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {showChatList ? (
                <div className="w-full">
                  <MessagesChatList
                    chats={chats}
                    selectedChat={selectedChat}
                    userId={userId}
                    userRole={userRole}
                    loading={loading}
                    onChatSelect={handleChatSelect}
                    onNewChatCreated={handleNewChatCreated}
                    onUserClick={onUserClick}
                  />
                </div>
              ) : selectedChat && selectedChatData ? (
                <div className="w-full">
                  <MessagesChatView
                    messages={currentChatMessages}
                    currentUserId={userId}
                    selectedChatUserId={selectedChat}
                    selectedChatUsername={selectedChatData.username}
                    selectedChatAvatar={selectedChatData.avatar}
                    selectedChatUserRole={selectedChatUserRole}
                    selectedChatUserLastSeen={selectedChatUserLastSeen}
                    newMessageText={newMessageText}
                    isSending={isSending}
                    keyboardHeight={keyboardHeight}
                    onSendMessage={handleSendMessage}
                    onMessageTextChange={setNewMessageText}
                    onBack={handleBack}
                    onUserClick={onUserClick}
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessagesPanel;
