'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { api, Notification } from '@/lib/api';
import { Bell, Check, CheckCheck, Trash2, Clock, AlertTriangle, Loader2, MessageSquare, BellOff } from 'lucide-react';

export default function NotificationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUserId = localStorage.getItem('user_id');

    if (!token || !storedUserId) {
      router.push('/auth/signin');
      return;
    }

    setUserId(storedUserId);

    const fetchNotifications = async () => {
      try {
        const data = await api.getNotifications(storedUserId);
        setNotifications(data.notifications);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [router]);

  const handleMarkRead = async (id: number) => {
    if (!userId) return;
    try {
      await api.markNotificationRead(userId, id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, sent: true } : n)
      );
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const handleMarkAllRead = async () => {
    if (!userId) return;
    try {
      await api.markAllNotificationsRead(userId);
      setNotifications(prev =>
        prev.map(n => ({ ...n, sent: true }))
      );
    } catch (err) {
      console.error('Failed to mark all read:', err);
    }
  };

  const getIcon = (type: string) => {
    if (type?.toLowerCase().includes('overdue')) return <AlertTriangle className="w-5 h-5 text-destructive" />;
    if (type?.toLowerCase().includes('reminder')) return <Clock className="w-5 h-5 text-accent" />;
    return <MessageSquare className="w-5 h-5 text-accent" />;
  };

  const formatNotificationType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const generateMessage = (notification: Notification) => {
    const type = notification.notification_type.toLowerCase();
    if (type.includes('reminder')) {
      return `Task reminder scheduled for ${new Date(notification.scheduled_time).toLocaleString()}`;
    }
    if (type.includes('overdue')) {
      return 'Task is now overdue and requires attention';
    }
    return `Notification for task ID ${notification.task_id}`;
  };

  const unreadCount = Array.isArray(notifications) ? notifications.filter(n => !n.sent).length : 0;

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
              <div className="relative">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/30">
                  <Bell className="w-8 h-8 text-accent" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-background">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Notifications
                </h1>
                <p className="text-muted-foreground text-sm">Manage your alerts and notifications</p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-all text-sm font-medium"
              >
                Mark All as Read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="bg-card border border-border rounded-xl overflow-hidden min-h-[400px]">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-6 transition-all group ${!n.sent ? 'bg-accent/5 border-l-4 border-l-accent' : 'bg-muted/30'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 p-3 rounded-xl transition-all ${!n.sent ? 'bg-background border border-accent/30' : 'bg-muted/50 border-transparent'}`}>
                          {getIcon(n.notification_type)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                             <h3 className={`font-medium ${!n.sent ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {formatNotificationType(n.notification_type)}
                             </h3>
                             <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                {new Date(n.created_at).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                             </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {generateMessage(n)}
                          </p>
                          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                             <span>Task #{n.task_id || 'System'}</span>
                             <span>•</span>
                             <span>{new Date(n.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {!n.sent && (
                        <button
                          onClick={() => handleMarkRead(n.id)}
                          className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-accent/20"
                          title="Mark as Read"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                 <div className="relative mb-6">
                    <BellOff className="w-16 h-16 text-muted-foreground/40" />
                 </div>
                 <h2 className="text-xl font-semibold text-muted-foreground mb-2">No Notifications</h2>
                 <p className="text-sm text-muted-foreground max-w-[280px]">
                    You don't have any new notifications at this time.
                 </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
