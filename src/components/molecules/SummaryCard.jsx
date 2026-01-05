import { Sparkles, X } from "lucide-react"

export default function SummaryCard({ summary, onClose }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-blue-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-800">AI Summary</h3>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-white/50 p-1.5 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{summary}</p>
    </div>
  )
}
