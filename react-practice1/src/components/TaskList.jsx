import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({tasks, onToggle, onRemove}){
  if(tasks.length===0) return <p>No tasks yet</p>;
  return <ul style={{listStyle:"none", padding:0}}>
    {tasks.map(t => (
      <TaskItem key={t.id} task={t} onToggle={()=>onToggle(t.id)} onRemove={()=>onRemove(t.id)} />
    ))}
  </ul>
}
