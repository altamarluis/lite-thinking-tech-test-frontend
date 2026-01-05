import { X } from "lucide-react"
import FormField from "../molecules/FormField"
import Button from "../atoms/Button"

export default function CompanyModal({ isOpen, form, setForm, editing, onSubmit, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            {editing ? "Update Company" : "New Company"}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <FormField 
            label="NIT" 
            value={form.nit} 
            onChange={(e) => setForm({ ...form, nit: e.target.value })} 
            disabled={!!editing}
            required
            placeholder="Enter NIT numbers"
          />
          <FormField 
            label="Name" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Enter the company name"
          />
          <FormField 
            label="Address" 
            value={form.address} 
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
            placeholder="Enter the full address"
          />
          <FormField 
            label="Phone" 
            value={form.phone} 
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            placeholder="Enter the phone number"
          />

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <button
              onClick={onSubmit}
              className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                editing 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
              }`}
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}