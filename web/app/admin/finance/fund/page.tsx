'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Plus, Eye, Check, X, DollarSign, TrendingUp,
  MapPin, Calendar, Users, Building, AlertTriangle, FileText
} from 'lucide-react'

// Mock data
const fundStats = {
  balance: 2847321,
  monthlyContribution: 127434,
  totalInvested: 1250000,
  totalProperties: 5,
  avgROI: 18.5,
}

const properties = [
  { 
    id: 'PROP-12', 
    name: 'Valley View Farm',
    location: 'Willamette Valley, OR',
    type: 'Greenhouse',
    price: 450000,
    size: '2.5 acres',
    status: 'due-diligence',
    roiEstimate: 18,
    scoutedBy: 'Scout Agent (AG-4528)',
    scoutedDate: '2024-02-01',
    notes: 'Excellent water rights, existing infrastructure',
    votes: { for: 234, against: 45 }
  },
  { 
    id: 'PROP-11', 
    name: 'Urban Greenhouse Co',
    location: 'Seattle, WA',
    type: 'Indoor Farm',
    price: 120000,
    size: '8,000 sq ft',
    status: 'voting',
    roiEstimate: 24,
    scoutedBy: 'Scout Agent (AG-4529)',
    scoutedDate: '2024-02-05',
    notes: 'High-density urban location, established customer base',
    votes: { for: 567, against: 89 }
  },
  { 
    id: 'PROP-10', 
    name: 'Hillside Acres',
    location: 'Burlington, VT',
    type: 'Mixed Farm',
    price: 380000,
    size: '5 acres',
    status: 'scouted',
    roiEstimate: 15,
    scoutedBy: 'Scout Agent (AG-4530)',
    scoutedDate: '2024-02-08',
    notes: 'Great climate for cool-season crops, needs greenhouse build',
    votes: { for: 0, against: 0 }
  },
  { 
    id: 'PROP-09', 
    name: 'Sunshine Hydroponics',
    location: 'Phoenix, AZ',
    type: 'Hydroponic',
    price: 275000,
    size: '12,000 sq ft',
    status: 'acquired',
    roiEstimate: 22,
    scoutedBy: 'Scout Agent (AG-4527)',
    scoutedDate: '2023-12-15',
    notes: 'Fully operational, producing $15K/month',
    actualROI: 21,
    acquiredDate: '2024-01-10'
  },
  { 
    id: 'PROP-08', 
    name: 'Green Valley Farms',
    location: 'Salinas, CA',
    type: 'Greenhouse',
    price: 650000,
    size: '4 acres',
    status: 'acquired',
    roiEstimate: 16,
    scoutedBy: 'Scout Agent (AG-4526)',
    scoutedDate: '2023-10-01',
    notes: 'Premium location in "Salad Bowl of America"',
    actualROI: 19,
    acquiredDate: '2023-11-15'
  },
  { 
    id: 'PROP-07', 
    name: 'Mountain View Plot',
    location: 'Boulder, CO',
    type: 'Land Only',
    price: 180000,
    size: '1.5 acres',
    status: 'rejected',
    roiEstimate: 8,
    scoutedBy: 'Scout Agent (AG-4525)',
    scoutedDate: '2024-01-20',
    notes: 'Water rights issues, high development costs',
    votes: { for: 89, against: 312 }
  },
]

const statusColors = {
  scouted: 'bg-gray-100 text-gray-700',
  'due-diligence': 'bg-amber-100 text-amber-700',
  voting: 'bg-blue-100 text-blue-700',
  acquired: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
}

const typeIcons = {
  Greenhouse: '🌿',
  'Indoor Farm': '🏢',
  'Mixed Farm': '🌾',
  Hydroponic: '💧',
  'Land Only': '🗺️',
}

