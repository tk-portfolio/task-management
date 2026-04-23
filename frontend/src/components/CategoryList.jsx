import "./CategoryList.css";

export default function CategoryList({ categories, onDelete }) {

    return (
        <div className="category-list-container">
            <h2>カテゴリ一覧</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id} style={{ borderLeftColor: category.color }}>
                        <div className="category-main">
                            <div className="category-name">{category.name}</div>
                            <div className="category-description">{category.description}</div>
                        </div>

                        <div className="category-side">
                            <button className="delete-btn" onClick={() => onDelete(category.id)}>
                                削除
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}