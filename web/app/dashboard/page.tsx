'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Users, Package, Leaf, Calendar, Clock, ArrowUpRight, ArrowDownRight, MoreHorizontal, Bell, Settings, ChevronRight, Zap, Target, Award, Activity, BarChart3, PieChart, LineChart, Bot, Wallet, CreditCard, ShoppingCart, UserPlus, CheckCircle, AlertCircle, Info, ExternalLink, Play, Pause, RefreshCw } from 'lucide-react'
import Link from 'next/link'

// =============================================================================
// TYPES
// =============================================================================

interface MetricCard {
  label: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  trend: 'up' | 'down' | 'neutral'
}

interface Transaction {
  id: string
  type: 'sale' | 'commission' | 'payout' | 'expense' | 'refund'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
}

interface AgentActivity {
  id: string
  agent: string
  emoji: string
  action: string
  detail: string
  timestamp: string
  status: 'success' | 'pending' | 'needs_approval'
}

interface DownlineMember {
  id: string
  name: string
  level: number
  production: number
  status: 'active' | 'inactive' | 'new'
  joinDate: string
  yourCommission: number
}

// =============================================================================
// MOCK DATA
// =============================================================================

const metrics: MetricCard[] = [
  {
    label: 'Total Revenue',
    value: '$12,847',
    change: 23.5,
    changeLabel: 'vs last month',
    icon: <DollarSign className="w-5 h-5" />,
    trend: 'up',
  },
  {
    label: 'Net Profit',
    value: '$8,234',
    change: 18.2,
    changeLabel: 'vs last month',
    icon: <Wallet className="w-5 h-5" />,
    trend: 'up',
  },
  {
    label: 'Production',
    value: '487 lbs',
    change: 12.8,
    changeLabel: 'vs last month',
    icon: <Leaf className="w-5 h-5" />,
    trend: 'up',
  },
  {
    label: 'Network Size',
    value: '23',
    change: 4,
    changeLabel: 'new this month',
    icon: <Users className="w-5 h-5" />,
    trend: 'up',
  },
]

const commissionBreakdown = {
  production: 4892,
  finderBonus: 1230,
  placementTree: 1567,
  regionalPool: 345,
  acquisitionDividend: 200,
  total: 8234,
}

const recentTransactions: Transaction[] = [
  { id: '1', type: 'sale', description: 'Marketplace sale - Tomatoes (5 lbs)', amount: 32.50, date: '2 hours ago', status: 'completed' },
  { id: '2', type: 'commission', description: 'Placement tree commission - Level 2', amount: 45.00, date: '5 hours ago', status: 'completed' },
  { id: '3', type: 'sale', description: 'Subscription box - Weekly Produce', amount: 89.00, date: 'Yesterday', status: 'completed' },
  { id: '4', type: 'payout', description: 'Weekly payout to bank', amount: -2500.00, date: '3 days ago', status: 'completed' },
  { id: '5', type: 'commission', description: "Finder's bonus - New member signup", amount: 125.00, date: '4 days ago', status: 'completed' },
  { id: '6', type: 'sale', description: 'Marketplace sale - Mixed greens', amount: 28.00, date: '5 days ago', status: 'completed' },
]

const agentActivities: AgentActivity[] = [
  { id: '1', agent: 'Sales Agent', emoji: '💰', action: 'Listed new product', detail: 'Cherry tomatoes - $6.99/lb', timestamp: '15 min ago', status: 'success' },
  { id: '2', agent: 'Growing Agent', emoji: '🌱', action: 'Adjusted climate', detail: 'Humidity increased to 65%', timestamp: '32 min ago', status: 'success' },
  { id: '3', agent: 'Recruiting Agent', emoji: '👥', action: 'Sent outreach', detail: '5 personalized messages sent', timestamp: '1 hour ago', status: 'pending' },
  { id: '4', agent: 'Sales Agent', emoji: '💰', action: 'Price adjustment', detail: 'Lettuce price → $4.99 (was $5.49)', timestamp: '2 hours ago', status: 'success' },
  { id: '5', agent: 'Analytics Agent', emoji: '📊', action: 'Weekly report ready', detail: 'Production up 12%, review recommended', timestamp: '3 hours ago', status: 'needs_approval' },
  { id: '6', agent: 'Mentor Agent', emoji: '🎓', action: 'Sent encouragement', detail: 'Message to inactive downline member', timestamp: '4 hours ago', status: 'success' },
]

const downlineMembers: DownlineMember[] = [
  { id: '1', name: 'Sarah Kim', level: 1, production: 3420, status: 'active', joinDate: '2025-08-15', yourCommission: 273.60 },
  { id: '2', name: 'James Wilson', level: 1, production: 2890, status: 'active', joinDate: '2025-09-22', yourCommission: 231.20 },
  { id: '3', name: 'Maria Garcia', level: 2, production: 4120, status: 'active', joinDate: '2025-10-01', yourCommission: 164.80 },
  { id: '4', name: 'David Brown', level: 1, production: 1560, status: 'new', joinDate: '2026-01-15', yourCommission: 124.80 },
  { id: '5', name: 'Emily Chen', level: 2, production: 2340, status: 'active', joinDate: '2025-11-20', yourCommission: 93.60 },
  { id: '6', name: 'Michael Lee', level: 3, production: 890, status: 'inactive', joinDate: '2025-07-08', yourCommission: 17.80 },
]

