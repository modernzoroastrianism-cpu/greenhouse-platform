'use client'

import { useState } from 'react'
import { Users, Sprout, Heart, MessageCircle, MapPin, TrendingUp } from 'lucide-react'

interface Story {
  id: string
  author: string
  location: string
  content: string
  type: 'harvest' | 'milestone' | 'donation' | 'question'
  timestamp: Date
  likes: number
  comments: number
}

const mockStories: Story[] = [
  {
    id: '1',
    author: 'Sarah M.',
    location: 'Vermont',
    content: 'First tomatoes of the season! 🍅 Started from seed 67 days ago. So worth the wait!',
    type: 'harvest',
    timestamp: new Date('2026-02-05T14:30:00'),
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    author: 'The Martinez Family',
    location: 'Texas',
    content: 'Donated 15 lbs of peppers to our local food bank today. Growing extra feels amazing knowing it helps others. 💚',
    type: 'donation',
    timestamp: new Date('2026-02-05T10:15:00'),
    likes: 47,
    comments: 12,
  },
  {
    id: '3',
    author: 'Mike R.',
    location: 'Oregon',
    content: 'Aphids on my pepper plants — any organic solutions that work? Already tried neem oil.',
    type: 'question',
    timestamp: new Date('2026-02-05T08:45:00'),
    likes: 3,
    comments: 15,
  },
  {
    id: '4',
    author: 'Jenny K.',
    location: 'Michigan',
    content: 'One year with my AI gardener today! 🎉 Started knowing nothing, now I\'ve grown over 200 lbs of food. This community changed my life.',
    type: 'milestone',
    timestamp: new Date('2026-02-04T18:00:00'),
    likes: 89,
    comments: 23,
  },
]

const networkStats = {
  activeGrowers: 12847,
  foodGrown: 48291,
  foodDonated: 3402,
  familiesFed: 847,
}

export default function Community() {
  const [stories, setStories] = useState<Story[]>(mockStories)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'harvest':
        return '🍅'
      case 'donation':
        return '💚'
      case 'question':
        return '❓'
      case 'milestone':
        return '🎉'
      default:
        return '🌱'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'harvest':
        return 'bg-red-50 border-red-200'
      case 'donation':
        return 'bg-green-50 border-green-200'
      case 'question':
        return 'bg-blue-50 border-blue-200'
      case 'milestone':
        return 'bg-purple-50 border-purple-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Community</h2>
        <button className="text-sm text-greenhouse-600 font-medium">Share Update</button>
      </div>

      {/* Network Impact */}
      <div className="bg-gradient-to-br from-greenhouse-500 to-greenhouse-600 rounded-xl p-4 text-white">
        <h3 className="text-sm font-medium opacity-90 mb-3">🌍 Network Impact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">{networkStats.activeGrowers.toLocaleString()}</div>
            <div className="text-xs opacity-80">Active Growers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{networkStats.foodGrown.toLocaleString()}</div>
            <div className="text-xs opacity-80">lbs Food Grown</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{networkStats.foodDonated.toLocaleString()}</div>
            <div className="text-xs opacity-80">lbs Donated</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{networkStats.familiesFed.toLocaleString()}</div>
            <div className="text-xs opacity-80">Families Fed</div>
          </div>
        </div>
      </div>

      {/* Your Impact */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Your Contribution</h3>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">42</div>
            <div className="text-xs text-gray-500">lbs grown</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500">varieties</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-greenhouse-600">8</div>
            <div className="text-xs text-gray-500">lbs shared</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">67</div>
            <div className="text-xs text-gray-500">days active</div>
          </div>
        </div>
      </div>

      {/* Stories Feed */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {stories.map((story) => (
            <div
              key={story.id}
              className={`rounded-xl border p-4 ${getTypeColor(story.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getTypeIcon(story.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{story.author}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {story.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{story.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {story.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {story.comments}
                    </span>
                    <span>
                      {story.timestamp.toLocaleDateString()} at{' '}
                      {story.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Growers */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Growers Near You</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-greenhouse-100 border-2 border-white flex items-center justify-center text-xs">JK</div>
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs">MR</div>
              <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs">AL</div>
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">+5</div>
            </div>
            <span className="text-gray-600">8 growers within 10 miles</span>
          </div>
          <button className="text-greenhouse-600 font-medium">Connect</button>
        </div>
      </div>

      {/* Seed Swap */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🌻</div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Seed Swap Nearby</h3>
            <p className="text-sm text-gray-600">
              3 growers in your area are offering seeds. Share what you have!
            </p>
          </div>
          <button className="text-sm bg-amber-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-amber-600">
            Browse
          </button>
        </div>
      </div>
    </div>
  )
}
