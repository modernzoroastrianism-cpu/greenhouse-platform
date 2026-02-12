'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ExternalLink, Settings, Shield, Zap, AlertCircle, ChevronRight, Search, Filter, RefreshCw, Clock, Activity, Lock, Unlock, ToggleLeft, ToggleRight, Plus, X, DollarSign, CreditCard, Users, ShoppingCart, Mail, MessageCircle, Calendar, Cloud, Thermometer, Home, BarChart3, Globe } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface Integration {
  id: string
  name: string
  description: string
  icon: string
  category: string
  connected: boolean
  status?: 'active' | 'error' | 'paused'
  lastSync?: string
  features: string[]
  usedBy: string[]
  popular?: boolean
  comingSoon?: boolean
  approvalSettings?: {
    threshold: number
    requireApproval: string[]
  }
}

// =============================================================================
// DATA
// =============================================================================

const integrations: Integration[] = [
  // Accounting
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Sync invoices, expenses, and financial reports',
    icon: '📗',
    category: 'Accounting',
    connected: true,
    status: 'active',
    lastSync: '5 min ago',
    features: ['Auto-sync sales', 'Generate invoices', 'Track expenses', 'P&L reports'],
    usedBy: ['Analytics Agent'],
    popular: true,
    approvalSettings: { threshold: 100, requireApproval: ['refunds', 'payouts'] },
  },
  {
    id: 'xero',
    name: 'Xero',
    description: 'Cloud accounting for small business',
    icon: '📘',
    category: 'Accounting',
    connected: false,
    features: ['Invoice automation', 'Bank reconciliation', 'Financial reports'],
    usedBy: ['Analytics Agent'],
  },
  {
    id: 'wave',
    name: 'Wave',
    description: 'Free accounting for small businesses',
    icon: '🌊',
    category: 'Accounting',
    connected: false,
    features: ['Free invoicing', 'Expense tracking', 'Basic reports'],
    usedBy: ['Analytics Agent'],
  },

  // Payments
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Accept payments and manage payouts',
    icon: '💳',
    category: 'Payments',
    connected: true,
    status: 'active',
    lastSync: '2 min ago',
    features: ['Payment links', 'Subscriptions', 'Payouts', 'Refunds'],
    usedBy: ['Sales Agent'],
    popular: true,
    approvalSettings: { threshold: 50, requireApproval: ['refunds', 'payouts'] },
  },
  {
    id: 'square',
    name: 'Square',
    description: 'In-person and online payments',
    icon: '⬜',
    category: 'Payments',
    connected: false,
    features: ['POS integration', 'Invoicing', 'Online payments'],
    usedBy: ['Sales Agent'],
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Online payments and money transfers',
    icon: '🅿️',
    category: 'Payments',
    connected: false,
    features: ['Accept payments', 'Send money', 'Invoicing'],
    usedBy: ['Sales Agent'],
  },

  // CRM
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM, marketing, and sales automation',
    icon: '🧡',
    category: 'CRM',
    connected: false,
    features: ['Contact management', 'Deal tracking', 'Email sequences', 'Analytics'],
    usedBy: ['Recruiting Agent', 'Sales Agent'],
    popular: true,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Enterprise CRM platform',
    icon: '☁️',
    category: 'CRM',
    connected: false,
    features: ['Lead management', 'Opportunity tracking', 'Reports'],
    usedBy: ['Recruiting Agent'],
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    description: 'Sales CRM for small teams',
    icon: '🔵',
    category: 'CRM',
    connected: false,
    features: ['Pipeline management', 'Activity tracking', 'Email integration'],
    usedBy: ['Recruiting Agent'],
  },

  // E-Commerce
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'E-commerce platform for online stores',
    icon: '🛒',
    category: 'E-Commerce',
    connected: false,
    features: ['Product sync', 'Order management', 'Inventory', 'Analytics'],
    usedBy: ['Sales Agent'],
    popular: true,
  },
  {
    id: 'etsy',
    name: 'Etsy',
    description: 'Marketplace for handmade and vintage',
    icon: '🧶',
    category: 'E-Commerce',
    connected: false,
    features: ['Listing management', 'Order sync', 'Message handling'],
    usedBy: ['Sales Agent'],
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'WordPress e-commerce plugin',
    icon: '🟣',
    category: 'E-Commerce',
    connected: false,
    features: ['Product management', 'Order sync', 'Inventory'],
    usedBy: ['Sales Agent'],
  },

  // Communication
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'SMS, voice, and WhatsApp messaging',
    icon: '📱',
    category: 'Communication',
    connected: true,
    status: 'active',
    lastSync: 'Real-time',
    features: ['Send SMS', 'WhatsApp', 'Voice calls', 'Scheduled messages'],
    usedBy: ['All Agents'],
    popular: true,
    approvalSettings: { threshold: 10, requireApproval: ['bulk_messages', 'voice_calls'] },
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Email delivery and marketing',
    icon: '📧',
    category: 'Communication',
    connected: true,
    status: 'active',
    lastSync: 'Real-time',
    features: ['Transactional email', 'Marketing campaigns', 'Templates'],
    usedBy: ['All Agents'],
    approvalSettings: { threshold: 50, requireApproval: ['bulk_campaigns'] },
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and automation',
    icon: '🐵',
    category: 'Communication',
    connected: false,
    features: ['Email campaigns', 'Automation', 'Audience management'],
    usedBy: ['Recruiting Agent'],
  },

  // Social Media
  {
    id: 'meta',
    name: 'Meta (Facebook/Instagram)',
    description: 'Social media posting and ads',
    icon: '📘',
    category: 'Social Media',
    connected: false,
    features: ['Post to Pages', 'Respond to comments', 'Run ads', 'Insights'],
    usedBy: ['Sales Agent', 'Recruiting Agent'],
    popular: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Professional networking',
    icon: '💼',
    category: 'Social Media',
    connected: false,
    features: ['Post content', 'Send connections', 'Message prospects'],
    usedBy: ['Recruiting Agent'],
  },

  // Calendar
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Schedule and manage events',
    icon: '📅',
    category: 'Calendar',
    connected: true,
    status: 'active',
    lastSync: 'Real-time',
    features: ['Create events', 'Check availability', 'Send invites'],
    usedBy: ['All Agents'],
  },
  {
    id: 'calendly',
    name: 'Calendly',
    description: 'Scheduling automation',
    icon: '🗓️',
    category: 'Calendar',
    connected: false,
    features: ['Booking pages', 'Availability sync', 'Reminders'],
    usedBy: ['Recruiting Agent', 'Sales Agent'],
  },

  // IoT
  {
    id: 'sensor-hub',
    name: 'AMNI Sensor Hub',
    description: 'Greenhouse sensors and climate control',
    icon: '🌡️',
    category: 'IoT',
    connected: true,
    status: 'active',
    lastSync: 'Real-time',
    features: ['Temperature', 'Humidity', 'Soil moisture', 'Climate control'],
    usedBy: ['Growing Agent'],
    approvalSettings: { threshold: 0, requireApproval: ['major_climate_changes'] },
  },

  // Weather
  {
    id: 'openweather',
    name: 'OpenWeather',
    description: 'Weather forecasts and alerts',
    icon: '🌤️',
    category: 'Weather',
    connected: true,
    status: 'active',
    lastSync: '1 hour ago',
    features: ['Current weather', 'Forecasts', 'Alerts', 'Historical data'],
    usedBy: ['Growing Agent'],
  },

  // Real Estate
  {
    id: 'zillow',
    name: 'Zillow',
    description: 'Property search and valuations',
    icon: '🏠',
    category: 'Real Estate',
    connected: false,
    features: ['Property search', 'Zestimate', 'Market data'],
    usedBy: ['Scout Agent'],
    comingSoon: true,
  },
]

