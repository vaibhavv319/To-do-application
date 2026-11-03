"""Todo routes - the four CRUD operations.

  GET    /todos        -> Read   (list all todos)
  POST   /todos        -> Create (add a todo)
  PATCH  /todos/{id}   -> Update (change title and/or completed)
  DELETE /todos/{id}   -> Delete (remove a todo)
"""

from fastapi import APIRouter, HTTPException

from database import todos_collection
from schemas import TodoCreate, TodoUpdate
from utils import to_object_id, todo_to_json

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("")
async def read_todos():
    cursor = todos_collection.find().sort("_id", -1)  # newest first
    return [todo_to_json(t) async for t in cursor]


@router.post("", status_code=201)
async def create_todo(data: TodoCreate):
    title = data.title.strip()
    if not title:
        raise HTTPException(status_code=400, detail="Title cannot be empty")

    todo = {"title": title, "completed": False}
    result = await todos_collection.insert_one(todo)
    todo["_id"] = result.inserted_id
    return todo_to_json(todo)


@router.patch("/{todo_id}")
async def update_todo(todo_id: str, data: TodoUpdate):
    changes = {}
    if data.title is not None:
        if not data.title.strip():
            raise HTTPException(status_code=400, detail="Title cannot be empty")
        changes["title"] = data.title.strip()
    if data.completed is not None:
        changes["completed"] = data.completed
    if not changes:
        raise HTTPException(status_code=400, detail="Nothing to update")

    todo = await todos_collection.find_one_and_update(
        {"_id": to_object_id(todo_id)},
        {"$set": changes},
        return_document=True,  # return the updated document
    )
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo_to_json(todo)


@router.delete("/{todo_id}")
async def delete_todo(todo_id: str):
    result = await todos_collection.delete_one({"_id": to_object_id(todo_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"ok": True}
