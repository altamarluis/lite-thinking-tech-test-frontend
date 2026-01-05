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
