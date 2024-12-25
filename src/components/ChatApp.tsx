'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import { Send, User } from 'lucide-react'

export function ChatApp() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      { id: '1', role: 'user', content: 'Hello' },
      { id: '2', role: 'assistant', content: 'This is a AI Message' },
    ],
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Simple Chat</h1>
        </div>
      </header>
      <main className="flex-grow overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4 mb-6">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex items-start ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse space-x-2' : 'flex-row space-x-2'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <User className="text-white" size={24} />
              </div>
              <div
                className={`rounded-lg px-4 py-2 max-w-sm ${
                  message.role === 'user'
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-2 flex-row">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <User className="text-white" size={24} />
              </div>
              <div className="bg-white text-gray-800 rounded-lg px-4 py-2 max-w-sm">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="bg-white shadow">
        <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white rounded-md p-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 h-[42px] w-[42px] flex items-center justify-center"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  )
} 