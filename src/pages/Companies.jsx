import { useEffect, useState } from "react"
import { getCompanies, createCompany, updateCompany, deleteCompany } from "../api/companies.api"
import CompanyTable from "../components/organisms/CompanyTable"
import CompanyModal from "../components/organisms/CompanyModal"
import PageHeader from "../components/molecules/PageHeader"
import { useAuth } from "../context/AuthContext"


export default function Companies() {
  const [companies, setCompanies] = useState([])
  const [form, setForm] = useState({ nit: "", name: "", address: "", phone: "" })
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

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
    setIsModalOpen(false)
    load()
  }

  const handleEdit = (company) => {
    setForm(company)
    setEditing(company.nit)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setForm({ nit: "", name: "", address: "", phone: "" })
    setEditing(null)
    setIsModalOpen(false)
  }

  const handleDelete = async (nit) => {
    if (!confirm("Delete this company?")) return
    await deleteCompany(nit)
    load()
  }

  const openCreateModal = () => {
    setForm({ nit: "", name: "", address: "", phone: "" })
    setEditing(null)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Companies" 
          subtitle="Management of Registered Companies"
          showButton={user?.isAdmin}
          onButtonClick={openCreateModal}
          buttonText="New Company"
        />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <CompanyTable 
            companies={companies} 
            onEdit={user?.isAdmin ? handleEdit : null} 
            onDelete={user?.isAdmin ? handleDelete : null} 
          />
        </div>

        <CompanyModal
          isOpen={isModalOpen}
          form={form}
          setForm={setForm}
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}