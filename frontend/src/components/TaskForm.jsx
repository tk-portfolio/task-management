import { useEffect, useRef, useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ categories, editingTask, setEditingTask, fetchTasks }) {

    const [isExpanded, setIsExpanded] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [progress, setProgress] = useState(0)
    const [errors, setErrors] = useState({});

    const formRef = useRef(null);

    // バリデーションチェック
    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "タスク名は必須です";
        }

        if (title.length > 50) {
            newErrors.title = "50文字以内で入力してください";
        }

        if (description.length > 200) {
            newErrors.description = "200文字以内で入力してください";
        }

        if (categoryId === 0) {
            newErrors.category = "カテゴリーを選択してください";
        }

        setErrors(newErrors);

        const isValid = Object.keys(newErrors).length === 0;

        // エラーがあればフォームの一番上にスクロール
        if (!isValid) {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        // 画面再読み込みを止める
        e.preventDefault();

        // 入力エラー
        if (!validate()) return;

        const isEdit = !!editingTask;

        const payload = {
            title,
            description,
            priority,
            dueDate,
            categoryId,
            progress,
        };

        // タスク編集か追加のAPI切り替え
        const url = isEdit
            ? `https://task-management-cwbi.onrender.com/api/task/${editingTask.id}`
            : "https://task-management-cwbi.onrender.com/api/task/add";

        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("登録/更新失敗");
            }

            await fetchTasks();

            // リセット
            setTitle("");
            setDescription("");
            setPriority(1);
            setDueDate("");
            setCategoryId("");
            setProgress(0);

            setEditingTask(null);
            setIsExpanded(false);

        } catch (err) {
            console.error(err);
            alert("エラー発生");
        }
    };

    // 編集
    useEffect(() => {
        if (editingTask) {
            // フォーム開く
            setIsExpanded(true);

            // 編集対象のデータをフォームに入れる
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setProgress(editingTask.progress);
            setPriority(editingTask.priority);
            setDueDate(editingTask.dueDate);
            setCategoryId(editingTask.categoryId);

            // フォーム最上部にスクロール
            setTimeout(() => {
                formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    }, [editingTask]);

    //編集キャンセル
    const handleCancel = () => {
        if (setEditingTask) {
            setEditingTask(null);
        }

        // リセット
        setTitle("");
        setDescription("");
        setPriority(1);
        setDueDate("");
        setCategoryId(0);
        setProgress(0);

        setErrors({});
        setIsExpanded(false);

        // キャンセル時に画面がフォームの最下部にスクロールされる
        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }, 100);
    };


    return (
        <div className="task-form-container">
            <div className="task-form-header">
                <h2>
                    {editingTask ? "タスク編集" : "タスク登録"}
                </h2>
                <button
                    type="button"
                    className={`toggle-btn ${isExpanded ? "is-active" : ""}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "−" : "＋"}
                </button>
            </div>

            <div
                ref={formRef}
                className={`form-expandable ${isExpanded ? "is-open" : ""}`}
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>タスク名</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="何をする？"
                        />
                        {errors.title && <p className="error">{errors.title}</p>}
                    </div>

                    <div className="form-group">
                        <label>概要</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p className="error">{errors.description}</p>}
                    </div>

                    <div className="form-group">
                        <label>進捗率(%)</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(Number(e.target.value))}
                        />

                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val > 100) val = 100;
                                if (val < 0) val = 0;
                                setProgress(val);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>優先度</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(Number(e.target.value))}
                        >
                            <option value={0}>低</option>
                            <option value={1}>中</option>
                            <option value={2}>高</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>締切</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>カテゴリー</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(Number(e.target.value))}
                        >
                            <option value={0}>選択してください</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="error">{errors.category}</p>}
                    </div>


                    <button type="button" className="cancel-button" onClick={handleCancel}>
                        キャンセル
                    </button>

                    <button type="submit" className="submit-button">
                        {editingTask ? "保存" : "登録"}
                    </button>
                </form>
            </div>
        </div>
    );
}
