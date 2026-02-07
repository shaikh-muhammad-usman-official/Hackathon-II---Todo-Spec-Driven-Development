'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import StatsCard from '@/components/StatsCard';
import ProgressBar from '@/components/ProgressBar';
import { api } from '@/lib/api';
import { LayoutDashboard, TrendingUp, AlertCircle, Calendar, ArrowUpRight, Loader2, PieChart, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [stats, setStats] = useState<any>(null);
  const [completionHistory, setCompletionHistory] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUserId = localStorage.getItem('user_id');
    const storedUserEmail = localStorage.getItem('user_email');
    const storedUserName = localStorage.getItem('user_name');

    if (!token || !storedUserId) {
      router.push('/auth/signin');
      return;
    }

    setUserId(storedUserId);
    setUserEmail(storedUserEmail || '');
    setUserName(storedUserName || '');

    const fetchData = async () => {
      try {
        const [statsData, historyData] = await Promise.all([
          api.getStats(storedUserId),
          api.getCompletionStats(storedUserId, 7)
        ]);
        setStats(statsData);
        setCompletionHistory(historyData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Fallback if API returns null/err
  const data = stats || {
    total: 0,
    pending: 0,
    completed: 0,
    overdue: 0,
    upcoming: 0,
    completion_rate: 0,
    priority_distribution: { high: 0, medium: 0, low: 0, none: 0 }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <Navbar />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
                Productivity Analytics
              </h1>
              <p className="text-muted-foreground text-sm">Performance data and insights</p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
              {/* User Profile Card */}
              <div className="flex items-center gap-3 px-4 py-2 bg-card/50 border border-input rounded-lg backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-white font-bold text-sm">
                  {userName ? userName.charAt(0).toUpperCase() : (userEmail ? userEmail.charAt(0).toUpperCase() : 'U')}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">{userName || 'User'}</span>
                  <span className="text-xs text-muted-foreground">{userEmail}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-primary">Active</span>
              </div>
            </div>
          </div>

          {/* Top Row: Productivity Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard label="Total Tasks" value={data.total} icon="total" color="primary" />
            <StatsCard label="Pending Tasks" value={data.pending} icon="pending" color="primary" />
            <StatsCard label="Completion Rate" value={Math.round(data.completion_rate * 100) / 100 + '%'} icon="completed" color="green" />
            <div className="relative bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-destructive/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all card-hover">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center shadow-md">
                  <AlertCircle className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-3xl font-bold text-destructive">{data.overdue || 0}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Completion Progress */}
            <div className="lg:col-span-2 bg-card/50 backdrop-blur-xl border border-input rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Productivity Progress
                </h3>
                <span className="text-xs text-muted-foreground font-medium">Status: Active</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium mb-2">
                   <span>Overall Completion</span>
                   <span className="text-primary">{Math.round((data.completed / (data.total || 1)) * 100)}%</span>
                </div>
                <ProgressBar completed={data.completed} total={data.total} />
              </div>

              {/* Visual History (Mock Chart via CSS) */}
              <div className="pt-4">
                <div className="h-48 flex items-end justify-between gap-2 px-2">
                  {(completionHistory.length > 0 ? completionHistory : [10, 30, 45, 25, 60, 80, 75]).map((val: any, i) => {
                    const count = typeof val === 'number' ? val : (val.completed || 0);
                    const height = Math.max(10, Math.min(100, (count / (data.total || 10)) * 100));
                    return (
                      <div key={i} className="flex-1 group relative">
                        <div
                          className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-md transition-all duration-500 group-hover:from-primary-end/50 group-hover:to-primary-end"
                          style={{ height: `${height}%` }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border border-input px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 px-2 text-xs text-muted-foreground">
                  <span>7 Days Ago</span>
                  <span>6D</span>
                  <span>5D</span>
                  <span>4D</span>
                  <span>3D</span>
                  <span>2D</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Priority Matrix */}
            <div className="bg-card/50 backdrop-blur-xl border border-input rounded-lg p-6 space-y-6">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <PieChart className="w-4 h-4" /> Priority Distribution
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'High Priority', key: 'high', color: 'bg-destructive', text: 'text-destructive' },
                  { label: 'Medium Priority', key: 'medium', color: 'bg-warning', text: 'text-warning' },
                  { label: 'Low Priority', key: 'low', color: 'bg-success', text: 'text-success' },
                  { label: 'Normal', key: 'none', color: 'bg-muted', text: 'text-muted-foreground' },
                ].map((p) => {
                  const count = data.priority_distribution?.[p.key] || 0;
                  const percent = Math.round((count / (data.total || 1)) * 100);
                  return (
                    <div key={p.key} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{p.label}</span>
                        <span className={p.text}>{count} tasks ({percent}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <div
                          className={`h-full ${p.color} transition-all duration-1000`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-background/50 rounded-lg border border-input">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Upcoming Tasks</p>
                    <p className="text-lg font-bold text-foreground">{data.upcoming || 0} scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Center Footer */}
          <div className="flex justify-center pt-4">
            <button
               onClick={() => router.push('/tasks')}
               className="group flex items-center gap-2 px-6 py-3 bg-card/50 border border-input rounded-lg text-primary font-medium hover:bg-primary/10 hover:border-primary transition-all"
            >
              Back to Tasks
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
