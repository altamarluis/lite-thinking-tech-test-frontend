/**
 * Reusable page header component.
 * Displays the page title, subtitle, contextual icon,
 * and an optional primary action button.
 */

import { Building2, Plus, Package, Archive } from "lucide-react"
import Button from "../atoms/Button"

const iconMap = {
  building: Building2,
  package: Package,
  archive: Archive
}

/**
 * @param {string} title - Page title
 * @param {string} subtitle - Page subtitle
 * @param {boolean} showButton - Controls visibility of the action button
 * @param {Function} onButtonClick - Action button click handler
 * @param {string} buttonText - Action button label
 * @param {string} icon - Icon identifier for the header
 */
export default function PageHeader({ title, subtitle, showButton, onButtonClick, buttonText, icon = "building" }) {
  const Icon = iconMap[icon] || Building2
  
  return (
    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{title}</h1>
          <p className="text-slate-500 text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>
      
      {showButton && (
        <button
          onClick={onButtonClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 sm:px-5 py-2.5 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">{buttonText}</span>
          <span className="sm:hidden">New</span>
        </button>
      )}
    </div>
  )
}