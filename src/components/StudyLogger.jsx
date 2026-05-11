import { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

function StudyLogger() {
  const [sessions, setSessions] = useLocalStorage("studysync-sessions", [])
  const [subject, setSubject] = useState("")
  const [hours, setHours] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  function addSession(e) {
    e.preventDefault()

    if (subject.trim() === "" || hours === "" || Number(hours) <= 0) {
      return
    }

    const newSession = {
      id: Date.now(),
      subject: subject,
      hours: Number(hours),
      date: date,
      createdAt: new Date().toISOString(),
    }

    setSessions([newSession, ...sessions])
    setSubject("")
    setHours("")
    setDate(new Date().toISOString().slice(0, 10))
  }

  function deleteSession(id) {
    const remainingSessions = sessions.filter((session) => session.id !== id)
    setSessions(remainingSessions)
  }

  const totalHours = sessions.reduce((sum, session) => {
    return sum + session.hours
  }, 0)

  return (
    <section id="study-log" className="mt-8 bg-white/85 rounded-3xl shadow-sm border border-pink-100 p-6 scroll-mt-24">
      <div className="mb-6">
        <p className="text-sm font-bold text-pink-500 mb-1">
          Study Logger
        </p>

        <h3 className="text-2xl font-extrabold">
          Track your study hours
        </h3>

        <p className="text-slate-500 mt-2">
          Total logged study time: {totalHours} hour{totalHours !== 1 ? "s" : ""}
        </p>
      </div>

      <form onSubmit={addSession} className="grid md:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject or course"
          className="px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
          min="0.5"
          step="0.5"
          className="px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button className="bg-linear-to-r from-pink-500 to-violet-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:scale-[1.01] transition">
          Add Session
        </button>
      </form>

      <div className="space-y-3">
        {sessions.length === 0 ? (
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-slate-500">
            No study sessions logged yet. Add one after studying.
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-pink-50 border border-pink-100 rounded-2xl p-4"
            >
              <div>
                <h4 className="font-extrabold text-slate-800">
                  {session.subject}
                </h4>

                <p className="text-sm text-slate-500">
                  {session.hours} hour{session.hours !== 1 ? "s" : ""} studied on {session.date}
                </p>
              </div>

              <button
                onClick={() => deleteSession(session.id)}
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

export default StudyLogger