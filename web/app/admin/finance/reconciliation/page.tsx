'use client'

import { useState } from 'react'
import { 
  CheckCircle, XCircle, AlertTriangle, Search, Filter, RefreshCw,
  ArrowRight, Link2, DollarSign, ShoppingBag, Wallet, Clock,
  ExternalLink, FileText, Download
} from 'lucide-react'

// Reconciliation = Matching Stripe payments → Orders → Payouts
const reconciliationSummary = {
  matched: 1247,
  unmatched: 12,
  pendingMatch: 34,
  totalProcessed: 1293,
}

const unmatchedItems = [
  { 
    id: 'UNREC-001', 
    type: 'stripe_payment', 
    stripeId: 'pi_3Ox8kJLkdIwHu7ix0gJLk2x4',
    amount: 156.99,
    date: '2024-02-11',
    reason: 'No matching order',
    suggestion: 'Possible test payment'
  },
  { 
    id: 'UNREC-002', 
    type: 'order', 
    orderId: 'ORD-20240210-00219',
    amount: 89.50,
    date: '2024-02-10',
    reason: 'Payment not found',
    suggestion: 'Check Stripe for pi_'
  },
  { 
    id: 'UNREC-003', 
    type: 'payout', 
    payoutId: 'PAY-20240209-0045',
    amount: 234.00,
    date: '2024-02-09',
    reason: 'Order refunded after payout',
    suggestion: 'Claw back from producer'
  },
]

const recentReconciled = [
  { 
    orderId: 'ORD-20240211-00234', 
    stripeId: 'pi_3Ox8kJLkdIwHu7ix1234', 
    amount: 156.99,
    producerPayout: 94.19,
    fundContrib: 23.55,
    status: 'fully_reconciled'
  },
  { 
    orderId: 'ORD-20240211-00233', 
    stripeId: 'pi_3Ox8kJLkdIwHu7ix5678', 
    amount: 89.50,
    producerPayout: 53.70,
    fundContrib: 13.43,
    status: 'fully_reconciled'
  },
  { 
    orderId: 'ORD-20240210-00221', 
    stripeId: 'pi_3Ox8kJLkdIwHu7ix9012', 
    amount: 9999.00,
    producerPayout: null, // Package sale, no producer
    fundContrib: 1499.85,
    status: 'package_sale'
  },
  { 
    orderId: 'ORD-20240210-00218', 
    stripeId: 'pi_3Ox8kJLkdIwHu7ix3456', 
    amount: 234.00,
    producerPayout: 140.40,
    fundContrib: 35.10,
    status: 'payout_pending'
  },
]

const dailyReconciliation = [
  { date: 'Feb 11', stripe: 12456, orders: 12456, payouts: 8234, variance: 0, status: 'balanced' },
  { date: 'Feb 10', stripe: 34521, orders: 34521, payouts: 23456, variance: 0, status: 'balanced' },
  { date: 'Feb 9', stripe: 8934, orders: 8934, payouts: 6234, variance: 0, status: 'balanced' },
  { date: 'Feb 8', stripe: 15678, orders: 15567, payouts: 10234, variance: 111, status: 'variance' },
  { date: 'Feb 7', stripe: 22345, orders: 22345, payouts: 15678, variance: 0, status: 'balanced' },
]

const statusColors = {
  fully_reconciled: 'bg-emerald-100 text-emerald-700',
  package_sale: 'bg-purple-100 text-purple-700',
  payout_pending: 'bg-amber-100 text-amber-700',
  variance: 'bg-red-100 text-red-700',
  balanced: 'bg-emerald-100 text-emerald-700',
}

