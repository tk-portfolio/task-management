import "./App.css";

import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { useApp } from "./useApp";

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
    token,
    setToken,
    handleLogin,
  } = useApp();

  // トークンがない場合は「ログイン画面」だけを返す
  if (!token || token === "" || typeof token === 'object') {
    return (
      <div className="app-container">
        <div className="login-modal-overlay">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>ログアウト</button>

      <header className="app-header">
        <h1>✅ タスク管理</h1>
      </header>

      <main className="app-content">
        <section className="form-section">
          <TaskForm
            categories={categories}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            fetchTasks={fetchTasks}
            token={token}
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
          <CategoryForm
            setCategories={setCategories}
            token={token}
          />
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