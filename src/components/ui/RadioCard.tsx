interface RadioCardProps {
  value: string
  label: string
  sublabel?: string
  selected: boolean
  onChange: (value: string) => void
}

export default function RadioCard({
  value,
  label,
  sublabel,
  selected,
  onChange,
}: RadioCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onChange(value)}
      className={[
        'w-full text-left px-5 py-4 rounded-lg border-2 transition-all duration-150 cursor-pointer',
        selected
          ? 'border-teal bg-teal/10'
          : 'border-[#E8EDF2] bg-white hover:border-teal/40 hover:bg-teal/5',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p
            className={[
              'font-body font-medium text-base',
              selected ? 'text-navy' : 'text-[#3D4F61]',
            ].join(' ')}
          >
            {label}
          </p>
          {sublabel && (
            <p className="font-body font-normal text-sm text-[#8C9BAB] mt-0.5">
              {sublabel}
            </p>
          )}
        </div>
        {selected && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        )}
      </div>
    </button>
  )
}
