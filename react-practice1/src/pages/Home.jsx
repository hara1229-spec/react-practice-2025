// src/pages/Home.jsx
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [deletedTasks, setDeletedTasks] = useLocalStorage("deletedTasks", []);

  //  AddTask に props で渡す
  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1>QuickTasks（MVP）</h1>
      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        deletedTasks={deletedTasks}
        setDeletedTasks={setDeletedTasks}
      />
    </main>
  );
}
