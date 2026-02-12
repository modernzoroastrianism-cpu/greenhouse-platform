'use client'

import { useState } from 'react'
import { 
  BarChart3, TrendingUp, TrendingDown, DollarSign, Package,
  Users, ShoppingBag, Calendar, Download, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

const revenueSummary = {
  // This Period
  periodRevenue: 127434,
  periodOrders: 847,
  periodAOV: 150.45,
  periodGrowth: 23.4,
  
  // Last Period (for comparison)
  lastPeriodRevenue: 103287,
  lastPeriodOrders: 712,
  
  // Breakdown
  productSales: 89500,
  packageSales: 29999, // 3 packages sold
  subscriptions: 7935, // recurring
}

const revenueByCategory = [
  { category: 'Produce', revenue: 45230, orders: 423, growth: 18.5 },
  { category: 'Seeds & Starters', revenue: 23450, orders: 234, growth: 32.1 },
  { category: 'Equipment', revenue: 12340, orders: 45, growth: -5.2 },
  { category: 'Subscriptions', revenue: 7935, orders: 89, growth: 45.0 },
  { category: 'Meal Kits', revenue: 8479, orders: 56, growth: 12.3 },
]

const revenueAllocation = [
  { name: 'Producer Payouts', percent: 60, amount: 76460, color: 'bg-blue-500' },
  { name: 'Acquisition Fund', percent: 15, amount: 19115, color: 'bg-emerald-500' },
  { name: 'Operations', percent: 15, amount: 19115, color: 'bg-purple-500' },
  { name: 'Donation Pool', percent: 10, amount: 12743, color: 'bg-amber-500' },
]

const topProducts = [
  { name: 'Heirloom Tomato Seedlings', revenue: 8450, units: 423 },
  { name: 'Weekly Veggie Box (Large)', revenue: 6780, units: 89 },
  { name: 'Herb Garden Starter Kit', revenue: 4560, units: 152 },
  { name: 'Organic Lettuce Mix', revenue: 3420, units: 285 },
  { name: 'Microgreens Subscription', revenue: 2890, units: 34 },
]

const topProducers = [
  { name: 'Sarah Mitchell', revenue: 12450, orders: 89, commission: 7470 },
  { name: 'Mike Chen', revenue: 9870, orders: 67, commission: 5922 },
  { name: 'Emily Davis', revenue: 8340, orders: 54, commission: 5004 },
  { name: 'John Wilson', revenue: 7650, orders: 48, commission: 4590 },
  { name: 'Lisa Anderson', revenue: 6890, orders: 42, commission: 4134 },
]

const monthlyTrend = [
  { month: 'Sep', revenue: 67000 },
  { month: 'Oct', revenue: 78000 },
  { month: 'Nov', revenue: 89000 },
  { month: 'Dec', revenue: 95000 },
  { month: 'Jan', revenue: 103287 },
  { month: 'Feb', revenue: 127434 },
]

export default function RevenuePage() {
  const [period, setPeriod] = useState('month')

  const maxRevenue = Math.max(...monthlyTrend.map(m => m.revenue))

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue & P&L</h1>
          <p className="text-gray-500">Financial performance analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
          <div className="text-emerald-100 text-sm mb-1">Total Revenue</div>
          <div className="text-4xl font-bold">${(revenueSummary.periodRevenue / 1000).toFixed(1)}K</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-emerald-100">
            <ArrowUpRight className="w-4 h-4" />
            {revenueSummary.periodGrowth}% vs last period
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-500 mb-1">Orders</div>
          <div className="text-3xl font-bold text-gray-900">{revenueSummary.periodOrders}</div>
          <div className="text-sm text-emerald-600 mt-1">
            +{revenueSummary.periodOrders - revenueSummary.lastPeriodOrders} vs last period
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-500 mb-1">Avg Order Value</div>
          <div className="text-3xl font-bold text-gray-900">${revenueSummary.periodAOV.toFixed(2)}</div>
          <div className="text-sm text-gray-500 mt-1">Per order</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-500 mb-1">Net Margin</div>
          <div className="text-3xl font-bold text-purple-600">15%</div>
          <div className="text-sm text-gray-500 mt-1">After all allocations</div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Revenue Trend (6 months)</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyTrend.map((month) => (
            <div key={month.month} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-emerald-100 rounded-t relative" style={{ height: `${(month.revenue / maxRevenue) * 100}%` }}>
                <div 
                  className="absolute bottom-0 w-full bg-emerald-500 rounded-t transition-all hover:bg-emerald-600"
                  style={{ height: '100%' }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">{month.month}</div>
              <div className="text-xs font-medium text-gray-700">${(month.revenue / 1000).toFixed(0)}K</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue by Source</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Product Sales</div>
                  <div className="text-sm text-gray-500">{Math.round(revenueSummary.productSales / revenueSummary.periodRevenue * 100)}% of total</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">${(revenueSummary.productSales / 1000).toFixed(1)}K</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Package Sales</div>
                  <div className="text-sm text-gray-500">3 packages sold</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">${(revenueSummary.packageSales / 1000).toFixed(1)}K</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Subscriptions</div>
                  <div className="text-sm text-gray-500">Recurring revenue</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">${(revenueSummary.subscriptions / 1000).toFixed(1)}K</div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Allocation (P&L) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue Allocation</h2>
          <div className="h-6 flex rounded-full overflow-hidden mb-4">
            {revenueAllocation.map((item) => (
              <div 
                key={item.name}
                className={`${item.color} transition-all hover:opacity-80`}
                style={{ width: `${item.percent}%` }}
                title={`${item.name}: ${item.percent}%`}
              />
            ))}
          </div>
          <div className="space-y-2">
            {revenueAllocation.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{item.percent}%</span>
                  <span className="font-medium text-gray-900">${(item.amount / 1000).toFixed(1)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Revenue by Category */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">By Category</h2>
          <div className="space-y-3">
            {revenueByCategory.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-gray-900">{cat.category}</div>
                  <div className="text-xs text-gray-500">{cat.orders} orders</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${(cat.revenue / 1000).toFixed(1)}K</div>
                  <div className={`text-xs flex items-center justify-end gap-1 ${cat.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {cat.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(cat.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-500">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.units} units</div>
                </div>
                <div className="font-medium text-gray-900">${(product.revenue / 1000).toFixed(1)}K</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Producers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Top Producers</h2>
          <div className="space-y-3">
            {topProducers.map((producer, i) => (
              <div key={producer.name} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-medium text-emerald-600">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{producer.name}</div>
                  <div className="text-xs text-gray-500">{producer.orders} orders</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">${(producer.revenue / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-emerald-600">60%: ${(producer.commission / 1000).toFixed(1)}K</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* P&L Summary */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">P&L Summary</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sm text-gray-500 mb-2">Revenue</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Product Sales</span>
                <span className="font-medium">${(revenueSummary.productSales / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between">
                <span>Package Sales</span>
                <span className="font-medium">${(revenueSummary.packageSales / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between">
                <span>Subscriptions</span>
                <span className="font-medium">${(revenueSummary.subscriptions / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Total Revenue</span>
                <span className="text-emerald-600">${(revenueSummary.periodRevenue / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-2">Allocations & Costs</div>
            <div className="space-y-2">
              <div className="flex justify-between text-red-600">
                <span>Producer Payouts (60%)</span>
                <span>-${(revenueSummary.periodRevenue * 0.6 / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Acquisition Fund (15%)</span>
                <span>-${(revenueSummary.periodRevenue * 0.15 / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Donation Pool (10%)</span>
                <span>-${(revenueSummary.periodRevenue * 0.1 / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Net Operations (15%)</span>
                <span className="text-purple-600">${(revenueSummary.periodRevenue * 0.15 / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
