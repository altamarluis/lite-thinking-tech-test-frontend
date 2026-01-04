import Button from "../atoms/Button"

export default function InventoryTable({ items, onDelete }) {
  return (
    <table className="w-full border">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Company</th>
          <th className="p-2 text-left">Product</th>
          <th className="p-2 text-left">Product Code</th>
          {onDelete && <th className="p-2 text-left">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((i) => (
          <tr key={i.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{i.id}</td>
            <td className="p-2">{i.company?.name || 'N/A'}</td>
            <td className="p-2">{i.product?.name || 'N/A'}</td>
            <td className="p-2">{i.product?.code || 'N/A'}</td>
            {onDelete && (
              <td className="p-2">
                <button 
                  onClick={() => onDelete(i.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}