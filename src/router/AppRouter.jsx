import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Companies from "../pages/Companies"
import Products from "../pages/Products"
import Inventory from "../pages/Inventory"
import NotFound from "../pages/NotFound"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/products" element={<Products />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
