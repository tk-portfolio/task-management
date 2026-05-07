CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- ハッシュ化したパスワードを入れる
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 既存データの受け皿となる最初のユーザーを作っておく
INSERT INTO users (username, password) VALUES ('admin', 'password');