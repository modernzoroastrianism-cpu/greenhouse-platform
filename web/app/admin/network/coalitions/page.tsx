'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Eye, Check, X, Users, DollarSign, Calendar,
  Handshake, TrendingUp, AlertTriangle, Clock
} from 'lucide-react'

// Mock data
const coalitions = [
  { 
    id: 'C-156', 
    name: 'Northeast Seed Co-op', 
    emoji: '🌱',
    type: 'Buying',
    members: 47, 
    status: 'active',
    created: '2024-01-15',
    totalSavings: '$12,400',
    monthlyVolume: '$8,200',
    lead: 'Basil (AG-4521)',
    description: 'Group purchasing for seeds and growing supplies'
  },
  { 
    id: 'C-155', 
    name: 'Urban Delivery Ring', 
    emoji: '🚚',
    type: 'Logistics',
    members: 23, 
    status: 'pending',
    created: '2024-02-01',
    totalSavings: '$3,200',
    monthlyVolume: '$4,500',
    lead: 'Nova (AG-4524)',
    description: 'Shared delivery routes for urban growers'
  },
  { 
    id: 'C-154', 
    name: 'Greenhouse Equipment Pool', 
    emoji: '🔧',
    type: 'Sharing',
    members: 31, 
    status: 'active',
    created: '2023-11-20',
    totalSavings: '$8,900',
    monthlyVolume: '$2,100',
    lead: 'Sage (AG-4523)',
    description: 'Shared access to expensive equipment'
  },
  { 
    id: 'C-153', 
    name: 'Farmers Market Collective', 
    emoji: '🏪',
    type: 'Sales',
    members: 56, 
    status: 'active',
    created: '2023-09-01',
    totalSavings: '$21,000',
    monthlyVolume: '$15,400',
    lead: 'Oak (AG-4526)',
    description: 'Coordinated presence at local markets'
  },
  { 
    id: 'C-152', 
    name: 'Organic Certification Group', 
    emoji: '✅',
    type: 'Compliance',
    members: 18, 
    status: 'under-review',
    created: '2024-01-28',
    totalSavings: '$4,500',
    monthlyVolume: '$800',
    lead: 'Cedar (AG-4525)',
    description: 'Group certification to reduce costs'
  },
  { 
    id: 'C-151', 
    name: 'Water Rights Alliance', 
    emoji: '💧',
    type: 'Advocacy',
    members: 12, 
    status: 'dissolved',
    created: '2023-06-15',
    totalSavings: '$0',
    monthlyVolume: '$0',
    lead: 'N/A',
    description: 'Dissolved due to inactivity'
  },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  'under-review': 'bg-purple-100 text-purple-700',
  dissolved: 'bg-gray-100 text-gray-500',
}

const typeColors = {
  Buying: 'bg-blue-100 text-blue-700',
  Logistics: 'bg-orange-100 text-orange-700',
  Sharing: 'bg-pink-100 text-pink-700',
  Sales: 'bg-green-100 text-green-700',
  Compliance: 'bg-cyan-100 text-cyan-700',
  Advocacy: 'bg-indigo-100 text-indigo-700',
}

export default function CoalitionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCoalition, setSelectedCoalition] = useState<string | null>(null)

  const filteredCoalitions = coalitions.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const selected = coalitions.find(c => c.id === selectedCoalition)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coalition Oversight</h1>
          <p className="text-gray-500">Monitor and manage multi-agent projects</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Active Coalitions</div>
          <div className="text-2xl font-bold text-emerald-600">{coalitions.filter(c => c.status === 'active').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Pending Approval</div>
          <div className="text-2xl font-bold text-amber-600">{coalitions.filter(c => c.status === 'pending' || c.status === 'under-review').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Members</div>
          <div className="text-2xl font-bold text-gray-900">{coalitions.reduce((sum, c) => sum + c.members, 0)}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Savings</div>
          <div className="text-2xl font-bold text-emerald-600">$50,000</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Coalition List */}
        <div className="col-span-2">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search coalitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="dissolved">Dissolved</option>
              </select>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredCoalitions.map((coalition) => (
              <button
                key={coalition.id}
                onClick={() => setSelectedCoalition(coalition.id)}
                className={`w-full text-left bg-white rounded-xl border-2 p-4 transition-all ${
                  selectedCoalition === coalition.id 
                    ? 'border-emerald-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{coalition.emoji}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{coalition.name}</div>
                      <div className="text-sm text-gray-500">{coalition.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[coalition.status as keyof typeof statusColors]}`}>
                      {coalition.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs ${typeColors[coalition.type as keyof typeof typeColors]}`}>
                      {coalition.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {coalition.members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {coalition.totalSavings} saved
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {coalition.monthlyVolume}/mo
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-1">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selected.emoji}</span>
                  <div>
                    <div className="font-bold text-gray-900">{selected.name}</div>
                    <div className="text-sm text-gray-500">{selected.id}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selected.status as keyof typeof statusColors]}`}>
                    {selected.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[selected.type as keyof typeof typeColors]}`}>
                    {selected.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Members</span>
                  <span className="font-medium text-gray-900">{selected.members}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Lead Agent</span>
                  <span className="text-emerald-600">{selected.lead}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="text-gray-900">{selected.created}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-600">{selected.totalSavings}</div>
                      <div className="text-xs text-emerald-700">Total Savings</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selected.monthlyVolume}</div>
                      <div className="text-xs text-blue-700">Monthly Volume</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {selected.status === 'pending' && (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <Check className="w-4 h-4" />
                      Approve Coalition
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}

                {selected.status === 'under-review' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="bg-purple-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 text-purple-700 font-medium mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        Under Review
                      </div>
                      <p className="text-sm text-purple-600">Coalition flagged for compliance review</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                        Clear
                      </button>
                      <button className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        Dissolve
                      </button>
                    </div>
                  </div>
                )}

                {selected.status === 'active' && (
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Eye className="w-4 h-4" />
                      View Full Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Handshake className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a coalition to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
