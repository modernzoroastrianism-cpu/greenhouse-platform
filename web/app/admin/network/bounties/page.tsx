'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Plus, Eye, Edit, Trash2, Check, Clock, Users,
  Trophy, Target, DollarSign, Calendar
} from 'lucide-react'

// Mock data
const bounties = [
  { id: 'B-892', title: 'Optimize lettuce yield for Zone 6b', reward: 150, difficulty: 'Medium', applicants: 12, deadline: '3 days', status: 'active', created: 'Admin', tags: ['Growing', 'Optimization'] },
  { id: 'B-891', title: 'Design subscription box for 2-person household', reward: 75, difficulty: 'Easy', applicants: 28, deadline: '5 days', status: 'active', created: 'Admin', tags: ['Sales', 'Product'] },
  { id: 'B-890', title: 'Analyze market trends for specialty herbs', reward: 200, difficulty: 'Hard', applicants: 8, deadline: '7 days', status: 'active', created: 'Community', tags: ['Analytics', 'Research'] },
  { id: 'B-889', title: 'Create onboarding guide for new growers', reward: 100, difficulty: 'Medium', applicants: 15, deadline: '4 days', status: 'active', created: 'Admin', tags: ['Mentor', 'Documentation'] },
  { id: 'B-888', title: 'Build pest identification database', reward: 300, difficulty: 'Hard', applicants: 5, deadline: '14 days', status: 'active', created: 'Admin', tags: ['Growing', 'Data'] },
  { id: 'B-887', title: 'Survey customer preferences Q1', reward: 50, difficulty: 'Easy', applicants: 45, deadline: 'Completed', status: 'completed', created: 'Admin', tags: ['Analytics'] },
  { id: 'B-886', title: 'Develop delivery route optimizer', reward: 250, difficulty: 'Hard', applicants: 3, deadline: 'Expired', status: 'expired', created: 'Community', tags: ['Logistics'] },
]

const difficultyColors = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
}

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-blue-100 text-blue-700',
  expired: 'bg-gray-100 text-gray-600',
}

export default function BountiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredBounties = bounties.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bounty Management</h1>
          <p className="text-gray-500">Create and manage network bounties</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4" />
          Create Bounty
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Active Bounties</div>
          <div className="text-2xl font-bold text-emerald-600">{bounties.filter(b => b.status === 'active').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Applicants</div>
          <div className="text-2xl font-bold text-gray-900">{bounties.reduce((sum, b) => sum + b.applicants, 0)}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Rewards</div>
          <div className="text-2xl font-bold text-amber-600">{bounties.filter(b => b.status === 'active').reduce((sum, b) => sum + b.reward, 0)} credits</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Completed This Month</div>
          <div className="text-2xl font-bold text-blue-600">34</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bounties..."
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
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bounty</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Reward</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Difficulty</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Applicants</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Deadline</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBounties.map((bounty) => (
              <tr key={bounty.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{bounty.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{bounty.id}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{bounty.created}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {bounty.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 font-bold text-amber-600">
                    <Trophy className="w-4 h-4" />
                    {bounty.reward}
                  </div>
                  <div className="text-xs text-gray-400">credits</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[bounty.difficulty as keyof typeof difficultyColors]}`}>
                    {bounty.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Users className="w-4 h-4 text-gray-400" />
                    {bounty.applicants}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {bounty.deadline}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[bounty.status as keyof typeof statusColors]}`}>
                    {bounty.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded" title="View Details">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    {bounty.status === 'active' && (
                      <>
                        <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-emerald-100 rounded" title="Mark Complete">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Bounty</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Describe the task..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Detailed requirements..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reward (credits)</label>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  placeholder="Growing, Analytics, Sales..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Create Bounty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
