import { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
function CourseManager() {
 const [courses, setCourses] = useLocalStorage("studysync-courses", [])
  const [courseName, setCourseName] = useState("")
  const [unit, setUnit] = useState("pages")
  const [total, setTotal] = useState("")

  function addCourse(e) {
    e.preventDefault()

    if (courseName.trim() === "" || total === "") {
      return
    }

    const newCourse = {
      id: Date.now(),
      name: courseName,
      unit: unit,
      total: Number(total),
      completed: 0,
    }

    setCourses([newCourse, ...courses])
    setCourseName("")
    setUnit("pages")
    setTotal("")
  }

  function deleteCourse(id) {
    const remainingCourses = courses.filter((course) => course.id !== id)
    setCourses(remainingCourses)
  }

  function updateProgress(id, amount) {
    const updatedCourses = courses.map((course) => {
      if (course.id === id) {
        const newCompleted = Math.min(course.completed + Number(amount), course.total)

        return {
          ...course,
          completed: newCompleted,
        }
      }

      return course
    })

    setCourses(updatedCourses)
  }

  function getProgress(course) {
    if (course.total === 0) {
      return 0
    }

    return Math.min(Math.round((course.completed / course.total) * 100), 100)
  }

  return (
    <section className="mt-8 bg-white/85 rounded-3xl shadow-sm border border-pink-100 p-6">
      <div className="mb-6">
        <p className="text-sm font-bold text-pink-500 mb-1">
          Course Manager
        </p>
        <h3 className="text-2xl font-extrabold">
          Build your semester map
        </h3>
        <p className="text-slate-500 mt-2">
          Add your courses first. Later we will connect tasks and study hours to them.
        </p>
      </div>

      <form onSubmit={addCourse} className="grid md:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Course name"
          className="md:col-span-2 px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        >
          <option value="pages">Pages</option>
          <option value="chapters">Chapters</option>
        </select>

        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="Total"
          min="1"
          className="px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button className="md:col-span-4 bg-linear-to-r from-pink-500 to-violet-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:scale-[1.01] transition">
          Add Course
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {courses.length === 0 ? (
          <div className="md:col-span-2 bg-pink-50 border border-pink-100 rounded-2xl p-5 text-slate-500">
            No courses added yet. Add your first course to start building your dashboard.
          </div>
        ) : (
          courses.map((course) => {
            const progress = getProgress(course)

            return (
              <div
                key={course.id}
                className="bg-pink-50 border border-pink-100 rounded-2xl p-5"
              >
                <div className="flex justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-800">
                      {course.name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {course.completed} / {course.total} {course.unit} completed
                    </p>
                  </div>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-sm font-semibold text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>

                <div className="h-3 bg-white rounded-full overflow-hidden border border-pink-100">
                  <div
                    className="h-full bg-linear-to-r from-pink-400 to-violet-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="text-sm font-bold text-pink-500 mt-2">
                  {progress}% complete
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => updateProgress(course.id, 1)}
                    className="flex-1 bg-white text-pink-500 border border-pink-200 px-3 py-2 rounded-xl text-sm font-bold hover:bg-pink-100 transition"
                  >
                    +1 {course.unit}
                  </button>

                  <button
                    onClick={() => updateProgress(course.id, 5)}
                    className="flex-1 bg-white text-violet-500 border border-violet-200 px-3 py-2 rounded-xl text-sm font-bold hover:bg-violet-100 transition"
                  >
                    +5 {course.unit}
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}

export default CourseManager