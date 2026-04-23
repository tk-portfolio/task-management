-- V2__add_color_to_categories.sql
ALTER TABLE task_categories 
ADD COLUMN color VARCHAR(7) NOT NULL DEFAULT '#409eff';

COMMENT ON COLUMN task_categories.color IS 'カテゴリカラー（HEX）';