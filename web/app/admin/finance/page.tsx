'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, ArrowRight,
  Wallet, CreditCard, PiggyBank, Receipt, Clock, CheckCircle,
  ArrowUpRight, ArrowDownRight, Calendar, BarChart3
} from 'lucide-react'

// Financial summary data
const financialSummary = {
  // Cash Position
  cashOnHand: 847321,
  stripePending: 45678,
  totalLiquid: 893000,
  
  // This Period (Month)
  periodRevenue: 127434,
  periodExpenses: 89234,
  periodNet: 38200,
  periodGrowth: 23.4,
  
  // Liabilities
  unpaidCommissions: 34521,
  unpaidProducerEarnings: 67890,
  pendingRefunds: 2340,
  totalLiabilities: 104751,
  
  // Acquisition Fund
  fundBalance: 2847321,
  fundCommitted: 570000, // Properties in voting/DD
  fundAvailable: 2277321,
  
  // Key Ratios
  runway: 18, // months
  marginPercent: 30,
}

const alerts = [
  { type: 'warning', message: '23 commissions overdue >30 days ($4,521)', link: '/admin/finance/ap' },
  { type: 'error', message: '3 chargebacks need response by Feb 15', link: '/admin/finance/ar' },
  { type: 'info', message: 'Stripe payout scheduled for tomorrow: $45,678', link: '/admin/finance/reconciliation' },
]

const recentTransactions = [
  { id: 1, type: 'in', description: 'Order #ORD-20240211-00234', amount: 156.99, status: 'completed' },
  { id: 2, type: 'out', description: 'Commission payout batch #1847', amount: 3421.50, status: 'processing' },
  { id: 3, type: 'in', description: 'Package purchase - Micro-Farm', amount: 9999.00, status: 'completed' },
  { id: 4, type: 'out', description: 'Producer payout - Sarah M.', amount: 847.20, status: 'completed' },
  { id: 5, type: 'in', description: 'Order #ORD-20240211-00233', amount: 89.50, status: 'pending' },
]

const quickStats = [
  { 
    label: 'Accounts Receivable', 
    value: 48018, 
    change: -12.3, 
    link: '/admin/finance/ar',
    description: 'Pending + Failed + Disputes'
  },
  { 
    label: 'Accounts Payable', 
    value: 104751, 
    change: 8.7, 
    link: '/admin/finance/ap',
    description: 'Commissions + Producer + Refunds'
  },
  { 
    label: 'Revenue (MTD)', 
    value: 127434, 
    change: 23.4, 
    link: '/admin/finance/revenue',
    description: '847 orders this month'
  },
  { 
    label: 'Payouts (MTD)', 
    value: 89234, 
    change: 18.2, 
    link: '/admin/finance/payouts',
    description: '234 payouts processed'
  },
]

