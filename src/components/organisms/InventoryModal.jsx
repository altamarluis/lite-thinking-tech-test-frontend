/**
 * InventoryModal
 * Organism component for adding products to inventory.
 *
 * Responsibilities:
 * - Select company
 * - Select product
 * - Submit inventory association
 *
 * Props:
 * - isOpen: boolean → controls modal visibility
 * - companies: array → available companies
 * - products: array → available products
 * - companyNit: string → selected company
 * - productCode: string → selected product
 * - setCompanyNit: function → updater
 * - setProductCode: function → updater
 * - onSubmit: function → submit handler
 * - onCancel: function → close modal
 */

import { X } from "lucide-react"
import SelectField from "../molecules/SelectField"
import Button from "../atoms/Button"

export default function InventoryModal({ isOpen, companies, products, companyNit, productCode, setCompanyNit, setProductCode, onSubmit, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Add Item to Inventory</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <SelectField 
            label="Compañía"
            value={companyNit}
            onChange={(e) => setCompanyNit(e.target.value)}
            required
          >
            <option value="">Select Company</option>
            {companies.map((c) => (
              <option key={c.nit} value={c.nit}>{c.name}</option>
            ))}
          </SelectField>

          <SelectField 
            label="Producto"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </SelectField>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}