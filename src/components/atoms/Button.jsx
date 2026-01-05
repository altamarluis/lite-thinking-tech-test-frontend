export default function Button({ children, variant = "primary", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl",
    edit: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg",
    delete: "p-2 text-red-600 hover:bg-red-50 rounded-lg",
    secondary: "border border-slate-300 text-slate-700 hover:bg-slate-50"
  }

  return (
    <button
      className={`${variants[variant]} px-4 py-2 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  )
}