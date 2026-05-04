function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-slate-900">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            StudySync
          </h1>

          <div className="flex gap-4 text-sm font-semibold text-slate-600">
            <a className="hover:text-pink-500" href="#">Dashboard</a>
            <a className="hover:text-pink-500" href="#">Courses</a>
            <a className="hover:text-pink-500" href="#">Tasks</a>
            <a className="hover:text-pink-500" href="#">Study Log</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-white/85 backdrop-blur-md rounded-[2rem] shadow-sm border border-pink-100 p-8 mb-8">
          <p className="text-sm font-bold text-pink-500 mb-2">
            Personal Study Dashboard
          </p>

          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Track your study life in a soft, calm, and organized way.
          </h2>

          <p className="text-slate-600 max-w-2xl leading-relaxed">
            StudySync helps you organize courses, tasks, study hours, and progress
            without making your brain feel overloaded.
          </p>

          <button className="mt-6 bg-gradient-to-r from-pink-500 to-violet-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition">
            Start planning
          </button>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/85 rounded-3xl shadow-sm border border-pink-100 p-6 hover:-translate-y-1 transition">
            <div className="h-12 w-12 rounded-2xl bg-pink-100 flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>

            <p className="text-sm text-slate-500 mb-2">Courses</p>
            <h3 className="text-4xl font-extrabold">0</h3>
            <p className="text-slate-600 mt-2">Courses added yet</p>
          </div>

          <div className="bg-white/85 rounded-3xl shadow-sm border border-purple-100 p-6 hover:-translate-y-1 transition">
            <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>

            <p className="text-sm text-slate-500 mb-2">Tasks</p>
            <h3 className="text-4xl font-extrabold">0</h3>
            <p className="text-slate-600 mt-2">Pending tasks</p>
          </div>

          <div className="bg-white/85 rounded-3xl shadow-sm border border-indigo-100 p-6 hover:-translate-y-1 transition">
            <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
              <span className="text-2xl">⏰</span>
            </div>

            <p className="text-sm text-slate-500 mb-2">Study Hours</p>
            <h3 className="text-4xl font-extrabold">0h</h3>
            <p className="text-slate-600 mt-2">Logged this week</p>
          </div>
        </section>

        <section className="mt-8 bg-white/85 rounded-3xl shadow-sm border border-pink-100 p-6">
          <p className="text-sm font-bold text-pink-500 mb-2">
            Today&apos;s Focus
          </p>

          <h3 className="text-2xl font-extrabold mb-2">
            One small step is enough for today.
          </h3>

          <p className="text-slate-600">
            Tomorrow we will add real course cards and slowly make this dashboard useful.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App