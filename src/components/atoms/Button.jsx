export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
      {...props}
    >
      {children}
    </button>
  )
}
