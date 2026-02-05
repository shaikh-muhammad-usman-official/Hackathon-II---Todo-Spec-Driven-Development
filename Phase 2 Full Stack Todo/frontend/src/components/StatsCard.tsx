'use client';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: 'total' | 'pending' | 'completed';
  color: 'orange' | 'black' | 'gray' | 'cyan' | 'fuchsia' | 'green' | 'red';
}

export default function StatsCard({ label, value, icon, color }: StatsCardProps) {
  const colorConfig = {
    orange: {
      border: 'border-accent hover:border-accent',
      text: 'text-accent',
      bg: 'bg-accent',
      shadow: 'hover:shadow-subtle',
      gradient: 'from-accent to-[#00cc00]',
    },
    black: {
      border: 'border-border hover:border-accent',
      text: 'text-foreground',
      bg: 'bg-muted',
      shadow: 'hover:shadow-subtle',
      gradient: 'from-[#000000] to-[#0B192C]',
    },
    gray: {
      border: 'border-border hover:border-accent',
      text: 'text-muted-foreground',
      bg: 'bg-muted',
      shadow: 'hover:shadow-subtle',
      gradient: 'from-[#9929EA] to-[#7a1bc4]',
    },
    cyan: {
      border: 'border-primary hover:border-accent',
      text: 'text-primary',
      bg: 'bg-primary',
      shadow: 'hover:shadow-subtle',
      gradient: 'from-accent to-[#00cc00]',
    },
    fuchsia: {
      border: 'border-primary hover:border-accent',
      text: 'text-primary',
      bg: 'bg-primary',
      shadow: 'hover:shadow-subtle',
      gradient: 'from-primary to-secondary',
    },
    green: {
      border: 'border-success hover:border-success',
      text: 'text-success',
      bg: 'bg-success',
      shadow: 'hover:shadow-subtle',
      gradient: 'from-emerald-500 to-green-600',
    },
    red: {
      border: 'border-danger hover:border-destructive',
      text: 'text-danger',
      bg: 'bg-danger',
      shadow: 'hover:shadow-subtle',
      gradient: 'from-rose-500 to-red-600',
    },
  };

  const icons = {
    total: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    pending: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    completed: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const config = colorConfig[color];

  return (
    <div className={`
      relative bg-card p-4 sm:p-6 rounded-lg border
      ${config.border} ${config.shadow}
      transition-all duration-300 hover-elevate
    `}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-lg
          bg-gradient-to-br ${config.gradient}
          flex items-center justify-center
          shadow-subtle
        `}>
          {icons[icon]}
        </div>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className={`text-2xl sm:text-3xl font-bold ${config.text}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
