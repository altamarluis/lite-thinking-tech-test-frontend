import { useEffect, useState } from "react"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/products.api"
import ProductTable from "../components/organisms/ProductTable"
import ProductModal from "../components/organisms/ProductModal"
import PageHeader from "../components/molecules/PageHeader"
import { useAuth } from "../context/AuthContext"

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ code: "", name: "", features: "", prices: { COP: "" } })
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  const load = async () => {
    const { data } = await getProducts()
    setProducts(data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async () => {
    const payload = { ...form, prices: { COP: Number(form.prices.COP) } }
    if (editing) {
      await updateProduct(editing, payload)
      setEditing(null)
    } else {
      await createProduct(payload)
    }
    setForm({ code: "", name: "", features: "", prices: { COP: "" } })
    setIsModalOpen(false)
    load()
  }

  const handleEdit = (product) => {
    setForm(product)
    setEditing(product.code)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setForm({ code: "", name: "", features: "", prices: { COP: "" } })
    setEditing(null)
    setIsModalOpen(false)
  }

  const handleDelete = async (code) => {
    if (!confirm("Delete this product?")) return
    await deleteProduct(code)
    load()
  }

  const openCreateModal = () => {
    setForm({ code: "", name: "", features: "", prices: { COP: "" } })
    setEditing(null)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products" 
        subtitle="Product Catalog Management"
        showButton={user?.isAdmin}
        onButtonClick={openCreateModal}
        buttonText="New Product"
        icon="package"
      />

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <ProductTable 
          products={products} 
          onEdit={user?.isAdmin ? handleEdit : null} 
          onDelete={user?.isAdmin ? handleDelete : null} 
        />
      </div>

      <ProductModal
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