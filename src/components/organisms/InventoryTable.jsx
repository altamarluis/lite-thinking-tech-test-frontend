/**
 * Organism component responsible for displaying inventory items.
 * Renders inventory data in a tabular format and supports
 * optional deletion actions.
 */

import Button from "../atoms/Button"
import { Trash2, Archive } from "lucide-react"

/**
 * @param {Object[]} items - Inventory items to display
 * @param {Function} onDelete - Optional delete handler
 */
export default function InventoryTable({ items, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">ID</th>
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Company</th>
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Product</th>
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Code</th>
            {onDelete && <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((i) => (
            <tr key={i.id} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="px-4 sm:px-6 py-4 text-sm font-mono text-slate-700">{i.id}</td>
              <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-800">{i.company?.name || 'N/A'}</td>
              <td className="px-4 sm:px-6 py-4 text-sm text-slate-600">{i.product?.name || 'N/A'}</td>
              <td className="px-4 sm:px-6 py-4 text-sm font-mono text-slate-600 hidden md:table-cell">{i.product?.code || 'N/A'}</td>
              {onDelete && (
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-center">
                    <Button variant="delete" onClick={() => onDelete(i.id)} title="Eliminar">
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Archive className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No items in the inventory</p>
        </div>
      )}
    </div>
  )
}