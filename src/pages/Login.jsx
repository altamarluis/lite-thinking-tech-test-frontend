import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../api/auth.api"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      const { data } = await loginRequest({ username, password })
      login(data.access)
      navigate("/companies")
    } catch (err) {
      console.error("Error:", err)
      setError(err.response?.data?.detail || "Error al iniciar sesión")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <button 
        disabled={loading}
        className="bg-emerald-600 text-white p-2 w-full rounded disabled:bg-gray-400"
      >
        {loading ? "Iniciando sesión..." : "Login"}
      </button>
    </form>
  )
}