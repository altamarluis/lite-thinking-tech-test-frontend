import { createContext, useContext, useState, useEffect } from "react"
import httpClient from "../api/apiClient"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token")
    } catch {
      return null
    }
  })

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      // Try cache first
      const cached = sessionStorage.getItem('user')
      if (cached) {
        setUser(JSON.parse(cached))
        setLoading(false)
        // Revalidate in background
        fetchUser()
      } else {
        fetchUser()
      }
    } else {
      setUser(null)
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const { data } = await httpClient.get("/auth/me/")
      const userData = {
        isAdmin: data.is_admin,
        username: data.username,
        userId: data.user_id
      }
      setUser(userData)
      sessionStorage.setItem('user', JSON.stringify(userData))
    } catch (e) {
      console.error("Error fetching user:", e)
      setUser(null)
      sessionStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  const login = (accessToken) => {
    try {
      localStorage.setItem("token", accessToken)
      setToken(accessToken)
    } catch (e) {
      console.error("Error saving token:", e)
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem("token")
      sessionStorage.removeItem("user")
      setToken(null)
      setUser(null)
    } catch (e) {
      console.error("Error removing token:", e)
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}