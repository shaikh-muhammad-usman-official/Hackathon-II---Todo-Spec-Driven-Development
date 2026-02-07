'use client';

import { useState } from 'react';
import { api, TaskCreate } from '../lib/api';
import { DatePicker } from './DatePicker';
import { PriorityBadge } from './PriorityBadge';

interface TaskFormProps {
  userId: string;
  onTaskAdded: () => void;
}

export default function TaskForm({ userId, onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  // Phase 2 Advanced Features (T029-T030)
  const [priority, setPriority] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [recurrencePattern, setRecurrencePattern] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const taskData: TaskCreate = {
        title: title.trim(),
        description: description.trim() || undefined,
        // Phase 2 Advanced Features (T029-T030, US4)
        priority: priority,  // Send 'none' as is, backend handles it
        due_date: dueDate?.toISOString(),
        recurrence_pattern: recurrencePattern || undefined,
        tags: [],
      };

      await api.createTask(userId, taskData);

      setTitle('');
      setDescription('');
      setPriority('none');
      setDueDate(undefined);
      setRecurrencePattern('');
      setShowDescription(false);
      setShowAdvanced(false);
      onTaskAdded();
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Failed to create task';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-card/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl mb-6 border border-primary/20 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-input text-foreground placeholder-muted-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,97,255,0.1)] focus:outline-none transition-all"
          disabled={loading}
          maxLength={200}
        />
        <button
          type="button"
          onClick={() => setShowDescription(!showDescription)}
          className={`sm:order-0 order-2 px-4 py-3 rounded-xl border-2 transition-all ${
            showDescription
              ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400'
              : 'bg-background/50 border-cyan-500/30 text-muted-foreground hover:text-cyan-400 hover:border-cyan-400'
          }`}
          title="Add description"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="sm:order-1 order-1 relative group px-4 sm:px-6 py-3 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white font-medium border border-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px] hover:shadow-[0_4px_12px_rgba(0,97,255,0.3)] active:transform active:translate-y-0.5"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {showDescription && (
        <div className="mt-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add task details (optional)..."
            className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input text-foreground placeholder-muted-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,97,255,0.1)] focus:outline-none transition-all resize-none"
            rows={3}
            disabled={loading}
            maxLength={1000}
          />
        </div>
      )}

      {/* Phase 2: Priority & Due Date (T029-T030) */}
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-2 rounded-md border transition-all text-sm font-medium ${
            showAdvanced
              ? 'bg-primary/10 border-primary/40 text-primary'
              : 'bg-background/50 border-input text-muted-foreground hover:text-primary hover:border-primary/40'
          }`}
        >
          ⚙️ Advanced Options
        </button>
        {priority !== 'none' && <PriorityBadge priority={priority} />}
      </div>

      {showAdvanced && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-background/30 border border-input">
          {/* Priority Selector (T029) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-primary/50 transition-all"
            >
              <option value="none">None</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          {/* Date Picker (T030) */}
          <div>
            <DatePicker
              value={dueDate}
              onChange={setDueDate}
              minDate={new Date()}
              label="Due Date"
            />
          </div>

          {/* Recurrence (US4) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Recurrence (Daily, Weekly, Monthly)
            </label>
            <select
              value={recurrencePattern}
              onChange={(e) => setRecurrencePattern(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-primary/50 transition-all"
            >
              <option value="">No Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {recurrencePattern && (
              <p className="mt-1 text-xs text-purple-400">
                A new task will be created automatically when this one is completed.
              </p>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 text-red-500 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
    </form>
  );
}
