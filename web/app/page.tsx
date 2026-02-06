'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import Chat from '@/components/Chat'
import Plants from '@/components/Plants'
import Community from '@/components/Community'
import { Home, BarChart3, Leaf, Users, Phone, Settings } from 'lucide-react'

type Tab = 'home' | 'dashboard' | 'plants' | 'community'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [greenhouse, setGreenhouse] = useState<any>(null)
  const [readings, setReadings] = useState<any[]>([])

  // Fetch greenhouse data
  useEffect(() => {
    // In production, this would be authenticated
    fetchGreenhouseData()
    const interval = setInterval(fetchGreenhouseData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchGreenhouseData = async () => {
    try {
      // Mock data for now
      setGreenhouse({
        id: 'gh_001',
        name: 'Backyard Greenhouse',
        location: 'Zone 6b',
      })
      setReadings([
        { type: 'temperature', value: 72, unit: '°F', status: 'good' },
        { type: 'humidity', value: 61, unit: '%', status: 'good' },
        { type: 'soil_moisture', value: 45, unit: '%', status: 'good' },
        { type: 'light', value: 6.2, unit: 'hrs', status: 'good' },
      ])
    } catch (err) {
      console.error('Failed to fetch greenhouse data:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <h1 className="text-xl font-semibold text-gray-900">GrowTogether</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-greenhouse-500 text-white px-4 py-2 rounded-full hover:bg-greenhouse-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Call Now</span>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'home' && <Chat readings={readings} />}
        {activeTab === 'dashboard' && <Dashboard readings={readings} />}
        {activeTab === 'plants' && <Plants />}
        {activeTab === 'community' && <Community />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around max-w-md mx-auto">
          <NavButton
            icon={<Home className="w-5 h-5" />}
            label="Home"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <NavButton
            icon={<BarChart3 className="w-5 h-5" />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavButton
            icon={<Leaf className="w-5 h-5" />}
            label="Plants"
            active={activeTab === 'plants'}
            onClick={() => setActiveTab('plants')}
          />
          <NavButton
            icon={<Users className="w-5 h-5" />}
            label="Community"
            active={activeTab === 'community'}
            onClick={() => setActiveTab('community')}
          />
        </div>
      </nav>
    </div>
  )
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
        active
          ? 'text-greenhouse-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
