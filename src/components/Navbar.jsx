function Navbar({ isDark, toggleTheme, user, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold bg-linear-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            StudySync
          </h1>

          {user && (
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Logged in as {user.name}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
          <a className="hover:text-pink-500 transition" href="#dashboard">
            Dashboard
          </a>

          <a className="hover:text-pink-500 transition" href="#courses">
            Courses
          </a>

          <a className="hover:text-pink-500 transition" href="#tasks">
            Tasks
          </a>

          <a className="hover:text-pink-500 transition" href="#study-log">
            Study Log
          </a>

          <a className="hover:text-pink-500 transition" href="#monthly-graph">
            Graph
          </a>

          <button
            onClick={toggleTheme}
            className="bg-linear-to-r from-pink-500 to-violet-600 text-white px-4 py-2 rounded-full font-bold shadow-sm hover:scale-105 transition"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={onLogout}
            className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full font-bold hover:bg-pink-200 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar