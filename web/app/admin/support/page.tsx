'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, MessageSquare, Clock, User, AlertCircle,
  ChevronRight, Check, Send, Paperclip, MoreVertical
} from 'lucide-react'

// Mock data
const tickets = [
  { id: 'T-4521', subject: 'Commission not received for January', member: 'John Smith', memberId: 'M-12847', priority: 'high', status: 'open', created: '2h ago', lastReply: '30m ago', messages: 4 },
  { id: 'T-4520', subject: 'Can\'t connect temperature sensors', member: 'Jane Doe', memberId: 'M-12846', priority: 'medium', status: 'open', created: '5h ago', lastReply: '2h ago', messages: 2 },
  { id: 'T-4519', subject: 'Question about subscription pause', member: 'Bob Wilson', memberId: 'M-12845', priority: 'low', status: 'open', created: '1d ago', lastReply: '12h ago', messages: 3 },
  { id: 'T-4518', subject: 'Order #ORD-4512 never arrived', member: 'Sarah Chen', memberId: 'M-12844', priority: 'high', status: 'pending', created: '1d ago', lastReply: '6h ago', messages: 5 },
  { id: 'T-4517', subject: 'How do I change my sponsor?', member: 'Mike Johnson', memberId: 'M-12843', priority: 'low', status: 'open', created: '2d ago', lastReply: '1d ago', messages: 1 },
  { id: 'T-4516', subject: 'Refund request for damaged product', member: 'Emily Davis', memberId: 'M-12842', priority: 'medium', status: 'resolved', created: '3d ago', lastReply: '2d ago', messages: 6 },
]

const selectedTicketMessages = [
  { id: 1, sender: 'John Smith', role: 'member', content: 'Hi, I haven\'t received my commission payment for January. My dashboard shows $1,234.56 was supposed to be paid on Feb 1st but it never arrived in my bank account.', time: '2h ago' },
  { id: 2, sender: 'Support (Sarah)', role: 'admin', content: 'Hi John, I\'m sorry to hear about this issue. Let me look into your account right away. Can you confirm the last 4 digits of the bank account you have on file?', time: '1h 45m ago' },
  { id: 3, sender: 'John Smith', role: 'member', content: 'Yes, it ends in 4521. I\'ve been using the same account for 6 months with no issues until now.', time: '1h 30m ago' },
  { id: 4, sender: 'Support (Sarah)', role: 'admin', content: 'Thank you for confirming. I can see the payment was initiated but returned by the bank with code R01 (Insufficient Funds - not your account, our batch account had an issue). We\'re reprocessing now and it should arrive within 2-3 business days. I\'ve also added a $25 credit to your account for the inconvenience.', time: '30m ago' },
]

const priorityColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-blue-100 text-blue-700',
}

const statusColors = {
  open: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  resolved: 'bg-gray-100 text-gray-700',
}

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<string>('T-4521')
  const [replyText, setReplyText] = useState('')
  const [statusFilter, setStatusFilter] = useState('open')

  const filteredTickets = tickets.filter(t => 
    statusFilter === 'all' || t.status === statusFilter
  )

  const currentTicket = tickets.find(t => t.id === selectedTicket)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-500">Manage member support requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Open Tickets</div>
          <div className="text-2xl font-bold text-emerald-600">{tickets.filter(t => t.status === 'open').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-amber-600">{tickets.filter(t => t.status === 'pending').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Resolved Today</div>
          <div className="text-2xl font-bold text-gray-600">12</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Avg Response Time</div>
          <div className="text-2xl font-bold text-gray-900">2.4h</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="col-span-1">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
            <div className="flex gap-2">
              {['all', 'open', 'pending', 'resolved'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    statusFilter === status 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="space-y-2">
            {filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedTicket === ticket.id 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                    {ticket.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status as keyof typeof statusColors]}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="font-medium text-gray-900 mb-1 line-clamp-1">{ticket.subject}</div>
                <div className="text-sm text-gray-500 mb-2">{ticket.member}</div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{ticket.id}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {ticket.messages}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Detail */}
        <div className="col-span-2">
          {currentTicket ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[calc(100vh-280px)] flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-500">{currentTicket.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[currentTicket.priority as keyof typeof priorityColors]}`}>
                        {currentTicket.priority}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">{currentTicket.subject}</h2>
                    <div className="text-sm text-gray-500 mt-1">
                      <Link href={`/admin/members/${currentTicket.memberId}`} className="text-emerald-600 hover:underline">
                        {currentTicket.member}
                      </Link>
                      <span className="mx-2">•</span>
                      Created {currentTicket.created}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm">
                      <option value="open">Open</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedTicketMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.role === 'admin' ? 'order-2' : ''}`}>
                      <div className={`rounded-xl px-4 py-3 ${
                        msg.role === 'admin' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <div className={`text-xs text-gray-400 mt-1 ${msg.role === 'admin' ? 'text-right' : ''}`}>
                        {msg.sender} • {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Use template
                  </button>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Mark as resolved
                  </button>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Escalate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a ticket to view</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
