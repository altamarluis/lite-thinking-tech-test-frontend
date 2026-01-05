import { useState } from "react"
import Logo from "../molecules/Logo"
import Navigation from "../molecules/Navigation"
import UserMenu from "../molecules/UserMenu"
import MobileMenu from "../molecules/MobileMenu"
import { Menu } from "lucide-react"

export default function Header({ user, navItems, currentPath, onLogout, onLogoClick, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Logo onClick={onLogoClick} />
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <Navigation items={navItems} currentPath={currentPath} onNavigate={onNavigate} />
            </div>
            
            {/* Desktop User Menu */}
            <div className="hidden md:flex">
              <UserMenu user={user} onLogout={onLogout} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        user={user}
        navItems={navItems}
        currentPath={currentPath}
        onNavigate={(path) => {
          onNavigate(path)
          setMobileMenuOpen(false)
        }}
        onLogout={onLogout}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}