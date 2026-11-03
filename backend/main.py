from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import todos

app = FastAPI(title="Todo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "capacitor://localhost"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos.router)
