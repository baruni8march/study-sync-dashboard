import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import SummaryCards from "./components/SummaryCards"
import FocusCard from "./components/FocusCard"
import CourseManager from "./components/CourseManager"
function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-indigo-50 text-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <HeroSection />
        <SummaryCards />
        <FocusCard />
        <CourseManager />
      </main>
    </div>
  )
}

export default App