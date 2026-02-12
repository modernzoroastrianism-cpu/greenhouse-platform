'use client'

import { useState } from 'react'
import { 
  Wallet, Search, Filter, Clock, CheckCircle, XCircle,
  Download, Calendar, DollarSign, Users, Package, AlertTriangle,
  ArrowRight, ExternalLink, RefreshCw
} from 'lucide-react'

const payoutSummary = {
  pendingTotal: 104751,
  readyToProcess: 78432,
  processingNow: 12340,
  paidThisPeriod: 234567,
  nextScheduled: '2024-02-14',
}

const payoutBatches = [
  { 
    id: 'BATCH-2024-007', 
    date: '2024-02-14',
    type: 'scheduled',
    producerCount: 45,
    commissionCount: 123,
    totalAmount: 67890,
    status: 'scheduled'
  },
  { 
    id: 'BATCH-2024-006', 
    date: '2024-02-11',
    type: 'manual',
    producerCount: 12,
    commissionCount: 34,
    totalAmount: 12340,
    status: 'processing',
    stripeTransferId: 'tr_1Ox8kJLkdIwHu7ix'
  },
  { 
    id: 'BATCH-2024-005', 
    date: '2024-02-07',
    type: 'scheduled',
    producerCount: 52,
    commissionCount: 145,
    totalAmount: 78456,
    status: 'completed',
    stripeTransferId: 'tr_1Ox7kJLkdIwHu7iy'
  },
  { 
    id: 'BATCH-2024-004', 
    date: '2024-01-31',
    type: 'scheduled',
    producerCount: 48,
    commissionCount: 134,
    totalAmount: 67234,
    status: 'completed',
    stripeTransferId: 'tr_1Ox6kJLkdIwHu7iz'
  },
]

const recentPayouts = [
  { id: 'PAY-001', recipient: 'Sarah Mitchell', type: 'producer', amount: 2847.50, batchId: 'BATCH-2024-006', status: 'processing' },
  { id: 'PAY-002', recipient: 'Robert Perry', type: 'commission', amount: 1250.00, batchId: 'BATCH-2024-006', status: 'processing' },
  { id: 'PAY-003', recipient: 'Mike Chen', type: 'producer', amount: 1234.00, batchId: 'BATCH-2024-005', status: 'completed' },
  { id: 'PAY-004', recipient: 'Jennifer Smith', type: 'commission', amount: 456.00, batchId: 'BATCH-2024-005', status: 'completed' },
  { id: 'PAY-005', recipient: 'Emily Davis', type: 'producer', amount: 567.80, batchId: 'BATCH-2024-005', status: 'completed' },
]

const failedPayouts = [
  { id: 'FAIL-001', recipient: 'John Wilson', type: 'producer', amount: 3421.00, reason: 'Invalid bank account', date: '2024-02-07' },
  { id: 'FAIL-002', recipient: 'Chris Taylor', type: 'commission', amount: 234.50, reason: 'Stripe Connect not setup', date: '2024-02-07' },
]

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-700',
  processing: 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
}

