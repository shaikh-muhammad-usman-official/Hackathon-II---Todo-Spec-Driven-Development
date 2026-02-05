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
    <form onSubmit={handleSubmit} className="card p-6 mb-6 border border-border relative overflow-hidden">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-all input"
          disabled={loading}
          maxLength={200}
        />
        <button
          type="button"
          onClick={() => setShowDescription(!showDescription)}
          className={`px-4 py-3 rounded-lg transition-all ${
            showDescription
              ? 'bg-gradient-to-r from-[#9929EA] to-[#7a1bc4] text-white'
              : 'bg-background border border-border text-muted-foreground hover:text-[#9929EA] hover:border-[#9929EA]'
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
          className="px-6 py-3 bg-gradient-to-r from-[#9929EA] to-[#7a1bc4] text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
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
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-all resize-none input"
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
          className={`px-4 py-2 rounded-lg transition-all text-sm ${
            showAdvanced
              ? 'bg-gradient-to-r from-[#9929EA] to-[#7a1bc4] text-white'
              : 'bg-background border border-border text-muted-foreground hover:text-[#9929EA] hover:border-[#9929EA]'
          }`}
        >
          ⚙️ Advanced Options
        </button>
        {priority !== 'none' && <PriorityBadge priority={priority} />}
      </div>

      {showAdvanced && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-background border border-border">
          {/* Priority Selector (T029) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all input"
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
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all input"
            >
              <option value="">No Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {recurrencePattern && (
              <p className="mt-1 text-xs text-primary">
                A new task will be created automatically when this one is completed.
              </p>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 text-destructive text-sm bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-2 card">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
    </form>
  );
}
