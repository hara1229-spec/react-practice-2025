// src/components/TaskList.jsx
import React from "react";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) return <p>No tasks yet</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((t) => (
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
          <div
            style={{
              flex: 1,
              textDecoration: t.done ? "line-through" : "none",
              color: t.done ? "#888" : "inherit",
            }}
          >
            {t.text}
          </div>
        </li>
      ))}
    </ul>
  );
}
