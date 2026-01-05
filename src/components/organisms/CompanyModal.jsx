/**
 * Modal dialog used for creating and updating company records.
 * Handles form rendering and delegates actions to the parent component.
 */

import { X } from "lucide-react"
import FormField from "../molecules/FormField"
import Button from "../atoms/Button"

/**
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Object} form - Company form state
 * @param {Function} setForm - Form state updater
 * @param {string|null} editing - Company identifier when editing
 * @param {Function} onSubmit - Submit handler
 * @param {Function} onCancel - Cancel handler
 */
export default function CompanyModal({ isOpen, form, setForm, editing, onSubmit, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            {editing ? "Update Company" : "New Company"}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 sm:p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          <FormField 
            label="NIT" 
            value={form.nit} 
            onChange={(e) => setForm({ ...form, nit: e.target.value })} 
            disabled={!!editing}
            required
            placeholder="Enter company NIT number"
          />
          <FormField 
            label="Name" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Enter company name"
          />
          <FormField 
            label="Address" 
            value={form.address} 
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
            placeholder="Enter company address"
          />
          <FormField 
            label="phone" 
            value={form.phone} 
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            placeholder="Enter company phone number"
          />
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 flex-shrink-0">
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className={`w-full sm:flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm ${
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