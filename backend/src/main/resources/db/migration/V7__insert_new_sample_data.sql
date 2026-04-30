-- 1. 既存データの削除
DELETE FROM tasks;
DELETE FROM task_categories;

-- 2. カテゴリーの挿入（自動採番 ID: 5〜16）
INSERT INTO task_categories (name, description, color, deleted, created_at, updated_at) VALUES
('企画・調査', '市場調査・コンセプト立案', '#004c9d', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- ID: 5
('要件定義', '機能・非機能要件の定義', '#409eff', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),      -- ID: 6
('基本設計', '外部設計・UI/UXデザイン', '#b7ecff', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),      -- ID: 7
('詳細設計', '内部設計・DB/API設計', '#00b049', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),        -- ID: 8
('フロントエンド開発', 'React/UI実装', '#67c23a', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),       -- ID: 9
('バックエンド開発', 'API・ビジネスロジック実装', '#93fbc2', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- ID: 10
('テスト・QA', '単体・結合・ユーザーテスト', '#e6a23c', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),     -- ID: 11
('バグ修正', '不具合対応・調整', '#eeba8d', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),           -- ID: 12
('リリース作業', '本番デプロイ・環境構築', '#d61500', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),      -- ID: 13
('保守点検', 'ログ監視・パッチ適用', '#9d0ed5', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),         -- ID: 14
('運用サポート', 'ユーザー問い合わせ・操作説明', '#fda0c5', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- ID: 15
('事務・会議', '進捗管理・定例MTG', '#909399', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);         -- ID: 16

-- 3. タスクの挿入
INSERT INTO tasks (title, description, priority, due_date, category_id, progress, deleted, created_at, updated_at) VALUES
-- 上流工程 (ID: 5, 6, 7, 8)
('競合アプリ分析', '主要3社のタスク管理機能を比較', 1, CURRENT_TIMESTAMP + INTERVAL '2 days', 5, 100, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('画面遷移図作成', 'Figmaを使用してメインフローを設計', 2, CURRENT_TIMESTAMP + INTERVAL '5 days', 7, 80, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DBスキーマ設計', 'テーブル定義とER図の作成', 2, CURRENT_TIMESTAMP + INTERVAL '7 days', 8, 40, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 開発・テスト (ID: 9, 10, 11, 12)
('タスク登録画面実装', 'バリデーションを含むFormコンポーネント', 1, CURRENT_TIMESTAMP + INTERVAL '10 days', 9, 20, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('認証API作成', 'Spring SecurityによるJWT発行処理', 2, CURRENT_TIMESTAMP + INTERVAL '12 days', 10, 50, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('結合テスト実施', 'フロントからバックへの疎通確認', 2, CURRENT_TIMESTAMP + INTERVAL '14 days', 11, 0, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('スクロールバグ修正', 'iOS端末での表示崩れ対応', 2, CURRENT_TIMESTAMP + INTERVAL '1 day', 12, 90, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- リリース・運用 (ID: 13, 14, 15, 16)
('本番デプロイ', 'Renderのビルド設定確認', 2, CURRENT_TIMESTAMP + INTERVAL '15 days', 13, 0, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DBバックアップ確認', '自動バックアップの正常動作チェック', 1, CURRENT_TIMESTAMP + INTERVAL '20 days', 14, 100, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('週次定例MTG', 'チーム内での進捗共有', 0, CURRENT_TIMESTAMP + INTERVAL '3 days', 16, 0, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);