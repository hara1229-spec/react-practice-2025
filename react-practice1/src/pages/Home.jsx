import React from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home(){
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const addTask = (text) => {
    setTasks([{ id: Date.now(), text, done:false }, ...tasks]);
  };
  const toggle = (id) => setTasks(tasks.map(t => t.id===id ? {...t, done: !t.done} : t));
  const remove = (id) => setTasks(tasks.filter(t => t.id !== id));

  return (
    <main style={{maxWidth:700, margin:"0 auto", padding:20}}>
      <h1>QuickTasks（MVP）</h1>
      <AddTask onAdd={addTask}/>
      <TaskList tasks={tasks} onToggle={toggle} onRemove={remove}/>
    </main>
  );
}
