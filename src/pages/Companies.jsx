/**
 * Page component responsible for managing companies.
 * Handles data fetching, creation, update, and deletion,
 * delegating UI rendering to reusable components.
 */

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

  /**
   * Loads all companies from the backend.
   */
  const load = async () => {
    const { data } = await getCompanies()
    setCompanies(data)
  }

  useEffect(() => {
    load()
  }, [])

  /**
   * Handles company creation or update.
   */
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

  /**
   * Prepares form for editing an existing company.
   */
  const handleEdit = (company) => {
    setForm(company)
    setEditing(company.nit)
    setIsModalOpen(true)
  }

  /**
   * Cancels modal and resets state.
   */
  const handleCancel = () => {
    setForm({ nit: "", name: "", address: "", phone: "" })
    setEditing(null)
    setIsModalOpen(false)
  }

  /**
   * Deletes a company after confirmation.
   */
  const handleDelete = async (nit) => {
    if (!confirm("Delete this Company?")) return
    await deleteCompany(nit)
    load()
  }

  /**
   * Opens modal for creating a new company.
   */
  const openCreateModal = () => {
    setForm({ nit: "", name: "", address: "", phone: "" })
    setEditing(null)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader 
        title="Companies" 
        subtitle="Management of Registered Companies"
        showButton={user?.isAdmin}
        onButtonClick={openCreateModal}
        buttonText="New Company"
      />

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <CompanyTable 
            companies={companies} 
            onEdit={user?.isAdmin ? handleEdit : null} 
            onDelete={user?.isAdmin ? handleDelete : null} 
          />
        </div>
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
  )
}