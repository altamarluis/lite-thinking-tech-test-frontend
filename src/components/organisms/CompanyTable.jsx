import Button from "../atoms/Button"
import { Pencil, Trash2, Building2 } from "lucide-react"

export default function CompanyTable({ companies, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
            <th className="px-6 py-4 text-left text-sm font-semibold">NIT</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Address</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
            {(onEdit || onDelete) && <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {companies.map((c) => (
            <tr key={c.nit} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="px-6 py-4 text-sm font-mono text-slate-700">{c.nit}</td>
              <td className="px-6 py-4 text-sm font-medium text-slate-800">{c.name}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{c.address}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{c.phone}</td>
              {(onEdit || onDelete) && (
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {onEdit && (
                      <Button variant="edit" onClick={() => onEdit(c)} title="Editar">
                        <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="delete" onClick={() => onDelete(c.nit)} title="Eliminar">
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
      
      {companies.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No registered companies found</p>
        </div>
      )}
    </div>
  )
}