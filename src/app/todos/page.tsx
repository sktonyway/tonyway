"use client";

import { Navbar } from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import type { Todo } from "@/types";

const SWIPE_DELETE_THRESHOLD = 100;

function todayString() {
  return new Date().toISOString().split("T")[0];
}

function parseTodo(todo: Todo): Todo {
  return {
    ...todo,
    date: todo.date ? new Date(todo.date).toISOString().split("T")[0] : "",
  };
}

function formatDisplayDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(date: string, isCompleted: boolean) {
  if (!date || isCompleted) return false;
  return date < todayString();
}

function defaultNewTodo() {
  return { title: "", priority: 2, date: todayString() };
}

interface SwipeableTodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editTitle: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  onEditChange: (value: string) => void;
  onSaveEdit: (id: string) => void;
  onEditKeyDown: (e: React.KeyboardEvent, id: string) => void;
}

function SwipeableTodoItem({
  todo,
  isEditing,
  editTitle,
  onToggle,
  onDelete,
  onStartEdit,
  onEditChange,
  onSaveEdit,
  onEditKeyDown,
}: SwipeableTodoItemProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const currentOffset = useRef(0);
  const didSwipe = useRef(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handlePointerDown(e: React.PointerEvent) {
    if (isEditing) return;
    startX.current = e.clientX;
    didSwipe.current = false;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging || isEditing) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 10) didSwipe.current = true;
    currentOffset.current = Math.min(0, diff);
    setOffsetX(currentOffset.current);
  }

  function handlePointerUp() {
    if (!dragging) return;
    setDragging(false);
    if (currentOffset.current < -SWIPE_DELETE_THRESHOLD) {
      onDelete(todo._id);
    }
    currentOffset.current = 0;
    setOffsetX(0);
  }

  function handleClick() {
    if (isEditing || didSwipe.current) return;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      onToggle(todo._id);
      clickTimer.current = null;
    }, 250);
  }

  function handleDoubleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    onStartEdit(todo);
  }

  return (
    <li className="relative overflow-hidden">
      <div
        className={`absolute inset-y-0 right-0 flex items-center justify-end px-6 bg-red-500 text-white text-sm font-medium transition-opacity ${
          offsetX < -20 ? "opacity-100" : "opacity-0"
        }`}
      >
        Delete
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: dragging ? "none" : "transform 0.2s ease",
        }}
        className={`relative bg-inherit text-4xl cursor-pointer select-none py-2 px-4 touch-pan-y ${
          todo.isCompleted
            ? "text-slate-400 line-through decoration-slate-400"
            : ""
        } ${
          todo.priority > 2 && !todo.isCompleted
            ? "border-l-3 border-red-400"
            : "border-l-3 border-transparent"
        }`}
      >
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onEditChange(e.target.value)}
            onBlur={() => onSaveEdit(todo._id)}
            onKeyDown={(e) => onEditKeyDown(e, todo._id)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            className="w-full text-4xl outline-none bg-transparent border-b border-slate-400"
          />
        ) : (
          <>
            <span title="Double-click to edit · Swipe left to delete">
              {todo.title}
            </span>
            {todo.date && (
              <span
                className={`block text-xs mt-1 ${
                  isOverdue(todo.date, todo.isCompleted)
                    ? "text-red-400"
                    : "text-slate-500"
                }`}
              >
                {formatDisplayDate(todo.date)}
              </span>
            )}
          </>
        )}
      </div>
    </li>
  );
}

function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState(defaultNewTodo());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/v1/todos");
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos((data.todos || []).map(parseTodo));
      } catch (err) {
        console.error("Failed fetching todos:", err);
        setError("Could not load todos.");
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.title.trim() || submitting) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/v1/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTodo.title.trim(),
          priority: newTodo.priority,
          date: newTodo.date,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Failed to create todo");

      setTodos((prev) => [...prev, parseTodo(result.data)]);
      setNewTodo(defaultNewTodo());
    } catch (err) {
      console.error(err);
      setError("Could not add todo.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: name === "priority" ? Number(value) : value,
    }));
  }

  async function toggleTodo(_id: string) {
    const todo = todos.find((t) => t._id === _id);
    if (!todo) return;

    const isCompleted = !todo.isCompleted;
    setTodos((prev) =>
      prev.map((t) => (t._id === _id ? { ...t, isCompleted } : t))
    );

    try {
      const res = await fetch("/api/v1/todos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, isCompleted }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
    } catch (err) {
      console.error(err);
      setTodos((prev) =>
        prev.map((t) =>
          t._id === _id ? { ...t, isCompleted: !isCompleted } : t
        )
      );
      setError("Could not update todo.");
    }
  }

  async function deleteTodo(_id: string) {
    const previous = todos;
    setTodos((prev) => prev.filter((t) => t._id !== _id));

    try {
      const res = await fetch("/api/v1/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });
      if (!res.ok) throw new Error("Failed to delete todo");
    } catch (err) {
      console.error(err);
      setTodos(previous);
      setError("Could not delete todo.");
    }
  }

  function startEditing(todo: Todo) {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  }

  async function saveEdit(_id: string) {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditingId(null);
      return;
    }

    const previous = todos;
    setTodos((prev) =>
      prev.map((t) => (t._id === _id ? { ...t, title: trimmed } : t))
    );
    setEditingId(null);

    try {
      const res = await fetch("/api/v1/todos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, title: trimmed }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
    } catch (err) {
      console.error(err);
      setTodos(previous);
      setError("Could not save edit.");
    }
  }

  function handleEditKeyDown(e: React.KeyboardEvent, _id: string) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit(_id);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  }

  const showExtras = newTodo.title.trim().length > 2;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex flex-col justify-center items-center w-full px-4">
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-slate-400 text-sm mb-4">No todos yet.</p>
        ) : (
          <ul className="w-full max-w-3xl">
            {todos.map((todo) => (
              <SwipeableTodoItem
                key={todo._id}
                todo={todo}
                isEditing={editingId === todo._id}
                editTitle={editTitle}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onStartEdit={startEditing}
                onEditChange={setEditTitle}
                onSaveEdit={saveEdit}
                onEditKeyDown={handleEditKeyDown}
              />
            ))}
          </ul>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mt-8"
        >
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleChange}
            placeholder="Add a new task..."
            className="w-full text-2xl outline-none border-b-2 border-slate-600 focus:border-red-400 pb-2 placeholder:text-slate-500 transition-colors"
          />

          <div
            className={`flex flex-wrap items-center gap-4 mt-3 transition-all duration-200 ${
              showExtras
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none h-0 overflow-hidden"
            }`}
          >
            <select
              value={newTodo.priority}
              name="priority"
              onChange={handleChange}
              className="text-xs text-slate-400 outline-none cursor-pointer bg-transparent"
            >
              <option value={1}>Low</option>
              <option value={2}>Normal</option>
              <option value={3}>High</option>
            </select>

            <input
              type="date"
              name="date"
              value={newTodo.date}
              onChange={handleChange}
              className="text-xs bg-transparent outline-none cursor-pointer text-slate-400"
            />

            <button
              type="submit"
              disabled={submitting}
              className="text-xs px-4 py-1.5 bg-red-400 text-white rounded-full hover:bg-red-500 transition-colors disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add task"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Page;
