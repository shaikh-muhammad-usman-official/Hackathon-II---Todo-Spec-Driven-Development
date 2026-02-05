'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { api } from '@/lib/api';
import { Settings, User, Bell, Shield, Palette, Globe, Clock, Save, Loader2, Lock, Key, Eye, Moon, Sun, Monitor } from 'lucide-react';

type TabId = 'general' | 'appearance' | 'notifications' | 'security';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [preferences, setPreferences] = useState({
    theme: 'dark', // ONLY 'light' or 'dark' allowed (NOT 'system')
    language: 'en', // ONLY 'en' or 'ur' allowed
    timezone: 'UTC',
    email_notifications: true,
    push_notifications: false,
    default_priority: 'none',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUserId = localStorage.getItem('user_id');

    if (!token || !storedUserId) {
      router.push('/auth/signin');
      return;
    }

    setUserId(storedUserId);

    const fetchPreferences = async () => {
      try {
        const data = await api.getPreferences(storedUserId);
        console.log('📥 Fetched preferences from backend:', data);

        if (data) {
          // CRITICAL: Clean and validate ALL fields
          const validLanguages = ['en', 'ur'];
          const cleanData = {
            theme: data.theme || 'dark',
            language: validLanguages.includes(data.language) ? data.language : 'en',
            timezone: data.timezone || 'UTC',
            email_notifications: data.notifications_enabled ?? true,
            push_notifications: data.notification_sound ?? false,
            default_priority: data.default_priority || 'none',
          };
          console.log('✅ Cleaned preferences:', cleanData);
          console.log('   Original language was:', data.language);
          console.log('   Cleaned language is:', cleanData.language);

          setPreferences(cleanData);
        }
      } catch (err: any) {
        console.error('Failed to fetch preferences:', err);
        // Fallback to default preferences if backend endpoint not available
        if (err.response?.status === 404) {
          console.warn('⚠️ Preferences endpoint not available, using defaults');
          setMessage({
            type: 'error',
            text: 'Settings feature is being deployed. Using default preferences for now.'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [router]);

  const handleSave = async () => {
    if (!userId) {
      console.error('❌ No userId found!');
      setMessage({ type: 'error', text: 'User ID not found. Please login again.' });
      return;
    }

    console.log('🚀 Starting save...');
    console.log('  userId:', userId);
    console.log('  preferences:', preferences);
    console.log('  API URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

    // FINAL validation before sending
    const validLanguages = ['en', 'ur'];
    if (!validLanguages.includes(preferences.language)) {
      console.error('❌ INVALID LANGUAGE DETECTED:', preferences.language);
      setMessage({ type: 'error', text: `Invalid language: ${preferences.language}. Resetting to English.` });
      setPreferences({ ...preferences, language: 'en' });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      console.log('📤 Sending to backend:', preferences);
      const result = await api.updatePreferences(userId, preferences);
      console.log('✅ Save successful:', result);
      setMessage({ type: 'success', text: 'Terminal configurations updated successfully.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error('❌ Save failed:', err);
      console.error('  Error message:', err.message);
      console.error('  Error response:', err.response);
      console.error('  Error request:', err.request);
      console.error('  Error config:', err.config);

      // Get detailed error message from backend
      const errorDetail = err.response?.data?.detail || err.message || 'Network error';

      // Special handling for 404 (endpoint not deployed yet)
      if (err.response?.status === 404) {
        setMessage({
          type: 'error',
          text: 'Settings feature is being deployed to the backend. Please try again in a few minutes.'
        });
      } else {
        setMessage({ type: 'error', text: `Failed: ${errorDetail}` });
      }
    } finally {
      setSaving(false);
    }
  };

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

  const tabs = [
    { id: 'general' as TabId, icon: <User className="w-4 h-4" />, label: 'General' },
    { id: 'appearance' as TabId, icon: <Palette className="w-4 h-4" />, label: 'Appearance' },
    { id: 'notifications' as TabId, icon: <Bell className="w-4 h-4" />, label: 'Notifications' },
    { id: 'security' as TabId, icon: <Shield className="w-4 h-4" />, label: 'Security' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/30">
              <Settings className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Account Settings
              </h1>
              <p className="text-muted-foreground text-sm">Configure your preferences and account options</p>
            </div>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl border-2 animate-in fade-in slide-in-from-top-2 duration-300 ${
              message.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <p className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                {message.text}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Tabs */}
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`🔘 Clicked: ${tab.label} (${tab.id})`);
                    console.log(`   Current tab: ${activeTab}`);
                    setActiveTab(tab.id);
                    console.log(`   New tab: ${tab.id}`);
                  }}
                  style={{ cursor: 'pointer', zIndex: 10, position: 'relative' }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                    activeTab === tab.id
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6 space-y-8 min-h-[400px]">

                {/* GENERAL TAB */}
                {activeTab === 'general' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-300">
                    <div className="text-sm text-accent mb-2">⚙️ General Settings</div>
                    {/* Localization */}
                    <section className="space-y-4">
                      <h3 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Language & Region
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-muted-foreground font-medium ml-1">Interface Language</label>
                          <select
                            value={preferences.language}
                            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-all font-medium"
                          >
                            <option value="en">English</option>
                            <option value="ur">اردو (Urdu)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-muted-foreground font-medium ml-1">Timezone</label>
                          <select
                            value={preferences.timezone}
                            onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-all font-medium"
                          >
                            <option value="UTC">Universal Time (UTC)</option>
                            <option value="EST">Eastern (EST)</option>
                            <option value="PST">Pacific (PST)</option>
                            <option value="GMT">Greenwich (GMT)</option>
                            <option value="CST">Central (CST)</option>
                            <option value="JST">Japan (JST)</option>
                          </select>
                        </div>
                      </div>
                    </section>

                    <div className="h-px bg-border" />

                    {/* Task Defaults */}
                    <section className="space-y-4">
                      <h3 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Task Defaults
                      </h3>
                      <div className="space-y-2">
                        <label className="text-xs uppercase text-muted-foreground font-medium ml-1">Default Priority Level</label>
                        <div className="flex flex-wrap gap-2">
                          {['none', 'low', 'medium', 'high'].map((p) => (
                            <button
                              key={p}
                              onClick={() => setPreferences({ ...preferences, default_priority: p })}
                              className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wide transition-all border ${
                                preferences.default_priority === p
                                  ? 'bg-accent border-accent text-white shadow-[0_0_10px_rgba(50,205,50,0.3)]'
                                  : 'bg-card border-border text-muted-foreground hover:bg-muted'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* APPEARANCE TAB */}
                {activeTab === 'appearance' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-300">
                    <div className="text-sm text-accent mb-2">🎨 Appearance Settings</div>
                    <section className="space-y-4">
                      <h3 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
                        <Palette className="w-4 h-4" /> Display Theme
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-muted-foreground font-medium ml-1">Display Theme</label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
                              { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
                            ].map((theme) => (
                              <button
                                key={theme.value}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  console.log(`🎨 Theme clicked: ${theme.value}`);
                                  console.log(`   Current theme: ${preferences.theme}`);
                                  setPreferences({ ...preferences, theme: theme.value });
                                  console.log(`   New theme: ${theme.value}`);
                                }}
                                style={{ cursor: 'pointer', zIndex: 10, position: 'relative' }}
                                className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                                  preferences.theme === theme.value
                                    ? 'bg-accent/20 border-accent text-accent shadow-[0_0_15px_rgba(50,205,50,0.2)]'
                                    : 'bg-card border-border text-muted-foreground hover:border-accent/50'
                                }`}
                              >
                                {theme.icon}
                                <span className="text-xs font-medium">{theme.label}</span>
                                {preferences.theme === theme.value && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-muted border border-border">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-bold text-accent">Tip:</span> Choose Light for bright environments or Dark for reduced eye strain.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* NOTIFICATIONS TAB */}
                {activeTab === 'notifications' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-300">
                    <div className="text-sm text-accent mb-2">🔔 Notifications Settings</div>
                    <section className="space-y-4">
                      <h3 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
                        <Bell className="w-4 h-4" /> Notification Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-4 rounded-lg bg-card border border-border cursor-pointer hover:bg-muted transition-all group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all">
                              <Bell className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email Notifications</p>
                              <p className="text-xs text-muted-foreground">Receive task updates via email</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.email_notifications}
                            onChange={(e) => setPreferences({ ...preferences, email_notifications: e.target.checked })}
                            className="w-5 h-5 rounded border-border bg-background text-accent focus:ring-accent focus:ring-2"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 rounded-lg bg-card border border-border cursor-pointer hover:bg-muted transition-all group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all">
                              <Bell className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Push Notifications</p>
                              <p className="text-xs text-muted-foreground">Real-time push notifications to your device</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.push_notifications}
                            onChange={(e) => setPreferences({ ...preferences, push_notifications: e.target.checked })}
                            className="w-5 h-5 rounded border-border bg-background text-accent focus:ring-accent focus:ring-2"
                          />
                        </label>

                        <div className="p-4 rounded-lg bg-muted border border-border mt-4">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-bold text-accent">Note:</span> Notification preferences are securely stored in your account.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* SECURITY TAB */}
                {activeTab === 'security' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-300">
                    <div className="text-sm text-accent mb-2">🔒 Security Settings</div>
                    <section className="space-y-4">
                      <h3 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Security Options
                      </h3>

                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all">
                                <Lock className="w-4 h-4 text-accent" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Change Password</p>
                                <p className="text-xs text-muted-foreground">Update your authentication credentials</p>
                              </div>
                            </div>
                            <button className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs font-medium hover:bg-accent/20 transition-all">
                              Update
                            </button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all">
                                <Key className="w-4 h-4 text-accent" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Two-Factor Authentication</p>
                                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium">
                              Disabled
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all">
                                <Eye className="w-4 h-4 text-accent" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Active Sessions</p>
                                <p className="text-xs text-muted-foreground">View and manage logged-in devices</p>
                              </div>
                            </div>
                            <button className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs font-medium hover:bg-accent/20 transition-all">
                              View
                            </button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 mt-4">
                          <p className="text-xs text-destructive">
                            <span className="font-bold">Note:</span> Additional security features are currently in development.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* Footer Save Button - Always Visible */}
                <div className="flex justify-end pt-4 border-t border-border">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary rounded-lg text-white font-medium shadow-[0_0_15px_rgba(50,205,50,0.3)] hover:shadow-[0_0_20px_rgba(50,205,50,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
