import React, {useState} from "react";
export default function AddTask({onAdd}){
  const [v,setV] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const text = v.trim();
    if(!text) return;
    onAdd(text);
    setV("");
  };
  return (
    <form onSubmit={submit} style={{display:"flex", gap:8, marginBottom:12}}>
      <input value={v} onChange={e=>setV(e.target.value)} placeholder="Add task..." style={{flex:1}}/>
      <button type="submit">Add</button>
    </form>
  );
}
