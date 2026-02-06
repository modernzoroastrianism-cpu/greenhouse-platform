'use client'

import { useState } from 'react'
import { Plus, ChevronRight, Calendar, Droplets, AlertCircle } from 'lucide-react'

interface Plant {
  id: string
  name: string
  variety: string
  plantedAt: Date
  expectedHarvestDays: number
  status: 'sprouting' | 'growing' | 'flowering' | 'fruiting' | 'ready' | 'harvested'
  zone: string
  lastWatered: Date
  nextAction: string
  imageEmoji: string
}

const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Cherry Tomatoes',
    variety: 'Sun Gold',
    plantedAt: new Date('2026-01-24'),
    expectedHarvestDays: 65,
    status: 'growing',
    zone: 'A1',
    lastWatered: new Date('2026-02-04'),
    nextAction: 'True leaves expected this week',
    imageEmoji: '🍅',
  },
  {
    id: '2',
    name: 'Basil',
    variety: 'Genovese',
    plantedAt: new Date('2026-01-28'),
    expectedHarvestDays: 30,
    status: 'growing',
    zone: 'A2',
    lastWatered: new Date('2026-02-05'),
    nextAction: 'First harvest in ~2 weeks',
    imageEmoji: '🌿',
  },
  {
    id: '3',
    name: 'Lettuce Mix',
    variety: 'Mesclun',
    plantedAt: new Date('2026-01-31'),
    expectedHarvestDays: 45,
    status: 'sprouting',
    zone: 'B1',
    lastWatered: new Date('2026-02-05'),
    nextAction: 'Thin seedlings soon',
    imageEmoji: '🥬',
  },
  {
    id: '4',
    name: 'Bell Peppers',
    variety: 'California Wonder',
    plantedAt: new Date('2026-01-20'),
    expectedHarvestDays: 75,
    status: 'growing',
    zone: 'A3',
    lastWatered: new Date('2026-02-04'),
    nextAction: 'Flowers expected in 2-3 weeks',
    imageEmoji: '🫑',
  },
]

export default function Plants() {
  const [plants, setPlants] = useState<Plant[]>(mockPlants)

  const getDaysOld = (plantedAt: Date) => {
    const now = new Date()
    const diff = now.getTime() - plantedAt.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  const getProgress = (plant: Plant) => {
    const daysOld = getDaysOld(plant.plantedAt)
    return Math.min((daysOld / plant.expectedHarvestDays) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sprouting':
        return 'bg-yellow-100 text-yellow-700'
      case 'growing':
        return 'bg-green-100 text-green-700'
      case 'flowering':
        return 'bg-purple-100 text-purple-700'
      case 'fruiting':
        return 'bg-orange-100 text-orange-700'
      case 'ready':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">My Plants</h2>
        <button className="flex items-center gap-1 bg-greenhouse-500 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-greenhouse-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add Plant
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
          <div className="text-2xl font-bold text-gray-900">{plants.length}</div>
          <div className="text-xs text-gray-500">Active Plants</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {plants.filter((p) => p.status === 'growing').length}
          </div>
          <div className="text-xs text-gray-500">Growing</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {plants.filter((p) => p.status === 'ready').length}
          </div>
          <div className="text-xs text-gray-500">Ready</div>
        </div>
      </div>

      {/* Plant List */}
      <div className="space-y-3">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:border-greenhouse-300 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              {/* Emoji Icon */}
              <div className="text-3xl">{plant.imageEmoji}</div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{plant.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                      plant.status
                    )}`}
                  >
                    {plant.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-2">{plant.variety}</p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Day {getDaysOld(plant.plantedAt)}</span>
                    <span>~{plant.expectedHarvestDays} days</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-greenhouse-500 rounded-full transition-all duration-500"
                      style={{ width: `${getProgress(plant)}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Planted {plant.plantedAt.toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    Zone {plant.zone}
                  </span>
                </div>

                {/* Next Action */}
                <div className="flex items-center gap-2 mt-2 text-xs text-greenhouse-600 bg-greenhouse-50 rounded-lg px-2 py-1">
                  <AlertCircle className="w-3 h-3" />
                  {plant.nextAction}
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Plant CTA */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">🌱</div>
        <p className="text-sm text-gray-600 mb-3">
          Ready to grow something new?
        </p>
        <button className="text-sm text-greenhouse-600 font-medium hover:text-greenhouse-700">
          + Add another plant
        </button>
      </div>
    </div>
  )
}
