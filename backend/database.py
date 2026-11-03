import os

from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URL)
db = client["todo_app"]  # database name
todos_collection = db["todos"]  # collection (like a table) that stores todos
