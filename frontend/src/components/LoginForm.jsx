import { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const baseUrl = process.env.REACT_APP_API_URL;

    const [showPassword, setShowPassword] = useState(false);

    // バリデーションチェック
    const validate = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "ユーザー名は必須です";
        }

        if (!password.trim()) {
            newErrors.password = "パスワードは必須です";
        }


        setErrors(newErrors);

        const isValid = Object.keys(newErrors).length === 0;

        return isValid;
    };

    // ログイン処理
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await fetch(`${baseUrl}/api/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                const msg = await res.text();
                alert(msg);
                return;
            }

            // text() でトークンを受け取る
            const token = await res.text();

            // トークンを保存する
            localStorage.setItem("token", token);

            // ログイン成功
            onLogin(token);

        } catch (err) {
            console.error(err);
            alert("ログインに失敗しました");
        }
    };

    // ユーザー登録処理
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await fetch(`${baseUrl}/api/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                const msg = await res.text();
                alert(msg);
                return;
            }

            // トークンをテキストで受け取って保存
            const token = await res.text();
            localStorage.setItem("token", token);

            onLogin(token);

        } catch (err) {
            console.error(err);
            alert("登録に失敗しました");
        }
    };

    return (
        <div className="login-modal-overlay">
            <div className="login-form-card">
                <h2>ログイン</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ユーザー名</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ユーザー名を入力"
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <label>パスワード</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="パスワードを入力"
                                className="password-input"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🔓" : "🔒"}
                            </button>
                        </div>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button type="submit" className="login-submit-btn">
                        ログイン
                    </button>

                    <button type="button" onClick={handleRegister} className="register-submit-btn">
                        ユーザー登録
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;