/**
 * ChatKit Floating Widget Component
 *
 * Task: T-CHAT-016
 * Spec: specs/phase-3-chatbot/spec.md
 *
 * OpenAI ChatKit integration - floating widget (bottom-right)
 * Handles: history management, UI updates, widget rendering
 */
'use client';

import { useChatKit, ChatKit } from '@openai/chatkit-react';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function ChatKitWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUserId = localStorage.getItem('user_id');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    }
  }, []);

  // ChatKit hook with custom backend
  const chatkit = useChatKit({
    api: {
      domainKey: 'custom',
      url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/chatkit`,
      fetch: async (url, init) => {
        // Add JWT token to all requests
        const currentToken = localStorage.getItem('auth_token');
        const currentUserId = localStorage.getItem('user_id');

        if (!currentToken) {
          throw new Error('Not authenticated');
        }

        // Parse body to add user context
        let body = init?.body;
        if (body && typeof body === 'string') {
          try {
            const parsed = JSON.parse(body);
            parsed.context = {
              user_id: currentUserId,
            };
            body = JSON.stringify(parsed);
          } catch (e) {
            // Keep original body if not JSON
          }
        }

        return fetch(url, {
          ...init,
          body,
          headers: {
            ...init?.headers,
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
        });
      },
    },
    onError: ({ error }) => {
      console.error('[ChatKit] Error:', error);
    },
  });

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-start to-primary-end text-white shadow-lg hover:shadow-[0_0_20px_rgba(0,97,255,0.3)] transition-all duration-300 flex items-center justify-center border border-primary/30"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>

      {/* Chat Widget Container */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[380px] h-[550px] rounded-lg overflow-hidden shadow-2xl border border-input bg-card backdrop-blur-xl"
          style={{
            boxShadow: '0 0 30px rgba(0,97,255,0.2)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-start/20 to-primary-end/20 p-4 border-b border-input">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
              AI Task Assistant
            </h3>
            <p className="text-xs text-muted-foreground">
              Manage tasks in English or Urdu
            </p>
          </div>

          {/* ChatKit Component */}
          <div className="h-[calc(100%-80px)]">
            <ChatKit control={chatkit.control} />
          </div>
        </div>
      )}
    </>
  );
}

export default ChatKitWidget;
