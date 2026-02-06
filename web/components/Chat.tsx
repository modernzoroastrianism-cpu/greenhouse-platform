'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Camera, Mic, MicOff } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatProps {
  readings: any[]
}

export default function Chat({ readings }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Good evening! Your greenhouse is looking great today. Temperature's steady at 72°F, humidity is perfect at 61%. Those tomato seedlings are on day 14 — should see flowers soon! 🌿 How can I help?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response (in production, call API)
    setTimeout(() => {
      const responses = [
        "Your tomatoes are looking healthy! Day 14 means you're about halfway to first flowers. Keep the temperature steady and make sure they're getting enough light.",
        "Based on your current readings, everything looks good. Soil moisture is at 45% which is perfect for your stage of growth.",
        "Great question! For your zone, you'll want to start hardening off seedlings about 2 weeks before your last frost date.",
        "I'd recommend watering in the morning — it gives plants time to absorb moisture before the heat of the day and reduces disease risk.",
      ]
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Status Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {readings.map((r) => (
              <div key={r.type} className="flex items-center gap-1 text-sm">
                <span className="text-gray-500">
                  {r.type === 'temperature' && '🌡️'}
                  {r.type === 'humidity' && '💧'}
                  {r.type === 'soil_moisture' && '🌱'}
                  {r.type === 'light' && '☀️'}
                </span>
                <span className="font-medium text-gray-900">
                  {r.value}{r.unit}
                </span>
              </div>
            ))}
          </div>
          <span className="text-xs text-green-600 font-medium">● All systems good</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-greenhouse-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🌱</span>
                  <span className="text-sm font-medium text-greenhouse-600">AI Gardener</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-green-100' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Camera className="w-5 h-5" />
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your AI Gardener..."
              className="w-full bg-transparent resize-none outline-none text-sm"
              rows={1}
            />
          </div>
          
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-full ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="p-2 bg-greenhouse-500 text-white rounded-full hover:bg-greenhouse-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-center text-gray-400 mt-2">
          📞 Or call <span className="font-medium">(555) 123-GROW</span> anytime
        </p>
      </div>
    </div>
  )
}
