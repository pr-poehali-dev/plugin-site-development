-- Добавление поддержки ответов на комментарии в форуме
ALTER TABLE t_p32599880_plugin_site_developm.forum_comments 
ADD COLUMN parent_id integer REFERENCES t_p32599880_plugin_site_developm.forum_comments(id);

CREATE INDEX idx_forum_comments_parent_id ON t_p32599880_plugin_site_developm.forum_comments(parent_id);