from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

courses = []

class Course(BaseModel):
    id: int
    name: str
    unit: str
    total: int
    completed: int

@app.get("/")
def home():
    return {"message": "StudySync backend is running"}

@app.get("/courses")
def get_courses():
    return courses

@app.post("/courses")
def add_course(course: Course):
    courses.append(course)
    return course

@app.delete("/courses/{course_id}")
def delete_course(course_id: int):
    for course in courses:
        if course.id == course_id:
            courses.remove(course)
            return {"message": "Course deleted"}

    return {"message": "Course not found"}