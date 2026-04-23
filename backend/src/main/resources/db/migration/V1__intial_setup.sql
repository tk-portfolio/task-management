CREATE TABLE task_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),

    -- 状態管理
    status INTEGER NOT NULL DEFAULT 0,

    -- 優先度
    priority INTEGER NOT NULL DEFAULT 0,
    -- 0:低 1:中 2:高 

    -- 期限
    due_date TIMESTAMP,

    -- カテゴリ
    category_id BIGINT,

    deleted BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_category
        FOREIGN KEY (category_id)
        REFERENCES task_categories(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_tasks_title ON tasks(title);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_deleted ON tasks(deleted);

CREATE INDEX idx_task_categories_name ON task_categories(name);
CREATE INDEX idx_task_categories_deleted ON task_categories(deleted);

COMMENT ON TABLE task_categories IS 'タスクカテゴリテーブル';
COMMENT ON TABLE tasks IS 'タスクテーブル';

COMMENT ON COLUMN task_categories.id IS 'カテゴリID';
COMMENT ON COLUMN task_categories.name IS 'カテゴリ名';
COMMENT ON COLUMN task_categories.description IS 'カテゴリ説明';
COMMENT ON COLUMN task_categories.deleted IS '削除フラグ';
COMMENT ON COLUMN task_categories.created_at IS '作成日時';
COMMENT ON COLUMN task_categories.updated_at IS '更新日時';

COMMENT ON COLUMN tasks.id IS 'タスクID';
COMMENT ON COLUMN tasks.title IS 'タスク名';
COMMENT ON COLUMN tasks.description IS 'タスク説明';
COMMENT ON COLUMN tasks.status IS '状態';
COMMENT ON COLUMN tasks.priority IS '優先度';
COMMENT ON COLUMN tasks.due_date IS '期限';
COMMENT ON COLUMN tasks.category_id IS 'カテゴリID';
COMMENT ON COLUMN tasks.deleted IS '削除フラグ';
COMMENT ON COLUMN tasks.created_at IS '作成日時';
COMMENT ON COLUMN tasks.updated_at IS '更新日時';