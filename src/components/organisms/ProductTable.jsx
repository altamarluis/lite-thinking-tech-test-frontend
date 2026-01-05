import Button from "../atoms/Button"
import { Pencil, Trash2, Package } from "lucide-react"

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Code</th>
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Name</th>
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Features</th>
            <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Price</th>
            {(onEdit || onDelete) && <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((p) => (
            <tr key={p.code} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="px-4 sm:px-6 py-4 text-sm font-mono text-slate-700">{p.code}</td>
              <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-800">{p.name}</td>
              <td className="px-4 sm:px-6 py-4 text-sm text-slate-600 hidden md:table-cell max-w-xs truncate">{p.features}</td>
              <td className="px-4 sm:px-6 py-4 text-sm text-slate-600">
                {Object.entries(p.prices || {}).map(([k, v]) => (
                  <div key={k} className="font-medium text-emerald-600">
                    {k}: ${v.toLocaleString()}
                  </div>
                ))}
              </td>
              {(onEdit || onDelete) && (
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {onEdit && (
                      <Button variant="edit" onClick={() => onEdit(p)} title="Update">
                        <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="delete" onClick={() => onDelete(p.code)} title="Delete">
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
      
      {products.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No registered products found</p>
        </div>
      )}
    </div>
  )
}