export default function AcquisitionFundPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  const filteredProperties = properties.filter(p => 
    statusFilter === 'all' || p.status === statusFilter
  )

  const selected = properties.find(p => p.id === selectedProperty)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Acquisition Fund</h1>
          <p className="text-gray-500">Manage the 15% acquisition fund and property investments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* Fund Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white">
          <div className="text-sm text-emerald-100">Fund Balance</div>
          <div className="text-3xl font-bold">${(fundStats.balance / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Monthly Contribution</div>
          <div className="text-2xl font-bold text-gray-900">${(fundStats.monthlyContribution / 1000).toFixed(0)}K</div>
          <div className="text-xs text-emerald-600">15% of revenue</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Total Invested</div>
          <div className="text-2xl font-bold text-gray-900">${(fundStats.totalInvested / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Properties Owned</div>
          <div className="text-2xl font-bold text-gray-900">{fundStats.totalProperties}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Average ROI</div>
          <div className="text-2xl font-bold text-emerald-600">{fundStats.avgROI}%</div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="text-sm font-medium text-gray-700 mb-3">Acquisition Pipeline</div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">Scouted</span>
              <span className="font-medium text-gray-900">{properties.filter(p => p.status === 'scouted').length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full" />
          </div>
          <div className="text-gray-300">→</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">Due Diligence</span>
              <span className="font-medium text-amber-600">{properties.filter(p => p.status === 'due-diligence').length}</span>
            </div>
            <div className="h-2 bg-amber-200 rounded-full" />
          </div>
          <div className="text-gray-300">→</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">Voting</span>
              <span className="font-medium text-blue-600">{properties.filter(p => p.status === 'voting').length}</span>
            </div>
            <div className="h-2 bg-blue-200 rounded-full" />
          </div>
          <div className="text-gray-300">→</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">Acquired</span>
              <span className="font-medium text-emerald-600">{properties.filter(p => p.status === 'acquired').length}</span>
            </div>
            <div className="h-2 bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Property List */}
        <div className="col-span-2">
          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {['all', 'scouted', 'due-diligence', 'voting', 'acquired', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  statusFilter === status 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredProperties.map((property) => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property.id)}
                className={`w-full text-left bg-white rounded-xl border-2 p-4 transition-all ${
                  selectedProperty === property.id 
                    ? 'border-emerald-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{typeIcons[property.type as keyof typeof typeIcons]}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{property.name}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[property.status as keyof typeof statusColors]}`}>
                    {property.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-6 mt-3 text-sm">
                  <span className="flex items-center gap-1 font-medium text-gray-900">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    ${(property.price / 1000).toFixed(0)}K
                  </span>
                  <span className="text-gray-500">{property.size}</span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    {property.roiEstimate}% est. ROI
                  </span>
                </div>

                {property.status === 'voting' && property.votes && (
                  <div className="mt-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500"
                        style={{ width: `${(property.votes.for / (property.votes.for + property.votes.against)) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>✓ {property.votes.for} for</span>
                      <span>✗ {property.votes.against} against</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="col-span-1">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-6">
              <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <span className="text-6xl">{typeIcons[selected.type as keyof typeof typeIcons]}</span>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">{selected.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selected.status as keyof typeof statusColors]}`}>
                      {selected.status.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{selected.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {selected.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-500 text-xs">Price</div>
                    <div className="font-bold text-gray-900">${(selected.price / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-500 text-xs">Size</div>
                    <div className="font-bold text-gray-900">{selected.size}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-500 text-xs">Type</div>
                    <div className="font-bold text-gray-900">{selected.type}</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-2">
                    <div className="text-emerald-600 text-xs">Est. ROI</div>
                    <div className="font-bold text-emerald-700">{selected.roiEstimate}%</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Notes</div>
                  <p className="text-sm text-gray-700">{selected.notes}</p>
                </div>

                <div className="text-sm">
                  <div className="text-xs text-gray-500 mb-1">Scouted By</div>
                  <span className="text-emerald-600">{selected.scoutedBy}</span>
                  <span className="text-gray-400 ml-2">{selected.scoutedDate}</span>
                </div>

                {/* Actions based on status */}
                {selected.status === 'scouted' && (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                      <FileText className="w-4 h-4" />
                      Start Due Diligence
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                      <X className="w-4 h-4" />
                      Reject Property
                    </button>
                  </div>
                )}

                {selected.status === 'due-diligence' && (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Users className="w-4 h-4" />
                      Open for Voting
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      Request More Info
                    </button>
                  </div>
                )}

                {selected.status === 'voting' && (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <div className="bg-blue-50 rounded-lg p-3 mb-2">
                      <div className="text-sm font-medium text-blue-700 mb-1">Voting in Progress</div>
                      <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${(selected.votes!.for / (selected.votes!.for + selected.votes!.against)) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-blue-600 mt-1">
                        <span>✓ {selected.votes!.for}</span>
                        <span>✗ {selected.votes!.against}</span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <Check className="w-4 h-4" />
                      Force Approve
                    </button>
                  </div>
                )}

                {selected.status === 'acquired' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-emerald-700 font-medium">
                        <Check className="w-4 h-4" />
                        Acquired
                      </div>
                      <p className="text-sm text-emerald-600 mt-1">
                        Acquired on {selected.acquiredDate}
                        {selected.actualROI && ` • Actual ROI: ${selected.actualROI}%`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select a property to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
