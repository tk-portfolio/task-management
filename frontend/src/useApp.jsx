import { useEffect, useState } from "react";

export const useApp = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState("id");
    const [editingTask, setEditingTask] = useState(null);

    // タスク一覧取得
    const fetchTasks = () => {
        fetch("http://localhost:8080/api/task/search")
            .then((res) => res.json())
            .then(setTasks)
            .catch(console.error);
    };

    // カテゴリ一覧取得
    const fetchCategories = () => {
        fetch("http://localhost:8080/api/categories/search")
            .then((res) => res.json())
            .then(setCategories)
            .catch(console.error);
    };

    // タスク削除
    const taskDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/task/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();

            fetchTasks();
        } catch {
            alert("削除エラー");
        }
    };

    // カテゴリー削除
    const categoryDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/categories/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const msg = await res.text();
                alert(msg);
                return;
            }

            fetchCategories();

        } catch {
            alert("削除エラー");
        }
    };

    // ソート
    const sortedTasks = [...tasks].sort((a, b) => {
        const aDone = a.progress === 100;
        const bDone = b.progress === 100;

        if (aDone !== bDone) return aDone ? 1 : -1;

        if (sortBy === "priority") {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
        }

        if (sortBy === "progress") {
            if (a.progress !== b.progress) {
                return a.progress - b.progress;
            }
        }

        if (sortBy === "dueDate") {
            const diff = new Date(a.dueDate) - new Date(b.dueDate);
            if (diff !== 0) return diff;
        }

        if (sortBy === "category") {
            if (a.categoryId !== b.categoryId) {
                return a.categoryId - b.categoryId;
            }
        }

        // 完全一致時のみ
        return a.id - b.id;
    });

    // 初期表示
    useEffect(() => {
        fetchTasks();
        fetchCategories();
    }, []);

    return {
        tasks,
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
    };
};