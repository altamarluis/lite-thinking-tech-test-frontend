import { Download, Sparkles } from "lucide-react"

export default function ActionButtons({ onDownloadPDF, onGetSummary, loading }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onDownloadPDF}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">{loading ? "Loading..." : "PDF Download"}</span>
        <span className="sm:hidden">PDF</span>
      </button>
      <button
        onClick={onGetSummary}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <Sparkles className="w-4 h-4" />
        <span className="hidden sm:inline">AI Summary</span>
        <span className="sm:hidden">AI</span>
      </button>
    </div>
  )
}