import { useEffect } from 'react';
import { User, ForumTopic } from '@/types';

const AUTH_URL = 'https://functions.poehali.dev/2497448a-6aff-4df5-97ef-9181cf792f03';

interface UseIndexEffectsProps {
  setUser: (user: User | null) => void;
  setAuthDialogOpen: (open: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  activeView: 'plugins' | 'forum';
  forumTopics: ForumTopic[];
  selectedTopic: ForumTopic | null;
  handleTopicSelect: (topic: ForumTopic) => void;
}

export const useIndexEffects = ({
  setUser,
  setAuthDialogOpen,
  setAuthMode,
  activeView,
  forumTopics,
  selectedTopic,
  handleTopicSelect,
}: UseIndexEffectsProps) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      localStorage.setItem('referralCode', refCode.toUpperCase());
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      const syncUserData = async () => {
        try {
          const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-User-Id': parsedUser.id.toString()
            },
            body: JSON.stringify({ action: 'get_user' })
          });
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        } catch (error) {
          console.error('Ошибка синхронизации данных пользователя:', error);
        }
      };
      
      syncUserData();
    } else {
      setAuthDialogOpen(true);
      if (refCode) {
        setAuthMode('register');
      }
    }
    
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    const savedScrollPos = sessionStorage.getItem('scrollPosition');
    if (savedScrollPos) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPos));
        sessionStorage.removeItem('scrollPosition');
      }, 100);
    }
    
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    
    window.addEventListener('beforeunload', saveScrollPosition);
    
    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const savedTopicId = localStorage.getItem('selectedTopicId');
    if (savedTopicId && activeView === 'forum' && forumTopics.length > 0 && !selectedTopic) {
      const topic = forumTopics.find(t => t.id === parseInt(savedTopicId));
      if (topic) {
        handleTopicSelect(topic);
      }
    }
  }, [forumTopics, activeView]);
};
