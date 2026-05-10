import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import SummaryCards from "./components/SummaryCards"
import FocusCard from "./components/FocusCard"
import CourseManager from "./components/CourseManager"
import TaskManager from "./components/TaskManager"
import StudyLogger from "./components/StudyLogger"
import MonthlyGraph from "./components/MonthlyGraph"

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("studysync-theme") === "dark"
  })

  useEffect(() => {
    localStorage.setItem("studysync-theme", isDark ? "dark" : "light")
  }, [isDark])

  function toggleTheme() {
    setIsDark(!isDark)
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-indigo-50 text-slate-900 transition">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />

        <main className="max-w-6xl mx-auto px-6 py-10">
          <HeroSection />
          <SummaryCards />
          <FocusCard />
          <CourseManager />
          <TaskManager />
          <StudyLogger />
          <MonthlyGraph />
        </main>
      </div>
    </div>
  )
}

export default App