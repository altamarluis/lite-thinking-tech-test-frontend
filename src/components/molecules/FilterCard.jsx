import { Filter } from "lucide-react"

export default function FilterCard({ companies, filterNit, onFilterChange }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-slate-600" />
        <label className="text-sm font-semibold text-slate-700">Filter by Company</label>
      </div>
      <select 
        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-sm" 
        value={filterNit} 
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">All comanies</option>
        {companies.map((c) => (
          <option key={c.nit} value={c.nit}>{c.name}</option>
        ))}
      </select>
    </div>
  )
}