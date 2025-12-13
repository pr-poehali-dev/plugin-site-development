import Icon from '@/components/ui/icon';
import { ForumCategory } from '@/types';

interface ForumCategoriesFilterProps {
  categories: ForumCategory[];
  selectedCategory: string | null;
  selectedParentCategory: number | null;
  onCategoryChange: (category: string | null, parentCategory: number | null) => void;
}

export const ForumCategoriesFilter = ({
  categories,
  selectedCategory,
  selectedParentCategory,
  onCategoryChange
}: ForumCategoriesFilterProps) => {
  if (categories.length === 0) return null;

  const iconMap: Record<string, string> = {
    'FileCode': '📜',
    'Coins': '🪙',
    'TrendingUp': '📈',
    'MessageSquare': '💬',
    'HelpCircle': '❓',
    'Code2': '💻',
    'MoreHorizontal': '➕',
    'Megaphone': '📢',
    'Settings': '⚙️',
    'ShoppingCart': '🛒',
    'Trophy': '🏆',
    'Lightbulb': '💡',
    'Users': '👥',
    'Code': '💻',
    'Briefcase': '💼',
    'Shield': '🛡️',
    'Wallet': '💳',
    'Gift': '🎁',
    'Bell': '🔔',
    'Star': '⭐'
  };

  return (
    <>
      {/* Мобильная версия */}
      <div className="sm:hidden mb-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground px-1">Категория</div>
            {selectedParentCategory === null ? (
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'all') {
                    onCategoryChange(null, null);
                  } else {
                    const parentId = parseInt(value.replace('parent-', ''));
                    onCategoryChange(null, parentId);
                  }
                }}
                className="w-full h-10 px-3 rounded-md border bg-background text-sm font-medium"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                <option value="all">📂 Все категории</option>
                {categories.map((parentCategory) => {
                  const emoji = iconMap[parentCategory.icon || ''] || '📁';
                  return (
                    <option key={parentCategory.id} value={`parent-${parentCategory.id}`}>
                      {emoji} {parentCategory.name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <button
                onClick={() => onCategoryChange(null, null)}
                className="w-full h-10 px-3 rounded-md border flex items-center justify-between text-sm font-medium"
                style={{
                  backgroundColor: selectedParentCategory !== null
                    ? `${categories.find(c => c.id === selectedParentCategory)?.color}25`
                    : undefined,
                  borderColor: selectedParentCategory !== null
                    ? `${categories.find(c => c.id === selectedParentCategory)?.color}50`
                    : undefined,
                  color: selectedParentCategory !== null
                    ? categories.find(c => c.id === selectedParentCategory)?.color
                    : undefined
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon 
                    name={
                      selectedParentCategory !== null
                        ? (categories.find(c => c.id === selectedParentCategory)?.icon as any)
                        : 'Folder'
                    } 
                    size={16} 
                  />
                  <span>
                    {selectedParentCategory !== null
                      ? categories.find(c => c.id === selectedParentCategory)?.name
                      : 'Выбрать категорию'
                    }
                  </span>
                </div>
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden sm:block mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null, null)}
            className={`h-9 px-4 rounded-md text-sm font-medium transition-all border ${
              selectedCategory === null && selectedParentCategory === null
                ? 'bg-zinc-700 text-zinc-100 border-zinc-600'
                : 'bg-zinc-900/40 text-zinc-400 border-zinc-800/60 hover:bg-zinc-900/60 hover:border-zinc-700'
            }`}
          >
            Все категории
          </button>
          
          {categories.map((parentCategory) => (
            <button
              key={parentCategory.id}
              onClick={() => onCategoryChange(null, parentCategory.id)}
              className="h-9 px-4 rounded-md text-sm font-medium transition-all flex items-center gap-2 border hover:brightness-110"
              style={{
                backgroundColor: selectedParentCategory === parentCategory.id ? `${parentCategory.color}25` : `${parentCategory.color}12`,
                borderColor: selectedParentCategory === parentCategory.id ? `${parentCategory.color}50` : `${parentCategory.color}30`,
                color: selectedParentCategory === parentCategory.id ? parentCategory.color : `${parentCategory.color}cc`
              }}
            >
              <Icon name={parentCategory.icon as any} size={16} />
              {parentCategory.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
