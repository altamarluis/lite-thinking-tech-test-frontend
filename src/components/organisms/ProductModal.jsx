/**
 * Organism component responsible for creating and editing products.
 * Handles dynamic multi-currency pricing and basic form validation.
 *
 */


import { X, Trash2 } from "lucide-react"
import FormField from "../molecules/FormField"

const AVAILABLE_CURRENCIES = ["COP", "USD", "EUR", "CHF", "BRL", "GBP", "JPY", "MXN"]

export default function ProductModal({ isOpen, form, setForm, editing, onSubmit, onCancel }) {
  if (!isOpen) return null

  /** Add a new currency price if not already present */
  const addPrice = (currency) => {
    if (!form.prices[currency]) {
      setForm({
        ...form,
        prices: { ...form.prices, [currency]: "" }
      })
    }
  }

  /** Remove currency price */
  const removePrice = (currency) => {
    const newPrices = { ...form.prices }
    delete newPrices[currency]
    setForm({ ...form, prices: newPrices })
  }

  /** Update price value for a currency */
  const updatePrice = (currency, value) => {
    setForm({
      ...form,
      prices: { ...form.prices, [currency]: value }
    })
  }

  /** Currencies not yet added to the product */
  const availableCurrencies = AVAILABLE_CURRENCIES.filter(
    currency => !form.prices.hasOwnProperty(currency)
  )

  const hasPrices = Object.keys(form.prices).length > 0

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            {editing ? "Update Product" : "New Product"}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <FormField 
            label="Code" 
            value={form.code} 
            onChange={(e) => setForm({ ...form, code: e.target.value })} 
            disabled={!!editing}
            required
            placeholder="Enter product code"
          />
          <FormField 
            label="Name" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Enter product name"
          />
          <FormField 
            label="Features" 
            value={form.features} 
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            required
            placeholder="Detailed Product Description"
          />

          {/* Price Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-slate-700">
                Prices <span className="text-red-500">*</span>
              </label>
              {availableCurrencies.length > 0 && (
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addPrice(e.target.value)
                      e.target.value = ""
                    }
                  }}
                  className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                >
                  <option value="">+ Add currency</option>
                  {availableCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-2">
              {Object.entries(form.prices).map(([currency, value]) => (
                <div key={currency} className="flex items-center gap-2">
                  <div className="w-16 flex-shrink-0">
                    <div className="px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm font-mono text-slate-700 text-center">
                      {currency}
                    </div>
                  </div>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => updatePrice(currency, e.target.value)}
                    placeholder="Enter price"
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                  <button
                    onClick={() => removePrice(currency)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {Object.keys(form.prices).length === 0 && (
                <div className="text-center py-4 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                  No prices configured
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-slate-200 flex-shrink-0">
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!hasPrices}
              className={`w-full sm:flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                editing 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
              } ${!hasPrices && "opacity-50 cursor-not-allowed"}`}
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}