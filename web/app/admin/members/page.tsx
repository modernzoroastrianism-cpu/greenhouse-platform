'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, Download, MoreVertical, Eye, Edit, Ban, 
  ChevronLeft, ChevronRight, Users, CheckCircle, XCircle, Clock
} from 'lucide-react'

// Mock data
const members = [
  { id: 'M-12847', name: 'John Smith', email: 'john@example.com', package: 'Micro-Farm', rank: 'Cultivator', status: 'active', joined: '2024-01-15', earnings: '$34,521', downline: 147 },
  { id: 'M-12846', name: 'Jane Doe', email: 'jane@example.com', package: 'Community Garden', rank: 'Farmer', status: 'active', joined: '2024-01-12', earnings: '$28,432', downline: 89 },
  { id: 'M-12845', name: 'Bob Wilson', email: 'bob@example.com', package: 'Backyard Starter', rank: 'Grower', status: 'active', joined: '2024-01-10', earnings: '$12,891', downline: 34 },
  { id: 'M-12844', name: 'Sarah Chen', email: 'sarah@example.com', package: 'Micro-Farm', rank: 'Harvester', status: 'active', joined: '2024-01-08', earnings: '$45,234', downline: 203 },
  { id: 'M-12843', name: 'Mike Johnson', email: 'mike@example.com', package: 'Balcony Kit', rank: 'Sprout', status: 'dormant', joined: '2024-01-05', earnings: '$2,341', downline: 8 },
  { id: 'M-12842', name: 'Emily Davis', email: 'emily@example.com', package: 'Community Garden', rank: 'Grower', status: 'active', joined: '2024-01-03', earnings: '$18,923', downline: 56 },
  { id: 'M-12841', name: 'James Wilson', email: 'james@example.com', package: 'Backyard Starter', rank: 'Seedling', status: 'suspended', joined: '2024-01-01', earnings: '$5,432', downline: 12 },
  { id: 'M-12840', name: 'Lisa Brown', email: 'lisa@example.com', package: 'Micro-Farm', rank: 'Farmer', status: 'active', joined: '2023-12-28', earnings: '$67,891', downline: 312 },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  dormant: 'bg-amber-100 text-amber-700',
  suspended: 'bg-red-100 text-red-700',
}

const rankColors = {
  Seedling: 'text-gray-600',
  Sprout: 'text-lime-600',
  Grower: 'text-green-600',
  Harvester: 'text-emerald-600',
  Farmer: 'text-teal-600',
  Cultivator: 'text-cyan-600',
}

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map(m => m.id))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-500">Manage all platform members</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link href="/admin/members/signups" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <Clock className="w-4 h-4" />
            Pending Signups (23)
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Members</div>
          <div className="text-2xl font-bold text-gray-900">12,847</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Active</div>
          <div className="text-2xl font-bold text-emerald-600">11,234</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Dormant</div>
          <div className="text-2xl font-bold text-amber-600">1,432</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Suspended</div>
          <div className="text-2xl font-bold text-red-600">181</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
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
            <option value="dormant">Dormant</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Member</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Package</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Earnings</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Downline</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Joined</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => toggleSelect(member.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-medium text-emerald-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                      <div className="text-xs text-gray-400">{member.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{member.package}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${rankColors[member.rank as keyof typeof rankColors] || 'text-gray-600'}`}>
                    {member.rank}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[member.status as keyof typeof statusColors]}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{member.earnings}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{member.downline}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{member.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/members/${member.id}`} className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Link>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1-8 of 12,847 members
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">2</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">1606</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedMembers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-4">
          <span>{selectedMembers.length} selected</span>
          <button className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm">
            Export Selected
          </button>
          <button className="px-3 py-1 bg-amber-600 rounded-lg hover:bg-amber-500 text-sm">
            Bulk Email
          </button>
          <button className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-500 text-sm">
            Suspend
          </button>
          <button onClick={() => setSelectedMembers([])} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
