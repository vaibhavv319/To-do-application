import { useEffect, useState, type FormEvent } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./api";
import type { Todo } from "./types";

interface Props {
  username: string;
  onLogout: () => void;
}

export default function Todos({ username, onLogout }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");

  // READ: load todos once when the page opens
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((err: Error) => setError(err.message));
  }, []);

  // CREATE
  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const todo = await createTodo(newTitle);
      setTodos([todo, ...todos]); // put the new one on top
      setNewTitle("");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  // UPDATE: tick / untick
  async function handleToggle(todo: Todo) {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  // UPDATE: rename
  async function handleSaveEdit(id: string) {
    if (!editText.trim()) return;
    try {
      const updated = await updateTodo(id, { title: editText });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
      setEditingId(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  // DELETE
  async function handleDelete(id: string) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="box wide">
      <div className="header">
        <h1>{username}'s Todos</h1>
        <button onClick={onLogout}>Log out</button>
      </div>

      <form className="row" onSubmit={handleAdd}>
        <input
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="primary">Add</button>
      </form>

      {error && <p className="error">{error}</p>}
      {todos.length === 0 && <p className="empty">No todos yet.</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo)} />

            {editingId === todo.id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} autoFocus />
                <button className="primary" onClick={() => handleSaveEdit(todo.id)}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className={todo.completed ? "title done" : "title"}>{todo.title}</span>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.title);
                  }}
                >
                  Edit
                </button>
                <button className="danger" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
