-- Добавляем главную категорию "Разработка" и подкатегории

-- Главная категория Разработка
INSERT INTO t_p32599880_plugin_site_developm.forum_categories (name, slug, description, icon, color, display_order, parent_id)
VALUES ('Разработка', 'development', 'Обсуждение разработки различных проектов', 'Code2', '#06b6d4', 3, NULL);

-- Подкатегории Разработки
INSERT INTO t_p32599880_plugin_site_developm.forum_categories (name, slug, description, icon, color, display_order, parent_id)
VALUES 
('Сайт', 'website', 'Разработка веб-сайтов', 'Globe', '#3b82f6', 30, (SELECT id FROM t_p32599880_plugin_site_developm.forum_categories WHERE slug = 'development')),
('Проект', 'project', 'Разработка проектов', 'FolderKanban', '#8b5cf6', 31, (SELECT id FROM t_p32599880_plugin_site_developm.forum_categories WHERE slug = 'development')),
('Токен', 'token', 'Разработка токенов', 'Coins', '#f59e0b', 32, (SELECT id FROM t_p32599880_plugin_site_developm.forum_categories WHERE slug = 'development')),
('Кошелек', 'wallet', 'Разработка кошельков', 'Wallet', '#10b981', 33, (SELECT id FROM t_p32599880_plugin_site_developm.forum_categories WHERE slug = 'development')),
('Контракт', 'contract', 'Разработка смарт-контрактов', 'FileCode', '#ef4444', 34, (SELECT id FROM t_p32599880_plugin_site_developm.forum_categories WHERE slug = 'development')),
('Приложение', 'application', 'Разработка приложений', 'Smartphone', '#ec4899', 35, (SELECT id FROM t_p32599880_plugin_site_developm.forum_categories WHERE slug = 'development')),
('Код', 'code', 'Обсуждение кода', 'Terminal', '#14b8a6', 36, (SELECT id FROM t_p32599880_plugin_site_developm.forum_categories WHERE slug = 'development'));