export default function PayoutsPage() {
  const [activeTab, setActiveTab] = useState<'batches' | 'individual' | 'failed'>('batches')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
          <p className="text-gray-500">Process and track all outgoing payments</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <Wallet className="w-4 h-4" />
            Run Payout Now
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Pending Total</div>
          <div className="text-2xl font-bold text-gray-900">${(payoutSummary.pendingTotal / 1000).toFixed(1)}K</div>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <div className="text-sm text-emerald-700 mb-1">Ready to Process</div>
          <div className="text-2xl font-bold text-emerald-700">${(payoutSummary.readyToProcess / 1000).toFixed(1)}K</div>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
          <div className="text-sm text-amber-700 mb-1">Processing Now</div>
          <div className="text-2xl font-bold text-amber-700">${(payoutSummary.processingNow / 1000).toFixed(1)}K</div>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <div className="text-sm text-blue-700 mb-1">Paid This Period</div>
          <div className="text-2xl font-bold text-blue-700">${(payoutSummary.paidThisPeriod / 1000).toFixed(1)}K</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Next Scheduled</div>
          <div className="text-lg font-bold text-gray-900">{payoutSummary.nextScheduled}</div>
          <div className="text-xs text-gray-400">Friday</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'batches', label: 'Payout Batches' },
          { id: 'individual', label: 'Individual Payouts' },
          { id: 'failed', label: `Failed (${failedPayouts.length})`, alert: true },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
            {tab.alert && failedPayouts.length > 0 && activeTab !== tab.id && (
              <span className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Batches Tab */}
      {activeTab === 'batches' && (
        <div className="space-y-4">
          {payoutBatches.map((batch) => (
            <div key={batch.id} className={`bg-white rounded-xl border-2 p-4 ${
              batch.status === 'processing' ? 'border-amber-300' : 'border-gray-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    batch.status === 'completed' ? 'bg-emerald-100' :
                    batch.status === 'processing' ? 'bg-amber-100' :
                    'bg-blue-100'
                  }`}>
                    {batch.status === 'completed' ? <CheckCircle className="w-6 h-6 text-emerald-600" /> :
                     batch.status === 'processing' ? <RefreshCw className="w-6 h-6 text-amber-600 animate-spin" /> :
                     <Clock className="w-6 h-6 text-blue-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{batch.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[batch.status as keyof typeof statusColors]}`}>
                        {batch.status}
                      </span>
                      {batch.type === 'manual' && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          Manual
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {batch.date} • {batch.producerCount} producers • {batch.commissionCount} commissions
                    </div>
                    {batch.stripeTransferId && (
                      <div className="text-xs text-gray-400 mt-1 font-mono">
                        Stripe: {batch.stripeTransferId}
                        <ExternalLink className="w-3 h-3 inline ml-1" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${batch.totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">
                    {batch.producerCount + batch.commissionCount} payouts
                  </div>
                </div>
              </div>
              
              {batch.status === 'scheduled' && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Scheduled for {batch.date} at 9:00 AM EST
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                      Reschedule
                    </button>
                    <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700">
                      Process Now
                    </button>
                  </div>
                </div>
              )}
              
              {batch.status === 'processing' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-600">Processing via Stripe Connect...</span>
                    <button className="text-blue-600 hover:underline">View Details</button>
                  </div>
                  <div className="h-2 bg-amber-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Individual Payouts Tab */}
      {activeTab === 'individual' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Individual Payouts</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipient..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64"
              />
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payout ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Recipient</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Batch</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayouts.map((payout) => (
                <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-500">{payout.id}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{payout.recipient}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payout.type === 'producer' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {payout.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">${payout.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{payout.batchId}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[payout.status as keyof typeof statusColors]}`}>
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Failed Tab */}
      {activeTab === 'failed' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="font-semibold text-red-900">Failed Payouts</h2>
            </div>
            <p className="text-sm text-red-700 mt-1">These payouts failed and need attention</p>
          </div>
          <div className="divide-y divide-gray-100">
            {failedPayouts.map((payout) => (
              <div key={payout.id} className="p-4 bg-red-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-700" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{payout.recipient}</div>
                      <div className="text-sm text-gray-500">{payout.type} • {payout.date}</div>
                      <div className="text-sm text-red-600 mt-1">❌ {payout.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${payout.amount.toLocaleString()}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700">
                        Retry
                      </button>
                      <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-white">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {failedPayouts.length === 0 && (
              <div className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                <div className="text-gray-500">No failed payouts 🎉</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payout Settings */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Payout Settings</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">Schedule</div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Weekly on Fridays</div>
              <div className="text-sm text-gray-500">9:00 AM EST</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-2">Minimum Payout</div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">$50.00</div>
              <div className="text-sm text-gray-500">Below this amount rolls over</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-2">Payment Method</div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Stripe Connect</div>
              <div className="text-sm text-gray-500">Direct bank transfer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
