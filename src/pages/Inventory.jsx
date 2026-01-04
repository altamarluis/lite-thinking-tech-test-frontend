import { useEffect, useState } from "react"
import { getInventory, createInventoryItem, deleteInventoryItem, getInventoryByCompany, downloadInventoryPDF, sendInventoryEmail, getInventorySummary } from "../api/inventory.api"
import { getCompanies } from "../api/companies.api"
import { getProducts } from "../api/products.api"
import InventoryTable from "../components/organisms/InventoryTable"
import FormField from "../components/molecules/FormField"
import Button from "../components/atoms/Button"
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
    if (!companyNit || !productCode) return alert("Select company and product")
    await createInventoryItem({ company_nit: companyNit, product_code: productCode })
    setCompanyNit("")
    setProductCode("")
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return
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
      alert("Error downloading PDF: " + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const handleSendEmail = async () => {
    if (!email) return alert("Enter email address")
    setLoading(true)
    try {
      await sendInventoryEmail(email)
      alert("Email sent successfully")
      setEmail("")
    } catch (e) {
      alert("Error sending email: " + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const handleGetSummary = async () => {
    setLoading(true)
    try {
      const { data } = await getInventorySummary()
      setSummary(data.summary || "No summary available")
    } catch (e) {
      alert("Error getting summary: " + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="flex gap-2">
          <Button onClick={handleDownloadPDF} disabled={loading}>
            {loading ? "Loading..." : "Download PDF"}
          </Button>
          <Button onClick={handleGetSummary} disabled={loading}>
            AI Summary
          </Button>
        </div>
      </div>

      {summary && (
        <div className="border p-4 rounded-lg bg-blue-50 shadow">
          <h3 className="font-semibold mb-2">AI Summary</h3>
          <p className="text-sm whitespace-pre-wrap">{summary}</p>
          <button 
            onClick={() => setSummary("")}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium mb-2">Filter by Company</label>
          <select 
            className="border p-2 rounded-lg w-full" 
            value={filterNit} 
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">All companies</option>
            {companies.map((c) => (
              <option key={c.nit} value={c.nit}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium mb-2">Send Report via Email</label>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="email@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="border p-2 rounded-lg flex-1" 
            />
            <Button onClick={handleSendEmail} disabled={loading}>
              Send
            </Button>
          </div>
        </div>
      </div>

      {user?.isAdmin && (
        <div className="border p-4 rounded-lg space-y-4 bg-white shadow">
          <h2 className="font-semibold">Add Inventory Item</h2>
          <FormField label="Company" as="select" value={companyNit} onChange={(e) => setCompanyNit(e.target.value)} required>
            <option value="">Select company</option>
            {companies.map((c) => (
              <option key={c.nit} value={c.nit}>{c.name}</option>
            ))}
          </FormField>
          <FormField label="Product" as="select" value={productCode} onChange={(e) => setProductCode(e.target.value)} required>
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </FormField>
          <Button onClick={handleCreate}>Add to Inventory</Button>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <InventoryTable items={items} onDelete={user?.isAdmin ? handleDelete : null} />
      </div>
    </div>
  )
}