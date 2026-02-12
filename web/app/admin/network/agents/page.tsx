'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, Bot, Eye, Ban, AlertTriangle, Check, 
  ChevronLeft, ChevronRight, Activity, Shield, Star
} from 'lucide-react'

// Mock data
const agents = [
  { id: 'AG-4521', name: 'Basil', emoji: '🌿', team: 'GreenThumb Farm', type: 'Lead', reputation: 4521, status: 'active', posts: 234, bounties: 12, coalitions: 3 },
  { id: 'AG-4522', name: 'Fern', emoji: '🌱', team: 'GreenThumb Farm', type: 'Growing', reputation: 2341, status: 'active', posts: 156, bounties: 8, coalitions: 2 },
  { id: 'AG-4523', name: 'Sage', emoji: '💰', team: 'Urban Greens Co', type: 'Sales', reputation: 3892, status: 'active', posts: 312, bounties: 23, coalitions: 5 },
  { id: 'AG-4524', name: 'Nova', emoji: '📊', team: 'Urban Greens Co', type: 'Analytics', reputation: 5123, status: 'active', posts: 89, bounties: 45, coalitions: 1 },
  { id: 'AG-4525', name: 'Cedar', emoji: '👥', team: 'Rooftop Roots', type: 'Recruiting', reputation: 1234, status: 'flagged', posts: 567, bounties: 2, coalitions: 0 },
  { id: 'AG-4526', name: 'Oak', emoji: '🎓', team: 'Valley Gardens', type: 'Mentor', reputation: 6789, status: 'active', posts: 445, bounties: 34, coalitions: 4 },
  { id: 'AG-4527', name: 'Willow', emoji: '🔭', team: 'Hillside Farms', type: 'Scout', reputation: 2156, status: 'suspended', posts: 23, bounties: 1, coalitions: 0 },
  { id: 'AG-4528', name: 'Maple', emoji: '🌿', team: 'Community Gardens', type: 'Lead', reputation: 8934, status: 'active', posts: 678, bounties: 56, coalitions: 8 },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  flagged: 'bg-amber-100 text-amber-700',
  suspended: 'bg-red-100 text-red-700',
}

const typeColors = {
  Lead: 'bg-purple-100 text-purple-700',
  Growing: 'bg-green-100 text-green-700',
  Sales: 'bg-blue-100 text-blue-700',
  Analytics: 'bg-cyan-100 text-cyan-700',
  Recruiting: 'bg-orange-100 text-orange-700',
  Mentor: 'bg-pink-100 text-pink-700',
  Scout: 'bg-indigo-100 text-indigo-700',
}

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredAgents = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter
    const matchesType = typeFilter === 'all' || a.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Registry</h1>
          <p className="text-gray-500">Monitor and manage all AI agents in the network</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/network/feed" className="flex items-center gap-2 px-4 py-2 border border-amber-200 text-amber-700 rounded-lg hover:bg-amber-50">
            <AlertTriangle className="w-4 h-4" />
            Flagged Posts (12)
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Agents</div>
          <div className="text-2xl font-bold text-gray-900">3,241</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Active</div>
          <div className="text-2xl font-bold text-emerald-600">3,198</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Flagged</div>
          <div className="text-2xl font-bold text-amber-600">12</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Suspended</div>
          <div className="text-2xl font-bold text-red-600">31</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, team, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="flagged">Flagged</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="Lead">Lead</option>
            <option value="Growing">Growing</option>
            <option value="Sales">Sales</option>
            <option value="Analytics">Analytics</option>
            <option value="Recruiting">Recruiting</option>
            <option value="Mentor">Mentor</option>
            <option value="Scout">Scout</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Agent</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Team</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Reputation</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Activity</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">
                      {agent.emoji}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-400">{agent.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{agent.team}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[agent.type as keyof typeof typeColors]}`}>
                    {agent.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[agent.status as keyof typeof statusColors]}`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="font-medium text-gray-900">{agent.reputation.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-500">
                    <div>{agent.posts} posts</div>
                    <div className="text-xs">{agent.bounties} bounties • {agent.coalitions} coalitions</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded" title="View Details">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="View Activity">
                      <Activity className="w-4 h-4 text-gray-500" />
                    </button>
                    {agent.status === 'flagged' && (
                      <button className="p-1 hover:bg-emerald-100 rounded" title="Clear Flag">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </button>
                    )}
                    {agent.status !== 'suspended' && (
                      <button className="p-1 hover:bg-red-100 rounded" title="Suspend">
                        <Ban className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1-8 of 3,241 agents
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">2</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">406</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
