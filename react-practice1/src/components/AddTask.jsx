import React, { useState } from "react";
import TaskList from "./TaskList";

export default function AddTask({ tasks, setTasks, deletedTasks, setDeletedTasks }) {
  const [input, setInput] = useState("");

  // 1️⃣ タスク追加
  const handleAdd = () => {
    if (!input.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  // 2️⃣ 削除
const handleDelete = (id) => {
  setTasks((prevTasks) => {
    const taskToDelete = prevTasks.find((t) => t.id === id);
    const newTasks = prevTasks.filter((t) => t.id !== id);

    if (taskToDelete) {
      setDeletedTasks((prevDeleted) => {
        // ✅ すでに存在する場合は追加しない
        if (prevDeleted.some((t) => t.id === taskToDelete.id)) return prevDeleted;
        return [...prevDeleted, taskToDelete];
      });
    }

    return newTasks;
  });
};

  // 3️⃣ 完了トグル
  const handleToggleDone = (id) => {
    setTasks(prev =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // 4️⃣ 復元
const handleRestore = (id) => {
  setDeletedTasks((prevDeleted) => {
    const taskToRestore = prevDeleted.find((t) => t.id === id);
    if (taskToRestore) {
      setTasks((prev) => {
        // ✅ 同じIDのタスクが存在する場合はスキップ
        if (prev.some((t) => t.id === taskToRestore.id)) return prev;
        return [...prev, taskToRestore];
      });
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
