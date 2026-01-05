import { useEffect, useState } from "react"
import { getInventory, createInventoryItem, deleteInventoryItem, getInventoryByCompany, downloadInventoryPDF, sendInventoryEmail, getInventorySummary } from "../api/inventory.api"
import { getCompanies } from "../api/companies.api"
import { getProducts } from "../api/products.api"
import InventoryTable from "../components/organisms/InventoryTable"
import InventoryModal from "../components/organisms/InventoryModal"
import PageHeader from "../components/molecules/PageHeader"
import FilterCard from "../components/molecules/FilterCard"
import EmailCard from "../components/molecules/EmailCard"
import SummaryCard from "../components/molecules/SummaryCard"
import ActionButtons from "../components/molecules/ActionButtons"
import { useAuth } from "../context/AuthContext"

export default function Inventory() {
  const [items, setItems] = useState([])
  const [companies, setCompanies] = useState([])
  const [products, setProducts] = useState([])
  const [filterNit, setFilterNit] = useState("")
  const [companyNit, setCompanyNit] = useState("")
  const [productCode, setProductCode] = useState("")
  const [email, setEmail] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  const load = async () => {
    const { data } = await getInventory()
    setItems(data)
  }

  useEffect(() => {
    load()
    getCompanies().then((r) => setCompanies(r.data))
    getProducts().then((r) => setProducts(r.data))
  }, [])

  const handleCreate = async () => {
    if (!companyNit || !productCode) return alert("Selecciona compañía y producto")
    await createInventoryItem({ company_nit: companyNit, product_code: productCode })
    setCompanyNit("")
    setProductCode("")
    setIsModalOpen(false)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este ítem?")) return
    await deleteInventoryItem(id)
    load()
  }

  const handleFilter = async (nit) => {
    setFilterNit(nit)
    if (!nit) return load()
    const { data } = await getInventoryByCompany(nit)
    setItems(data)
  }

  const handleDownloadPDF = async () => {
    setLoading(true)
    try {
      const { data } = await downloadInventoryPDF()
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "inventory.pdf")
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (e) {
      alert("Error descargando PDF: " + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const handleSendEmail = async () => {
    if (!email) return alert("Ingresa un correo electrónico")
    setLoading(true)
    try {
      await sendInventoryEmail(email)
      alert("Correo enviado exitosamente")
      setEmail("")
    } catch (e) {
      alert("Error enviando correo: " + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const handleGetSummary = async () => {
    setLoading(true)
    try {
      const { data } = await getInventorySummary()
      setSummary(data.summary || "No hay resumen disponible")
    } catch (e) {
      alert("Error obteniendo resumen: " + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const openCreateModal = () => {
    setCompanyNit("")
    setProductCode("")
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader 
          title="Inventory" 
          subtitle="Inventory and Reports Management"
          showButton={user?.isAdmin}
          onButtonClick={openCreateModal}
          buttonText="Add Item"
          icon="archive"
        />
        <ActionButtons 
          onDownloadPDF={handleDownloadPDF}
          onGetSummary={handleGetSummary}
          loading={loading}
        />
      </div>

      {summary && <SummaryCard summary={summary} onClose={() => setSummary("")} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <FilterCard 
          companies={companies}
          filterNit={filterNit}
          onFilterChange={handleFilter}
        />
        <EmailCard 
          email={email}
          setEmail={setEmail}
          onSend={handleSendEmail}
          loading={loading}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <InventoryTable items={items} onDelete={user?.isAdmin ? handleDelete : null} />
      </div>

      <InventoryModal
        isOpen={isModalOpen}
        companies={companies}
        products={products}
        companyNit={companyNit}
        productCode={productCode}
        setCompanyNit={setCompanyNit}
        setProductCode={setProductCode}
        onSubmit={handleCreate}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  )
}
