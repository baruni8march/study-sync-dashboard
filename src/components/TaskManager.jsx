import { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("studysync-tasks", [])
  const [taskTitle, setTaskTitle] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [filter, setFilter] = useState("all")

  function addTask(e) {
    e.preventDefault()

    if (taskTitle.trim() === "") {
      return
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: priority,
      dueDate: dueDate,
      done: false,
      createdAt: new Date().toISOString(),
    }

    setTasks([newTask, ...tasks])
    setTaskTitle("")
    setPriority("medium")
    setDueDate("")
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id)
    setTasks(remainingTasks)
  }

  function getPriorityStyle(priority) {
    if (priority === "high") {
      return "bg-red-100 text-red-500 border-red-200"
    }

    if (priority === "medium") {
      return "bg-yellow-100 text-yellow-600 border-yellow-200"
    }

    return "bg-green-100 text-green-600 border-green-200"
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return task.done === false
    }

    if (filter === "done") {
      return task.done === true
    }

    return true
  })

  const completedTasks = tasks.filter((task) => task.done).length

  return (
    <section className="mt-8 bg-white/85 rounded-3xl shadow-sm border border-pink-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-bold text-pink-500 mb-1">
            Task Manager
          </p>

          <h3 className="text-2xl font-extrabold">
            Plan tiny study steps
          </h3>

          <p className="text-slate-500 mt-2">
            {completedTasks} of {tasks.length} tasks completed
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              filter === "all"
                ? "bg-pink-500 text-white"
                : "bg-pink-100 text-pink-600"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              filter === "pending"
                ? "bg-pink-500 text-white"
                : "bg-pink-100 text-pink-600"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("done")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              filter === "done"
                ? "bg-pink-500 text-white"
                : "bg-pink-100 text-pink-600"
            }`}
          >
            Done
          </button>
        </div>
      </div>

      <form onSubmit={addTask} className="grid md:grid-cols-5 gap-3 mb-6">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Example: Revise Laplace formulas"
          className="md:col-span-2 px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button className="bg-linear-to-r from-pink-500 to-violet-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:scale-[1.01] transition">
          Add Task
        </button>
      </form>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-slate-500">
            No tasks here yet. Add one small study step.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-pink-50 border border-pink-100 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 accent-pink-500 mt-1"
                />

                <div>
                  <p
                    className={`font-semibold ${
                      task.done
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${getPriorityStyle(task.priority)}`}
                    >
                      {task.priority} priority
                    </span>

                    {task.dueDate !== "" && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-pink-100 text-slate-500">
                        Due: {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm font-bold text-red-400 hover:text-red-600 self-start md:self-center"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default TaskManager