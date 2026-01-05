/**
 * Page component responsible for product management.
 * Handles product CRUD operations and delegates UI rendering
 * to reusable table and modal components.
 */

import { useEffect, useState } from "react"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/products.api"
import ProductTable from "../components/organisms/ProductTable"
import ProductModal from "../components/organisms/ProductModal"
import PageHeader from "../components/molecules/PageHeader"
import { useAuth } from "../context/AuthContext"

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ code: "", name: "", features: "", prices: {} })
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  /**
   * Loads all products from the backend.
   */
  const load = async () => {
    const { data } = await getProducts()
    setProducts(data)
  }

  useEffect(() => {
    load()
  }, [])

  /**
   * Handles product creation or update.
   * Converts price values to numeric format before submission.
   */
  const handleSubmit = async () => {

    const numericPrices = Object.entries(form.prices).reduce((acc, [currency, value]) => {
      if (value && value !== "") {
        acc[currency] = Number(value)
      }
      return acc
    }, {})

    const payload = { ...form, prices: numericPrices}
    if (editing) {
      await updateProduct(editing, payload)
      setEditing(null)
    } else {
      await createProduct(payload)
    }
    setForm({ code: "", name: "", features: "", prices: {} })
    setIsModalOpen(false)
    load()
  }

  /**
   * Prepares form for editing an existing product.
   */
  const handleEdit = (product) => {
    setForm(product)
    setEditing(product.code)
    setIsModalOpen(true)
  }

  /**
   * Cancels modal and resets state.
   */
  const handleCancel = () => {
    setForm({ code: "", name: "", features: "", prices: {} })
    setEditing(null)
    setIsModalOpen(false)
  }

  /**
   * Deletes a product after confirmation.
   */
  const handleDelete = async (code) => {
    if (!confirm("Delete this product?")) return
    await deleteProduct(code)
    load()
  }

  /**
   * Opens modal for creating a new product.
   */
  const openCreateModal = () => {
    setForm({ code: "", name: "", features: "", prices: {} })
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