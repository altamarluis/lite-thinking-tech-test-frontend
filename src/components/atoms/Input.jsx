/**
 * Reusable input atom component.
 * Provides a consistent styled input field across the application.
 */

export default function Input({ ...props }) {
  return (
    <input
      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
      {...props}
    />
  )
}