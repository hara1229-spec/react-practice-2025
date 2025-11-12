export default function TaskList({
  title,
  tasks,
  onToggleDone,
  onDelete,
  onRestore,
  onPermanentDelete,
  isDeletedList = false,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p style={{ color: "#666" }}>タスクはありません</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  flex: 1,
                  textDecoration: task.done ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>

              {/* 通常タスク・完了タスク */}
              {!isDeletedList && (
                <>
                  <button onClick={() => onToggleDone(task.id)}>
                    {task.done ? "戻す" : "完了"}
                  </button>

                  {/* 完了タスク専用の完全削除ボタン */}
                  {title === "完了したタスク" ? (
                    <button onClick={() => onPermanentDelete(task.id)}>
                      完全に削除
                    </button>
                  ) : (
                    <button onClick={() => onDelete(task.id)}>削除</button>
                  )}
                </>
              )}

              {/* 削除済みタスク */}
              {isDeletedList && (
                <>
                  <button onClick={() => onRestore(task.id)}>復元</button>
                  <button onClick={() => onPermanentDelete?.(task.id)}>
                    完全に削除
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
