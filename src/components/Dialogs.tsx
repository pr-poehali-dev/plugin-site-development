import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { User } from '@/types';

interface DialogsProps {
  authDialogOpen: boolean;
  authMode: 'login' | 'register';
  showTopicDialog: boolean;
  showProfileDialog: boolean;
  user: User | null;
  newTopicTitle: string;
  newTopicContent: string;
  onAuthDialogChange: (open: boolean) => void;
  onAuthModeChange: (mode: 'login' | 'register') => void;
  onAuthSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTopicDialogChange: (open: boolean) => void;
  onTopicTitleChange: (title: string) => void;
  onTopicContentChange: (content: string) => void;
  onCreateTopic: () => void;
  onProfileDialogChange: (open: boolean) => void;
  onUpdateProfile: (profileData: Partial<User>) => void;
}

const Dialogs = ({
  authDialogOpen,
  authMode,
  showTopicDialog,
  showProfileDialog,
  user,
  newTopicTitle,
  newTopicContent,
  onAuthDialogChange,
  onAuthModeChange,
  onAuthSubmit,
  onTopicDialogChange,
  onTopicTitleChange,
  onTopicContentChange,
  onCreateTopic,
  onProfileDialogChange,
  onUpdateProfile,
}: DialogsProps) => {
  return (
    <>
      <Dialog open={authDialogOpen} onOpenChange={onAuthDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{authMode === 'login' ? 'Вход' : 'Регистрация'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={onAuthSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Имя пользователя</label>
              <Input name="username" required />
            </div>

            {authMode === 'register' && (
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input name="email" type="email" required />
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1 block">Пароль</label>
              <Input name="password" type="password" required />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>

            <button
              type="button"
              onClick={() => onAuthModeChange(authMode === 'login' ? 'register' : 'login')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              {authMode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showTopicDialog} onOpenChange={onTopicDialogChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создать новую тему</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Название темы</label>
              <Input 
                value={newTopicTitle} 
                onChange={(e) => onTopicTitleChange(e.target.value)}
                placeholder="Введите название темы"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Описание</label>
              <Textarea 
                value={newTopicContent}
                onChange={(e) => onTopicContentChange(e.target.value)}
                className="min-h-[150px]"
                placeholder="Опишите вашу тему..."
              />
            </div>
            <Button onClick={onCreateTopic} className="w-full bg-primary">
              Создать тему
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showProfileDialog} onOpenChange={onProfileDialogChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Личный кабинет</DialogTitle>
          </DialogHeader>
          {user && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                  {user.username[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user.username}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">О себе</label>
                  <Textarea 
                    defaultValue={user.bio || ''}
                    onBlur={(e) => onUpdateProfile({ bio: e.target.value })}
                    className="min-h-[100px]"
                    placeholder="Расскажите о себе..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                      <Icon name="MessageCircle" size={16} />
                      VK
                    </label>
                    <Input 
                      defaultValue={user.vk_url || ''}
                      onBlur={(e) => onUpdateProfile({ vk_url: e.target.value })}
                      placeholder="https://vk.com/..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                      <Icon name="Send" size={16} />
                      Telegram
                    </label>
                    <Input 
                      defaultValue={user.telegram || ''}
                      onBlur={(e) => onUpdateProfile({ telegram: e.target.value })}
                      placeholder="@username"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                      <Icon name="MessageSquare" size={16} />
                      Discord
                    </label>
                    <Input 
                      defaultValue={user.discord || ''}
                      onBlur={(e) => onUpdateProfile({ discord: e.target.value })}
                      placeholder="username#1234"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                      <Icon name="Image" size={16} />
                      URL аватарки
                    </label>
                    <Input 
                      defaultValue={user.avatar_url || ''}
                      onBlur={(e) => onUpdateProfile({ avatar_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dialogs;
