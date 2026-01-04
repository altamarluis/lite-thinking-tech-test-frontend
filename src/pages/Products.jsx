import { useEffect, useState } from "react"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/products.api"
import ProductTable from "../components/organisms/ProductTable"
import FormField from "../components/molecules/FormField"
import Button from "../components/atoms/Button"
import { useAuth } from "../context/AuthContext"

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ code: "", name: "", features: "", prices: { COP: "" } })
  const [editing, setEditing] = useState(null)
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
    load()
  }

  const handleEdit = (product) => {
    setForm(product)
    setEditing(product.code)
  }

  const handleCancel = () => {
    setForm({ code: "", name: "", features: "", prices: { COP: "" } })
    setEditing(null)
  }

  const handleDelete = async (code) => {
    if (!confirm("Delete this product?")) return
    await deleteProduct(code)
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      {user?.isAdmin && (
        <div className="border p-4 rounded-lg space-y-4 bg-white shadow">
          <h2 className="font-semibold">{editing ? "Edit" : "Create"} Product</h2>
          <FormField 
            label="Code" 
            value={form.code} 
            onChange={(e) => setForm({ ...form, code: e.target.value })} 
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
            label="Features" 
            value={form.features} 
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            required
          />
          <FormField 
            label="Price (COP)" 
            type="number" 
            value={form.prices.COP} 
            onChange={(e) => setForm({ ...form, prices: { COP: e.target.value } })}
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
        <ProductTable 
          products={products} 
          onEdit={user?.isAdmin ? handleEdit : null} 
          onDelete={user?.isAdmin ? handleDelete : null} 
        />
      </div>
    </div>
  )
}