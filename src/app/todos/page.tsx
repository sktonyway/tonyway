"use client"
import { Navbar } from "@/components/Navbar"
import { useEffect, useState } from "react"
import type { Todo } from "@/types"



function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ _id: "abc", title: "", priority: 2, date: new Date().toISOString().split('T')[0] });

  async function fetchNotes() {
    try {
      const data = await fetch('/api/v1/todos');
      const datajson = await data.json();

      // Safeguard date string mappings for native HTML date compatibility
      const parsedTodos = (datajson.todos || []).map((todo: Todo) => ({
        ...todo,
        date: todo.date ? new Date(todo.date).toISOString().split('T')[0] : ""
      }));

      setTodos(parsedTodos);
    } catch (err) {
      console.error("Failed fetching records:", err);
    }
  }
  useEffect(() => { fetchNotes() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    todos.push(newTodo as Todo);

    const response = await fetch('/api/v1/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo.title, priority: newTodo.priority }),
    });

    setNewTodo({ _id: "", title: "", priority: 2, date: "" });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;

    setNewTodo((prev) => ({
      ...prev,
      [name]: type === "number" || name === "priority" ? Number(value) : value
    }))
  }

  const toggleTodo = (_id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === _id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="grow flex flex-col justify-center items-center">
        <ul >
          {todos.map(todo => (
            <li key={todo._id} onClick={() => toggleTodo(todo._id)} className={`text-4xl cursor-pointer select-none transition-all duration-200 py-2 px-4  ${todo.isCompleted ? "text-slate-400 line-through decoration-slate-400" : ""} ${(todo.priority > 2 && !todo.isCompleted) ? "border-l-3 border-red-400" : "border-l-3 border-transparent"}`}>{todo.title}</li>
          ))}
        </ul>
        {/* Minimal/Medium Aesthetic Input Component */}
        <form onSubmit={handleSubmit}>
          <div>

            <input
              type="text"
              name="title"
              value={newTodo.title}
              onChange={handleChange}
              placeholder="Add a new task..."
              className="w-full text-2xl text-slate-200 placeholder-slate-200  outline-none border-b-2 px-2"
            />

            {/* Minimalist Priority Selector */}
            <select
              value={newTodo.priority}
              name="priority"
              onChange={handleChange}
              className={`text-xs text-slate-400 outline-none cursor-pointer ${newTodo.title.trim().length > 2 ? "" : "hidden"}`}>
              <option value={1}>Low</option>
              <option value={2}>Normal</option>
              <option value={3}>High</option>
            </select>
            <div className={`flex items-center gap-3 ml-2 ${newTodo.title.trim().length > 2 ? "" : "hidden"}`}>
              {/* Inline Date Selector */}
              <input
                type="date"
                name="date"
                value={newTodo.date}
                onChange={handleChange}
                className="text-xs  bg-transparent outline-none cursor-pointer "
              />
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Page