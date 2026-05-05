function Navbar() {
  return (
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
  )
}

export default Navbar