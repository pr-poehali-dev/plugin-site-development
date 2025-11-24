import { ForumCategory } from '@/types';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ForumCategorySelectorProps {
  categories: ForumCategory[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number) => void;
}

const ForumCategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory
}: ForumCategorySelectorProps) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Выберите категорию *</label>
      
      {categories.map((parentCategory) => (
        <div key={parentCategory.id} className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Icon name={parentCategory.icon as any} size={16} style={{ color: parentCategory.color }} />
            <span>{parentCategory.name}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 pl-6">
            {parentCategory.subcategories && parentCategory.subcategories.length > 0 ? (
              parentCategory.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => onSelectCategory(subcategory.id)}
                  className="h-9 px-4 rounded-md text-sm font-medium transition-all flex items-center gap-2 border hover:brightness-110"
                  style={{
                    backgroundColor: selectedCategory === subcategory.id ? `${subcategory.color}25` : `${subcategory.color}12`,
                    borderColor: selectedCategory === subcategory.id ? `${subcategory.color}50` : `${subcategory.color}30`,
                    color: selectedCategory === subcategory.id ? subcategory.color : `${subcategory.color}cc`
                  }}
                >
                  <Icon name={subcategory.icon as any} size={16} />
                  {subcategory.name}
                  {selectedCategory === subcategory.id && (
                    <Icon name="Check" size={14} />
                  )}
                </button>
              ))
            ) : (
              <button
                onClick={() => onSelectCategory(parentCategory.id)}
                className="h-9 px-4 rounded-md text-sm font-medium transition-all flex items-center gap-2 border hover:brightness-110"
                style={{
                  backgroundColor: selectedCategory === parentCategory.id ? `${parentCategory.color}25` : `${parentCategory.color}12`,
                  borderColor: selectedCategory === parentCategory.id ? `${parentCategory.color}50` : `${parentCategory.color}30`,
                  color: selectedCategory === parentCategory.id ? parentCategory.color : `${parentCategory.color}cc`
                }}
              >
                <Icon name={parentCategory.icon as any} size={16} />
                {parentCategory.name}
                {selectedCategory === parentCategory.id && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumCategorySelector;