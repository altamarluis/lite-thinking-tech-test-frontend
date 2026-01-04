import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!user) return children

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex gap-8">
              <Link to="/companies" className="text-gray-700 hover:text-gray-900 font-medium">
                Companies
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-gray-900 font-medium">
                Products
              </Link>
              <Link to="/inventory" className="text-gray-700 hover:text-gray-900 font-medium">
                Inventory
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user.username} {user.isAdmin && "(Admin)"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  )
}