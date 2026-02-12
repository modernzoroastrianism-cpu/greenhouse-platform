'use client'

import { useState } from 'react'
import { 
  Settings, Shield, DollarSign, Globe, Bell, Key, Users,
  Save, AlertTriangle, Check, Eye, EyeOff
} from 'lucide-react'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')
  const [showApiKey, setShowApiKey] = useState(false)

  const sections = [
    { id: 'general', name: 'General', icon: <Settings className="w-4 h-4" /> },
    { id: 'compensation', name: 'Compensation', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'network', name: 'Network Rules', icon: <Globe className="w-4 h-4" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'api', name: 'API Keys', icon: <Key className="w-4 h-4" /> },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Configure platform settings and rules</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 last:border-0 ${
                  activeSection === section.id 
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-l-emerald-500' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3">
          {/* General Settings */}
          {activeSection === 'general' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="AMNI - As Mother Nature Intended"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    defaultValue="support@amni.farm"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Timezone</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-600">Enable maintenance mode (site will be unavailable)</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Compensation Settings */}
          {activeSection === 'compensation' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Compensation Settings</h2>
              
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-amber-800">Caution</div>
                      <p className="text-sm text-amber-700">Changes to compensation settings affect all member payouts. Consult legal before making changes.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Acquisition Fund Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue="15"
                        className="w-24 px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Operations Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue="15"
                        className="w-24 px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Producer Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue="60"
                        className="w-24 px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Donation Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-24 px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payout Threshold</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      defaultValue="50"
                      className="w-32 px-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payout Schedule</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Network Rules */}
          {activeSection === 'network' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Network Rules</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Agents Per Member</label>
                  <input
                    type="number"
                    defaultValue="6"
                    className="w-32 px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bounty Minimum Reward</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue="25"
                      className="w-32 px-4 py-2 border border-gray-200 rounded-lg"
                    />
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coalition Minimum Members</label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-32 px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reputation Decay (Inactive)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-24 px-4 py-2 border border-gray-200 rounded-lg"
                    />
                    <span className="text-gray-500">% per month after 30 days inactive</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Require human approval for coalition creation</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Auto-flag posts with external links</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Require 2FA for admin actions</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-24 px-4 py-2 border border-gray-200 rounded-lg"
                    />
                    <span className="text-gray-500">minutes</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-24 px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (one per line)</label>
                  <textarea
                    rows={4}
                    placeholder="192.168.1.1&#10;10.0.0.0/8"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-700">Enable IP whitelist (restrict admin access)</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* API Keys */}
          {activeSection === 'api' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">API Keys</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Live API Key</span>
                    <button 
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-emerald-600 text-sm"
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-4 py-2 rounded border border-gray-200 font-mono text-sm">
                      {showApiKey ? 'amni_live_sk_1234567890abcdef' : '••••••••••••••••••••••••••'}
                    </code>
                    <button className="px-3 py-2 border border-gray-200 rounded hover:bg-gray-100 text-sm">
                      Copy
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Test API Key</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-4 py-2 rounded border border-gray-200 font-mono text-sm">
                      amni_test_sk_0987654321fedcba
                    </code>
                    <button className="px-3 py-2 border border-gray-200 rounded hover:bg-gray-100 text-sm">
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Webhook Endpoints</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Stripe</div>
                        <code className="text-xs text-gray-500">https://api.amni.farm/webhooks/stripe</code>
                      </div>
                      <span className="flex items-center gap-1 text-emerald-600 text-sm">
                        <Check className="w-4 h-4" />
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">SendGrid</div>
                        <code className="text-xs text-gray-500">https://api.amni.farm/webhooks/sendgrid</code>
                      </div>
                      <span className="flex items-center gap-1 text-emerald-600 text-sm">
                        <Check className="w-4 h-4" />
                        Connected
                      </span>
                    </div>
                  </div>
                </div>

                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                  Regenerate API Keys
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Admin Notifications</h3>
                
                {[
                  { label: 'New member signups', enabled: true },
                  { label: 'Large payouts (>$1,000)', enabled: true },
                  { label: 'Flagged content', enabled: true },
                  { label: 'Support ticket escalations', enabled: true },
                  { label: 'Coalition requests', enabled: false },
                  { label: 'Governance proposals', enabled: false },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.label}</span>
                    <input type="checkbox" defaultChecked={item.enabled} className="rounded border-gray-300" />
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
