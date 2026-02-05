'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import StatsCard from '../../components/StatsCard';
import ProgressBar from '../../components/ProgressBar';
import Navbar from '../../components/layout/Navbar';
import { api, TasksResponse } from '../../lib/api';

export default function TasksPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [showDataOps, setShowDataOps] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  const fetchStats = useCallback(async (userId: string) => {
    try {
      const response: TasksResponse = await api.getTasks(userId, 'all');
      setStats(response.count);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');

    if (!token || !userId) {
      router.push('/auth/signin');
    } else {
      setUser({
        id: userId,
        email: userEmail || '',
        name: userName || undefined,
      });
      setLoading(false);
      fetchStats(userId);
    }
  }, [router, fetchStats]);

  useEffect(() => {
    if (user?.id && refreshTrigger > 0) {
      fetchStats(user.id);
    }
  }, [refreshTrigger, user?.id, fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    router.push('/auth/signin');
  };

  const handleTaskAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleExportJson = async () => {
    if (!user) return;
    try {
      await api.exportTasksJson(user.id);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleExportCsv = async () => {
    if (!user) return;
    try {
      await api.exportTasksCsv(user.id);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;
    setImportLoading(true);
    try {
      await api.importTasksJson(user.id, e.target.files[0]);
      setRefreshTrigger(prev => prev + 1);
      setShowDataOps(false);
    } catch (err) {
      console.error('Import failed:', err);
    } finally {
      setImportLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-orange-primary rounded-lg blur-md opacity-60 animate-pulse" />
            <div className="relative w-full h-full bg-orange-primary rounded-lg flex items-center justify-center border-2 border-orange-primary">
              <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
          <p className="text-orange-primary uppercase tracking-wider text-sm">Loading Tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Header */}
      <Navbar />

      {/* Data Operations Backdrop/Panel */}
      {showDataOps && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60">
          <div className="w-full max-w-md bg-card border-2 border-gray-300 rounded-xl p-6 relative card">
            <button
              onClick={() => setShowDataOps(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-bold text-orange-primary mb-6 uppercase tracking-wider">Data Operations</h3>

            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border border-gray-300 card">
                <p className="text-sm font-medium mb-3">Export Task Data</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportJson}
                    className="flex-1 py-2 bg-orange-100 border border-orange-primary text-orange-primary rounded-lg hover:bg-orange-200 transition-all text-sm font-bold btn-secondary"
                  >
                    JSON
                  </button>
                  <button
                    onClick={handleExportCsv}
                    className="flex-1 py-2 bg-orange-100 border border-orange-primary text-orange-primary rounded-lg hover:bg-orange-200 transition-all text-sm font-bold btn-secondary"
                  >
                    CSV
                  </button>
                </div>
              </div>

              <div className="p-4 bg-background rounded-lg border border-gray-300 card">
                <p className="text-sm font-medium mb-3">Import Tasks</p>
                <label className={`
                  flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-primary transition-all
                  ${importLoading ? 'opacity-50 pointer-events-none' : ''}
                `}>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                    {importLoading ? 'Processing...' : 'Upload JSON File'}
                  </span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    disabled={importLoading}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-foreground">Task</span>{' '}
                <span className="text-orange-primary">Manager</span>
              </h2>
              <p className="text-muted-foreground">Simple and effective task management</p>
            </div>

            {/* Export/Import Button */}
            <button
              onClick={() => setShowDataOps(true)}
              className="px-6 py-3 bg-orange-100 border-2 border-orange-primary text-orange-primary rounded-lg hover:bg-orange-200 transition-all duration-300 btn-secondary"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="font-bold text-sm uppercase tracking-wider">
                  Data Ops
                </span>
              </div>
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatsCard
              label="Total Tasks"
              value={stats.total}
              icon="total"
              color="orange"
            />
            <StatsCard
              label="Pending"
              value={stats.pending}
              icon="pending"
              color="black"
            />
            <StatsCard
              label="Completed"
              value={stats.completed}
              icon="completed"
              color="gray"
            />
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <ProgressBar completed={stats.completed} total={stats.total} />
          </div>

          {/* Task Form */}
          {user && (
            <TaskForm userId={user.id} onTaskAdded={handleTaskAdded} />
          )}

          {/* Task List */}
          {user && (
            <TaskList userId={user.id} refreshTrigger={refreshTrigger} />
          )}
        </div>
      </main>
    </div>
  );
}
