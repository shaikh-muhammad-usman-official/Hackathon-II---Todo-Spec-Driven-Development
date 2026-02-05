'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import ThemeToggle from '@/components/ThemeToggle';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.signin(email, password);

      localStorage.setItem('auth_token', response.token);

      // Simpler cookie setting for maximum browser compatibility
      document.cookie = "auth_token=" + response.token + "; path=/; SameSite=Lax; max-age=604800";

      localStorage.setItem('user_id', response.user.id);
      localStorage.setItem('user_email', response.user.email);
      localStorage.setItem('user_name', response.user.name);

      // Force a hard redirect to ensure cookies are sent and middleware triggers
      window.location.href = '/tasks';
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Invalid credentials';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid" />

      {/* Cyber glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-start/20 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-end/20 rounded-full filter blur-[120px] animate-pulse [animation-delay:1s]" />

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="hidden sm:inline text-sm font-medium">Back</span>
      </Link>

      <div className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 py-8">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-start to-primary-end rounded-3xl blur-lg opacity-50" />
            <div className="relative bg-card/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 border-cyan-500/30">

              {/* Logo */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-start to-primary-end rounded-2xl blur-md opacity-60 animate-pulse" />
                    <div className="relative w-full h-full bg-gradient-to-br from-primary-start to-primary-end rounded-2xl flex items-center justify-center border-2 border-primary/30 shadow-[0_0_30px_rgba(0,97,255,0.4)]">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent mb-2">
                  SIGN IN
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm">Sign In to Your Account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2 text-primary">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-background/50 border-2 border-primary/30 text-foreground placeholder-muted-foreground focus:border-primary focus:shadow-[0_0_20px_rgba(0,97,255,0.3)] focus:outline-none transition-all input-cyber"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium mb-2 text-primary uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-background/50 border-2 border-primary/30 text-foreground placeholder-muted-foreground focus:border-primary focus:shadow-[0_0_20px_rgba(0,97,255,0.3)] focus:outline-none transition-all input-cyber"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 border-2 border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white font-medium border border-primary/30 shadow-[0_4px_12px_rgba(0,97,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,97,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Create Account
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
