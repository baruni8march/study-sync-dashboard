import { useState } from "react"

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage("")

    const url =
      mode === "signup"
        ? "http://127.0.0.1:8000/signup"
        : "http://127.0.0.1:8000/login"

    const body =
      mode === "signup"
        ? {
            name: name,
            email: email,
            password: password,
          }
        : {
            email: email,
            password: password,
          }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("studysync-user", JSON.stringify(data.user))
        onLogin(data.user)
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage("Backend is not running. Please start the FastAPI server.")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white/85 border border-pink-100 shadow-sm rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent mb-2">
          StudySync
        </h1>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>

        <p className="text-slate-500 mb-6">
          {mode === "signup"
            ? "Start tracking your study activity."
            : "Login to continue your dashboard."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
          />

          {message !== "" && (
            <p className="text-sm font-semibold text-red-500">
              {message}
            </p>
          )}

          <button className="w-full bg-linear-to-r from-pink-500 to-violet-600 text-white px-6 py-3 rounded-2xl font-bold shadow-md hover:scale-[1.01] transition">
            {mode === "signup" ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          {mode === "signup" ? (
            <p className="text-slate-500">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-pink-500 font-bold"
              >
                Login
              </button>
            </p>
          ) : (
            <p className="text-slate-500">
              New here?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-pink-500 font-bold"
              >
                Create account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage