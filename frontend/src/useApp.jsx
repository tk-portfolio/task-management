import { useEffect, useState } from "react";

export const useApp = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState("id");
    const [editingTask, setEditingTask] = useState(null);
    const baseUrl = process.env.REACT_APP_API_URL;
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogin = (receivedToken) => {
        setToken(receivedToken);
    };

    // タスク一覧表示
    const fetchTasks = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${baseUrl}/api/task/search`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("認証に失敗しました。再ログインしてください。");
                }
                return res.json();
            })
            .then(setTasks)
            .catch(console.error);
    };

    // カテゴリー一覧表示
    const fetchCategories = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${baseUrl}/api/categories/search`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("認証に失敗しました。再ログインしてください。");
                }
                return res.json();
            })
            .then(setCategories)
            .catch(console.error);
    };


    // タスク削除
    const taskDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${baseUrl}/api/task/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (!res.ok) throw new Error();

            fetchTasks();
        } catch {
            alert("削除エラー");
        }
    };

    // カテゴリー削除
    const categoryDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${baseUrl}/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
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

    useEffect(() => {
        if (!token) return;

        fetchTasks();
        fetchCategories();

    }, [token]);

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
        handleLogin,
        token,
        setToken,
    };
};