import Button from "../atoms/Button"

export default function CompanyTable({ companies, onEdit, onDelete }) {
  return (
    <table className="w-full border">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2">NIT</th>
          <th className="p-2">Name</th>
          <th className="p-2">Address</th>
          <th className="p-2">Phone</th>
          {(onEdit || onDelete) && <th className="p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {companies.map((c) => (
          <tr key={c.nit} className="border-t">
            <td className="p-2">{c.nit}</td>
            <td className="p-2">{c.name}</td>
            <td className="p-2">{c.address}</td>
            <td className="p-2">{c.phone}</td>
            {(onEdit || onDelete) && (
              <td className="p-2 flex gap-2">
                {onEdit && <Button onClick={() => onEdit(c)}>Edit</Button>}
                {onDelete && <Button onClick={() => onDelete(c.nit)}>Delete</Button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}