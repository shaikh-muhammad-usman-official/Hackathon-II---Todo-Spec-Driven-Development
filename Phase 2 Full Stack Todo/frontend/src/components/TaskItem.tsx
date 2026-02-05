'use client';

import { useState } from 'react';
import { api, Task, TaskUpdate } from '../lib/api';
import { PriorityBadge } from './PriorityBadge';

interface TaskItemProps {
  task: Task;
  userId: string;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
  isSelected?: boolean;
  onSelect?: (taskId: number) => void;
}

export default function TaskItem({
  task,
  userId,
  onTaskUpdated,
  onTaskDeleted,
  isSelected,
  onSelect,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      await api.toggleComplete(userId, task.id);
      onTaskUpdated();
    } catch (err) {
      console.error('Failed to toggle task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    try {
      await api.deleteTask(userId, task.id);
      onTaskDeleted();
    } catch (err) {
      console.error('Failed to delete task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;

    setLoading(true);
    try {
      const updateData: TaskUpdate = {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      };
      await api.updateTask(userId, task.id, updateData);
      setIsEditing(false);
      onTaskUpdated();
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Phase 2: Check if task is overdue (T033)
  const isOverdue = () => {
    if (!task.due_date) return false;
    const due = new Date(task.due_date);
    const now = new Date();
    return due < now && !task.completed;
  };

  if (isEditing) {
    return (
      <div className="todo-item-padding bg-card rounded-lg border border-border">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground focus:border-accent focus:outline-none mb-2"
          placeholder="Task title"
          maxLength={200}
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground focus:border-accent focus:outline-none resize-none mb-3"
          placeholder="Description (optional)"
          rows={2}
          maxLength={1000}
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancelEdit}
            className="px-4 py-2 rounded-md bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-all"
            disabled={loading || !editTitle.trim()}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`todo-item transition-all border rounded-lg ${
        isSelected
          ? 'border-primary bg-primary/5'
          : task.completed
          ? 'border-border opacity-70'
          : isOverdue()
          ? 'border-danger bg-danger/5'
          : 'border-border hover:border-accent hover:bg-muted/20'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Bulk Select Checkbox (US6) */}
        <div className="mt-1 flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect?.(task.id)}
            className="w-4 h-4 rounded border-primary text-primary focus:ring-primary/30 bg-background cursor-pointer"
          />
        </div>

        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={loading}
          className={`mt-1 w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-primary border-primary text-white'
              : 'border-border hover:border-accent'
          } ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Phase 2: Title with priority and due date info (T031-T033) */}
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-base font-medium ${
                task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {task.title}
            </h3>

            {/* Phase 2: Priority badge (T031) */}
            {task.priority && <PriorityBadge priority={task.priority} />}
          </div>

          {task.description && (
            <p
              className={`mt-1 text-sm ${
                task.completed ? 'text-muted-foreground/60' : 'text-muted-foreground'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Phase 2: Due date with overdue warning (T032-T033) */}
          {task.due_date && (
            <div className={`mt-2 text-xs flex items-center gap-1 ${
              isOverdue() ? 'text-red-500 font-medium' : 'text-muted-foreground'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isOverdue() ? 'Overdue: ' : 'Due: '}{formatDate(task.due_date)}
            </div>
          )}

          {/* Date info toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-2 text-xs text-accent hover:text-foreground transition-colors uppercase tracking-wide"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>

          {showDetails && (
            <div className="mt-2 text-xs text-muted-foreground/70 space-y-1">
              <p>Created: {formatDate(task.created_at)}</p>
              <p>Updated: {formatDate(task.updated_at)}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-muted transition-all"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted transition-all"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
