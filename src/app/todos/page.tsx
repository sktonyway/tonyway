"use client"
import { Navbar } from "@/components/Navbar"
import { useEffect, useState } from "react"

function Page() {
  const [isDone, setIsDone] = useState(false);
  const [todos, setTodos] = useState([]);
  async function handleDone(){

    alert('done')
  }
  async function fetchNotes() {
    const data = await fetch('/api/v1/todos');
    const datajson = await data.json()
    setTodos(datajson.todos)
  }
  useEffect(()=> {fetchNotes()}, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex justify-center items-center">
        <ul>
          {todos.map(todo =>(
            <div key="todo._id">
              <li onClick={() => setIsDone(!isDone)} className ={`text-4xl cursor-pointer select-none transition-all duration-200 py-2 px-4  ${ isDone ? "text-slate-400 line-through decoration-slate-400" : "font-medium"}`}>{todo.title}</li>

            </div>
          ))}
          {/* <li>that</li>
          <li>some</li>
          <li>ok</li>
          <li>nice</li> */}
        </ul>
      </main>
    </div>
  )
}

export default Page