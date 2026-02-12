'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, Eye, Check, X, Edit, MoreVertical,
  ChevronLeft, ChevronRight, Package, Clock, Star, Image
} from 'lucide-react'

// Mock data
const products = [
  { id: 'P-8921', name: 'Organic Heirloom Tomatoes (5 lb)', seller: 'GreenThumb Farm', sellerId: 'M-12847', price: '$24.99', category: 'Produce', status: 'pending', images: 4, submitted: '2h ago', rating: null },
  { id: 'P-8920', name: 'Weekly Veggie Subscription - Family', seller: 'Urban Greens Co', sellerId: 'M-12846', price: '$49.99/week', category: 'Subscriptions', status: 'pending', images: 6, submitted: '5h ago', rating: null },
  { id: 'P-8919', name: 'Microgreens Variety Pack', seller: 'Rooftop Roots', sellerId: 'M-12845', price: '$18.99', category: 'Produce', status: 'pending', images: 3, submitted: '8h ago', rating: null },
  { id: 'P-8918', name: 'Herb Garden Starter Kit', seller: 'Community Gardens', sellerId: 'M-12844', price: '$34.99', category: 'Kits', status: 'approved', images: 8, submitted: '1d ago', rating: 4.8 },
  { id: 'P-8917', name: 'Fresh Salad Mix (2 lb)', seller: 'Valley Gardens', sellerId: 'M-12843', price: '$12.99', category: 'Produce', status: 'approved', images: 2, submitted: '2d ago', rating: 4.5 },
  { id: 'P-8916', name: 'Pickled Vegetables Sampler', seller: 'Backyard Bounty', sellerId: 'M-12842', price: '$28.99', category: 'Preserved', status: 'rejected', images: 5, submitted: '3d ago', rating: null },
  { id: 'P-8915', name: 'Seasonal Fruit Box', seller: 'Hillside Farms', sellerId: 'M-12841', price: '$39.99', category: 'Produce', status: 'approved', images: 4, submitted: '3d ago', rating: 4.9 },
  { id: 'P-8914', name: 'Homemade Hot Sauce Set', seller: 'Spicy Greens', sellerId: 'M-12840', price: '$22.99', category: 'Preserved', status: 'flagged', images: 3, submitted: '4d ago', rating: null },
]

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  flagged: 'bg-purple-100 text-purple-700',
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.seller.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const selected = products.find(p => p.id === selectedProduct)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500">Review and manage marketplace listings</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold text-gray-900">2,341</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Pending Review</div>
          <div className="text-2xl font-bold text-amber-600">{products.filter(p => p.status === 'pending').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Flagged</div>
          <div className="text-2xl font-bold text-purple-600">{products.filter(p => p.status === 'flagged').length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Active Listings</div>
          <div className="text-2xl font-bold text-emerald-600">2,156</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Product List */}
        <div className="col-span-2">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products or sellers..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Seller</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedProduct === product.id ? 'bg-emerald-50' : ''}`}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-400">{product.id} • {product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{product.seller}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[product.status as keyof typeof statusColors]}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded" onClick={(e) => { e.stopPropagation(); }}>
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        {product.status === 'pending' && (
                          <>
                            <button className="p-1 hover:bg-emerald-100 rounded" onClick={(e) => { e.stopPropagation(); }}>
                              <Check className="w-4 h-4 text-emerald-600" />
                            </button>
                            <button className="p-1 hover:bg-red-100 rounded" onClick={(e) => { e.stopPropagation(); }}>
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-1">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-6">
              {/* Product Images */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <span className="text-sm text-gray-400">{selected.images} images</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selected.status as keyof typeof statusColors]}`}>
                    {selected.status}
                  </span>
                  <span className="text-sm text-gray-400">{selected.submitted}</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{selected.name}</h3>
                <p className="text-2xl font-bold text-emerald-600 mb-4">{selected.price}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Seller</span>
                    <Link href={`/admin/members/${selected.sellerId}`} className="text-emerald-600 hover:underline">
                      {selected.seller}
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="text-gray-900">{selected.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Product ID</span>
                    <span className="text-gray-900 font-mono">{selected.id}</span>
                  </div>
                  {selected.rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating</span>
                      <span className="text-gray-900 flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {selected.rating}
                      </span>
                    </div>
                  )}
                </div>

                {selected.status === 'pending' && (
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}

                {selected.status === 'flagged' && (
                  <div className="bg-purple-50 rounded-lg p-3 mb-4">
                    <div className="text-sm font-medium text-purple-800 mb-1">Flagged Reason</div>
                    <div className="text-sm text-purple-700">Images may contain non-food products</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a product to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
