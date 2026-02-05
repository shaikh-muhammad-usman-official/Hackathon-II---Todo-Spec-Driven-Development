'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-muted border border-border transition-all duration-300"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`
        relative p-2 rounded-lg transition-all duration-300
        ${isDark
          ? 'bg-muted border border-border hover:bg-accent'
          : 'bg-muted border border-border hover:bg-accent'
        }
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {isDark ? (
          <Sun className="w-5 h-5 text-foreground transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-foreground transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
