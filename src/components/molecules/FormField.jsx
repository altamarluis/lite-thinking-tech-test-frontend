import Input from "../atoms/Input"

export default function FormField({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input {...props} />
    </div>
  )
}