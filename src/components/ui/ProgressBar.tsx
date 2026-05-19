interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Passo ${current} de ${total}`}
      className="w-full"
    >
      <div className="flex justify-between mb-2">
        <span className="font-body text-sm text-[#8C9BAB]">
          Passo {current} de {total}
        </span>
        <span className="font-body text-sm text-[#8C9BAB]">{percent}%</span>
      </div>
      <div className="h-1.5 bg-[#E8EDF2] rounded-full overflow-hidden">
        <div
          className="h-full bg-teal rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
