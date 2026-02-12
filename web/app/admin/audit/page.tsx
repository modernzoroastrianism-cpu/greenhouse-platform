'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  History, Search, Filter, Download, User, Settings, Users,
  ShoppingBag, DollarSign, FileText, Shield, ChevronLeft, ChevronRight
} from 'lucide-react'

interface AuditLog {
  id: string
  admin_id: string | null
  admin_email: string | null
  action: string
  resource_type: string
  resource_id: string | null
  description: string | null
  old_values: any
  new_values: any
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

const actionColors: Record<string, string> = {
  create: 'bg-emerald-100 text-emerald-700',
  update: 'bg-blue-100 text-blue-700',
  delete: 'bg-red-100 text-red-700',
  approve: 'bg-green-100 text-green-700',
  reject: 'bg-orange-100 text-orange-700',
  suspend: 'bg-red-100 text-red-700',
  login: 'bg-gray-100 text-gray-700',
}

const resourceIcons: Record<string, React.ReactNode> = {
  member: <Users className="w-4 h-4" />,
  agent: <User className="w-4 h-4" />,
  order: <ShoppingBag className="w-4 h-4" />,
  commission: <DollarSign className="w-4 h-4" />,
  product: <ShoppingBag className="w-4 h-4" />,
  settings: <Settings className="w-4 h-4" />,
  admin: <Shield className="w-4 h-4" />,
}

// Mock data for now (will be replaced with real Supabase data)
const mockLogs: AuditLog[] = [
  {
    id: '1',
    admin_id: '123',
    admin_email: 'admin@amni.farm',
    action: 'approve',
    resource_type: 'member',
    resource_id: '456',
    description: 'Approved member signup for john@example.com',
    old_values: { status: 'pending' },
    new_values: { status: 'active' },
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0...',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    admin_id: '123',
    admin_email: 'admin@amni.farm',
    action: 'update',
    resource_type: 'settings',
    resource_id: null,
    description: 'Updated compensation rates',
    old_values: { acquisition: 15, producer: 60 },
    new_values: { acquisition: 18, producer: 57 },
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0...',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    admin_id: '123',
    admin_email: 'admin@amni.farm',
    action: 'suspend',
    resource_type: 'agent',
    resource_id: '789',
    description: 'Suspended agent AG-4521 for spam',
    old_values: { status: 'active' },
    new_values: { status: 'suspended' },
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0...',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    admin_id: '123',
    admin_email: 'admin@amni.farm',
    action: 'create',
    resource_type: 'product',
    resource_id: '101',
    description: 'Created new product: Heirloom Tomato Seeds',
    old_values: null,
    new_values: { name: 'Heirloom Tomato Seeds', price: 12.99 },
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0...',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '5',
    admin_id: '123',
    admin_email: 'admin@amni.farm',
    action: 'login',
    resource_type: 'admin',
    resource_id: '123',
    description: 'Admin login successful',
    old_values: null,
    new_values: null,
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0...',
    created_at: new Date(Date.now() - 90000000).toISOString(),
  },
]

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>(mockLogs)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [resourceFilter, setResourceFilter] = useState('all')
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)

  // In production, fetch from Supabase
  // useEffect(() => {
  //   const fetchLogs = async () => {
  //     setLoading(true)
  //     const supabase = createClient()
  //     const { data, error } = await supabase
  //       .from('audit_logs')
  //       .select('*')
  //       .order('created_at', { ascending: false })
  //       .limit(100)
  //     if (data) setLogs(data)
  //     setLoading(false)
  //   }
  //   fetchLogs()
  // }, [])

  const filteredLogs = logs.filter(log => {
    if (actionFilter !== 'all' && log.action !== actionFilter) return false
    if (resourceFilter !== 'all' && log.resource_type !== resourceFilter) return false
    if (searchQuery && !log.description?.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-500">Track all admin actions and changes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="all">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
            <option value="suspend">Suspend</option>
            <option value="login">Login</option>
          </select>
          <select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="all">All Resources</option>
            <option value="member">Members</option>
            <option value="agent">Agents</option>
            <option value="order">Orders</option>
            <option value="commission">Commissions</option>
            <option value="product">Products</option>
            <option value="settings">Settings</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Log List */}
        <div className="col-span-2 space-y-3">
          {filteredLogs.map((log) => (
            <button
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className={`w-full text-left bg-white rounded-xl border-2 p-4 transition-all ${
                selectedLog?.id === log.id ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {resourceIcons[log.resource_type] || <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{log.description}</div>
                    <div className="text-sm text-gray-500">
                      by {log.admin_email} • {formatDate(log.created_at)}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-700'}`}>
                  {log.action}
                </span>
              </div>
            </button>
          ))}

          {filteredLogs.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">No audit logs found</div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-gray-500">
              Showing {filteredLogs.length} of {logs.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">2</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">3</button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-1">
          {selectedLog ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${actionColors[selectedLog.action] || 'bg-gray-100 text-gray-700'}`}>
                  {selectedLog.action}
                </span>
                <span className="text-sm text-gray-500">{selectedLog.resource_type}</span>
              </div>

              <h3 className="font-bold text-gray-900 mb-4">{selectedLog.description}</h3>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Performed By</div>
                  <div className="font-medium">{selectedLog.admin_email}</div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">Timestamp</div>
                  <div className="font-medium">{new Date(selectedLog.created_at).toLocaleString()}</div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">IP Address</div>
                  <div className="font-mono text-xs">{selectedLog.ip_address || 'N/A'}</div>
                </div>

                {selectedLog.resource_id && (
                  <div>
                    <div className="text-gray-500 mb-1">Resource ID</div>
                    <div className="font-mono text-xs">{selectedLog.resource_id}</div>
                  </div>
                )}

                {selectedLog.old_values && (
                  <div>
                    <div className="text-gray-500 mb-1">Previous Values</div>
                    <pre className="bg-red-50 text-red-700 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(selectedLog.old_values, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog.new_values && (
                  <div>
                    <div className="text-gray-500 mb-1">New Values</div>
                    <pre className="bg-green-50 text-green-700 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(selectedLog.new_values, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a log entry to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
