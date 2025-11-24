-- Добавляем поле category в таблицу escrow_deals
ALTER TABLE escrow_deals 
ADD COLUMN category VARCHAR(50) DEFAULT 'other';

-- Обновляем существующие записи
UPDATE escrow_deals 
SET category = 'other' 
WHERE category IS NULL;