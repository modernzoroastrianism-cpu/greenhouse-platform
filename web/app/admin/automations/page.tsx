'use client'

import { useState } from 'react'
import { 
  Zap, Play, Pause, RefreshCw, Clock, CheckCircle, XCircle,
  AlertTriangle, Settings, ExternalLink, Plus, Search, Filter,
  Activity, DollarSign, Users, ShoppingBag, Globe, Bot, Webhook,
  Calendar, Mail, MessageSquare, FileText, TrendingUp
} from 'lucide-react'

// Workflow categories
const categories = [
  { id: 'all', name: 'All Workflows', icon: <Zap className="w-4 h-4" /> },
  { id: 'finance', name: 'Finance', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'members', name: 'Members', icon: <Users className="w-4 h-4" /> },
  { id: 'marketplace', name: 'Marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'network', name: 'Network', icon: <Globe className="w-4 h-4" /> },
  { id: 'agents', name: 'AI Agents', icon: <Bot className="w-4 h-4" /> },
]

// Mock workflows
const workflows = [
  {
    id: 'wf-001',
    name: 'Daily Reconciliation',
    description: 'Match Stripe payments → Orders → Payouts, flag discrepancies',
    category: 'finance',
    trigger: 'schedule',
    schedule: 'Every 6 hours',
    status: 'active',
    lastRun: '2024-02-11T20:00:00Z',
    lastStatus: 'success',
    runCount: 1247,
    avgDuration: '45s',
    n8nWorkflowId: 'abc123',
  },
  {
    id: 'wf-002',
    name: 'Weekly Payout Batch',
    description: 'Process AP payouts via Stripe Connect every Friday',
    category: 'finance',
    trigger: 'schedule',
    schedule: 'Fridays 9:00 AM',
    status: 'active',
    lastRun: '2024-02-09T14:00:00Z',
    lastStatus: 'success',
    runCount: 52,
    avgDuration: '3m 12s',
    n8nWorkflowId: 'def456',
  },
  {
    id: 'wf-003',
    name: 'Chargeback Alert',
    description: 'Notify admin immediately when Stripe dispute opened',
    category: 'finance',
    trigger: 'webhook',
    webhookEvent: 'charge.dispute.created',
    status: 'active',
    lastRun: '2024-02-10T15:32:00Z',
    lastStatus: 'success',
    runCount: 8,
    avgDuration: '2s',
    n8nWorkflowId: 'ghi789',
  },
  {
    id: 'wf-004',
    name: 'Signup Onboarding',
    description: 'When signup approved → create member, assign sponsor, init agents',
    category: 'members',
    trigger: 'webhook',
    webhookEvent: 'signup.approved',
    status: 'active',
    lastRun: '2024-02-11T18:45:00Z',
    lastStatus: 'success',
    runCount: 234,
    avgDuration: '8s',
    n8nWorkflowId: 'jkl012',
  },
  {
    id: 'wf-005',
    name: 'Order → Producer Notification',
    description: 'Notify producer via WhatsApp/Telegram when new order placed',
    category: 'marketplace',
    trigger: 'webhook',
    webhookEvent: 'order.created',
    status: 'active',
    lastRun: '2024-02-11T21:15:00Z',
    lastStatus: 'success',
    runCount: 3421,
    avgDuration: '3s',
    n8nWorkflowId: 'mno345',
  },
  {
    id: 'wf-006',
    name: 'Post Moderation',
    description: 'Auto-flag posts with external links, spam patterns, or violations',
    category: 'network',
    trigger: 'webhook',
    webhookEvent: 'post.created',
    status: 'active',
    lastRun: '2024-02-11T21:30:00Z',
    lastStatus: 'success',
    runCount: 8934,
    avgDuration: '1s',
    n8nWorkflowId: 'pqr678',
  },
  {
    id: 'wf-007',
    name: 'Commission Calculator',
    description: 'Calculate pending commissions from completed orders',
    category: 'finance',
    trigger: 'schedule',
    schedule: 'Hourly',
    status: 'active',
    lastRun: '2024-02-11T21:00:00Z',
    lastStatus: 'success',
    runCount: 2456,
    avgDuration: '1m 30s',
    n8nWorkflowId: 'stu901',
  },
  {
    id: 'wf-008',
    name: 'Aging Alert',
    description: 'Flag AP items overdue >30 days, notify finance team',
    category: 'finance',
    trigger: 'schedule',
    schedule: 'Daily 8:00 AM',
    status: 'active',
    lastRun: '2024-02-11T13:00:00Z',
    lastStatus: 'warning',
    runCount: 89,
    avgDuration: '15s',
    n8nWorkflowId: 'vwx234',
  },
  {
    id: 'wf-009',
    name: 'Property Scout',
    description: 'Monitor property listings, score opportunities, create scouted entries',
    category: 'agents',
    trigger: 'schedule',
    schedule: 'Every 4 hours',
    status: 'paused',
    lastRun: '2024-02-10T12:00:00Z',
    lastStatus: 'success',
    runCount: 156,
    avgDuration: '2m 45s',
    n8nWorkflowId: 'yza567',
  },
  {
    id: 'wf-010',
    name: 'Re-engagement Campaign',
    description: 'Detect inactive members (>30 days), send personalized nudges',
    category: 'members',
    trigger: 'schedule',
    schedule: 'Weekly (Mondays)',
    status: 'paused',
    lastRun: '2024-02-05T09:00:00Z',
    lastStatus: 'success',
    runCount: 12,
    avgDuration: '5m 20s',
    n8nWorkflowId: 'bcd890',
  },
  {
    id: 'wf-011',
    name: 'Review Moderator',
    description: 'Sentiment analysis on new reviews, auto-approve or flag',
    category: 'marketplace',
    trigger: 'webhook',
    webhookEvent: 'review.created',
    status: 'active',
    lastRun: '2024-02-11T19:45:00Z',
    lastStatus: 'success',
    runCount: 567,
    avgDuration: '2s',
    n8nWorkflowId: 'efg123',
  },
  {
    id: 'wf-012',
    name: 'Rank Calculator',
    description: 'Monthly rank recalculation based on PV/GV, trigger advancement bonuses',
    category: 'members',
    trigger: 'schedule',
    schedule: '1st of month',
    status: 'active',
    lastRun: '2024-02-01T00:05:00Z',
    lastStatus: 'success',
    runCount: 24,
    avgDuration: '12m 30s',
    n8nWorkflowId: 'hij456',
  },
]

const recentExecutions = [
  { workflowId: 'wf-005', name: 'Order → Producer Notification', time: '2 min ago', status: 'success', duration: '2.8s' },
  { workflowId: 'wf-006', name: 'Post Moderation', time: '5 min ago', status: 'success', duration: '0.9s' },
  { workflowId: 'wf-007', name: 'Commission Calculator', time: '12 min ago', status: 'success', duration: '1m 28s' },
  { workflowId: 'wf-001', name: 'Daily Reconciliation', time: '45 min ago', status: 'success', duration: '43s' },
  { workflowId: 'wf-008', name: 'Aging Alert', time: '1 hour ago', status: 'warning', duration: '14s' },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-gray-100 text-gray-600',
  error: 'bg-red-100 text-red-700',
}

const runStatusColors = {
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  error: 'text-red-600',
}

const triggerIcons = {
  schedule: <Clock className="w-4 h-4" />,
  webhook: <Webhook className="w-4 h-4" />,
  manual: <Play className="w-4 h-4" />,
}

export default function AutomationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)

  const filteredWorkflows = workflows.filter(wf => {
    if (selectedCategory !== 'all' && wf.category !== selectedCategory) return false
    if (searchQuery && !wf.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const selected = workflows.find(wf => wf.id === selectedWorkflow)

  const activeCount = workflows.filter(wf => wf.status === 'active').length
  const pausedCount = workflows.filter(wf => wf.status === 'paused').length
  const totalRuns = workflows.reduce((sum, wf) => sum + wf.runCount, 0)

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
    return d.toLocaleDateString()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
          <p className="text-gray-500">n8n workflow management • Triggers, schedules, and AI agents</p>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href="https://n8n.example.com" 
            target="_blank" 
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <ExternalLink className="w-4 h-4" />
            Open n8n
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <Plus className="w-4 h-4" />
            New Workflow
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Total Workflows</div>
          <div className="text-3xl font-bold text-gray-900">{workflows.length}</div>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center gap-2 text-sm text-emerald-700 mb-1">
            <Activity className="w-4 h-4" />
            Active
          </div>
          <div className="text-3xl font-bold text-emerald-700">{activeCount}</div>
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Pause className="w-4 h-4" />
            Paused
          </div>
          <div className="text-3xl font-bold text-gray-600">{pausedCount}</div>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <div className="text-sm text-blue-700 mb-1">Total Executions</div>
          <div className="text-3xl font-bold text-blue-700">{totalRuns.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
            <div className="p-3 border-b border-gray-200 font-medium text-gray-700">Categories</div>
            <div className="divide-y divide-gray-100">
              {categories.map((cat) => {
                const count = cat.id === 'all' 
                  ? workflows.length 
                  : workflows.filter(wf => wf.category === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm ${
                      selectedCategory === cat.id 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-gray-400">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Recent Executions */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 font-medium text-gray-700">Recent Runs</div>
            <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {recentExecutions.map((exec, i) => (
                <div key={i} className="px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate" style={{ maxWidth: '140px' }}>
                      {exec.name}
                    </span>
                    {exec.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : exec.status === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{exec.time} • {exec.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main - Workflow List */}
        <div className="col-span-2">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Workflow List */}
          <div className="space-y-3">
            {filteredWorkflows.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => setSelectedWorkflow(workflow.id)}
                className={`w-full text-left bg-white rounded-xl border-2 p-4 transition-all ${
                  selectedWorkflow === workflow.id 
                    ? 'border-emerald-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      workflow.status === 'active' ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      <Zap className={`w-5 h-5 ${
                        workflow.status === 'active' ? 'text-emerald-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{workflow.name}</div>
                      <div className="text-sm text-gray-500">{workflow.description}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[workflow.status as keyof typeof statusColors]}`}>
                    {workflow.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    {triggerIcons[workflow.trigger as keyof typeof triggerIcons]}
                    {workflow.trigger === 'schedule' ? workflow.schedule : workflow.webhookEvent}
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-4 h-4" />
                    {workflow.runCount.toLocaleString()} runs
                  </span>
                  <span className={`flex items-center gap-1 ${runStatusColors[workflow.lastStatus as keyof typeof runStatusColors]}`}>
                    {workflow.lastStatus === 'success' ? <CheckCircle className="w-4 h-4" /> :
                     workflow.lastStatus === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                     <XCircle className="w-4 h-4" />}
                    {formatDate(workflow.lastRun)}
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
              <div className={`h-2 ${selected.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selected.status as keyof typeof statusColors]}`}>
                    {selected.status}
                  </span>
                  <span className="text-xs text-gray-400">{selected.id}</span>
                </div>
                
                <h3 className="font-bold text-gray-900 text-lg mb-1">{selected.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{selected.description}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium capitalize">{selected.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Trigger</span>
                    <span className="font-medium flex items-center gap-1">
                      {triggerIcons[selected.trigger as keyof typeof triggerIcons]}
                      {selected.trigger}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Schedule</span>
                    <span className="font-medium">{selected.schedule || selected.webhookEvent}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Total Runs</span>
                    <span className="font-medium">{selected.runCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Avg Duration</span>
                    <span className="font-medium">{selected.avgDuration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Last Run</span>
                    <span className={`font-medium flex items-center gap-1 ${runStatusColors[selected.lastStatus as keyof typeof runStatusColors]}`}>
                      {selected.lastStatus === 'success' ? <CheckCircle className="w-4 h-4" /> :
                       selected.lastStatus === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                       <XCircle className="w-4 h-4" />}
                      {formatDate(selected.lastRun)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                    <Play className="w-4 h-4" />
                    Run Now
                  </button>
                  
                  {selected.status === 'active' ? (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Pause className="w-4 h-4" />
                      Pause Workflow
                    </button>
                  ) : (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50">
                      <Play className="w-4 h-4" />
                      Activate Workflow
                    </button>
                  )}
                  
                  <a 
                    href={`https://n8n.example.com/workflow/${selected.n8nWorkflowId}`}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Edit in n8n
                  </a>
                </div>

                {/* Webhook URL */}
                {selected.trigger === 'webhook' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Webhook URL</div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-100 px-2 py-1 rounded text-xs truncate">
                        https://n8n.amni.farm/webhook/{selected.n8nWorkflowId}
                      </code>
                      <button className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a workflow to view details</div>
            </div>
          )}
        </div>
      </div>

      {/* Available Integrations */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Available Triggers & Actions</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 font-medium text-gray-900 mb-2">
              <Clock className="w-4 h-4" />
              Schedule Triggers
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Hourly / Daily / Weekly</li>
              <li>• Custom cron expressions</li>
              <li>• One-time scheduled</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 font-medium text-gray-900 mb-2">
              <Webhook className="w-4 h-4" />
              Webhook Events
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• order.created/updated</li>
              <li>• signup.approved</li>
              <li>• post.created/flagged</li>
              <li>• charge.dispute.created</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 font-medium text-gray-900 mb-2">
              <MessageSquare className="w-4 h-4" />
              Notifications
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Telegram messages</li>
              <li>• WhatsApp (Evolution)</li>
              <li>• Email (Gmail/SMTP)</li>
              <li>• Admin alerts</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 font-medium text-gray-900 mb-2">
              <Bot className="w-4 h-4" />
              AI Agents
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Claude (Haiku/Sonnet/Opus)</li>
              <li>• Gemini (Flash/Pro)</li>
              <li>• Research agent</li>
              <li>• Document manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
