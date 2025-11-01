// src/components/AddTask.jsx
import React, { useState } from "react";

export default function AddTask({ tasks, setTasks }) {
  const [v, setV] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    const text = v.trim();
    if (!text) return;
    setTasks([{ id: Date.now(), text, done: false, deleted: false }, ...tasks]);
    setV("");
  };

  const toggle = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const remove = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, deleted: true } : t))
    );

  const restore = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, deleted: false } : t))
    );

  const visibleTasks = tasks.filter((t) =>
    showDeleted ? t.deleted : !t.deleted
  );

  return (
    <div>
      <form onSubmit={addTask} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="Add task..."
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
        <button
          type="button"
          onClick={() => setShowDeleted((prev) => !prev)}
        >
          {showDeleted ? "タスクリストへ戻る" : "削除済みを見る"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {visibleTasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 8,
              borderBottom: "1px solid #eee",
            }}
          >
            {!showDeleted && (
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t.id)}
              />
            )}
            <div
              style={{
                flex: 1,
                textDecoration: t.done ? "line-through" : "none",
                color: t.deleted ? "#888" : "inherit",
              }}
            >
              {t.text}
            </div>
            {showDeleted ? (
              <button onClick={() => restore(t.id)}>復元</button>
            ) : (
              <button onClick={() => remove(t.id)}>削除</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
