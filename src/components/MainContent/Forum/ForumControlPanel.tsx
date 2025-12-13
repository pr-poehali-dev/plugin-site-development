import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { User } from '@/types';

interface ForumControlPanelProps {
  user: User | null;
  forumSortBy: 'newest' | 'hot' | 'views';
  searchQuery: string;
  onSortChange: (sortBy: 'newest' | 'hot' | 'views') => void;
  onSearchChange: (query: string) => void;
  onShowTopicDialog: () => void;
}

export const ForumControlPanel = ({
  user,
  forumSortBy,
  searchQuery,
  onSortChange,
  onSearchChange,
  onShowTopicDialog
}: ForumControlPanelProps) => {
  return (
    <>
      {/* Компактная панель управления на мобильных */}
      <div className="flex flex-col gap-3 mb-4 sm:hidden">
        {/* Поиск */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск по темам..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Фильтры и сортировка */}
        <div className="grid grid-cols-2 gap-2">
          {/* Сортировка */}
          <select
            value={forumSortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="h-10 px-3 rounded-md border bg-background text-sm font-medium flex items-center justify-between"
          >
            <option value="newest">🕒 Последние</option>
            <option value="hot">🔥 Горячие</option>
            <option value="views">👁️ Популярные</option>
          </select>

          {/* Кнопка создать тему */}
          {user && (
            <Button onClick={onShowTopicDialog} className="bg-primary h-10 text-sm px-3">
              <Icon name="Plus" size={16} className="mr-1.5" />
              Новая
            </Button>
          )}
        </div>
      </div>

      {/* Десктопная версия панели управления */}
      <div className="hidden sm:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
        <Tabs value={forumSortBy} onValueChange={(v) => onSortChange(v as any)} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10">
            <TabsTrigger value="newest" className="text-[10px] sm:text-xs md:text-sm">Последние</TabsTrigger>
            <TabsTrigger value="hot" className="text-[10px] sm:text-xs md:text-sm">Горячие</TabsTrigger>
            <TabsTrigger value="views" className="text-[10px] sm:text-xs md:text-sm">Популярные</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {user && (
          <Button onClick={onShowTopicDialog} className="bg-primary w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10">
            <Icon name="Plus" size={16} className="mr-1.5 sm:mr-2 sm:w-[18px] sm:h-[18px]" />
            Создать тему
          </Button>
        )}
      </div>
    </>
  );
};
