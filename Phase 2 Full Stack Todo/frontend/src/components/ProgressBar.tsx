'use client';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) {
    return null;
  }

  return (
    <div className="relative bg-card p-4 sm:p-6 rounded-lg border border-border">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">Progress</span>
        <span className="text-sm font-bold text-primary">
          {percentage}%
        </span>
      </div>

      <div className="h-4 bg-background rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-gradient-to-r from-[#9929EA] to-[#7a1bc4] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary font-semibold">{completed}</span> of{' '}
          <span className="text-foreground font-semibold">{total}</span> tasks completed
        </p>
        {percentage === 100 && (
          <span className="text-xs text-success font-medium">
            All Done!
          </span>
        )}
      </div>
    </div>
  );
}
