import "./App.css";

import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { useApp } from "./hooks/useApp";

function App() {
  const {
    categories,
    sortBy,
    setSortBy,
    setTasks,
    setCategories,
    sortedTasks,
    taskDelete,
    categoryDelete,
    editingTask,
    setEditingTask,
    fetchTasks,
  } = useApp();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✅ タスク管理アプリ</h1>
      </header>

      <main className="app-content">
        <section className="form-section">
          <TaskForm
            categories={categories}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            fetchTasks={fetchTasks}
          />
        </section>

        <div className="sort-controls">
          <div className="sort-buttons">
            {[
              { id: "id", label: "登録順" },
              { id: "priority", label: "優先度順" },
              { id: "progress", label: "進捗順" },
              { id: "dueDate", label: "期限順" },
              { id: "category", label: "カテゴリー別" },
            ].map((option) => (
              <button
                key={option.id}
                className={`sort-chip ${sortBy === option.id ? "is-active" : ""
                  }`}
                onClick={() => setSortBy(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <section className="list-section">
          <TaskList
            tasks={sortedTasks}
            onDelete={taskDelete}
            categories={categories}
            onEdit={setEditingTask}
          />
        </section>

        <section className="form-section">
          <CategoryForm setCategories={setCategories} />
        </section>

        <aside className="category-section">
          <CategoryList
            categories={categories}
            onDelete={categoryDelete}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;