function HeroSection() {
  return (
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
  )
}

export default HeroSection