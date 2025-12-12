'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';


type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

const AIChat: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: 'Welcome to StarkField AI! Your intelligent assistant for farming knowledge, community help, and real-time insights. Start by typing your question below.',
      sender: 'ai',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem("farmchain_token");

      const res = await fetch('https://farmchain.onrender.com/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ question: input }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Failed to fetch AI response');
      }

      const data = await res.json();
      let aiText = data.content || 'Sorry, I could not generate a response.';

      // Convert numbered lists to bullets
      aiText = aiText.replace(/\d+\.\s+/g, '• ');

      // Split text into separate bubbles on bullets or paragraph breaks
        const messagesToAdd = aiText
      .split(/\n(?=\• )|\n\n/)
      .map((text: string) => text.trim())   // ← explicitly type text
      .filter((text: string) => text.length > 0)
      .map((text: string, index: number) => ({
        id: Date.now() + index,
        text,
        sender: 'ai' as const,
  }));


      setMessages((prev) => [...prev, ...messagesToAdd]);
    } catch (error: any) {
      console.error('Error fetching AI response:', error);

      const aiMessage: Message = {
        id: Date.now() + 2,
        text: `❌ ${error.message || 'There was an error contacting FarmChain AI. Please try again.'}`,
        sender: 'ai',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] border-1">
      {/* Header */}
      <div
        className={`${
          theme === 'dark'
            ? 'bg-gradient-to-br from-white/10 to-white/20 text-white border-1'
            : 'bg-gradient-to-br from-green-600 via-green-400 to-green-600 text-white'
        } rounded-b-3xl shadow-2xl p-8 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">
                AI Assistant 🤖
              </h2>
              <p className="text-white/80 text-lg">
                Smart insights and instant help powered by AI
              </p>
            </div>
            <div className="text-6xl opacity-40 select-none">⚡</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-3 rounded-xl break-words ${
              msg.sender === 'user'
                ? 'bg-green-500 text-white self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="max-w-[70%] p-3 rounded-xl break-words bg-gray-200 text-gray-800 self-start animate-pulse">
            🤖 Typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`flex p-4 border-t ${theme === 'dark' ? "" : "bg-white"}`}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="ml-3 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-900 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
