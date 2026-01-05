/**
 * Atom component that displays a user avatar using
 * the first letter of the username.
 *
 * Props:
 * - username: string → user identifier
 */

export default function Avatar({ username }) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
      {username.charAt(0).toUpperCase()}
    </div>
  )
}