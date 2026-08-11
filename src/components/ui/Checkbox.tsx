interface CheckboxProps {
  id?: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

export function Checkbox({ id, checked, onChange, label }: CheckboxProps) {
  return (
    <label className="group inline-flex items-center gap-2 cursor-pointer text-sm">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span className="w-4 h-4 flex-none rounded-full border-[1.5px] border-divider group-hover:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:shadow-[inset_0_0_0_4px_var(--color-bg)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-2" />
      {label}
    </label>
  )
}
