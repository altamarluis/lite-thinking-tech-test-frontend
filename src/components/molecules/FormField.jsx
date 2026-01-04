import Input from "../atoms/Input"

export default function FormField({ label, ...props }) {
  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">{label}</label>
      <Input {...props} />
    </div>
  )
}
