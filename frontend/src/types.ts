// The shape of a todo, matching what the FastAPI backend returns.
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
