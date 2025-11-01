import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

export default function AddTask() {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [input, setInput] = useState("");

  // 1️⃣ 初回読み込み時にlocalStorageからデータを復元
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedDeleted = localStorage.getItem("deletedTasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedDeleted) setDeletedTasks(JSON.parse(savedDeleted));
  }, []);

  // 2️⃣ tasksまたはdeletedTasksが変わるたびに保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }, [tasks, deletedTasks]);

  // 3️⃣ タスク追加
  const handleAdd = () => {
    if (!input.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  // 4️⃣ タスク削除
const handleDelete = (id) => {
  setTasks((prevTasks) => {
    const taskToDelete = prevTasks.find((t) => t.id === id);
    const newTasks = prevTasks.filter((t) => t.id !== id);

    if (taskToDelete) {
      // ✅ ここで安全に deletedTasks に追加（setTasksと同時に）
      setDeletedTasks((prevDeleted) => [...prevDeleted, taskToDelete]);
    }

    return newTasks;
  });
};


  // 5️⃣ 完了トグル
  const handleToggleDone = (id) => {
    setTasks(prev =>
      prev.map((t) => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  // 6️⃣ 復元
  const handleRestore = (id) => {
    setDeletedTasks(prevDeleted => {
      const taskToRestore = prevDeleted.find((t) => t.id === id);
      if (taskToRestore) {
        setTasks(prev => [...prev, taskToRestore]);
        return prevDeleted.filter((t) => t.id !== id);
      }
      return prevDeleted;
    });
  };

  const activeTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力"
        />
        <button onClick={handleAdd}>追加</button>
      </div>

      <TaskList
        title="現在のタスク"
        tasks={activeTasks}
        onToggleDone={handleToggleDone}
        onDelete={handleDelete}
      />

      <TaskList
        title="完了したタスク"
        tasks={completedTasks}
        onToggleDone={handleToggleDone}
      />

      <TaskList
        title="削除済みタスク"
        tasks={deletedTasks}
        onRestore={handleRestore}
        isDeletedList={true}
      />
    </div>
  );
}
