from bson import ObjectId
from fastapi import HTTPException


def todo_to_json(todo: dict) -> dict:
    return {"id": str(todo["_id"]), "title": todo["title"], "completed": todo["completed"]}


def to_object_id(todo_id: str) -> ObjectId:
    try:
        return ObjectId(todo_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Todo not found")
