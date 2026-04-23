INSERT INTO task_categories (name, description, deleted, created_at, updated_at) VALUES
('開発', 'プログラミング・設計など', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('バグ修正', '不具合対応', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ドキュメント', '資料作成・設計書', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('その他', '雑務', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO tasks (title, description, status, priority, due_date, category_id, deleted, created_at, updated_at) VALUES

-- 開発（カテゴリID: 1）
('ログインAPI作成', 'Spring Bootで認証APIを作る', 0, 2, CURRENT_TIMESTAMP + INTERVAL '3 days', 1, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ユーザー登録機能', 'バリデーション付き登録処理', 1, 1, CURRENT_TIMESTAMP + INTERVAL '5 days', 1, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- バグ修正（カテゴリID: 2）
('ログインエラー修正', 'JWTトークンの不具合対応', 0, 2, CURRENT_TIMESTAMP + INTERVAL '1 day', 2, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- ドキュメント（カテゴリID: 3）
('API仕様書作成', 'OpenAPI形式で作成', 0, 1, CURRENT_TIMESTAMP + INTERVAL '7 days', 3, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- その他（カテゴリID: 4）
('環境構築手順整理', 'Docker手順をドキュメント化', 2, 0, CURRENT_TIMESTAMP - INTERVAL '1 day', 4, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);