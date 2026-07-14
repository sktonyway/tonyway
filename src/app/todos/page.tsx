"use client"
import { Navbar } from "@/components/Navbar"
import { useEffect, useState } from "react"
import type { Todo } from "@/types"



function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function fetchNotes() {
    const data = await fetch('/api/v1/todos');
    const datajson = await data.json()
    console.log(datajson.todos)
    setTodos(datajson.todos)
  }
  useEffect(() => { fetchNotes() }, [])


  const toggleTodo = (_id: string) => {
    console.log(_id)
    setTodos(
      todos.map((todo) =>
        todo._id === _id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex flex-col justify-center items-center">
        <ul>
          {todos.map(todo => (
            <li key={todo._id} onClick={() => toggleTodo(todo._id)} className={`text-4xl cursor-pointer select-none transition-all duration-200 py-2 px-4  ${todo.isCompleted ? "text-slate-400 line-through decoration-slate-400" : ""} ${(todo.priority > 2 && !todo.isCompleted) ? "border-l-3 border-red-400" : "border-l-3 border-transparent"}`}>{todo.title}</li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Page