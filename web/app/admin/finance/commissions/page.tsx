'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, DollarSign, Clock, Check, X, AlertCircle,
  Download, Filter, Search, ChevronLeft, ChevronRight, Eye
} from 'lucide-react'

// Mock data
const pendingPayouts = [
  { id: 'P-8921', member: 'John Smith', memberId: 'M-12847', amount: 1234.56, type: 'Team Commission', period: 'Feb 2024', status: 'pending', bank: '****4521' },
  { id: 'P-8920', member: 'Jane Doe', memberId: 'M-12846', amount: 892.34, type: 'Personal Sales', period: 'Feb 2024', status: 'pending', bank: '****7832' },
  { id: 'P-8919', member: 'Bob Wilson', memberId: 'M-12845', amount: 2456.78, type: 'Board Bonus', period: 'Feb 2024', status: 'pending', bank: '****2341' },
  { id: 'P-8918', member: 'Sarah Chen', memberId: 'M-12844', amount: 567.89, type: 'Leadership Pool', period: 'Feb 2024', status: 'pending', bank: '****9012' },
  { id: 'P-8917', member: 'Mike Johnson', memberId: 'M-12843', amount: 3421.00, type: 'Team Commission', period: 'Feb 2024', status: 'on-hold', bank: '****5678' },
  { id: 'P-8916', member: 'Emily Davis', memberId: 'M-12842', amount: 789.12, type: 'Personal Sales', period: 'Feb 2024', status: 'pending', bank: '****3456' },
]

const recentPayouts = [
  { id: 'P-8915', member: 'Lisa Brown', amount: 4521.34, type: 'Team Commission', date: 'Feb 10, 2024', status: 'completed' },
  { id: 'P-8914', member: 'James Wilson', amount: 1234.56, type: 'Personal Sales', date: 'Feb 10, 2024', status: 'completed' },
  { id: 'P-8913', member: 'Robert Brown', amount: 678.90, type: 'Board Bonus', date: 'Feb 9, 2024', status: 'completed' },
  { id: 'P-8912', member: 'Alice Chen', amount: 2345.67, type: 'Leadership Pool', date: 'Feb 9, 2024', status: 'completed' },
]

export default function CommissionsPage() {
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([])

  const totalPending = pendingPayouts.reduce((sum, p) => sum + p.amount, 0)
  const pendingCount = pendingPayouts.filter(p => p.status === 'pending').length

  const toggleSelect = (id: string) => {
    setSelectedPayouts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    const pendingIds = pendingPayouts.filter(p => p.status === 'pending').map(p => p.id)
    if (selectedPayouts.length === pendingIds.length) {
      setSelectedPayouts([])
    } else {
      setSelectedPayouts(pendingIds)
    }
  }

  const processSelected = () => {
    // In real app: API call to process payouts
    alert(`Processing ${selectedPayouts.length} payouts`)
    setSelectedPayouts([])
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commission Payouts</h1>
          <p className="text-gray-500">Manage and process member commissions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={processSelected}
            disabled={selectedPayouts.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            Process Selected ({selectedPayouts.length})
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Pending</div>
          <div className="text-2xl font-bold text-gray-900">${totalPending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Pending Payouts</div>
          <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">On Hold</div>
          <div className="text-2xl font-bold text-red-600">{pendingPayouts.filter(p => p.status === 'on-hold').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Paid This Month</div>
          <div className="text-2xl font-bold text-emerald-600">$523,421</div>
        </div>
      </div>

      {/* Pending Payouts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Pending Payouts</h2>
          <div className="flex items-center gap-2">
            <button onClick={toggleSelectAll} className="text-sm text-emerald-600 hover:underline">
              {selectedPayouts.length === pendingPayouts.filter(p => p.status === 'pending').length ? 'Deselect All' : 'Select All Pending'}
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left w-10"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Member</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Period</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayouts.map((payout) => (
              <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedPayouts.includes(payout.id)}
                    onChange={() => toggleSelect(payout.id)}
                    disabled={payout.status === 'on-hold'}
                    className="rounded border-gray-300 disabled:opacity-50"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{payout.member}</div>
                  <div className="text-xs text-gray-400">{payout.memberId}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{payout.type}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{payout.period}</td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900">${payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payout.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {payout.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 font-mono">{payout.bank}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded" title="View Details">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    {payout.status === 'pending' && (
                      <>
                        <button className="p-1 hover:bg-emerald-100 rounded" title="Process">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button className="p-1 hover:bg-red-100 rounded" title="Hold">
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </>
                    )}
                    {payout.status === 'on-hold' && (
                      <button className="p-1 hover:bg-emerald-100 rounded" title="Release">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Payouts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Payouts</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Member</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayouts.map((payout) => (
              <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-500">{payout.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{payout.member}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{payout.type}</td>
                <td className="px-4 py-3 font-medium text-gray-900">${payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{payout.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    {payout.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-3 border-t border-gray-200">
          <Link href="/admin/finance/revenue" className="text-sm text-emerald-600 hover:underline">
            View all payout history →
          </Link>
        </div>
      </div>
    </div>
  )
}
