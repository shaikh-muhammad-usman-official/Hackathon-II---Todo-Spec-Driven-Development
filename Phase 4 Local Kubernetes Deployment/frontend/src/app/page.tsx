'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Professional grid background - keeping the grid as requested */}
      <div className="absolute inset-0 cyber-grid" />

      {/* Subtle glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-end/10 rounded-full filter blur-[120px] animate-pulse [animation-delay:1s]" />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-start to-primary-end rounded-xl blur-md opacity-40" />
              <div className="relative w-full h-full bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,97,255,0.2)]">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent tracking-wide">
              PRO TASKS
            </span>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link
                href="/tasks"
                className="px-6 py-3 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white font-medium border border-primary/30 shadow-[0_4px_12px_rgba(0,97,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,97,255,0.4)] transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-3 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white font-medium border border-primary/30 shadow-[0_4px_12px_rgba(0,97,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,97,255,0.4)] transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="px-6 py-2 bg-slate-900/80 dark:bg-black border border-primary/50 rounded-full text-sm font-bold text-primary backdrop-blur-sm shadow-[0_0_15px_rgba(0,97,255,0.2)]">
              Professional Task Management System
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="text-foreground">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
              Productivity
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start your professional task management account. Harness AI-powered organization
            with precision and real-time synchronization.
          </p>

          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            <Link
              href="/auth/signup"
              className="px-10 py-4 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white font-medium text-lg flex items-center gap-2 border border-primary/30 shadow-[0_4px_12px_rgba(0,97,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,97,255,0.4)] transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Create Account
            </Link>
            {isAuthenticated && (
              <Link
                href="/chat"
                className="px-10 py-4 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white font-medium text-lg flex items-center gap-2 border border-primary/30 shadow-[0_4px_12px_rgba(0,97,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,97,255,0.4)] transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                AI Assistant
              </Link>
            )}
            <a
              href="#features"
              className="px-10 py-4 bg-card border border-input text-foreground rounded-lg font-medium text-lg hover:border-primary hover:shadow-[0_4px_12px_rgba(0,97,255,0.1)] backdrop-blur-sm transition-all duration-300"
            >
              View Features
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground/70">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Unlimited tasks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Task Management</span>{' '}
            <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Advanced task management capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature 0 - AI Assistant (Featured) */}
          <div className="group relative bg-card/80 backdrop-blur-sm p-8 rounded-lg transition-all duration-500 border border-primary/50 hover:border-primary hover:shadow-[0_0_25px_rgba(0,97,255,0.2)] card-hover md:col-span-2 lg:col-span-3">
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,97,255,0.3)] shrink-0">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent mb-3">AI-Powered Assistant</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Chat with your intelligent AI assistant in natural language. Manage tasks, get summaries, and productivity insights using English or Urdu. Powered by advanced AI with voice input support.
                </p>
                {isAuthenticated && (
                  <Link
                    href="/chat"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-start to-primary-end text-white rounded-lg font-medium border border-primary/30 hover:shadow-[0_4px_12px_rgba(0,97,255,0.3)] transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Try AI Assistant Now
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Feature 1 */}
          <div className="group relative bg-card/80 backdrop-blur-sm p-8 rounded-lg transition-all duration-500 border border-input hover:border-primary hover:shadow-[0_0_20px_rgba(0,97,255,0.1)] card-hover">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,97,255,0.2)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Professional Security</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Enterprise-grade encryption with JWT authentication protocols. Maximum security for your data.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-card/80 backdrop-blur-sm p-8 rounded-lg transition-all duration-500 border border-input hover:border-primary hover:shadow-[0_0_20px_rgba(0,97,255,0.1)] card-hover">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,97,255,0.2)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Smart Organization</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Intelligent task categorization. Advanced filtering with real-time search capabilities.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-card/80 backdrop-blur-sm p-8 rounded-lg transition-all duration-500 border border-input hover:border-primary hover:shadow-[0_0_20px_rgba(0,97,255,0.1)] card-hover">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,97,255,0.2)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">High Performance</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Built with Next.js and FastAPI. Real-time synchronization across all connected devices.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-card/80 backdrop-blur-sm p-8 rounded-lg transition-all duration-500 border border-input hover:border-primary hover:shadow-[0_0_20px_rgba(0,97,255,0.1)] card-hover">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,97,255,0.2)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Analytics & Insights</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Visual productivity insights. Track trends and optimize your workflow efficiency.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative bg-card/80 backdrop-blur-sm p-8 rounded-lg transition-all duration-500 border border-input hover:border-primary hover:shadow-[0_0_20px_rgba(0,97,255,0.1)] card-hover">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,97,255,0.2)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Secure Storage</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Secure cloud storage. Your data is safely backed up and always accessible.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative bg-card/80 backdrop-blur-sm p-8 rounded-lg transition-all duration-500 border border-input hover:border-primary hover:shadow-[0_0_20px_rgba(0,97,255,0.1)] card-hover">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,97,255,0.2)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Sync Across Devices</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Instant synchronization. See changes reflected immediately across all your devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="relative bg-slate-800/30 dark:bg-slate-900/50 border border-purple-500/20 rounded-3xl p-12 backdrop-blur-2xl">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10 rounded-3xl blur" />

          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-xl text-muted-foreground">
                Start managing your tasks in less than a minute
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-start to-primary-end rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Create Account</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sign up with your email in seconds. No credit card required, no commitments.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-start to-primary-end rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Add Your Tasks</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create tasks, set priorities, add due dates, and organize with tags.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-start to-primary-end rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Get Things Done</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track progress, complete tasks, and watch your productivity soar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="relative bg-gradient-to-r from-primary-start to-primary-end rounded-xl p-12 md:p-16 text-center shadow-lg shadow-primary/20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-start to-primary-end rounded-xl blur opacity-30 animate-pulse" />

          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their tasks smarter, not harder.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-10 py-4 bg-white text-primary rounded-lg font-medium text-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border border-white shadow-md"
            >
              Start Your Free Trial
            </Link>
            <p className="text-primary-foreground/80 mt-4 text-sm">
              No credit card required - Free forever plan available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-input relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-start to-primary-end rounded-lg flex items-center justify-center shadow-md shadow-primary/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">Pro Tasks</span>
            </div>
            <p className="text-muted-foreground/70 text-sm">
              The most intuitive way to manage your tasks and boost productivity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground/70">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-input pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground/70">
            2025 Pro Tasks - Built with Next.js 16 + FastAPI + PostgreSQL
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground/60 hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a
              href="https://github.com/shaikh-muhammad-usman-official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-primary transition-colors"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground/60 hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
