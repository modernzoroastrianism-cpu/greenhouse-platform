'use client'

import { useState } from 'react'
import { 
  Receipt, Search, Filter, Clock, CheckCircle, AlertTriangle,
  User, Users, DollarSign, Calendar, TrendingUp, ChevronRight,
  Wallet, Package, RefreshCw
} from 'lucide-react'

// AP = Who WE OWE money to (producers, commissions, refunds, vendors)
const apSummary = {
  total: 104751,
  producerEarnings: 67890,
  commissions: 34521,
  refunds: 2340,
}

const agingBuckets = {
  current: 78432,    // 0-7 days
  days7_30: 18234,   // 7-30 days
  days30_60: 5521,   // 30-60 days
  days60Plus: 2564,  // 60+ days
}

const producerPayables = [
  { id: 'PROD-001', name: 'Sarah Mitchell', email: 'sarah@example.com', amount: 2847.50, orders: 23, oldest: '2024-02-05', status: 'ready' },
  { id: 'PROD-002', name: 'Mike Chen', email: 'mike@example.com', amount: 1234.00, orders: 12, oldest: '2024-02-08', status: 'ready' },
  { id: 'PROD-003', name: 'Emily Davis', email: 'emily@example.com', amount: 567.80, orders: 8, oldest: '2024-02-10', status: 'pending' },
  { id: 'PROD-004', name: 'John Wilson', email: 'john@example.com', amount: 3421.00, orders: 31, oldest: '2024-01-28', status: 'overdue' },
  { id: 'PROD-005', name: 'Lisa Anderson', email: 'lisa@example.com', amount: 892.30, orders: 7, oldest: '2024-02-09', status: 'ready' },
]

const commissionPayables = [
  { id: 'COMM-001', name: 'Robert Perry', rank: 'Cultivator', type: 'Team Bonus', amount: 1250.00, period: 'Jan 2024', status: 'approved' },
  { id: 'COMM-002', name: 'Jennifer Smith', rank: 'Farmer', type: 'Direct Sale', amount: 456.00, period: 'Feb W1', status: 'pending' },
  { id: 'COMM-003', name: 'David Brown', rank: 'Harvester', type: 'Leadership', amount: 890.00, period: 'Jan 2024', status: 'approved' },
  { id: 'COMM-004', name: 'Amanda Lee', rank: 'Grower', type: 'Rank Bonus', amount: 500.00, period: 'Feb 2024', status: 'pending' },
  { id: 'COMM-005', name: 'Chris Taylor', rank: 'Farmer', type: 'Pool Share', amount: 234.50, period: 'Jan 2024', status: 'overdue' },
]

const refundPayables = [
  { id: 'REF-001', order: 'ORD-20240205-00123', customer: 'Karen White', amount: 156.99, reason: 'Product damaged', approved: '2024-02-09' },
  { id: 'REF-002', order: 'ORD-20240201-00098', customer: 'Tom Miller', amount: 89.50, reason: 'Never received', approved: '2024-02-08' },
]

const statusColors = {
  ready: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700',
  overdue: 'bg-red-100 text-red-700',
  processing: 'bg-purple-100 text-purple-700',
}

