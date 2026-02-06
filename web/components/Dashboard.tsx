'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { Thermometer, Droplets, Sun, Sprout, Wind, Zap, ChevronDown } from 'lucide-react'

interface DashboardProps {
  readings: any[]
}

// Mock historical data
const generateHistoricalData = () => {
  const data = []
  const now = new Date()
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: 68 + Math.random() * 10,
      humidity: 55 + Math.random() * 15,
      soil: 40 + Math.random() * 20,
    })
  }
  return data
}

export default function Dashboard({ readings }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('24h')
  const historicalData = generateHistoricalData()

  const currentReadings = {
    temperature: 72,
    humidity: 61,
    soil_moisture: 45,
    light: 6.2,
    co2: 420,
    power: 'OK',
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        <button className="flex items-center gap-1 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
          {timeRange}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Current Readings Grid */}
      <div className="grid grid-cols-3 gap-3">
        <ReadingCard
          icon={<Thermometer className="w-5 h-5" />}
          label="Temperature"
          value={currentReadings.temperature}
          unit="°F"
          status="good"
          color="text-orange-500"
          bgColor="bg-orange-50"
        />
        <ReadingCard
          icon={<Droplets className="w-5 h-5" />}
          label="Humidity"
          value={currentReadings.humidity}
          unit="%"
          status="good"
          color="text-blue-500"
          bgColor="bg-blue-50"
        />
        <ReadingCard
          icon={<Sprout className="w-5 h-5" />}
          label="Soil"
          value={currentReadings.soil_moisture}
          unit="%"
          status="good"
          color="text-green-500"
          bgColor="bg-green-50"
        />
        <ReadingCard
          icon={<Sun className="w-5 h-5" />}
          label="Light"
          value={currentReadings.light}
          unit="hrs"
          status="good"
          color="text-yellow-500"
          bgColor="bg-yellow-50"
        />
        <ReadingCard
          icon={<Wind className="w-5 h-5" />}
          label="CO₂"
          value={currentReadings.co2}
          unit="ppm"
          status="good"
          color="text-purple-500"
          bgColor="bg-purple-50"
        />
        <ReadingCard
          icon={<Zap className="w-5 h-5" />}
          label="Power"
          value={currentReadings.power}
          unit=""
          status="good"
          color="text-emerald-500"
          bgColor="bg-emerald-50"
        />
      </div>

      {/* Temperature Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Temperature (24h)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[60, 90]}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#tempGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Humidity & Soil Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Humidity & Soil Moisture (24h)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="soil"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-500">Humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500">Soil Moisture</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton label="💧 Water Now" onClick={() => {}} />
          <ActionButton label="🌬️ Open Vents" onClick={() => {}} />
          <ActionButton label="💨 Start Fan" onClick={() => {}} />
          <ActionButton label="📸 Take Photo" onClick={() => {}} />
        </div>
      </div>

      {/* Last Call Summary */}
      <div className="bg-greenhouse-50 rounded-xl border border-greenhouse-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📞</span>
          <span className="text-sm font-medium text-greenhouse-700">Last Call</span>
          <span className="text-xs text-greenhouse-500 ml-auto">Today 7:42 AM</span>
        </div>
        <p className="text-sm text-greenhouse-800">
          "Everything looks good. Temperature stayed between 68-75°F overnight. Your tomatoes should see true leaves this week!"
        </p>
      </div>
    </div>
  )
}

function ReadingCard({
  icon,
  label,
  value,
  unit,
  status,
  color,
  bgColor,
}: {
  icon: React.ReactNode
  label: string
  value: number | string
  unit: string
  status: 'good' | 'warning' | 'critical'
  color: string
  bgColor: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3">
      <div className={`inline-flex p-2 rounded-lg ${bgColor} ${color} mb-2`}>
        {icon}
      </div>
      <div className="text-xl font-semibold text-gray-900">
        {value}
        <span className="text-sm font-normal text-gray-500">{unit}</span>
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors"
    >
      {label}
    </button>
  )
}