const categories = [
  { id: 'all', label: 'All', icon: <Globe className="w-4 h-4" /> },
  { id: 'Accounting', label: 'Accounting', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'Payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'CRM', label: 'CRM', icon: <Users className="w-4 h-4" /> },
  { id: 'E-Commerce', label: 'E-Commerce', icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'Communication', label: 'Communication', icon: <MessageCircle className="w-4 h-4" /> },
  { id: 'Social Media', label: 'Social', icon: <Globe className="w-4 h-4" /> },
  { id: 'Calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
  { id: 'IoT', label: 'IoT', icon: <Thermometer className="w-4 h-4" /> },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function IntegrationsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const filteredIntegrations = integrations.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                         i.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || i.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const connectedCount = integrations.filter(i => i.connected).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="py-6 px-6 border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-1">Integrations</h1>
          <p className="text-purple-300">Connect your AI agents to external services</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-purple-800/30 rounded-xl p-4 border border-purple-500/20">
            <div className="text-3xl font-bold text-white">{connectedCount}</div>
            <div className="text-purple-300 text-sm">Connected</div>
          </div>
          <div className="bg-purple-800/30 rounded-xl p-4 border border-purple-500/20">
            <div className="text-3xl font-bold text-white">{integrations.length - connectedCount}</div>
            <div className="text-purple-300 text-sm">Available</div>
          </div>
          <div className="bg-purple-800/30 rounded-xl p-4 border border-purple-500/20">
            <div className="text-3xl font-bold text-emerald-400">Active</div>
            <div className="text-purple-300 text-sm">MCP Gateway Status</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="w-full pl-10 pr-4 py-3 bg-purple-800/30 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-800/30 text-purple-300 hover:bg-purple-700/30'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Integration Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onClick={() => setSelectedIntegration(integration)}
            />
          ))}
        </div>

        {/* Integration Detail Modal */}
        {selectedIntegration && (
          <IntegrationModal
            integration={selectedIntegration}
            onClose={() => setSelectedIntegration(null)}
          />
        )}
      </main>
    </div>
  )
}

