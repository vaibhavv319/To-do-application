# Todo App — React (TypeScript) + FastAPI + MongoDB

A simple todo app with basic CRUD and a login page that has **no real authentication**
(any username is accepted; no password is checked; nothing is sent to the server).

## Layout

```
todo-app-ts/
├── backend/
│   ├── main.py            <- the entire backend (CRUD routes)
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.tsx        <- shows Login or Todos
        ├── Login.tsx      <- fake login page
        ├── Todos.tsx      <- todo list (create / read / update / delete)
        ├── api.ts         <- calls to the backend
        ├── types.ts       <- Todo type
        └── styles.css
```

## Run it

Needs Python 3, Node.js and MongoDB running on the default port (27017).

**Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
API: http://localhost:8000 (interactive docs at /docs)

**Frontend** (second terminal)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## API

| Method | Path          | What it does                     |
|--------|---------------|----------------------------------|
| GET    | /todos        | List all todos                   |
| POST   | /todos        | Create a todo `{ "title": "…" }` |
| PATCH  | /todos/{id}   | Update `title` and/or `completed`|
| DELETE | /todos/{id}   | Delete a todo                    |

Optional: set `MONGO_URL` (e.g. a MongoDB Atlas connection string) before starting the backend.

## Note
Because there is no authentication, all visitors share the same todo list. Add real login
(e.g. JWT) before putting this anywhere public.
