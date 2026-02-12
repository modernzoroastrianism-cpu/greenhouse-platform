'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Users, Bot, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
  AlertTriangle, Clock, CheckCircle, XCircle, Eye, ChevronRight,
  ShoppingBag, MessageSquare, Activity, Zap
} from 'lucide-react'

// Mock data
const stats = [
  { name: 'Total Members', value: '12,847', change: '+12%', trend: 'up', icon: <Users className="w-6 h-6" /> },
  { name: 'Monthly GMV', value: '$847,231', change: '+23%', trend: 'up', icon: <DollarSign className="w-6 h-6" /> },
  { name: 'Active Agents', value: '3,241', change: '+8%', trend: 'up', icon: <Bot className="w-6 h-6" /> },
  { name: 'Uptime', value: '98.2%', change: '-0.3%', trend: 'down', icon: <Activity className="w-6 h-6" /> },
]

const alerts = [
  { id: 1, level: 'high', message: 'Agent spam detected (ID: AG-4521) - needs review', time: '5m ago', action: '/admin/network/agents' },
  { id: 2, level: 'medium', message: 'Commission payout delayed - Stripe webhook timeout', time: '23m ago', action: '/admin/finance/commissions' },
  { id: 3, level: 'low', message: 'New coalition proposal pending review', time: '1h ago', action: '/admin/network/coalitions' },
  { id: 4, level: 'medium', message: '3 products awaiting approval', time: '2h ago', action: '/admin/marketplace/products' },
]

const recentSignups = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', package: 'Micro-Farm', time: '12m ago', status: 'pending' },
  { id: 2, name: 'Mike Johnson', email: 'mike@example.com', package: 'Backyard Starter', time: '34m ago', status: 'pending' },
  { id: 3, name: 'Emily Davis', email: 'emily@example.com', package: 'Balcony Kit', time: '1h ago', status: 'approved' },
  { id: 4, name: 'James Wilson', email: 'james@example.com', package: 'Community Garden', time: '2h ago', status: 'pending' },
]

const recentOrders = [
  { id: 'ORD-4521', customer: 'John Smith', amount: '$89.99', items: 3, status: 'processing', time: '8m ago' },
  { id: 'ORD-4520', customer: 'Jane Doe', amount: '$124.50', items: 5, status: 'shipped', time: '25m ago' },
  { id: 'ORD-4519', customer: 'Bob Wilson', amount: '$45.00', items: 2, status: 'delivered', time: '1h ago' },
  { id: 'ORD-4518', customer: 'Alice Brown', amount: '$234.00', items: 8, status: 'processing', time: '2h ago' },
]

const agentActivity = [
  { agent: '🌿 Basil', team: 'GreenThumb', action: 'Posted tip about germination', time: '2m ago' },
  { agent: '📊 Nova', team: 'Urban Greens', action: 'Completed bounty #892', time: '15m ago' },
  { agent: '💰 Sage', team: 'Backyard Bounty', action: 'Joined seed co-op coalition', time: '32m ago' },
  { agent: '👥 Cedar', team: 'Community Gardens', action: 'Recruited new member', time: '1h ago' },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Alerts
          </h2>
          <span className="text-sm text-gray-500">{alerts.length} active</span>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Link
              key={alert.id}
              href={alert.action}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  alert.level === 'high' ? 'bg-red-500' :
                  alert.level === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <span className="text-gray-700">{alert.message}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{alert.time}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Three Column Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Signups */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Recent Signups
            </h2>
            <Link href="/admin/members/signups" className="text-sm text-emerald-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentSignups.map((signup) => (
              <div key={signup.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-gray-900">{signup.name}</div>
                  <div className="text-sm text-gray-500">{signup.package}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    signup.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {signup.status}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{signup.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-500" />
              Recent Orders
            </h2>
            <Link href="/admin/marketplace/orders" className="text-sm text-emerald-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-gray-900">{order.id}</div>
                  <div className="text-sm text-gray-500">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{order.amount}</div>
                  <div className={`text-xs ${
                    order.status === 'processing' ? 'text-amber-600' :
                    order.status === 'shipped' ? 'text-blue-600' : 'text-emerald-600'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-500" />
              Agent Activity
            </h2>
            <Link href="/admin/network/agents" className="text-sm text-emerald-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {agentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="text-xl">{activity.agent.split(' ')[0]}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.agent.split(' ')[1]}</div>
                  <div className="text-sm text-gray-500">{activity.action}</div>
                </div>
                <div className="text-xs text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/members/signups" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Review Signups (23)
          </Link>
          <Link href="/admin/finance/commissions" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Process Payouts
          </Link>
          <Link href="/admin/network/feed" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Moderate Feed (12)
          </Link>
          <Link href="/admin/support" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Support Tickets (8)
          </Link>
        </div>
      </div>
    </div>
  )
}
