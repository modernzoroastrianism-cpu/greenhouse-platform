'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, Eye, Package, Truck, CheckCircle, XCircle,
  ChevronLeft, ChevronRight, MapPin, Clock, DollarSign, RefreshCw
} from 'lucide-react'

// Mock data
const orders = [
  { id: 'ORD-4521', customer: 'John Smith', customerId: 'M-12847', seller: 'GreenThumb Farm', items: 3, total: '$89.99', status: 'processing', date: '2h ago', address: 'San Francisco, CA' },
  { id: 'ORD-4520', customer: 'Jane Doe', customerId: 'M-12846', seller: 'Urban Greens Co', items: 5, total: '$124.50', status: 'shipped', date: '5h ago', address: 'Seattle, WA', tracking: 'USPS 9400111899' },
  { id: 'ORD-4519', customer: 'Bob Wilson', customerId: 'M-12845', seller: 'Rooftop Roots', items: 2, total: '$45.00', status: 'delivered', date: '1d ago', address: 'Portland, OR' },
  { id: 'ORD-4518', customer: 'Sarah Chen', customerId: 'M-12844', seller: 'Community Gardens', items: 8, total: '$234.00', status: 'processing', date: '1d ago', address: 'Denver, CO' },
  { id: 'ORD-4517', customer: 'Mike Johnson', customerId: 'M-12843', seller: 'Valley Gardens', items: 1, total: '$18.99', status: 'disputed', date: '2d ago', address: 'Austin, TX' },
  { id: 'ORD-4516', customer: 'Emily Davis', customerId: 'M-12842', seller: 'Backyard Bounty', items: 4, total: '$67.50', status: 'refunded', date: '3d ago', address: 'Chicago, IL' },
  { id: 'ORD-4515', customer: 'James Wilson', customerId: 'M-12841', seller: 'Hillside Farms', items: 6, total: '$156.00', status: 'delivered', date: '3d ago', address: 'Boston, MA' },
  { id: 'ORD-4514', customer: 'Lisa Brown', customerId: 'M-12840', seller: 'Spicy Greens', items: 2, total: '$44.99', status: 'cancelled', date: '4d ago', address: 'Miami, FL' },
]

const statusConfig = {
  processing: { color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-4 h-4" /> },
  shipped: { color: 'bg-blue-100 text-blue-700', icon: <Truck className="w-4 h-4" /> },
  delivered: { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle className="w-4 h-4" /> },
  disputed: { color: 'bg-purple-100 text-purple-700', icon: <XCircle className="w-4 h-4" /> },
  refunded: { color: 'bg-gray-100 text-gray-700', icon: <RefreshCw className="w-4 h-4" /> },
  cancelled: { color: 'bg-red-100 text-red-700', icon: <XCircle className="w-4 h-4" /> },
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.seller.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const selected = orders.find(o => o.id === selectedOrder)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-500">Track and manage all marketplace orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">8,234</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Processing</div>
          <div className="text-2xl font-bold text-amber-600">234</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Shipped</div>
          <div className="text-2xl font-bold text-blue-600">567</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Disputed</div>
          <div className="text-2xl font-bold text-purple-600">12</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Today's GMV</div>
          <div className="text-2xl font-bold text-emerald-600">$12,456</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Order List */}
        <div className="col-span-2">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID, customer, or seller..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="disputed">Disputed</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Seller</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const config = statusConfig[order.status as keyof typeof statusConfig]
                  return (
                    <tr 
                      key={order.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedOrder === order.id ? 'bg-emerald-50' : ''}`}
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-xs text-gray-400">{order.items} items</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{order.customer}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{order.seller}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.total}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${config.color}`}>
                          {config.icon}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <div className="text-sm text-gray-500">Showing 1-8 of 8,234 orders</div>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg">1</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">2</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">3</button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-1">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-6">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{selected.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[selected.status as keyof typeof statusConfig].color}`}>
                    {selected.status}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Customer */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">Customer</div>
                  <Link href={`/admin/members/${selected.customerId}`} className="text-emerald-600 hover:underline font-medium">
                    {selected.customer}
                  </Link>
                </div>

                {/* Seller */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">Seller</div>
                  <span className="text-gray-900">{selected.seller}</span>
                </div>

                {/* Address */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">Shipping Address</div>
                  <div className="flex items-center gap-2 text-gray-900">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {selected.address}
                  </div>
                </div>

                {/* Tracking */}
                {selected.tracking && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Tracking</div>
                    <div className="flex items-center gap-2 text-gray-900 font-mono text-sm">
                      <Truck className="w-4 h-4 text-gray-400" />
                      {selected.tracking}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{selected.items} items</span>
                    <span className="text-2xl font-bold text-gray-900">{selected.total}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {selected.status === 'processing' && (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Truck className="w-4 h-4" />
                      Mark as Shipped
                    </button>
                  )}
                  {selected.status === 'shipped' && (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <CheckCircle className="w-4 h-4" />
                      Mark as Delivered
                    </button>
                  )}
                  {selected.status === 'disputed' && (
                    <>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                        <CheckCircle className="w-4 h-4" />
                        Resolve in Favor of Customer
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                        Resolve in Favor of Seller
                      </button>
                    </>
                  )}
                  {['processing', 'shipped'].includes(selected.status) && (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                      <RefreshCw className="w-4 h-4" />
                      Process Refund
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select an order to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