// =============================================================================
// COMPONENTS
// =============================================================================

function IntegrationCard({ integration, onClick }: { integration: Integration; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl p-5 border cursor-pointer transition-all hover:scale-[1.02]
        ${integration.connected
          ? 'bg-emerald-900/20 border-emerald-500/30'
          : integration.comingSoon
            ? 'bg-gray-800/30 border-gray-700/30 opacity-60'
            : 'bg-purple-800/30 border-purple-500/20 hover:border-purple-400/40'
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{integration.icon}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{integration.name}</span>
              {integration.popular && (
                <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">Popular</span>
              )}
              {integration.comingSoon && (
                <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full">Coming Soon</span>
              )}
            </div>
            <div className="text-purple-400 text-xs">{integration.category}</div>
          </div>
        </div>
        {integration.connected ? (
          <div className="flex items-center gap-1 text-emerald-400 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Connected
          </div>
        ) : (
          <ChevronRight className="w-5 h-5 text-purple-400" />
        )}
      </div>

      <p className="text-purple-300 text-sm mb-3">{integration.description}</p>

      <div className="flex items-center justify-between text-xs">
        <div className="text-purple-400">
          Used by: {integration.usedBy.join(', ')}
        </div>
        {integration.lastSync && (
          <div className="text-emerald-400 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            {integration.lastSync}
          </div>
        )}
      </div>
    </div>
  )
}

function IntegrationModal({ integration, onClose }: { integration: Integration; onClose: () => void }) {
  const [threshold, setThreshold] = useState(integration.approvalSettings?.threshold || 100)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-purple-500/30">
        {/* Header */}
        <div className="p-6 border-b border-purple-500/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{integration.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-white">{integration.name}</h2>
                <div className="text-purple-400 text-sm">{integration.category}</div>
              </div>
            </div>
            <button onClick={onClose} className="text-purple-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-purple-200">{integration.description}</p>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {integration.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-purple-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Used By */}
          <div>
            <h3 className="text-white font-semibold mb-3">Used by Agents</h3>
            <div className="flex flex-wrap gap-2">
              {integration.usedBy.map((agent) => (
                <span key={agent} className="bg-purple-800/50 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {agent}
                </span>
              ))}
            </div>
          </div>

          {/* Settings (if connected) */}
          {integration.connected && (
            <div>
              <h3 className="text-white font-semibold mb-3">Approval Settings</h3>
              <div className="bg-purple-800/30 rounded-lg p-4 space-y-4">
                <div>
                  <label className="text-purple-300 text-sm block mb-2">
                    Require approval for transactions over:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-white">$</span>
                    <input
                      type="number"
                      value={threshold}
                      onChange={(e) => setThreshold(Number(e.target.value))}
                      className="bg-purple-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white w-24"
                    />
                  </div>
                </div>
                <div className="text-purple-400 text-sm flex items-start gap-2">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Transactions under this amount will be auto-approved. You'll be notified for larger amounts.</span>
                </div>
              </div>
            </div>
          )}

          {/* Status (if connected) */}
          {integration.connected && (
            <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 font-medium">Connected & Active</span>
                </div>
                <span className="text-emerald-300 text-sm">Last sync: {integration.lastSync}</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-purple-500/30">
          {integration.connected ? (
            <div className="flex gap-3">
              <button className="flex-1 bg-purple-700/50 hover:bg-purple-600/50 text-white py-3 rounded-xl font-medium">
                Settings
              </button>
              <button className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-3 rounded-xl font-medium border border-red-500/30">
                Disconnect
              </button>
            </div>
          ) : integration.comingSoon ? (
            <button disabled className="w-full bg-gray-700/50 text-gray-400 py-3 rounded-xl font-medium cursor-not-allowed">
              Coming Soon
            </button>
          ) : (
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Connect {integration.name}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
