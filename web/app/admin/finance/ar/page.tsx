'use client'

import { useState } from 'react'
import { 
  CreditCard, Search, Filter, AlertTriangle, Clock, XCircle,
  CheckCircle, RefreshCw, ChevronRight, DollarSign, Calendar,
  FileText, User, ExternalLink
} from 'lucide-react'

// AR = Who owes US money (pending payments, failed charges, disputes)
const arSummary = {
  total: 48018,
  pending: 32456, // Stripe settling
  failed: 8762,   // Failed payment retries
  disputes: 6800, // Chargebacks
}

const pendingPayments = [
  { id: 'PAY-001', order: 'ORD-20240211-00234', customer: 'John Smith', amount: 156.99, date: '2024-02-11', settles: '2024-02-13', status: 'settling' },
  { id: 'PAY-002', order: 'ORD-20240211-00233', customer: 'Sarah Johnson', amount: 89.50, date: '2024-02-11', settles: '2024-02-13', status: 'settling' },
  { id: 'PAY-003', order: 'ORD-20240210-00221', customer: 'Mike Chen', amount: 9999.00, date: '2024-02-10', settles: '2024-02-14', status: 'settling' },
  { id: 'PAY-004', order: 'ORD-20240210-00218', customer: 'Emily Davis', amount: 234.00, date: '2024-02-10', settles: '2024-02-12', status: 'settling' },
]

const failedPayments = [
  { id: 'FAIL-001', order: 'ORD-20240209-00198', customer: 'Robert Wilson', amount: 567.00, date: '2024-02-09', reason: 'Card declined', retries: 2, maxRetries: 3 },
  { id: 'FAIL-002', order: 'ORD-20240208-00187', customer: 'Lisa Anderson', amount: 1299.00, date: '2024-02-08', reason: 'Insufficient funds', retries: 3, maxRetries: 3 },
  { id: 'FAIL-003', order: 'ORD-20240207-00176', customer: 'David Brown', amount: 89.99, date: '2024-02-07', reason: 'Card expired', retries: 1, maxRetries: 3 },
]

const disputes = [
  { id: 'DIS-001', order: 'ORD-20240201-00145', customer: 'Karen White', amount: 2400.00, date: '2024-02-05', deadline: '2024-02-15', reason: 'Product not received', status: 'needs_response' },
  { id: 'DIS-002', order: 'ORD-20240128-00098', customer: 'Tom Miller', amount: 850.00, date: '2024-02-03', deadline: '2024-02-20', reason: 'Not as described', status: 'under_review' },
  { id: 'DIS-003', order: 'ORD-20240125-00087', customer: 'Nancy Lee', amount: 3550.00, date: '2024-02-01', deadline: '2024-02-12', reason: 'Fraudulent', status: 'needs_response' },
]

const statusColors = {
  settling: 'bg-blue-100 text-blue-700',
  needs_response: 'bg-red-100 text-red-700',
  under_review: 'bg-amber-100 text-amber-700',
  won: 'bg-emerald-100 text-emerald-700',
  lost: 'bg-gray-100 text-gray-700',
}