const boardProgress = {
  current: 'Grower',
  currentEmoji: '🌳',
  production: 28450,
  nextBoard: 'Harvester',
  nextEmoji: '🌾',
  nextThreshold: 50000,
  progress: 56.9,
}

const roiData = {
  initialInvestment: 1499, // Pro package
  monthsActive: 6,
  totalEarnings: 18234,
  totalExpenses: 2340,
  netProfit: 15894,
  roi: 960, // percentage
  monthlyAverage: 2649,
  projectedAnnual: 31788,
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="py-6 px-6 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Sponsor Dashboard</h1>
            <p className="text-purple-300 text-sm">Welcome back, Alex! Your AI team is working hard. 🌱</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <div className="flex bg-purple-800/50 rounded-lg p-1">
              {['week', 'month', 'quarter', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as typeof timeRange)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-emerald-600 text-white'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            <button className="relative p-2 text-purple-300 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 text-purple-300 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <MetricCardComponent key={i} metric={metric} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* ROI Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border border-emerald-500/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Your ROI
            </h3>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-emerald-400 mb-1">
                {roiData.roi}%
              </div>
              <div className="text-emerald-200">Return on Investment</div>
              <div className="text-purple-300 text-sm mt-1">in {roiData.monthsActive} months</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-300">Initial Investment</span>
                <span className="text-white">${roiData.initialInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-300">Total Earnings</span>
                <span className="text-emerald-400">+${roiData.totalEarnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-300">Expenses</span>
                <span className="text-red-400">-${roiData.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="border-t border-emerald-500/30 pt-3 flex justify-between">
                <span className="text-white font-bold">Net Profit</span>
                <span className="text-emerald-400 font-bold">${roiData.netProfit.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 bg-black/20 rounded-lg p-3">
              <div className="text-purple-300 text-xs mb-1">Projected Annual</div>
              <div className="text-xl font-bold text-white">${roiData.projectedAnnual.toLocaleString()}</div>
            </div>
          </div>

          {/* Commission Breakdown */}
          <div className="lg:col-span-2 bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              Commission Breakdown (This Month)
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <CommissionBar label="Production (60%)" amount={commissionBreakdown.production} total={commissionBreakdown.total} color="emerald" />
                <CommissionBar label="Finder's Bonus" amount={commissionBreakdown.finderBonus} total={commissionBreakdown.total} color="blue" />
                <CommissionBar label="Placement Tree" amount={commissionBreakdown.placementTree} total={commissionBreakdown.total} color="purple" />
                <CommissionBar label="Regional Pool" amount={commissionBreakdown.regionalPool} total={commissionBreakdown.total} color="amber" />
                <CommissionBar label="Acquisition Dividend" amount={commissionBreakdown.acquisitionDividend} total={commissionBreakdown.total} color="rose" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-white mb-2">
                  ${commissionBreakdown.total.toLocaleString()}
                </div>
                <div className="text-purple-300">Total Commissions</div>
                <Link href="/compensation" className="mt-4 text-emerald-400 text-sm hover:underline flex items-center gap-1">
                  View compensation plan <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Board Progress */}
          <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Board Progression
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{boardProgress.currentEmoji}</div>
              <div>
                <div className="text-white font-bold text-xl">{boardProgress.current}</div>
                <div className="text-purple-300 text-sm">Current Board</div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="text-purple-400">→</div>
              </div>
              <div className="text-4xl opacity-50">{boardProgress.nextEmoji}</div>
              <div>
                <div className="text-purple-300 font-bold text-xl">{boardProgress.nextBoard}</div>
                <div className="text-purple-400 text-sm">Next Board</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-300">Cumulative Production</span>
                <span className="text-white">${boardProgress.production.toLocaleString()} / ${boardProgress.nextThreshold.toLocaleString()}</span>
              </div>
              <div className="h-4 bg-purple-900/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all"
                  style={{ width: `${boardProgress.progress}%` }}
                />
              </div>
              <div className="text-right text-sm mt-1 text-purple-400">
                ${(boardProgress.nextThreshold - boardProgress.production).toLocaleString()} to go
              </div>
            </div>

            <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-500/30">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-yellow-200 text-sm">
                  At <strong>Harvester</strong> level, your production commission increases to <strong>62%</strong> and you unlock regional pool bonuses.
                </div>
              </div>
            </div>
          </div>

          {/* Network / Downline */}
          <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Your Network
              </h3>
              <Link href="/network" className="text-emerald-400 text-sm hover:underline">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">23</div>
                <div className="text-purple-300 text-xs">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">19</div>
                <div className="text-purple-300 text-xs">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">$905</div>
                <div className="text-purple-300 text-xs">Your Commission</div>
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {downlineMembers.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between py-2 border-b border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      member.status === 'active' ? 'bg-emerald-400' :
                      member.status === 'new' ? 'bg-blue-400' : 'bg-gray-400'
                    }`} />
                    <div>
                      <div className="text-white text-sm">{member.name}</div>
                      <div className="text-purple-400 text-xs">Level {member.level} • ${member.production.toLocaleString()} production</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 text-sm font-medium">+${member.yourCommission.toFixed(2)}</div>
                    <div className="text-purple-400 text-xs">your cut</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row - Activity & Transactions */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* AI Agent Activity */}
          <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                AI Agent Activity
              </h3>
              <Link href="/my-ai" className="text-emerald-400 text-sm hover:underline">
                Manage agents →
              </Link>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {agentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-purple-500/20">
                  <div className="w-8 h-8 rounded-full bg-purple-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    {activity.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{activity.agent}</span>
                      {activity.status === 'needs_approval' && (
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                          Needs review
                        </span>
                      )}
                    </div>
                    <div className="text-purple-200 text-sm">{activity.action}</div>
                    <div className="text-purple-400 text-xs">{activity.detail}</div>
                  </div>
                  <div className="text-purple-400 text-xs whitespace-nowrap">
                    {activity.timestamp}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Approve All
              </button>
              <button className="px-4 bg-purple-700/50 hover:bg-purple-600/50 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <Pause className="w-4 h-4" />
                Pause Agents
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                Recent Transactions
              </h3>
              <button className="text-emerald-400 text-sm hover:underline">
                View all →
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {recentTransactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-purple-500/30 flex justify-between items-center">
              <div>
                <div className="text-purple-300 text-sm">Available Balance</div>
                <div className="text-2xl font-bold text-white">$3,847.50</div>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <QuickAction icon={<ShoppingCart className="w-5 h-5" />} label="List Product" href="/marketplace" />
            <QuickAction icon={<UserPlus className="w-5 h-5" />} label="Invite Member" href="#" />
            <QuickAction icon={<BarChart3 className="w-5 h-5" />} label="View Reports" href="#" />
            <QuickAction icon={<Bot className="w-5 h-5" />} label="AI Settings" href="/my-ai" />
            <QuickAction icon={<Wallet className="w-5 h-5" />} label="Manage Payments" href="#" />
            <QuickAction icon={<Package className="w-5 h-5" />} label="Upgrade Package" href="/packages" />
          </div>
        </div>
      </main>
    </div>
  )
}

// =============================================================================
// COMPONENTS
// =============================================================================

function MetricCardComponent({ metric }: { metric: MetricCard }) {
  return (
    <div className="bg-purple-800/30 rounded-xl p-5 border border-purple-500/20">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-purple-700/50 rounded-lg text-purple-300">
          {metric.icon}
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          metric.trend === 'up' ? 'text-emerald-400' : 
          metric.trend === 'down' ? 'text-red-400' : 'text-purple-300'
        }`}>
          {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : 
           metric.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : null}
          {metric.change > 0 ? '+' : ''}{metric.change}{typeof metric.change === 'number' && metric.change !== Math.floor(metric.change) ? '%' : ''}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
      <div className="text-purple-400 text-sm">{metric.label}</div>
      <div className="text-purple-500 text-xs">{metric.changeLabel}</div>
    </div>
  )
}

function CommissionBar({ label, amount, total, color }: { label: string; amount: number; total: number; color: string }) {
  const percentage = (amount / total) * 100
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  }

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-purple-300">{label}</span>
        <span className="text-white">${amount.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorMap[color]} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const typeConfig = {
    sale: { icon: <ShoppingCart className="w-4 h-4" />, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
    commission: { icon: <Award className="w-4 h-4" />, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
    payout: { icon: <ArrowUpRight className="w-4 h-4" />, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
    expense: { icon: <ArrowDownRight className="w-4 h-4" />, color: 'text-red-400', bgColor: 'bg-red-500/20' },
    refund: { icon: <RefreshCw className="w-4 h-4" />, color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
  }

  const config = typeConfig[transaction.type]

  return (
    <div className="flex items-center justify-between py-2 border-b border-purple-500/20">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${config.bgColor} ${config.color} flex items-center justify-center`}>
          {config.icon}
        </div>
        <div>
          <div className="text-white text-sm">{transaction.description}</div>
          <div className="text-purple-400 text-xs">{transaction.date}</div>
        </div>
      </div>
      <div className={`font-medium ${transaction.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {transaction.amount >= 0 ? '+' : ''}{transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  )
}

function QuickAction({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link 
      href={href}
      className="flex flex-col items-center gap-2 p-4 bg-purple-700/30 hover:bg-purple-600/30 rounded-xl transition-colors"
    >
      <div className="text-purple-300">{icon}</div>
      <span className="text-white text-sm text-center">{label}</span>
    </Link>
  )
}
