import { Mail } from "lucide-react"
import Button from "../atoms/Button"

export default function EmailCard({ email, setEmail, onSend, loading }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-slate-600" />
        <label className="text-sm font-semibold text-slate-700">Send Report by Email</label>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input 
          type="email" 
          placeholder="Enter your email here" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" 
        />
        <button
          onClick={onSend}
          disabled={loading}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          Send
        </button>
      </div>
    </div>
  )
}
