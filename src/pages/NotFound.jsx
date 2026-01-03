import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">404 - Not Found</h1>
      <Link to="/login" className="text-blue-600 underline">
        Go to Login
      </Link>
    </div>
  )
}