export default function AccountsPayablePage() {
  const [activeTab, setActiveTab] = useState<'producers' | 'commissions' | 'refunds'>('producers')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleSelectAll = (items: { id: string }[]) => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(i => i.id))
    }
  }

  const handleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts Payable</h1>
          <p className="text-gray-500">Money AMNI owes • Producer earnings, commissions, refunds</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            Recalculate
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <Wallet className="w-4 h-4" />
            Process Payouts
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-4 text-white">
          <div className="text-red-100 text-sm mb-1">Total Payable</div>
          <div className="text-3xl font-bold">${(apSummary.total / 1000).toFixed(1)}K</div>
          <div className="text-red-200 text-xs mt-1">Owed to network</div>
        </div>
        <button 
          onClick={() => setActiveTab('producers')}
          className={`rounded-xl border p-4 text-left transition-colors ${activeTab === 'producers' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:border-blue-200'}`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Package className="w-4 h-4" />
            Producer Earnings
          </div>
          <div className="text-2xl font-bold text-blue-600">${(apSummary.producerEarnings / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-400 mt-1">60% of sales</div>
        </button>
        <button 
          onClick={() => setActiveTab('commissions')}
          className={`rounded-xl border p-4 text-left transition-colors ${activeTab === 'commissions' ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-gray-200 hover:border-emerald-200'}`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Users className="w-4 h-4" />
            Commissions
          </div>
          <div className="text-2xl font-bold text-emerald-600">${(apSummary.commissions / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-400 mt-1">Network bonuses</div>
        </button>
        <button 
          onClick={() => setActiveTab('refunds')}
          className={`rounded-xl border p-4 text-left transition-colors ${activeTab === 'refunds' ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-200 hover:border-amber-200'}`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <RefreshCw className="w-4 h-4" />
            Refunds
          </div>
          <div className="text-2xl font-bold text-amber-600">${(apSummary.refunds / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-400 mt-1">Approved refunds</div>
        </button>
      </div>

      {/* Aging Report */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Aging Report</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Current (0-7 days)</div>
            <div className="text-xl font-bold text-emerald-600">${(agingBuckets.current / 1000).toFixed(1)}K</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">7-30 days</div>
            <div className="text-xl font-bold text-blue-600">${(agingBuckets.days7_30 / 1000).toFixed(1)}K</div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">30-60 days</div>
            <div className="text-xl font-bold text-amber-600">${(agingBuckets.days30_60 / 1000).toFixed(1)}K</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">60+ days ⚠️</div>
            <div className="text-xl font-bold text-red-600">${(agingBuckets.days60Plus / 1000).toFixed(1)}K</div>
          </div>
        </div>
      </div>

      {/* Producer Payables */}
      {activeTab === 'producers' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Producer Earnings</h2>
              <p className="text-sm text-gray-500">60% of product sales owed to sellers</p>
            </div>
            {selectedItems.length > 0 && (
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                Pay {selectedItems.length} Selected (${producerPayables.filter(p => selectedItems.includes(p.id)).reduce((sum, p) => sum + p.amount, 0).toLocaleString()})
              </button>
            )}
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === producerPayables.length}
                    onChange={() => handleSelectAll(producerPayables)}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Producer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount Owed</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Orders</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Oldest</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {producerPayables.map((producer) => (
                <tr key={producer.id} className={`border-b border-gray-100 hover:bg-gray-50 ${producer.status === 'overdue' ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(producer.id)}
                      onChange={() => handleSelect(producer.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{producer.name}</div>
                    <div className="text-sm text-gray-500">{producer.email}</div>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900">${producer.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{producer.orders} orders</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{producer.oldest}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[producer.status as keyof typeof statusColors]}`}>
                      {producer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-emerald-600 text-sm hover:underline">Pay Now</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Commission Payables */}
      {activeTab === 'commissions' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Commission Payables</h2>
              <p className="text-sm text-gray-500">Direct sales, team bonuses, leadership, rank advancement, pool shares</p>
            </div>
            {selectedItems.length > 0 && (
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                Pay {selectedItems.length} Selected
              </button>
            )}
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === commissionPayables.length}
                    onChange={() => handleSelectAll(commissionPayables)}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Member</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Period</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commissionPayables.map((commission) => (
                <tr key={commission.id} className={`border-b border-gray-100 hover:bg-gray-50 ${commission.status === 'overdue' ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(commission.id)}
                      onChange={() => handleSelect(commission.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{commission.name}</div>
                    <div className="text-sm text-gray-500">{commission.rank}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{commission.type}</td>
                  <td className="px-4 py-3 font-bold text-gray-900">${commission.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{commission.period}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[commission.status as keyof typeof statusColors]}`}>
                      {commission.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {commission.status === 'pending' ? (
                      <button className="text-blue-600 text-sm hover:underline">Approve</button>
                    ) : commission.status === 'approved' ? (
                      <button className="text-emerald-600 text-sm hover:underline">Pay Now</button>
                    ) : (
                      <button className="text-red-600 text-sm hover:underline">Urgent</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Refunds */}
      {activeTab === 'refunds' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Approved Refunds</h2>
            <p className="text-sm text-gray-500">Refunds approved and awaiting processing</p>
          </div>
          <div className="divide-y divide-gray-100">
            {refundPayables.map((refund) => (
              <div key={refund.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{refund.customer}</div>
                    <div className="text-sm text-gray-500">{refund.order} • {refund.reason}</div>
                    <div className="text-xs text-gray-400">Approved: {refund.approved}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${refund.amount.toLocaleString()}</div>
                  </div>
                  <button className="px-3 py-1 bg-amber-600 text-white rounded text-sm hover:bg-amber-700">
                    Process Refund
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payout Schedule */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Payout Schedule</h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Producer Payouts: Weekly (Fridays)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span>Commissions: Weekly (Fridays)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span>Refunds: Daily</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
          <strong>Next payout run:</strong> Friday, Feb 14, 2024 • Estimated: ${((apSummary.producerEarnings + apSummary.commissions) * 0.6 / 1000).toFixed(1)}K
        </div>
      </div>
    </div>
  )
}
