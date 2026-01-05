/**
 * Molecule component that renders the main navigation menu.
 *
 * Props:
 * - items: array → navigation configuration ({ path, label })
 * - currentPath: string → current route
 * - onNavigate: function → navigation handler
 */

import NavLink from "../atoms/NavLink"

export default function Navigation({ items, currentPath, onNavigate }) {
  return (
    <nav className="flex gap-1">
      {items.map((item) => (
        <NavLink
          key={item.path}
          path={item.path}
          label={item.label}
          isActive={currentPath.startsWith(item.path)}
          onClick={() => onNavigate(item.path)}
        />
      ))}
    </nav>
  )
}
