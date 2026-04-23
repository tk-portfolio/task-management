import "./TaskList.css";

export default function TaskList({ tasks, onDelete, categories, onEdit }) {

    return (
        <ul className="task-items">
            {tasks.map((task) => {
                // categoryIdとcategoriesを紐付け
                const category = categories.find(
                    (c) => Number(c.id) === Number(task.categoryId)
                );

                return (
                    <li
                        key={task.id}
                        className="task-card"
                        style={{
                            borderLeft: `6px solid ${category?.color || "#ffffff"}`,
                            backgroundColor: task.progress === 100 ? "#9e9e9e89" : task.progress === 0 ? "#ffffff" : "#d6f9fc74"
                        }}
                    >
                        <div className="task-main">
                            <div className="task-header">
                                <span className={`priority-badge p${task.priority}`}>
                                    優先度{" "}
                                    {task.priority === 2
                                        ? "高"
                                        : task.priority === 1
                                            ? "中"
                                            : "低"}
                                </span>

                                <h3 className="task-title">{task.title}</h3>
                            </div>

                            <p className="task-desc">{task.description}</p>

                            <div className="task-footer">
                                <div className="progress-wrapper">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${task.progress}%` }}
                                        />
                                    </div>

                                    <span className="progress-text">
                                        {task.progress}%
                                    </span>
                                </div>

                                <span className="due-date">
                                    📅 {task.dueDate}
                                </span>
                            </div>
                        </div>

                        <div className="task-side">
                            <button
                                className="edit-btn"
                                onClick={() => onEdit(task)}
                            >
                                編集
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(task.id)}
                            >
                                削除
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
