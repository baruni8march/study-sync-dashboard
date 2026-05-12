from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from pathlib import Path
import hashlib
import secrets
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path("data.json")


class Course(BaseModel):
    id: int
    name: str
    unit: str
    total: int
    completed: int


class Task(BaseModel):
    id: int
    title: str
    priority: str
    dueDate: str
    done: bool
    createdAt: str


class Session(BaseModel):
    id: int
    subject: str
    hours: float
    date: str
    createdAt: str
class UserSignup(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str

def load_data():
    if not DATA_FILE.exists():
        return {
            "courses": [],
            "tasks": [],
            "sessions": []
        }

    with open(DATA_FILE, "r") as file:
        return json.load(file)


def save_data(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

def hash_password(password, salt):
    text = password + salt
    return hashlib.sha256(text.encode()).hexdigest()


def find_user_by_email(users, email):
    for user in users:
        if user["email"] == email:
            return user

    return None
@app.get("/")
def home():
    return {"message": "StudySync backend is running"}


@app.get("/courses")
def get_courses():
    data = load_data()
    return data["courses"]

@app.post("/signup")
def signup(user: UserSignup):
    data = load_data()

    existing_user = find_user_by_email(data["users"], user.email)

    if existing_user:
        return {
            "success": False,
            "message": "Account already exists"
        }

    salt = secrets.token_hex(16)
    password_hash = hash_password(user.password, salt)

    new_user = {
        "id": len(data["users"]) + 1,
        "name": user.name,
        "email": user.email,
        "passwordHash": password_hash,
        "salt": salt
    }

    data["users"].append(new_user)
    save_data(data)

    return {
        "success": True,
        "message": "Account created successfully",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"]
        }
    }


@app.post("/login")
def login(user: UserLogin):
    data = load_data()

    existing_user = find_user_by_email(data["users"], user.email)

    if not existing_user:
        return {
            "success": False,
            "message": "Account not found"
        }

    password_hash = hash_password(user.password, existing_user["salt"])

    if password_hash != existing_user["passwordHash"]:
        return {
            "success": False,
            "message": "Wrong password"
        }

    return {
        "success": True,
        "message": "Login successful",
        "user": {
            "id": existing_user["id"],
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }
@app.post("/courses")
def add_course(course: Course):
    data = load_data()
    data["courses"].append(course.model_dump())
    save_data(data)
    return course


@app.delete("/courses/{course_id}")
def delete_course(course_id: int):
    data = load_data()
    data["courses"] = [
        course for course in data["courses"]
        if course["id"] != course_id
    ]
    save_data(data)
    return {"message": "Course deleted"}


@app.get("/tasks")
def get_tasks():
    data = load_data()
    return data["tasks"]


@app.post("/tasks")
def add_task(task: Task):
    data = load_data()
    data["tasks"].append(task.model_dump())
    save_data(data)
    return task


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    data = load_data()
    data["tasks"] = [
        task for task in data["tasks"]
        if task["id"] != task_id
    ]
    save_data(data)
    return {"message": "Task deleted"}


@app.get("/sessions")
def get_sessions():
    data = load_data()
    return data["sessions"]


@app.post("/sessions")
def add_session(session: Session):
    data = load_data()
    data["sessions"].append(session.model_dump())
    save_data(data)
    return session


@app.delete("/sessions/{session_id}")
def delete_session(session_id: int):
    data = load_data()
    data["sessions"] = [
        session for session in data["sessions"]
        if session["id"] != session_id
    ]
    save_data(data)
    return {"message": "Session deleted"}