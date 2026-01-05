
/**
 * Organism component responsible for rendering the company list.
 * Supports responsive rendering:
 * - Table layout for desktop screens
 * - Card layout for mobile screens
 */

import Button from "../atoms/Button"
import { Pencil, Trash2, Building2 } from "lucide-react"

/**
 * @param {Object[]} companies - List of companies to display
 * @param {Function} onEdit - Optional edit handler
 * @param {Function} onDelete - Optional delete handler
 */
export default function CompanyTable({ companies, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop Table */}
      <table className="w-full hidden sm:table">
        <thead>
          <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold">NIT</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold">Name</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold hidden md:table-cell">Address</th>
            <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold hidden lg:table-cell">Phone</th>
            {(onEdit || onDelete) && <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {companies.map((c) => (
            <tr key={c.nit} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono text-slate-700">{c.nit}</td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-medium text-slate-800">{c.name}</td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-600 hidden md:table-cell">{c.address}</td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-600 hidden lg:table-cell">{c.phone}</td>
              {(onEdit || onDelete) && (
                <td className="px-4 lg:px-6 py-3 lg:py-4">
                  <div className="flex items-center justify-center gap-2">
                    {onEdit && (
                      <Button variant="edit" onClick={() => onEdit(c)} title="Update">
                        <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="delete" onClick={() => onDelete(c.nit)} title="Delete">
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="sm:hidden divide-y divide-slate-100">
        {companies.map((c) => (
          <div key={c.nit} className="p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 text-sm">{c.name}</h3>
                <p className="text-xs font-mono text-slate-500 mt-1">NIT: {c.nit}</p>
              </div>
              {(onEdit || onDelete) && (
                <div className="flex gap-2 ml-2">
                  {onEdit && (
                    <Button variant="edit" onClick={() => onEdit(c)} title="Update">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="delete" onClick={() => onDelete(c.nit)} title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <p>{c.address}</p>
              <p>{c.phone}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {companies.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No registered companies found</p>
        </div>
      )}
    </>
  )
}
