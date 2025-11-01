import React from "react";
export default function TaskItem({task,onToggle,onRemove}){
  return (
    <li style={{display:"flex", alignItems:"center", gap:10, padding:8, borderBottom:"1px solid #eee"}}>
      <input type="checkbox" checked={task.done} onChange={onToggle}/>
      <div style={{flex:1, textDecoration: task.done ? "line-through": "none"}}>{task.text}</div>
      <button onClick={onRemove}>Delete</button>
    </li>
  );
}
