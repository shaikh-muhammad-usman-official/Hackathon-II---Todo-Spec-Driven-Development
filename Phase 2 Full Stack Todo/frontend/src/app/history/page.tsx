'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { api, HistoryEntry } from '@/lib/api';
import { History, Search, Filter, Loader2, ArrowLeftRight, Edit3, Trash2, CheckCircle2, PlusCircle, Activity } from 'lucide-react';

export default function HistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUserId = localStorage.getItem('user_id');

    if (!token || !storedUserId) {
      router.push('/auth/signin');
      return;
    }

    setUserId(storedUserId);

    const fetchHistory = async () => {
      try {
        const data = await api.getHistory(storedUserId);
        setHistory(data.history);
      } catch (err) {
        console.error('Failed to fetch audit log:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  const getActionIcon = (action: string) => {
    const a = action.toLowerCase();
    if (a.includes('create')) return <PlusCircle className="w-4 h-4 text-success" />;
    if (a.includes('update')) return <Edit3 className="w-4 h-4 text-accent" />;
    if (a.includes('delete')) return <Trash2 className="w-4 h-4 text-destructive" />;
    if (a.includes('complete')) return <CheckCircle2 className="w-4 h-4 text-success" />;
    return <Activity className="w-4 h-4 text-muted-foreground" />;
  };

  const filteredHistory = Array.isArray(history) ? history.filter(item =>
    item.action.toLowerCase().includes(query.toLowerCase()) ||
    (item.task_title && item.task_title.toLowerCase().includes(query.toLowerCase()))
  ) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-accent/10 border border-accent/30">
                <History className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Activity History
                </h1>
                <p className="text-muted-foreground text-sm">Track your task activity and changes</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search activities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-accent transition-all font-medium text-sm"
              />
            </div>
          </div>

          {/* Audit Log Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
             <div className="p-4 border-b border-border bg-muted flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Activity Log</span>
                <span className="text-xs text-muted-foreground">{filteredHistory.length} entries</span>
             </div>

             <div className="divide-y divide-border">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, idx) => (
                    <div key={item.id || idx} className="p-4 hover:bg-muted/50 transition-colors group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                           <div className="mt-1 p-2 rounded-lg bg-muted border border-border group-hover:border-accent/50 transition-all">
                              {getActionIcon(item.action)}
                           </div>
                           <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-foreground">
                                  {item.action}
                                </span>
                                {item.task_id && (
                                  <span className="text-xs px-2 py-0.5 rounded bg-muted border border-border font-mono">
                                    Task #{item.task_id}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {item.details || `Modified task: "${item.task_title || 'Untitled Task'}"`}
                              </p>
                           </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour12: false })}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <Activity className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">No activity logs found</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
