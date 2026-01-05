/**
 * Atom component for labeled select inputs.
 *
 * Props:
 * - label: string → field label
 * - required: boolean → shows required indicator
 * - children: ReactNode → option elements
 * - ...props → forwarded to <select>
 */

export default function SelectField({ label, required, children, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
        {...props}
      >
        {children}
      </select>
    </div>
  )
}