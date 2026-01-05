/**
 * Atom component that triggers user logout.
 *
 * Props:
 * - onClick: function → logout handler
 */

import { LogOut } from "lucide-react"

export default function LogoutButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium transform hover:-translate-y-0.5"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  )
}