export default function ReconciliationPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'unmatched' | 'daily'>('overview')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reconciliation</h1>
          <p className="text-gray-500">Match Stripe payments → Orders → Payouts</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            Run Reconciliation
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center gap-2 text-sm text-emerald-700 mb-1">
            <CheckCircle className="w-4 h-4" />
            Matched
          </div>
          <div className="text-3xl font-bold text-emerald-700">{reconciliationSummary.matched}</div>
          <div className="text-xs text-emerald-600">Fully reconciled</div>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
          <div className="flex items-center gap-2 text-sm text-amber-700 mb-1">
            <Clock className="w-4 h-4" />
            Pending Match
          </div>
          <div className="text-3xl font-bold text-amber-700">{reconciliationSummary.pendingMatch}</div>
          <div className="text-xs text-amber-600">Awaiting settlement</div>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <div className="flex items-center gap-2 text-sm text-red-700 mb-1">
            <AlertTriangle className="w-4 h-4" />
            Unmatched
          </div>
          <div className="text-3xl font-bold text-red-700">{reconciliationSummary.unmatched}</div>
          <div className="text-xs text-red-600">Needs attention</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Total Processed</div>
          <div className="text-3xl font-bold text-gray-900">{reconciliationSummary.totalProcessed}</div>
          <div className="text-xs text-gray-500">This period</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview', label: 'Recent Transactions' },
          { id: 'unmatched', label: `Unmatched (${reconciliationSummary.unmatched})` },
          { id: 'daily', label: 'Daily Summary' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab.id 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* The Flow */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="text-sm font-medium text-gray-700 mb-3">Money Flow</div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-blue-600">
            <DollarSign className="w-5 h-5" />
            <span>Stripe Payment</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300" />
          <div className="flex items-center gap-2 text-purple-600">
            <ShoppingBag className="w-5 h-5" />
            <span>Order Record</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300" />
          <div className="flex items-center gap-2 text-emerald-600">
            <Wallet className="w-5 h-5" />
            <span>Producer Payout (60%)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300" />
          <div className="flex items-center gap-2 text-amber-600">
            <FileText className="w-5 h-5" />
            <span>Fund + Ops + Donation</span>
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Recent Reconciled Transactions</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stripe ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Producer (60%)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Fund (15%)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentReconciled.map((item) => (
                <tr key={item.orderId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-emerald-600 hover:underline cursor-pointer">{item.orderId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-gray-500">{item.stripeId.slice(0, 20)}...</span>
                    <ExternalLink className="w-3 h-3 inline ml-1 text-gray-400" />
                  </td>
                  <td className="px-4 py-3 font-medium">${item.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {item.producerPayout ? (
                      <span className="text-blue-600">${item.producerPayout.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-emerald-600">${item.fundContrib.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status as keyof typeof statusColors]}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Unmatched Tab */}
      {activeTab === 'unmatched' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="font-semibold text-red-900">Unmatched Items</h2>
            </div>
            <p className="text-sm text-red-700 mt-1">These need manual review and resolution</p>
          </div>
          <div className="divide-y divide-gray-100">
            {unmatchedItems.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === 'stripe_payment' ? 'bg-blue-100' :
                      item.type === 'order' ? 'bg-purple-100' : 'bg-amber-100'
                    }`}>
                      {item.type === 'stripe_payment' ? <DollarSign className="w-5 h-5 text-blue-600" /> :
                       item.type === 'order' ? <ShoppingBag className="w-5 h-5 text-purple-600" /> :
                       <Wallet className="w-5 h-5 text-amber-600" />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.type === 'stripe_payment' ? `Stripe: ${item.stripeId}` :
                         item.type === 'order' ? `Order: ${item.orderId}` :
                         `Payout: ${item.payoutId}`}
                      </div>
                      <div className="text-sm text-gray-500">{item.date} • ${item.amount.toLocaleString()}</div>
                      <div className="text-sm text-red-600 mt-1">{item.reason}</div>
                      <div className="text-sm text-blue-600 mt-1">💡 {item.suggestion}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700">
                      Resolve
                    </button>
                    <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Summary Tab */}
      {activeTab === 'daily' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Daily Reconciliation Summary</h2>
            <p className="text-sm text-gray-500">Comparing Stripe → Orders → Payouts by day</p>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stripe In</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Orders Total</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payouts Out</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Variance</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {dailyReconciliation.map((day) => (
                <tr key={day.date} className={`border-b border-gray-100 hover:bg-gray-50 ${day.variance !== 0 ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3 font-medium">{day.date}</td>
                  <td className="px-4 py-3 text-blue-600">${day.stripe.toLocaleString()}</td>
                  <td className="px-4 py-3 text-purple-600">${day.orders.toLocaleString()}</td>
                  <td className="px-4 py-3 text-amber-600">${day.payouts.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {day.variance === 0 ? (
                      <span className="text-emerald-600">$0</span>
                    ) : (
                      <span className="text-red-600 font-medium">${day.variance.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[day.status as keyof typeof statusColors]}`}>
                      {day.status === 'balanced' ? '✓ Balanced' : '⚠ Variance'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reconciliation Rules */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Reconciliation Rules</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900">Auto-Match</div>
            <p className="text-gray-600">Stripe payment_intent_id matches order.stripe_payment_intent_id</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900">Settlement Window</div>
            <p className="text-gray-600">Wait 7 days for Stripe settlement before flagging</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900">Variance Threshold</div>
            <p className="text-gray-600">Flag if daily variance exceeds $100 or 1%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
