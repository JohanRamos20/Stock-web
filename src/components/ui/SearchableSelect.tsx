import { useEffect, useRef, useState } from 'react'

export interface SearchableSelectOption {
  value: string
  label: string
}

interface SearchableSelectProps {
  id: string
  label: string
  placeholder?: string
  options: SearchableSelectOption[]
  value: string | null
  onChange: (value: string) => void
  wrapperClassName?: string
}

export function SearchableSelect({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  wrapperClassName = '',
}: SearchableSelectProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selected = options.find((option) => option.value === value) ?? null

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase()))

  function handleSelect(option: SearchableSelectOption) {
    onChange(option.value)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative ${wrapperClassName}`}>
      <label htmlFor={id} className="block text-xs mb-1 text-text/70">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={isOpen ? query : (selected?.label ?? '')}
        onFocus={() => {
          setQuery('')
          setIsOpen(true)
        }}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false)
        }}
        className="w-full min-h-9 px-2.5 py-1.5 text-sm text-text caret-accent bg-surface border border-divider hover:border-text/45 focus-visible:border-accent focus-visible:outline-offset-0"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-52 overflow-y-auto bg-white border border-divider shadow-md">
          {filtered.length === 0 && <li className="px-2.5 py-2 text-sm text-muted">Nenhum servidor encontrado</li>}
          {filtered.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full text-left px-2.5 py-2 text-sm hover:bg-accent/10 cursor-pointer border-0 bg-transparent"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
