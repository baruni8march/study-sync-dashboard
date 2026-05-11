import useLocalStorage from "../hooks/useLocalStorage"

function SummaryCards() {
  const [courses] = useLocalStorage("studysync-courses", [])
  const [tasks] = useLocalStorage("studysync-tasks", [])
  const [sessions] = useLocalStorage("studysync-sessions", [])

  const pendingTasks = tasks.filter((task) => !task.done).length

  const totalHours = sessions.reduce((sum, session) => {
    return sum + Number(session.hours)
  }, 0)

  return (
    <section className="grid md:grid-cols-3 gap-6">
      <div className="bg-white/85 rounded-3xl shadow-sm border border-pink-100 p-6 hover:-translate-y-1 transition">
        <div className="h-12 w-12 rounded-2xl bg-pink-100 flex items-center justify-center mb-4">
          <span className="text-2xl">📚</span>
        </div>

        <p className="text-sm text-slate-500 mb-2">Courses</p>
        <h3 className="text-4xl font-extrabold">{courses.length}</h3>
        <p className="text-slate-600 mt-2">Courses added</p>
      </div>

      <div className="bg-white/85 rounded-3xl shadow-sm border border-purple-100 p-6 hover:-translate-y-1 transition">
        <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
          <span className="text-2xl">📝</span>
        </div>

        <p className="text-sm text-slate-500 mb-2">Tasks</p>
        <h3 className="text-4xl font-extrabold">{pendingTasks}</h3>
        <p className="text-slate-600 mt-2">Pending tasks</p>
      </div>

      <div className="bg-white/85 rounded-3xl shadow-sm border border-indigo-100 p-6 hover:-translate-y-1 transition">
        <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
          <span className="text-2xl">⏰</span>
        </div>

        <p className="text-sm text-slate-500 mb-2">Study Hours</p>
        <h3 className="text-4xl font-extrabold">{totalHours}h</h3>
        <p className="text-slate-600 mt-2">Total logged</p>
      </div>
    </section>
  )
}

export default SummaryCards