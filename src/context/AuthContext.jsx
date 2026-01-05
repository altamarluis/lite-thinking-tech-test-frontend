/**
 * Authentication context responsible for managing user session state.
 * It provides authentication data and actions to the entire application
 * using React Context API.
 */

import { createContext, useContext, useState, useEffect } from "react"
import httpClient from "../api/apiClient"

const AuthContext = createContext()

/**
 * AuthProvider
 *
 * Wraps the application and exposes authentication state and helpers.
 */
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

  /**
   * Loads the authenticated user when a token is present.
   * Uses session storage as a short-lived cache and revalidates in background.
   */
  useEffect(() => {
    if (token) {
      const cached = sessionStorage.getItem('user')
      if (cached) {
        setUser(JSON.parse(cached))
        setLoading(false)
        fetchUser()
      } else {
        fetchUser()
      }
    } else {
      setUser(null)
      setLoading(false)
    }
  }, [token])

  /**
   * Retrieves the authenticated user from the backend.
   */
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

  /**
   * Persists the access token and updates authentication state.
   */
  const login = (accessToken) => {
    try {
      localStorage.setItem("token", accessToken)
      setToken(accessToken)
    } catch (e) {
      console.error("Error saving token:", e)
    }
  }

  /**
   * Clears authentication data and resets session state.
   */
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

/**
 * useAuth
 *
 * Custom hook to access authentication context.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}