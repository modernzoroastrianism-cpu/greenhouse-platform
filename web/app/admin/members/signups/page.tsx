'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, Check, X, Clock, Eye, Mail, Phone, MapPin, 
  Package, User, Calendar, DollarSign, AlertCircle
} from 'lucide-react'

// Mock data
const pendingSignups = [
  { 
    id: 'S-4521', 
    name: 'Sarah Chen', 
    email: 'sarah@example.com', 
    phone: '+1 555-123-4567',
    location: 'San Francisco, CA',
    package: 'Micro-Farm',
    packagePrice: '$9,999',
    sponsor: 'John Smith (M-12847)',
    submitted: '12 minutes ago',
    paymentStatus: 'paid',
    notes: ''
  },
  { 
    id: 'S-4520', 
    name: 'Mike Johnson', 
    email: 'mike@example.com', 
    phone: '+1 555-234-5678',
    location: 'Seattle, WA',
    package: 'Backyard Starter',
    packagePrice: '$499',
    sponsor: 'Jane Doe (M-12846)',
    submitted: '34 minutes ago',
    paymentStatus: 'paid',
    notes: ''
  },
  { 
    id: 'S-4519', 
    name: 'James Wilson', 
    email: 'james@example.com', 
    phone: '+1 555-345-6789',
    location: 'Portland, OR',
    package: 'Community Garden',
    packagePrice: '$2,499',
    sponsor: 'Bob Wilson (M-12845)',
    submitted: '1 hour ago',
    paymentStatus: 'pending',
    notes: 'Waiting for wire transfer confirmation'
  },
  { 
    id: 'S-4518', 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    phone: '+1 555-456-7890',
    location: 'Denver, CO',
    package: 'Balcony Kit',
    packagePrice: '$199',
    sponsor: 'Direct (no sponsor)',
    submitted: '2 hours ago',
    paymentStatus: 'paid',
    notes: ''
  },
  { 
    id: 'S-4517', 
    name: 'Robert Brown', 
    email: 'robert@example.com', 
    phone: '+1 555-567-8901',
    location: 'Austin, TX',
    package: 'Micro-Farm',
    packagePrice: '$9,999',
    sponsor: 'Sarah Chen (S-4521)',
    submitted: '3 hours ago',
    paymentStatus: 'failed',
    notes: 'Card declined - contacted customer'
  },
]

export default function SignupsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [signups, setSignups] = useState(pendingSignups)

  const selectedSignup = signups.find(s => s.id === selected)

  const handleApprove = (id: string) => {
    setSignups(prev => prev.filter(s => s.id !== id))
    setSelected(null)
    // In real app: API call to approve
  }

  const handleReject = (id: string) => {
    setSignups(prev => prev.filter(s => s.id !== id))
    setSelected(null)
    // In real app: API call to reject
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/members" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Signups</h1>
          <p className="text-gray-500">{signups.length} applications awaiting review</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* List */}
        <div className="col-span-1 space-y-3">
          {signups.map((signup) => (
            <button
              key={signup.id}
              onClick={() => setSelected(signup.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected === signup.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-medium text-gray-900">{signup.name}</div>
                <div className={`px-2 py-0.5 rounded-full text-xs ${
                  signup.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                  signup.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {signup.paymentStatus}
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-1">{signup.package} • {signup.packagePrice}</div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {signup.submitted}
              </div>
            </button>
          ))}

          {signups.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Check className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <div className="font-medium">All caught up!</div>
              <div className="text-sm">No pending signups to review</div>
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="col-span-2">
          {selectedSignup ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{selectedSignup.id}</div>
                    <div className="text-xl font-bold text-gray-900">{selectedSignup.name}</div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReject(selectedSignup.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(selectedSignup.id)}
                      disabled={selectedSignup.paymentStatus !== 'paid'}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Warning if payment not complete */}
                {selectedSignup.paymentStatus !== 'paid' && (
                  <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                    selectedSignup.paymentStatus === 'pending' ? 'bg-amber-50' : 'bg-red-50'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${
                      selectedSignup.paymentStatus === 'pending' ? 'text-amber-600' : 'text-red-600'
                    }`} />
                    <div>
                      <div className={`font-medium ${
                        selectedSignup.paymentStatus === 'pending' ? 'text-amber-800' : 'text-red-800'
                      }`}>
                        {selectedSignup.paymentStatus === 'pending' ? 'Payment Pending' : 'Payment Failed'}
                      </div>
                      <div className={`text-sm ${
                        selectedSignup.paymentStatus === 'pending' ? 'text-amber-700' : 'text-red-700'
                      }`}>
                        {selectedSignup.notes || 'Cannot approve until payment is confirmed'}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedSignup.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedSignup.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedSignup.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Package Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedSignup.package}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedSignup.packagePrice}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedSignup.sponsor}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">Submitted {selectedSignup.submitted}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Admin Notes</h3>
                  <textarea
                    placeholder="Add notes about this application..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                    <Eye className="w-4 h-4" />
                    View Sponsor Profile
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500">Select an application to review</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
