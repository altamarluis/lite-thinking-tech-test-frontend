/**
 * Atom component representing the application brand.
 */

export default function Logo({ onClick }) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={onClick}
    >
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
        <span className="text-sm sm:text-base">LT</span>
      </div>
      <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hidden sm:block">
        Lite Thinking
      </span>
    </div>
  )
}