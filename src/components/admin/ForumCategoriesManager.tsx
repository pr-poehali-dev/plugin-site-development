import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { ForumCategory } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ForumCategoriesManagerProps {
  userId: number;
}

const ADMIN_URL = 'https://functions.poehali.dev/d4678b1c-2acd-40bb-b8c5-cefe8d14fad4';
const FORUM_URL = 'https://functions.poehali.dev/045d6571-633c-4239-ae69-8d76c933532c';

const ForumCategoriesManager = ({ userId }: ForumCategoriesManagerProps) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'Folder',
    color: '#3b82f6',
    display_order: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(FORUM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify({
          action: 'get_categories'
        })
      });

      const data = await response.json();
      if (data.success && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.slug.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните название и slug',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch(ADMIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify({
          action: 'create_forum_category',
          ...newCategory
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Успешно',
          description: 'Категория создана'
        });
        setNewCategory({
          name: '',
          slug: '',
          description: '',
          icon: 'Folder',
          color: '#3b82f6',
          display_order: categories.length
        });
        setShowForm(false);
        fetchCategories();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось создать категорию',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Ошибка создания категории:', error);
      toast({
        title: 'Ошибка',
        description: 'Ошибка соединения с сервером',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteCategory = async (categoryId: number, categoryName: string) => {
    if (!confirm(`Вы уверены что хотите удалить категорию "${categoryName}"?\n\nУдаление возможно только если в категории нет тем.`)) {
      return;
    }

    try {
      const response = await fetch(ADMIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId.toString()
        },
        body: JSON.stringify({
          action: 'delete_forum_category',
          category_id: categoryId
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Успешно',
          description: 'Категория удалена'
        });
        fetchCategories();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось удалить категорию',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Ошибка удаления категории:', error);
      toast({
        title: 'Ошибка',
        description: 'Ошибка соединения с сервером',
        variant: 'destructive'
      });
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const map: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
          'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return map[char] || char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const cryptoIcons = [
    'Bitcoin', 'Coins', 'Wallet', 'CreditCard', 'DollarSign', 
    'TrendingUp', 'TrendingDown', 'LineChart', 'BarChart3', 'PieChart',
    'Zap', 'Sparkles', 'Gem', 'Diamond', 'Lock',
    'Shield', 'ShieldCheck', 'Key', 'Fingerprint', 'ScanLine',
    'CircleDollarSign', 'BadgeDollarSign', 'Landmark', 'Building2', 'Store',
    'Ticket', 'Receipt', 'FileText', 'Scroll', 'BookOpen',
    'Users', 'UserCheck', 'UserPlus', 'MessageSquare', 'MessageCircle',
    'Send', 'ArrowLeftRight', 'ArrowRightLeft', 'Repeat', 'RefreshCw',
    'Globe', 'Globe2', 'Network', 'Link', 'Link2',
    'Target', 'Crosshair', 'Award', 'Trophy', 'Medal',
    'Star', 'StarHalf', 'Sparkle', 'Flame', 'Zap',
    'Rocket', 'Plane', 'TrendingUp', 'Activity', 'BarChart',
    'Gamepad2', 'Dices', 'Spade', 'Club', 'Heart',
    'ShoppingCart', 'ShoppingBag', 'Package', 'Gift', 'Tag',
    'Settings', 'Sliders', 'Filter', 'Search', 'Eye',
    'LockOpen', 'Unlock', 'ShieldAlert', 'AlertTriangle', 'AlertCircle',
    'CheckCircle', 'XCircle', 'Info', 'HelpCircle', 'CircleHelp'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Категории форума</h2>
          <p className="text-sm text-muted-foreground">
            Управление категориями тем форума
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Icon name={showForm ? 'X' : 'Plus'} size={18} className="mr-2" />
          {showForm ? 'Отмена' : 'Добавить категорию'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-primary/30 bg-primary/5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Новая категория
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Название *</label>
              <Input
                value={newCategory.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setNewCategory({
                    ...newCategory,
                    name,
                    slug: generateSlug(name)
                  });
                }}
                placeholder="Например: Общее обсуждение"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
              <Input
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                placeholder="general-discussion"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Описание</label>
              <Textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Краткое описание категории"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Иконка</label>
              <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2 mb-2 max-h-96 overflow-y-auto p-2 border rounded-lg">
                {cryptoIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewCategory({ ...newCategory, icon })}
                    className={`p-2 sm:p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                      newCategory.icon === icon
                        ? 'border-primary bg-primary/10 ring-2 ring-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                    title={icon}
                  >
                    <Icon name={icon as any} size={18} />
                  </button>
                ))}
              </div>
              <Input
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                placeholder="Или введите название иконки"
                className="mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Цвет</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-20 h-10 cursor-pointer"
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Button onClick={handleCreateCategory} className="w-full">
                <Icon name="Check" size={18} className="mr-2" />
                Создать категорию
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Icon name="Loader2" size={32} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon
                    name={category.icon as any}
                    size={24}
                    style={{ color: category.color }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{category.slug}</p>
                  {category.description && (
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>Порядок: {category.display_order}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id, category.name)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumCategoriesManager;