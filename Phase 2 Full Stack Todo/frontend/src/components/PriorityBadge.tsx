/**
 * Priority Badge Component
 *
 * Task: T027
 * Spec: specs/1-phase2-advanced-features/spec.md (US1)
 */
'use client';

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low' | 'none';
  size?: 'sm' | 'md' | 'lg';
}

const priorityConfig = {
  high: {
    label: 'High',
    color: 'bg-destructive text-white',  // Professional destructive color
    icon: '🔴',
  },
  medium: {
    label: 'Medium',
    color: 'bg-accent text-white',  // Lime green for medium priority
    icon: '🟡',
  },
  low: {
    label: 'Low',
    color: 'bg-success text-white',
    icon: '🟢',
  },
  none: {
    label: 'None',
    color: 'bg-muted text-foreground',
    icon: '⚪',
  },
};

export function PriorityBadge({ priority, size = 'sm' }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  if (priority === 'none') return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${config.color} ${sizeClasses[size]} badge`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
