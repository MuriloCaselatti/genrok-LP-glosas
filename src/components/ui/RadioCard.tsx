interface RadioCardProps {
  label: string;
  description?: string;
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
}

export default function RadioCard({
  label,
  description,
  value,
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
        'w-full text-left px-5 py-4 rounded-xl border transition-all duration-150',
        selected
          ? 'border-teal bg-teal/5 shadow-[0_0_0_2px_#00B896]'
          : 'border-[#E8EDF2] bg-white hover:border-teal/40 hover:bg-[#F4F7FA]',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            'w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
            selected ? 'border-teal bg-teal' : 'border-[#8C9BAB]',
          ].join(' ')}
        >
          {selected && (
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </div>
        <div>
          <p
            className={[
              'font-body font-medium text-base',
              selected ? 'text-navy' : 'text-[#3D4F61]',
            ].join(' ')}
          >
            {label}
          </p>
          {description && (
            <p className="font-body font-normal text-sm text-[#8C9BAB] mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
