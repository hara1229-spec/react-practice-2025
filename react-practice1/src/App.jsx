import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main style={{ padding: "20px" }}>
        <Home />
      </main>
    </div>
  );
}
