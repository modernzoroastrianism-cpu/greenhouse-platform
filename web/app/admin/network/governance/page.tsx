'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Plus, Eye, Check, X, Edit, Vote, Clock,
  ThumbsUp, ThumbsDown, AlertTriangle, Shield, Users
} from 'lucide-react'

// Mock data
const proposals = [
  { 
    id: 'GOV-23', 
    title: 'Add reputation decay for inactive agents',
    description: 'Agents inactive for 30+ days should lose 5% reputation per month to encourage active participation.',
    author: 'Community',
    votesFor: 234,
    votesAgainst: 89,
    status: 'voting',
    created: '2024-02-08',
    ends: '2 days',
    category: 'Network Rules'
  },
  { 
    id: 'GOV-22', 
    title: 'Increase bounty minimum reward to 50 credits',
    description: 'Current minimum of 25 credits attracts low-quality bounties. Raising to 50 will improve quality.',
    author: 'Admin',
    votesFor: 567,
    votesAgainst: 123,
    status: 'voting',
    created: '2024-02-05',
    ends: '4 days',
    category: 'Bounties'
  },
  { 
    id: 'GOV-21', 
    title: 'Create mentorship matching algorithm',
    description: 'AI-powered matching between experienced growers and newcomers based on growing conditions and goals.',
    author: 'Admin',
    votesFor: 892,
    votesAgainst: 45,
    status: 'passed',
    created: '2024-01-28',
    ends: 'Implemented',
    category: 'Features'
  },
  { 
    id: 'GOV-20', 
    title: 'Allow agents to vote on behalf of humans',
    description: 'Enable delegation of voting rights to AI agents for routine decisions.',
    author: 'Community',
    votesFor: 156,
    votesAgainst: 489,
    status: 'rejected',
    created: '2024-01-20',
    ends: 'Rejected',
    category: 'Governance'
  },
  { 
    id: 'GOV-19', 
    title: 'Add geographic restrictions for coalitions',
    description: 'Limit coalition membership to members within same region for logistics efficiency.',
    author: 'Community',
    votesFor: 312,
    votesAgainst: 287,
    status: 'voting',
    created: '2024-02-10',
    ends: '6 days',
    category: 'Coalitions'
  },
  { 
    id: 'GOV-18', 
    title: 'Implement weekly production reporting',
    description: 'Require all active growers to submit weekly production reports for network analytics.',
    author: 'Admin',
    votesFor: 445,
    votesAgainst: 234,
    status: 'passed',
    created: '2024-01-15',
    ends: 'Implemented',
    category: 'Reporting'
  },
]

const statusColors = {
  voting: 'bg-blue-100 text-blue-700',
  passed: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  pending: 'bg-amber-100 text-amber-700',
}

const categoryColors = {
  'Network Rules': 'bg-purple-100 text-purple-700',
  'Bounties': 'bg-orange-100 text-orange-700',
  'Features': 'bg-cyan-100 text-cyan-700',
  'Governance': 'bg-pink-100 text-pink-700',
  'Coalitions': 'bg-green-100 text-green-700',
  'Reporting': 'bg-indigo-100 text-indigo-700',
}

export default function GovernancePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const selected = proposals.find(p => p.id === selectedProposal)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Governance</h1>
          <p className="text-gray-500">Manage network proposals and voting</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4" />
          Create Proposal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Active Votes</div>
          <div className="text-2xl font-bold text-blue-600">{proposals.filter(p => p.status === 'voting').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Proposals</div>
          <div className="text-2xl font-bold text-gray-900">{proposals.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Passed</div>
          <div className="text-2xl font-bold text-emerald-600">{proposals.filter(p => p.status === 'passed').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Participation Rate</div>
          <div className="text-2xl font-bold text-purple-600">67%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Proposal List */}
        <div className="col-span-2">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search proposals..."
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
                <option value="voting">Voting</option>
                <option value="passed">Passed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredProposals.map((proposal) => {
              const totalVotes = proposal.votesFor + proposal.votesAgainst
              const forPercent = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0
              
              return (
                <button
                  key={proposal.id}
                  onClick={() => setSelectedProposal(proposal.id)}
                  className={`w-full text-left bg-white rounded-xl border-2 p-4 transition-all ${
                    selectedProposal === proposal.id 
                      ? 'border-emerald-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{proposal.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[proposal.category as keyof typeof categoryColors]}`}>
                        {proposal.category}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[proposal.status as keyof typeof statusColors]}`}>
                      {proposal.status}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                  
                  {/* Vote Bar */}
                  <div className="mb-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${forPercent}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-emerald-600">
                        <ThumbsUp className="w-4 h-4" />
                        {proposal.votesFor}
                      </span>
                      <span className="flex items-center gap-1 text-red-500">
                        <ThumbsDown className="w-4 h-4" />
                        {proposal.votesAgainst}
                      </span>
                    </div>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {proposal.ends}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-1">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{selected.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selected.status as keyof typeof statusColors]}`}>
                    {selected.status}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900">{selected.title}</h3>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Description</div>
                  <p className="text-gray-700 text-sm">{selected.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Author</div>
                    <span className="text-gray-900">{selected.author}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Category</div>
                    <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[selected.category as keyof typeof categoryColors]}`}>
                      {selected.category}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Created</div>
                    <span className="text-gray-900">{selected.created}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Ends</div>
                    <span className="text-gray-900">{selected.ends}</span>
                  </div>
                </div>

                {/* Vote Results */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-3">Vote Results</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        For
                      </span>
                      <span className="font-bold text-emerald-600">{selected.votesFor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-500 flex items-center gap-1">
                        <ThumbsDown className="w-4 h-4" />
                        Against
                      </span>
                      <span className="font-bold text-red-500">{selected.votesAgainst}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500"
                        style={{ width: `${(selected.votesFor / (selected.votesFor + selected.votesAgainst)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                {selected.status === 'voting' && (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <div className="text-sm font-medium text-gray-700 mb-2">Admin Actions</div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <Check className="w-4 h-4" />
                      Force Pass
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <X className="w-4 h-4" />
                      Force Reject
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Clock className="w-4 h-4" />
                      Extend Voting
                    </button>
                  </div>
                )}

                {selected.status === 'passed' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-emerald-700 font-medium">
                        <Check className="w-4 h-4" />
                        Implemented
                      </div>
                      <p className="text-sm text-emerald-600 mt-1">This proposal has been implemented in the network.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Vote className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a proposal to view details</div>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Proposal</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Proposal title..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Detailed description..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="Network Rules">Network Rules</option>
                    <option value="Bounties">Bounties</option>
                    <option value="Features">Features</option>
                    <option value="Governance">Governance</option>
                    <option value="Coalitions">Coalitions</option>
                    <option value="Reporting">Reporting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voting Duration</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>
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
                Create Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
