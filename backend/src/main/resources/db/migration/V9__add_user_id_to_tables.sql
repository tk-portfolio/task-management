-- 1. カラムを「NULL許可」の状態で追加する（既存データがあるため）
ALTER TABLE task_categories ADD COLUMN user_id INTEGER REFERENCES users(id);
ALTER TABLE tasks ADD COLUMN user_id INTEGER REFERENCES users(id);

-- 2. 既存の全データに対して、ユーザーID 1 を割り当てる
UPDATE task_categories SET user_id = 1 WHERE user_id IS NULL;
UPDATE tasks SET user_id = 1 WHERE user_id IS NULL;

-- 3. 今後のために、user_id を「NOT NULL（必須）」に変更する
ALTER TABLE task_categories ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE tasks ALTER COLUMN user_id SET NOT NULL;