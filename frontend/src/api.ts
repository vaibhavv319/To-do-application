import type { Todo } from "./types";

const API = "https://pyqvjmwbdhfsxp4glgbr3nmm440teblc.lambda-url.ap-southeast-2.on.aws";

async function request<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API + path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(`Cannot reach the backend at ${API}. Is it running?`);
  }
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(typeof data.detail === "string" ? data.detail : "Something went wrong");
  }
  return data as T;
}

// CRUD
export const getTodos = () => request<Todo[]>("/todos"); // Read
export const createTodo = (title: string) => request<Todo>("/todos", "POST", { title }); // Create
export const updateTodo = (id: string, changes: Partial<Pick<Todo, "title" | "completed">>) =>
  request<Todo>(`/todos/${id}`, "PATCH", changes); // Update
export const deleteTodo = (id: string) => request<{ ok: boolean }>(`/todos/${id}`, "DELETE"); // Delete