export default function FinanceDashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
          <p className="text-gray-500">CFO overview • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 rounded-lg">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2 mb-6">
          {alerts.map((alert, i) => (
            <Link
              key={i}
              href={alert.link}
              className={`flex items-center justify-between p-3 rounded-lg ${
                alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                alert.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${
                  alert.type === 'error' ? 'text-red-600' :
                  alert.type === 'warning' ? 'text-amber-600' :
                  'text-blue-600'
                }`} />
                <span className={`text-sm ${
                  alert.type === 'error' ? 'text-red-700' :
                  alert.type === 'warning' ? 'text-amber-700' :
                  'text-blue-700'
                }`}>{alert.message}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>
      )}

      {/* Cash Position */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="text-emerald-100">Total Liquid Position</div>
            <Wallet className="w-6 h-6 text-emerald-200" />
          </div>
          <div className="text-4xl font-bold mb-2">${(financialSummary.totalLiquid / 1000).toFixed(0)}K</div>
          <div className="flex items-center gap-4 text-sm text-emerald-100">
            <span>Cash: ${(financialSummary.cashOnHand / 1000).toFixed(0)}K</span>
            <span>•</span>
            <span>Pending: ${(financialSummary.stripePending / 1000).toFixed(0)}K</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Net This Period</div>
            <div className={`flex items-center gap-1 text-sm ${financialSummary.periodNet >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {financialSummary.periodNet >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {financialSummary.periodGrowth}%
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">${(financialSummary.periodNet / 1000).toFixed(1)}K</div>
          <div className="text-sm text-gray-500 mt-1">
            Revenue: ${(financialSummary.periodRevenue / 1000).toFixed(0)}K
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Total Liabilities</div>
            <Receipt className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">${(financialSummary.totalLiabilities / 1000).toFixed(1)}K</div>
          <div className="text-sm text-red-600 mt-1">
            Owed to network
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat) => (
          <Link key={stat.label} href={stat.link} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className={`flex items-center gap-1 text-xs ${stat.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">${(stat.value / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-400 mt-1">{stat.description}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Liability Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Liability Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Producer Earnings</span>
                <span className="font-medium">${(financialSummary.unpaidProducerEarnings / 1000).toFixed(1)}K</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Commissions</span>
                <span className="font-medium">${(financialSummary.unpaidCommissions / 1000).toFixed(1)}K</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '33%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Pending Refunds</span>
                <span className="font-medium">${(financialSummary.pendingRefunds / 1000).toFixed(1)}K</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '2%' }} />
              </div>
            </div>
          </div>
          <Link href="/admin/finance/ap" className="flex items-center gap-1 text-emerald-600 text-sm mt-4 hover:underline">
            View all payables <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Acquisition Fund */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Acquisition Fund</h2>
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            ${(financialSummary.fundBalance / 1000000).toFixed(2)}M
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Available</span>
              <span className="font-medium text-emerald-600">${(financialSummary.fundAvailable / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Committed (Voting/DD)</span>
              <span className="font-medium text-amber-600">${(financialSummary.fundCommitted / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Monthly Contribution</span>
              <span className="font-medium">~$19K</span>
            </div>
          </div>
          <Link href="/admin/finance/fund" className="flex items-center gap-1 text-emerald-600 text-sm mt-4 hover:underline">
            Manage fund <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Runway & Health */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Financial Health</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Cash Runway</span>
                <span className="font-bold text-emerald-600">{financialSummary.runway} months</span>
              </div>
              <div className="text-xs text-gray-400">At current burn rate</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Gross Margin</span>
                <span className="font-bold text-gray-900">{financialSummary.marginPercent}%</span>
              </div>
              <div className="text-xs text-gray-400">After producer payouts</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Liability Ratio</span>
                <span className="font-bold text-gray-900">
                  {((financialSummary.totalLiabilities / financialSummary.totalLiquid) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-gray-400">Liabilities / Liquid</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
          <Link href="/admin/finance/reconciliation" className="text-emerald-600 text-sm hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'in' ? 'bg-emerald-100' : 'bg-red-100'
                }`}>
                  {tx.type === 'in' ? (
                    <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{tx.description}</div>
                  <div className="text-xs text-gray-500">
                    {tx.status === 'completed' && <span className="text-emerald-600">✓ Completed</span>}
                    {tx.status === 'processing' && <span className="text-amber-600">⏳ Processing</span>}
                    {tx.status === 'pending' && <span className="text-gray-500">○ Pending</span>}
                  </div>
                </div>
              </div>
              <div className={`font-medium ${tx.type === 'in' ? 'text-emerald-600' : 'text-red-600'}`}>
                {tx.type === 'in' ? '+' : '-'}${tx.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-6 gap-4">
        {[
          { label: 'Revenue', href: '/admin/finance/revenue', icon: <BarChart3 className="w-5 h-5" /> },
          { label: 'AR', href: '/admin/finance/ar', icon: <CreditCard className="w-5 h-5" /> },
          { label: 'AP', href: '/admin/finance/ap', icon: <Receipt className="w-5 h-5" /> },
          { label: 'Commissions', href: '/admin/finance/commissions', icon: <DollarSign className="w-5 h-5" /> },
          { label: 'Payouts', href: '/admin/finance/payouts', icon: <Wallet className="w-5 h-5" /> },
          { label: 'Reconciliation', href: '/admin/finance/reconciliation', icon: <CheckCircle className="w-5 h-5" /> },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="text-gray-600">{link.icon}</div>
            <span className="text-sm font-medium text-gray-700">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
