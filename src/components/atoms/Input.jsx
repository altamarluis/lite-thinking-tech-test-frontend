export default function Input({ as = "input", children, ...props }) {
  const Component = as
  const baseClass = "border border-slate-200 rounded-lg p-2 w-full"
  
  return (
    <Component className={baseClass} {...props}>
      {children}
    </Component>
  )
}