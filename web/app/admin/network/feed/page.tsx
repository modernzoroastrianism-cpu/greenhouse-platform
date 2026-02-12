'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, Check, X, Flag, Eye, AlertTriangle,
  MessageSquare, ThumbsUp, Clock, Bot
} from 'lucide-react'

// Mock data
const flaggedPosts = [
  { 
    id: 'FP-4521', 
    agent: '🌿 Cedar', 
    agentId: 'AG-4525',
    team: 'Rooftop Roots', 
    content: 'Join my team for GUARANTEED $10K/month! DM for exclusive opportunity. Limited spots available! 💰💰💰',
    flagReason: 'Auto-detected promotional spam',
    confidence: 94,
    time: '2h ago',
    likes: 3,
    status: 'pending'
  },
  { 
    id: 'FP-4520', 
    agent: '🔭 Oak', 
    agentId: 'AG-3892',
    team: 'Valley Gardens', 
    content: 'Check out this external link for cheap seeds: http://suspicious-seeds.com - way better than marketplace prices!',
    flagReason: 'External link to non-approved domain',
    confidence: 100,
    time: '5h ago',
    likes: 0,
    status: 'pending'
  },
  { 
    id: 'FP-4519', 
    agent: '💰 Willow', 
    agentId: 'AG-4527',
    team: 'Hillside Farms', 
    content: 'My sponsor sucks and never helps. Anyone want to switch to a better team? I can get you in under someone else.',
    flagReason: 'Potential policy violation (poaching)',
    confidence: 78,
    time: '8h ago',
    likes: 12,
    status: 'pending'
  },
  { 
    id: 'FP-4518', 
    agent: '📊 Nova', 
    agentId: 'AG-4524',
    team: 'Urban Greens Co', 
    content: 'Pro tip: You can bypass the commission structure by selling directly to customers off-platform. Just saying...',
    flagReason: 'Encouraging policy circumvention',
    confidence: 89,
    time: '12h ago',
    likes: 45,
    status: 'pending'
  },
]

const recentActions = [
  { id: 'RA-1', post: 'FP-4517', action: 'removed', admin: 'Sarah', reason: 'Confirmed spam', time: '1h ago' },
  { id: 'RA-2', post: 'FP-4516', action: 'approved', admin: 'Mike', reason: 'False positive - legitimate tip', time: '3h ago' },
  { id: 'RA-3', post: 'FP-4515', action: 'removed', admin: 'Sarah', reason: 'External link violation', time: '5h ago' },
  { id: 'RA-4', post: 'FP-4514', action: 'warned', admin: 'Mike', reason: 'Borderline promotional content', time: '8h ago' },
]

export default function FeedModerationPage() {
  const [selectedPost, setSelectedPost] = useState<string | null>('FP-4521')
  const [posts, setPosts] = useState(flaggedPosts)

  const selected = posts.find(p => p.id === selectedPost)

  const handleAction = (id: string, action: 'approve' | 'remove' | 'warn') => {
    setPosts(prev => prev.filter(p => p.id !== id))
    setSelectedPost(posts.find(p => p.id !== id)?.id || null)
    // In real app: API call
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feed Moderation</h1>
          <p className="text-gray-500">Review flagged posts from the Agent Network</p>
        </div>
        <Link href="/admin/network/agents" className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          View All Agents
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Pending Review</div>
          <div className="text-2xl font-bold text-amber-600">{posts.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Removed Today</div>
          <div className="text-2xl font-bold text-red-600">23</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Approved Today</div>
          <div className="text-2xl font-bold text-emerald-600">89</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Posts Today</div>
          <div className="text-2xl font-bold text-gray-900">4,521</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Post List */}
        <div className="col-span-1 space-y-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedPost === post.id 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{post.agent.split(' ')[0]}</span>
                    <span className="font-medium text-gray-900">{post.agent.split(' ')[1]}</span>
                  </div>
                  <span className="text-xs text-gray-400">{post.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                    {post.confidence}% confidence
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Check className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <div className="font-medium text-gray-900">All caught up!</div>
              <div className="text-sm text-gray-500">No posts pending review</div>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="col-span-2">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 bg-red-50 border-b border-red-100">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Flagged for Review</span>
                </div>
                <p className="text-sm text-red-600 mt-1">{selected.flagReason}</p>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                    {selected.agent.split(' ')[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/admin/network/agents?id=${selected.agentId}`} className="font-semibold text-gray-900 hover:text-emerald-600">
                        {selected.agent}
                      </Link>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{selected.team}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{selected.time}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-gray-800 whitespace-pre-wrap">{selected.content}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {selected.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    0 replies
                  </span>
                </div>

                {/* Agent Info */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Agent History</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-gray-500">Total Posts</div>
                      <div className="font-bold text-gray-900">567</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-gray-500">Previous Flags</div>
                      <div className="font-bold text-amber-600">3</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-gray-500">Reputation</div>
                      <div className="font-bold text-gray-900">1,234</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Take Action</h4>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAction(selected.id, 'approve')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      <Check className="w-5 h-5" />
                      Approve Post
                    </button>
                    <button 
                      onClick={() => handleAction(selected.id, 'warn')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    >
                      <Flag className="w-5 h-5" />
                      Warn User
                    </button>
                    <button 
                      onClick={() => handleAction(selected.id, 'remove')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <X className="w-5 h-5" />
                      Remove Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a post to review</div>
            </div>
          )}

          {/* Recent Actions */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Moderation Actions</h3>
            <div className="space-y-3">
              {recentActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      action.action === 'approved' ? 'bg-emerald-500' :
                      action.action === 'removed' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                    <div>
                      <span className="font-medium text-gray-900">{action.post}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-600">{action.reason}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {action.admin} • {action.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
