import { useEffect, useState } from "react"
import { getCompanies, createCompany, updateCompany, deleteCompany } from "../api/companies.api"
import CompanyTable from "../components/organisms/CompanyTable"
import FormField from "../components/molecules/FormField"
import Button from "../components/atoms/Button"
import { useAuth } from "../context/AuthContext"

export default function Companies() {
  const [companies, setCompanies] = useState([])
  const [form, setForm] = useState({ nit: "", name: "", address: "", phone: "" })
  const [editing, setEditing] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    console.log("User:", user)
    console.log("Is Admin:", user?.isAdmin)
  }, [user])

  const load = async () => {
    const { data } = await getCompanies()
    setCompanies(data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async () => {
    if (editing) {
      await updateCompany(editing, form)
      setEditing(null)
    } else {
      await createCompany(form)
    }
    setForm({ nit: "", name: "", address: "", phone: "" })
    load()
  }

  const handleEdit = (company) => {
    setForm(company)
    setEditing(company.nit)
  }

  const handleCancel = () => {
    setForm({ nit: "", name: "", address: "", phone: "" })
    setEditing(null)
  }

  const handleDelete = async (nit) => {
    if (!confirm("Delete this company?")) return
    await deleteCompany(nit)
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Companies</h1>

      {user?.isAdmin && (
        <div className="border p-4 rounded-lg space-y-4 bg-white shadow">
          <h2 className="font-semibold">{editing ? "Edit" : "Create"} Company</h2>
          <FormField 
            label="NIT" 
            value={form.nit} 
            onChange={(e) => setForm({ ...form, nit: e.target.value })} 
            disabled={!!editing}
            required
          />
          <FormField 
            label="Name" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <FormField 
            label="Address" 
            value={form.address} 
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <FormField 
            label="Phone" 
            value={form.phone} 
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>{editing ? "Update" : "Create"}</Button>
            {editing && (
              <button onClick={handleCancel} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <CompanyTable 
          companies={companies} 
          onEdit={user?.isAdmin ? handleEdit : null} 
          onDelete={user?.isAdmin ? handleDelete : null} 
        />
      </div>
    </div>
  )
}