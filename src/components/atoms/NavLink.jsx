export default function NavLink({ path, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
        ${isActive
          ? "text-emerald-600 bg-emerald-50"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        }
      `}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full" />
      )}
    </button>
  )
}