import { useState } from 'react';
import { Plugin, Category, User, ForumTopic, ForumComment, SearchResult } from '@/types';

export const useIndexState = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    return localStorage.getItem('activeCategory') || 'all';
  });
  const [activeView, setActiveView] = useState<'plugins' | 'forum'>(() => {
    return (localStorage.getItem('activeView') as 'plugins' | 'forum') || 'plugins';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [topicComments, setTopicComments] = useState<ForumComment[]>([]);
  const [showTopicDialog, setShowTopicDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showMessagesPanel, setShowMessagesPanel] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [notificationsUnread, setNotificationsUnread] = useState(0);
  const [messagesUnread, setMessagesUnread] = useState(0);
  const [messageRecipientId, setMessageRecipientId] = useState<number | null>(null);

  return {
    plugins,
    setPlugins,
    categories,
    setCategories,
    activeCategory,
    setActiveCategory,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    sidebarOpen,
    setSidebarOpen,
    authDialogOpen,
    setAuthDialogOpen,
    user,
    setUser,
    authMode,
    setAuthMode,
    forumTopics,
    setForumTopics,
    selectedTopic,
    setSelectedTopic,
    topicComments,
    setTopicComments,
    showTopicDialog,
    setShowTopicDialog,
    showProfileDialog,
    setShowProfileDialog,
    newTopicTitle,
    setNewTopicTitle,
    newTopicContent,
    setNewTopicContent,
    newComment,
    setNewComment,
    searchResults,
    setSearchResults,
    showSearchResults,
    setShowSearchResults,
    showAdminPanel,
    setShowAdminPanel,
    showUserProfile,
    setShowUserProfile,
    selectedUserId,
    setSelectedUserId,
    showMessagesPanel,
    setShowMessagesPanel,
    showNotificationsPanel,
    setShowNotificationsPanel,
    notificationsUnread,
    setNotificationsUnread,
    messagesUnread,
    setMessagesUnread,
    messageRecipientId,
    setMessageRecipientId,
  };
};