export default function AccountsReceivablePage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'failed' | 'disputes'>('pending')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts Receivable</h1>
          <p className="text-gray-500">Money owed to AMNI • Pending settlements, failed payments, disputes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" />
          Sync with Stripe
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Total AR</div>
          <div className="text-3xl font-bold text-gray-900">${(arSummary.total / 1000).toFixed(1)}K</div>
        </div>
        <button 
          onClick={() => setActiveTab('pending')}
          className={`rounded-xl border p-4 text-left transition-colors ${activeTab === 'pending' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:border-blue-200'}`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Clock className="w-4 h-4" />
            Pending Settlement
          </div>
          <div className="text-2xl font-bold text-blue-600">${(arSummary.pending / 1000).toFixed(1)}K</div>
        </button>
        <button 
          onClick={() => setActiveTab('failed')}
          className={`rounded-xl border p-4 text-left transition-colors ${activeTab === 'failed' ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-200 hover:border-amber-200'}`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <XCircle className="w-4 h-4" />
            Failed Payments
          </div>
          <div className="text-2xl font-bold text-amber-600">${(arSummary.failed / 1000).toFixed(1)}K</div>
        </button>
        <button 
          onClick={() => setActiveTab('disputes')}
          className={`rounded-xl border p-4 text-left transition-colors ${activeTab === 'disputes' ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200 hover:border-red-200'}`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <AlertTriangle className="w-4 h-4" />
            Disputes
          </div>
          <div className="text-2xl font-bold text-red-600">${(arSummary.disputes / 1000).toFixed(1)}K</div>
        </button>
      </div>

      {/* Pending Settlements */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Pending Stripe Settlements</h2>
            <p className="text-sm text-gray-500">Payments captured, awaiting bank settlement (typically 2-7 days)</p>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Captured</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Settles</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm">{payment.id}</td>
                  <td className="px-4 py-3 text-sm text-emerald-600 hover:underline cursor-pointer">{payment.order}</td>
                  <td className="px-4 py-3 text-sm">{payment.customer}</td>
                  <td className="px-4 py-3 font-medium">${payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{payment.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{payment.settles}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Settling
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Failed Payments */}
      {activeTab === 'failed' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Failed Payments</h2>
            <p className="text-sm text-gray-500">Payments that failed and may need retry or customer follow-up</p>
          </div>
          <div className="divide-y divide-gray-100">
            {failedPayments.map((payment) => (
              <div key={payment.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{payment.customer}</div>
                      <div className="text-sm text-gray-500">{payment.order} • {payment.date}</div>
                      <div className="text-sm text-red-600 mt-1">{payment.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${payment.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">
                      Retry {payment.retries}/{payment.maxRetries}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 ml-14">
                  {payment.retries < payment.maxRetries ? (
                    <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700">
                      Retry Payment
                    </button>
                  ) : (
                    <span className="text-sm text-red-600">Max retries reached</span>
                  )}
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    Contact Customer
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disputes */}
      {activeTab === 'disputes' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="font-semibold text-red-900">Active Disputes / Chargebacks</h2>
            </div>
            <p className="text-sm text-red-700 mt-1">Respond before deadline to avoid automatic loss</p>
          </div>
          <div className="divide-y divide-gray-100">
            {disputes.map((dispute) => (
              <div key={dispute.id} className={`p-4 ${dispute.status === 'needs_response' ? 'bg-red-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      dispute.status === 'needs_response' ? 'bg-red-200' : 'bg-amber-100'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        dispute.status === 'needs_response' ? 'text-red-700' : 'text-amber-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{dispute.customer}</div>
                      <div className="text-sm text-gray-500">{dispute.order} • Opened {dispute.date}</div>
                      <div className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Reason:</span> {dispute.reason}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${dispute.amount.toLocaleString()}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[dispute.status as keyof typeof statusColors]}`}>
                      {dispute.status === 'needs_response' ? 'Needs Response' : 'Under Review'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 ml-14">
                  <div className={`text-sm ${
                    new Date(dispute.deadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
                      ? 'text-red-600 font-medium' 
                      : 'text-gray-500'
                  }`}>
                    ⏰ Deadline: {dispute.deadline}
                  </div>
                  <div className="flex items-center gap-2">
                    {dispute.status === 'needs_response' && (
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Submit Evidence
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                      View in Stripe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settlement Schedule */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Upcoming Settlements</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className={`text-center p-3 rounded-lg ${i < 5 ? 'bg-emerald-50' : 'bg-gray-50'}`}>
              <div className="text-xs text-gray-500 mb-1">{day}</div>
              <div className={`text-lg font-bold ${i < 5 ? 'text-emerald-600' : 'text-gray-400'}`}>
                {i < 5 ? `$${(5000 + i * 2000).toLocaleString()}` : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
