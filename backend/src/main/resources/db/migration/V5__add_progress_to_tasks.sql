-- 1. progress カラム追加
ALTER TABLE tasks
ADD COLUMN progress INTEGER NOT NULL DEFAULT 0;

COMMENT ON COLUMN tasks.progress IS '進捗';

-- 2. 既存 status を progress に変換
-- ルール例：
-- 0(未着手) → 0%
-- 1(進行中) → 50%
-- 2(完了)   → 100%

UPDATE tasks
SET progress =
  CASE status
    WHEN 0 THEN 0
    WHEN 1 THEN 50
    WHEN 2 THEN 100
    ELSE 0
  END;