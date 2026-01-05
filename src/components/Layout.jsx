/**
 * Main application layout.
 * Responsible for:
 * - Route guarding based on authentication state
 * - Rendering the global navigation header
 * - Providing a consistent page structure
 */
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import Header from "../components/organisms/Header"

const navItems = [
  { path: "/companies", label: "Companies" },
  { path: "/products", label: "Products" },
  { path: "/inventory", label: "Inventory" },
]

export default function Layout({ children }) {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading) {
      if (!user && location.pathname !== "/login") {
        navigate("/login")
      }
      if (user && location.pathname === "/login") {
        navigate("/companies")
      }
    }
  }, [user, loading, location.pathname, navigate])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <span className="text-slate-500 text-sm">Loading application...</span>
        </div>
      </div>
    )
  }

  if (!user) return children

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header 
        user={user}
        navItems={navItems}
        currentPath={location.pathname}
        onLogout={handleLogout}
        onLogoClick={() => navigate("/companies")}
        onNavigate={navigate}
      />

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {children}
      </main>
    </div>
  )
}