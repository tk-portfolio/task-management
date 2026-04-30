import { useState } from "react";
import "./CategoryForm.css";

export default function CategoryForm({ setCategories }) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deleted, setDeleted] = useState(false);
    const [color, setColor] = useState("#409eff");
    const baseUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategory = {
            name,
            description,
            deleted,
            color
        };

        try {
            const res = await fetch(`${baseUrl}/api/categories/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCategory)
            });

            if (!res.ok) {
                throw new Error("登録失敗")
            }

            const savedCategory = await res.json();
            setCategories((prev) => [...prev, savedCategory]);

            setName("");
            setDescription("");
            setDeleted(false);
            setColor("#409eff");

            setIsExpanded(false);

        } catch (err) {
            console.error(err);
            console.error("エラーの詳細:", err);
            alert("エラー発生");
        }
    };

    return (
        <div className="category-form-container">
            <div className="category-form-header">
                <h2>カテゴリー登録</h2>
                <button
                    type="button"
                    className={`toggle-btn ${isExpanded ? "is-active" : ""}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "-" : "+"}
                </button>
            </div>

            <div className={`form-expandable ${isExpanded ? "is-open" : ""}`}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>カテゴリー名</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>概要</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>カテゴリーカラー</label>
                        <div className="color-selection-area">
                            <div className="preset-colors">
                                {["#004c9d", "#409eff", "#b7ecff",
                                    "#00b049", "#67c23a", "#93fbc2",
                                    "#b96f00", "#e6a23c", "#eeba8d",
                                    "#d61500", "#ff5d4b", "#fda0c5",
                                    "#9d0ed5", "#909399", "#111111"].map((preset) => (
                                        <div
                                            key={preset}
                                            className={`color-chip ${color === preset ? "is-active" : ""}`}
                                            style={{ backgroundColor: preset }}
                                            onClick={() => setColor(preset)}
                                        />
                                    ))}
                            </div>
                            <div className="selected-color-text">選択中: <strong>{color.toUpperCase()}</strong></div>
                        </div>
                    </div>

                    <button type="submit" className="submit-button">登録</button>
                </form>
            </div>
        </div>
    );
}