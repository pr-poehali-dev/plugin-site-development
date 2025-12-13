import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ForumTopic, ForumCategory, User } from '@/types';
import { useState, useEffect } from 'react';
import { ForumTopicCard } from './Forum/ForumTopicCard';
import { ForumCategoriesFilter } from './Forum/ForumCategoriesFilter';
import { ForumControlPanel } from './Forum/ForumControlPanel';

interface ForumTopicsListProps {
  forumTopics: ForumTopic[];
  user: User | null;
  onShowTopicDialog: () => void;
  onTopicSelect: (topic: ForumTopic) => void;
  onUserClick: (userId: number) => void;
}

const FORUM_URL = 'https://functions.poehali.dev/045d6571-633c-4239-ae69-8d76c933532c';

export const ForumTopicsList = ({
  forumTopics,
  user,
  onShowTopicDialog,
  onTopicSelect,
  onUserClick
}: ForumTopicsListProps) => {
  const [forumSortBy, setForumSortBy] = useState<'newest' | 'hot' | 'views'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    const saved = localStorage.getItem('forumSelectedCategory');
    return saved || null;
  });
  const [selectedParentCategory, setSelectedParentCategory] = useState<number | null>(() => {
    const saved = localStorage.getItem('forumSelectedParentCategory');
    return saved ? parseInt(saved) : null;
  });
  const [userTopicsFilter, setUserTopicsFilter] = useState<{ userId: number; username: string } | null>(null);

  useEffect(() => {
    fetchCategories();
    
    const savedFilter = localStorage.getItem('userTopicsFilter');
    if (savedFilter) {
      try {
        const filter = JSON.parse(savedFilter);
        setUserTopicsFilter(filter);
        setSelectedCategory(null);
        setSelectedParentCategory(null);
        localStorage.removeItem('userTopicsFilter');
      } catch (e) {
        console.error('Error parsing user topics filter:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('forumSelectedCategory', selectedCategory);
      localStorage.removeItem('forumSelectedParentCategory');
    } else {
      localStorage.removeItem('forumSelectedCategory');
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedParentCategory !== null) {
      localStorage.setItem('forumSelectedParentCategory', selectedParentCategory.toString());
      localStorage.removeItem('forumSelectedCategory');
    } else {
      localStorage.removeItem('forumSelectedParentCategory');
    }
  }, [selectedParentCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${FORUM_URL}?action=get_categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    }
  };

  const sortForumTopics = (topics: ForumTopic[]) => {
    const sorted = [...topics];
    if (forumSortBy === 'newest') {
      const result = sorted.sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
        const aTime = a.last_comment_at || a.created_at;
        const bTime = b.last_comment_at || b.created_at;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });
      console.log('Sorted topics (newest):', result.slice(0, 3).map(t => ({
        id: t.id,
        title: t.title.substring(0, 30),
        created_at: t.created_at,
        last_comment_at: t.last_comment_at,
        used_time: t.last_comment_at || t.created_at
      })));
      return result;
    }
    if (forumSortBy === 'hot') {
      return sorted.sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
        return (b.comments_count || 0) - (a.comments_count || 0);
      });
    }
    if (forumSortBy === 'views') {
      return sorted.sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
        return (b.views || 0) - (a.views || 0);
      });
    }
    return sorted;
  };

  const filterTopicsBySearch = (topics: ForumTopic[]) => {
    if (!searchQuery.trim()) return topics;
    const query = searchQuery.toLowerCase();
    return topics.filter(topic => 
      topic.title.toLowerCase().includes(query) ||
      topic.content.toLowerCase().includes(query) ||
      topic.author_name.toLowerCase().includes(query)
    );
  };

  const filterTopicsByCategory = (topics: ForumTopic[]) => {
    if (userTopicsFilter) {
      return topics.filter(topic => topic.author_id === userTopicsFilter.userId);
    }
    
    if (selectedParentCategory !== null) {
      const parentCategory = categories.find(cat => cat.id === selectedParentCategory);
      if (parentCategory) {
        const allCategorySlugs = [
          parentCategory.slug,
          ...(parentCategory.subcategories || []).map(sub => sub.slug)
        ];
        return topics.filter(topic => allCategorySlugs.includes(topic.category_slug || ''));
      }
    }
    if (selectedCategory) {
      return topics.filter(topic => topic.category_slug === selectedCategory);
    }
    return topics;
  };

  const handleCategoryChange = (category: string | null, parentCategory: number | null) => {
    setSelectedCategory(category);
    setSelectedParentCategory(parentCategory);
  };

  const filteredTopics = sortForumTopics(filterTopicsByCategory(filterTopicsBySearch(forumTopics)));

  return (
    <>
      <div className="mb-3 sm:mb-4 md:mb-6 animate-slide-up">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Форум</h1>
          {userTopicsFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setUserTopicsFilter(null);
                setSelectedCategory(null);
                setSelectedParentCategory(null);
              }}
              className="gap-2"
            >
              <Icon name="X" size={16} />
              Сбросить фильтр
            </Button>
          )}
        </div>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          {userTopicsFilter 
            ? `Темы пользователя ${userTopicsFilter.username}: ${filteredTopics.length} ${filteredTopics.length === 1 ? 'тема' : 'тем'}`
            : selectedCategory || searchQuery 
            ? `${filteredTopics.length} из ${forumTopics.length} ${forumTopics.length === 1 ? 'темы' : 'тем'}` 
            : `${forumTopics.length} ${forumTopics.length === 1 ? 'тема' : 'тем'}`
          }
        </p>
      </div>

      <ForumControlPanel
        user={user}
        forumSortBy={forumSortBy}
        searchQuery={searchQuery}
        onSortChange={setForumSortBy}
        onSearchChange={setSearchQuery}
        onShowTopicDialog={onShowTopicDialog}
      />

      <ForumCategoriesFilter
        categories={categories}
        selectedCategory={selectedCategory}
        selectedParentCategory={selectedParentCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="space-y-1.5">
        {filteredTopics.map((topic, index) => (
          <ForumTopicCard
            key={topic.id}
            topic={topic}
            index={index}
            onTopicSelect={onTopicSelect}
            onUserClick={onUserClick}
          />
        ))}
      </div>
    </>
  );
};
