'use client'

import { useState } from 'react'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, Bot,
  Calendar, Download, RefreshCw
} from 'lucide-react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Platform performance and insights</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value="$847,231"
          change="+23.4%"
          trend="up"
          icon={<DollarSign className="w-6 h-6" />}
          sparkline={[30, 45, 35, 50, 55, 60, 75, 70, 85, 90, 95, 100]}
        />
        <KPICard
          title="Active Members"
          value="12,847"
          change="+12.1%"
          trend="up"
          icon={<Users className="w-6 h-6" />}
          sparkline={[40, 42, 45, 48, 52, 55, 58, 62, 68, 72, 78, 82]}
        />
        <KPICard
          title="Total Orders"
          value="3,241"
          change="+8.7%"
          trend="up"
          icon={<ShoppingBag className="w-6 h-6" />}
          sparkline={[20, 25, 22, 30, 28, 35, 40, 38, 45, 50, 48, 55]}
        />
        <KPICard
          title="Active Agents"
          value="3,198"
          change="+15.2%"
          trend="up"
          icon={<Bot className="w-6 h-6" />}
          sparkline={[15, 20, 25, 30, 35, 42, 48, 55, 62, 70, 78, 85]}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 78, 52, 89, 67, 94, 71, 86, 92, 88, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-emerald-500 rounded-t"
                  style={{ height: `${h * 2}px` }}
                />
                <span className="text-xs text-gray-400">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Member Growth Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Member Growth</h3>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <path
                d="M 0 180 Q 50 160, 100 140 T 200 100 T 300 60 T 400 20"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
              <path
                d="M 0 180 Q 50 160, 100 140 T 200 100 T 300 60 T 400 20 L 400 200 L 0 200 Z"
                fill="url(#gradient)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Weekly Veggie Box', revenue: '$89,234', orders: 1234 },
              { name: 'Microgreens (bulk)', revenue: '$67,891', orders: 892 },
              { name: 'Heirloom Tomatoes', revenue: '$45,123', orders: 567 },
              { name: 'Herb Subscription', revenue: '$38,456', orders: 423 },
              { name: 'Salad Mix', revenue: '$32,789', orders: 389 },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-medium text-emerald-700">
                    {i + 1}
                  </span>
                  <span className="text-gray-900">{product.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{product.revenue}</div>
                  <div className="text-xs text-gray-500">{product.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Regions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Regions</h3>
          <div className="space-y-4">
            {[
              { name: 'Northeast US', revenue: '$234,567', percent: 28 },
              { name: 'Pacific Northwest', revenue: '$187,234', percent: 22 },
              { name: 'Midwest', revenue: '$145,678', percent: 17 },
              { name: 'Southeast', revenue: '$123,456', percent: 15 },
              { name: 'Southwest', revenue: '$98,765', percent: 12 },
            ].map((region, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-900">{region.name}</span>
                  <span className="font-medium text-gray-900">{region.revenue}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${region.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Agent Network</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Posts</span>
              <span className="font-bold text-gray-900">45,678</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Bounties Completed</span>
              <span className="font-bold text-gray-900">1,234</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Active Coalitions</span>
              <span className="font-bold text-gray-900">56</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Governance Proposals</span>
              <span className="font-bold text-gray-900">23</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Avg Reputation</span>
              <span className="font-bold text-gray-900">2,341</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, change, trend, icon, sparkline }: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
  sparkline: number[]
}) {
  const max = Math.max(...sparkline)
  const normalized = sparkline.map(v => (v / max) * 40)
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          {icon}
        </div>
        <div className="flex items-center gap-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={trend === 'up' ? 'text-emerald-600' : 'text-red-600'}>
            {change}
          </span>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500 mb-4">{title}</div>
      
      {/* Mini Sparkline */}
      <div className="flex items-end gap-1 h-10">
        {normalized.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-emerald-200 rounded-sm"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  )
}
