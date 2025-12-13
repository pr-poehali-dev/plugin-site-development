import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ForumRoleBadge from '@/components/ForumRoleBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ForumTopic } from '@/types';
import { getAvatarGradient } from '@/utils/avatarColors';

interface ForumTopicCardProps {
  topic: ForumTopic;
  index: number;
  onTopicSelect: (topic: ForumTopic) => void;
  onUserClick: (userId: number) => void;
}

const isUserOnline = (lastSeenAt?: string) => {
  if (!lastSeenAt) return false;
  const lastSeen = new Date(lastSeenAt);
  if (isNaN(lastSeen.getTime())) return false;
  const now = new Date();
  const diffMs = now.getTime() - lastSeen.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  return diffMinutes < 5;
};

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'только что';
  if (diffMinutes < 60) return `${diffMinutes} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  if (diffDays < 7) return `${diffDays} дн. назад`;
  
  return date.toLocaleDateString('ru', { day: 'numeric', month: 'short' });
};

const getFullDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const ForumTopicCard = ({ topic, index, onTopicSelect, onUserClick }: ForumTopicCardProps) => {
  return (
    <div
      className="bg-zinc-900/40 border border-zinc-800/60 rounded-md p-2 sm:p-2.5 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer group animate-slide-up active:scale-[0.99]"
      style={{ animationDelay: `${index * 0.03}s` }}
      onClick={() => onTopicSelect(topic)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <Avatar 
              className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-105 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                topic.author_id && onUserClick(topic.author_id);
              }}
            >
              <AvatarImage src={topic.author_avatar} />
              <AvatarFallback className={`bg-gradient-to-br ${getAvatarGradient(topic.author_name)} text-white text-[10px] sm:text-xs font-bold`}>
                {topic.author_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isUserOnline(topic.author_last_seen) && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-zinc-900"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              {topic.is_pinned && (
                <Badge variant="default" className="h-4 px-1.5 text-[10px] bg-zinc-700 text-zinc-300">
                  <Icon name="Pin" size={10} className="mr-0.5" />
                  PIN
                </Badge>
              )}
              {topic.parent_category_name && topic.parent_category_color && topic.parent_category_icon && (
                <>
                  <Badge 
                    variant="outline" 
                    className="h-4 px-1.5 text-[10px] gap-0.5 border-zinc-700/50"
                    style={{
                      color: topic.parent_category_color,
                      backgroundColor: `${topic.parent_category_color}15`
                    }}
                  >
                    <Icon name={topic.parent_category_icon as any} size={10} />
                    {topic.parent_category_name}
                  </Badge>
                  <Icon name="ChevronRight" size={10} className="text-zinc-600" />
                </>
              )}
              {topic.category_name && topic.category_color && topic.category_icon && (
                <Badge 
                  variant="outline" 
                  className="h-4 px-1.5 text-[10px] gap-0.5 border-zinc-700/50"
                  style={{
                    color: topic.category_color,
                    backgroundColor: `${topic.category_color}15`
                  }}
                >
                  <Icon name={topic.category_icon as any} size={10} />
                  {topic.category_name}
                </Badge>
              )}
            </div>
            <h3 className="font-medium text-sm sm:text-base text-zinc-100 group-hover:text-zinc-50 transition-colors truncate mb-1 leading-snug">
              {topic.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500 flex-wrap">
              <button 
                onClick={(e) => { e.stopPropagation(); topic.author_id && onUserClick(topic.author_id); }} 
                className="hover:text-zinc-400 transition-colors flex items-center gap-1"
              >
                {topic.author_name}
                {topic.author_is_verified && (
                  <Icon name="BadgeCheck" size={11} className="text-emerald-500" />
                )}
              </button>
              {topic.author_forum_role && (
                <>
                  <span className="text-zinc-700">•</span>
                  <ForumRoleBadge role={topic.author_forum_role} />
                </>
              )}
              <span className="text-zinc-700">•</span>
              {topic.last_comment_at ? (
                <>
                  <span className="flex items-center gap-1 text-emerald-500/80">
                    <Icon name="MessageCircle" size={10} />
                    обновлена
                  </span>
                  <span title={getFullDateTime(topic.last_comment_at)}>{getTimeAgo(topic.last_comment_at)}</span>
                </>
              ) : (
                <span title={getFullDateTime(topic.created_at)}>{getTimeAgo(topic.created_at)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px] sm:text-xs text-zinc-500 flex-shrink-0">
          <div className="flex items-center gap-1 hover:text-zinc-400 transition-colors">
            <Icon name="MessageCircle" size={13} />
            <span>{topic.comments_count}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-zinc-400 transition-colors">
            <Icon name="Eye" size={13} />
            <span>{topic.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
