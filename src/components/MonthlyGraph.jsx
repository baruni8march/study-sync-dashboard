import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import useLocalStorage from "../hooks/useLocalStorage"

function MonthlyGraph() {
  const [sessions] = useLocalStorage("studysync-sessions", [])

  function getCurrentMonthData() {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const monthData = []

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dateString = date.toISOString().slice(0, 10)

      monthData.push({
        date: dateString,
        day: day,
        hours: 0,
      })
    }

    sessions.forEach((session) => {
      const sessionDate = new Date(session.date)

      const sameYear = sessionDate.getFullYear() === currentYear
      const sameMonth = sessionDate.getMonth() === currentMonth

      if (sameYear && sameMonth) {
        const dayIndex = sessionDate.getDate() - 1

        if (monthData[dayIndex]) {
          monthData[dayIndex].hours += Number(session.hours)
        }
      }
    })

    return monthData
  }

  const graphData = getCurrentMonthData()

  const totalMonthlyHours = graphData.reduce((sum, item) => {
    return sum + item.hours
  }, 0)

  const activeDays = graphData.filter((item) => item.hours > 0).length

  return (
    <section id="monthly-graph" className="mt-8 bg-white/85 rounded-3xl shadow-sm border border-pink-100 p-6 scroll-mt-24">
      <div className="mb-6">
        <p className="text-sm font-bold text-pink-500 mb-1">
          Monthly Activity Graph
        </p>

        <h3 className="text-2xl font-extrabold">
          Your study activity this month
        </h3>

        <p className="text-slate-500 mt-2">
          {totalMonthlyHours} total hour{totalMonthlyHours !== 1 ? "s" : ""} studied across {activeDays} active day{activeDays !== 1 ? "s" : ""}.
        </p>
      </div>

      {totalMonthlyHours === 0 ? (
        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-slate-500">
          No study sessions for this month yet. Add study hours in the Study Logger to see your graph.
        </div>
      ) : (
        <div className="h-80 bg-pink-50 border border-pink-100 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default MonthlyGraph