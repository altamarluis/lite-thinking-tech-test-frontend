import Button from "../atoms/Button"

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="w-full border">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2 text-left">Code</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Features</th>
          <th className="p-2 text-left">Prices</th>
          {(onEdit || onDelete) && <th className="p-2 text-left">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.code} className="border-t hover:bg-gray-50">
            <td className="p-2">{p.code}</td>
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.features}</td>
            <td className="p-2">
              {Object.entries(p.prices || {}).map(([k, v]) => (
                <div key={k}>{k}: ${v.toLocaleString()}</div>
              ))}
            </td>
            {(onEdit || onDelete) && (
              <td className="p-2">
                <div className="flex gap-2">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(p)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(p.code)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}