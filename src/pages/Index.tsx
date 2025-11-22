import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const BACKEND_URL = 'https://functions.poehali.dev/1e67c3bd-abb5-4647-aa02-57410816c1f0';
const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';

interface Plugin {
  id: number;
  title: string;
  description: string;
  downloads: number;
  rating: string;
  status: string;
  tags: string[];
  gradient_from: string;
  gradient_to: string;
  category_name: string;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

const Index = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    fetchPlugins();
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [activeCategory, searchQuery]);

  const fetchPlugins = async () => {
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`${BACKEND_URL}?${params}`);
      const data = await response.json();
      setPlugins(data.plugins || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: authMode,
          username: formData.get('username'),
          email: authMode === 'register' ? formData.get('email') : undefined,
          password: formData.get('password'),
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setAuthDialogOpen(false);
      } else {
        alert(data.error || 'Ошибка');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка подключения');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const filteredPlugins = plugins.filter(p => 
    activeCategory === 'all' || p.category_name === categories.find(c => c.slug === activeCategory)?.name
  );

  const sortPlugins = (sortBy: string) => {
    const sorted = [...filteredPlugins];
    if (sortBy === 'newest') sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (sortBy === 'popular') sorted.sort((a, b) => b.downloads - a.downloads);
    if (sortBy === 'rating') sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    return sorted;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className={`fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Layers" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">ТП</span>
          </div>

          <nav className="space-y-1">
            {[
              { icon: 'Home', label: 'Главная', id: 'all' },
              { icon: 'Package', label: 'Плагины', id: 'plugins' },
              { icon: 'Grid3x3', label: 'Категории', id: 'categories' },
              { icon: 'Sparkles', label: 'Новинки', id: 'new' },
              { icon: 'TrendingUp', label: 'Популярное', id: 'popular' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id === 'categories' ? 'all' : item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  activeCategory === item.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-sidebar-border">
            <p className="text-xs text-muted-foreground px-4 mb-3">КАТЕГОРИИ</p>
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                  activeCategory === cat.slug ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cat.color}`} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-20 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 flex-1">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Icon name="Menu" size={20} />
              </Button>

              <div className="relative max-w-md w-full">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="ghost" size="icon">
                    <Icon name="Bell" size={20} />
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      Выход
                    </Button>
                  </div>
                </>
              ) : (
                <Button 
                  onClick={() => setAuthDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90 font-semibold px-6"
                >
                  РЕГИСТРАЦИЯ
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {activeCategory === 'all' ? 'Все разделы' : 
               activeCategory === 'new' ? 'Новинки' : 
               activeCategory === 'popular' ? 'Популярное' :
               categories.find(c => c.slug === activeCategory)?.name || 'Плагины'}
            </h1>
            <p className="text-muted-foreground">
              {filteredPlugins.length} {filteredPlugins.length === 1 ? 'плагин' : 'плагинов'}
            </p>
          </div>

          <Tabs defaultValue="newest" className="mb-6">
            <TabsList>
              <TabsTrigger value="newest">Последние посты</TabsTrigger>
              <TabsTrigger value="new">Новые темы</TabsTrigger>
              <TabsTrigger value="hot">Горячие темы</TabsTrigger>
              <TabsTrigger value="views">Наиболее просматриваемые</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            {sortPlugins('newest').map((plugin) => (
              <div
                key={plugin.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${plugin.gradient_from}, ${plugin.gradient_to})`
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {plugin.status === 'premium' && (
                            <Badge variant="default" className="bg-primary">
                              СБОРКА
                            </Badge>
                          )}
                          {plugin.status === 'new' && (
                            <Badge variant="secondary" className="bg-accent">
                              НОВЫЙ
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                          {plugin.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {plugin.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <Icon name="Download" size={14} />
                          <span>{plugin.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          <span>{plugin.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{new Date(plugin.created_at).toLocaleDateString('ru')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {plugin.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{authMode === 'login' ? 'Вход' : 'Регистрация'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAuth} className="space-y-4">
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
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              {authMode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;