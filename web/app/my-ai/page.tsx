'use client'

import { useState } from 'react'
import { Lock, Unlock, Zap, Heart, Star, TrendingUp, Sparkles, Crown, Shield, Bot, Leaf, ShoppingCart, Users, Brain, Eye, MessageCircle, Bell, BarChart3, Cpu, Rocket, Gift, ArrowRight, Check, Camera, MapPin, Award, Target, Trophy, Flame, Calendar, Clock, ThumbsUp, MessageSquare, Image, Edit3, HelpCircle, Flag, Plus } from 'lucide-react'
import Link from 'next/link'

// Contribution types with points (Google Local Guides style)
const contributionTypes = [
  { id: 'harvest', icon: '🥬', name: 'Log Harvest', points: 10, bonus: '+5 with photo', description: 'Record what you harvested' },
  { id: 'photo', icon: '📸', name: 'Add Photo', points: 5, bonus: '+3 with tags', description: 'Share greenhouse/produce pics' },
  { id: 'review', icon: '⭐', name: 'Product Review', points: 10, bonus: '+10 if 200+ chars', description: 'Review products you bought' },
  { id: 'tip', icon: '💡', name: 'Growing Tip', points: 15, bonus: '+10 if verified helpful', description: 'Share what works for you' },
  { id: 'answer', icon: '💬', name: 'Answer Question', points: 3, bonus: '+5 best answer', description: 'Help other growers' },
  { id: 'edit', icon: '✏️', name: 'Edit Info', points: 5, bonus: '', description: 'Update plant/product info' },
  { id: 'add-plant', icon: '🌱', name: 'Add Plant Variety', points: 15, bonus: '+5 with care guide', description: 'Document new varieties' },
  { id: 'fact-check', icon: '✓', name: 'Verify Info', points: 1, bonus: '', description: 'Confirm growing tips' },
  { id: 'sale', icon: '💰', name: 'Complete Sale', points: 25, bonus: '+10 repeat customer', description: 'Make a marketplace sale' },
  { id: 'recruit', icon: '👥', name: 'Recruit Member', points: 100, bonus: '+50 when they sell', description: 'Bring in new growers' },
  { id: 'milestone', icon: '🏆', name: 'Hit Production Goal', points: 50, bonus: 'varies by goal', description: 'Reach weekly/monthly targets' },
  { id: 'streak', icon: '🔥', name: 'Daily Check-in', points: 5, bonus: '+1 per streak day', description: 'Log in daily' },
]

// Level system (10 levels like Google)
const levels = [
  { level: 1, name: 'Seed', emoji: '🌰', points: 0, badge: false, perks: [] },
  { level: 2, name: 'Sprout', emoji: '🌱', points: 50, badge: false, perks: ['Basic growing tips'] },
  { level: 3, name: 'Seedling', emoji: '🌿', points: 150, badge: false, perks: ['Weekly digest email'] },
  { level: 4, name: 'Sapling', emoji: '🪴', points: 500, badge: true, perks: ['🏅 Profile badge', 'Pest detection'] },
  { level: 5, name: 'Tree', emoji: '🌳', points: 1500, badge: true, perks: ['Dynamic pricing', 'Priority support'] },
  { level: 6, name: 'Grove', emoji: '🌲', points: 5000, badge: true, perks: ['Auto-listings', 'Lead generation'] },
  { level: 7, name: 'Forest', emoji: '🏔️', points: 15000, badge: true, perks: ['Voice AI', 'Beta features'] },
  { level: 8, name: 'Ecosystem', emoji: '🌍', points: 50000, badge: true, perks: ['Multi-agent swarm', 'Custom AI persona'] },
  { level: 9, name: 'Guardian', emoji: '🛡️', points: 100000, badge: true, perks: ['Acquisition Council vote', 'Event invites'] },
  { level: 10, name: 'Legend', emoji: '🐉', points: 250000, badge: true, perks: ['Everything unlocked', 'Founding member status'] },
]

// Badges/Achievements (like Google's category badges)
const badges = [
  { id: 'first-harvest', name: 'First Harvest', emoji: '🥬', description: 'Log your first harvest', earned: true, category: 'Growing' },
  { id: 'green-thumb', name: 'Green Thumb', emoji: '👍', description: '10 successful harvests', earned: true, category: 'Growing' },
  { id: 'pest-hunter', name: 'Pest Hunter', emoji: '🐛', description: 'Identify 5 pest issues', earned: false, category: 'Growing' },
  { id: 'master-grower', name: 'Master Grower', emoji: '🌳', description: '100 harvests logged', earned: false, category: 'Growing' },
  { id: 'first-sale', name: 'First Sale', emoji: '💵', description: 'Complete your first sale', earned: true, category: 'Sales' },
  { id: 'regular-seller', name: 'Regular Seller', emoji: '🏪', description: '10 sales completed', earned: false, category: 'Sales' },
  { id: 'top-rated', name: 'Top Rated', emoji: '⭐', description: '4.8+ average rating', earned: false, category: 'Sales' },
  { id: 'big-earner', name: 'Big Earner', emoji: '💰', description: 'Earn $1,000 in sales', earned: false, category: 'Sales' },
  { id: 'networker', name: 'Networker', emoji: '🤝', description: 'Recruit your first member', earned: false, category: 'Network' },
  { id: 'team-builder', name: 'Team Builder', emoji: '👥', description: '5 active downline members', earned: false, category: 'Network' },
  { id: 'mentor', name: 'Mentor', emoji: '🎓', description: 'Help 3 members succeed', earned: false, category: 'Network' },
  { id: 'helper', name: 'Helper', emoji: '💬', description: 'Answer 25 questions', earned: false, category: 'Community' },
  { id: 'photographer', name: 'Photographer', emoji: '📸', description: 'Share 50 photos', earned: true, category: 'Community' },
  { id: 'tip-master', name: 'Tip Master', emoji: '💡', description: '10 tips marked helpful', earned: false, category: 'Community' },
  { id: 'streak-7', name: 'Week Warrior', emoji: '🔥', description: '7 day streak', earned: true, category: 'Engagement' },
  { id: 'streak-30', name: 'Monthly Master', emoji: '📅', description: '30 day streak', earned: false, category: 'Engagement' },
  { id: 'early-bird', name: 'Early Bird', emoji: '🌅', description: 'Check in before 7am', earned: true, category: 'Engagement' },
  { id: 'night-owl', name: 'Night Owl', emoji: '🦉', description: 'Check in after 10pm', earned: false, category: 'Engagement' },
]

// Feature unlocks by level
const featureUnlocks = [
  { level: 1, features: ['Basic sensor alerts', 'Daily reports', 'Marketplace listing'] },
  { level: 2, features: ['Personalized growing tips', 'Weather integration'] },
  { level: 3, features: ['Weekly performance digest', 'Compare to network average'] },
  { level: 4, features: ['🏅 Profile badge visible', 'Pest detection AI', 'Disease diagnosis'] },
  { level: 5, features: ['Dynamic pricing AI', 'Priority customer support', 'Advanced analytics'] },
  { level: 6, features: ['Auto-generate listings', 'Lead generation AI', 'Smart follow-ups'] },
  { level: 7, features: ['Voice assistant', 'Beta feature access', 'Predictive analytics'] },
  { level: 8, features: ['Multi-agent swarm', 'Custom AI persona & name', 'Full automation'] },
  { level: 9, features: ['Acquisition Council voting', 'Event invitations', 'Priority everything'] },
  { level: 10, features: ['All features forever', 'Founding member perks', 'Legacy status'] },
]

export default function MyAIPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'contribute' | 'badges' | 'levels'>('overview')
  
  // Demo state
  const [userState] = useState({
    name: 'Alex',
    aiName: 'Basil',
    aiEmoji: '🌿',
    level: 4,
    points: 623,
    pointsThisMonth: 187,
    streak: 12,
    totalContributions: 89,
    photosShared: 34,
    tipsGiven: 12,
    questionsAnswered: 23,
    salesCompleted: 8,
    recruits: 1,
  })

  const currentLevel = levels.find(l => l.level === userState.level)!
  const nextLevel = levels.find(l => l.level === userState.level + 1)
  const progressToNext = nextLevel 
    ? ((userState.points - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100
    : 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="py-6 px-6 border-b border-purple-500/30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Your AMNI Profile</h1>
            <p className="text-purple-300 text-sm">Contribute, level up, unlock features</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-white font-bold">{userState.name}</div>
              <div className="text-purple-300 text-sm">Level {userState.level} • {currentLevel.name}</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-2xl">
              {userState.aiEmoji}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-purple-500/30">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'contribute', label: 'Contribute', icon: '➕' },
              { id: 'badges', label: 'Badges', icon: '🏅' },
              { id: 'levels', label: 'Levels & Perks', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-white border-emerald-400'
                    : 'text-purple-300 border-transparent hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* AI Partner Card */}
            <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* AI Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-6xl shadow-2xl shadow-emerald-500/30 animate-pulse">
                    {userState.aiEmoji}
                  </div>
                  {currentLevel.badge && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-gray-900 rounded-full p-1">
                      <Award className="w-5 h-5" />
                    </div>
                  )}
                  {userState.streak >= 7 && (
                    <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full px-2 py-0.5 text-xs font-bold flex items-center gap-1">
                      🔥 {userState.streak}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-white">{userState.aiName}</h2>
                    <span className="text-purple-300">• Your AI Partner</span>
                  </div>
                  <p className="text-emerald-400 font-medium mb-4">Level {userState.level} {currentLevel.name} {currentLevel.emoji}</p>

                  {/* Points Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-purple-300">{userState.points.toLocaleString()} points</span>
                      {nextLevel && (
                        <span className="text-purple-400">{nextLevel.points.toLocaleString()} to Level {nextLevel.level}</span>
                      )}
                    </div>
                    <div className="h-3 bg-purple-900/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressToNext, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <QuickStat icon="📝" value={userState.totalContributions} label="Contributions" />
                    <QuickStat icon="📸" value={userState.photosShared} label="Photos" />
                    <QuickStat icon="💬" value={userState.questionsAnswered} label="Answers" />
                    <QuickStat icon="💰" value={userState.salesCompleted} label="Sales" />
                  </div>
                </div>
              </div>
            </div>

            {/* This Month's Activity */}
            <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Month
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-900/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-400">{userState.pointsThisMonth}</div>
                  <div className="text-purple-300 text-sm">Points earned</div>
                </div>
                <div className="bg-purple-900/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400">{userState.streak}</div>
                  <div className="text-purple-300 text-sm">Day streak 🔥</div>
                </div>
                <div className="bg-purple-900/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">Top 15%</div>
                  <div className="text-purple-300 text-sm">In your region</div>
                </div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Recent Badges
                </h3>
                <button 
                  onClick={() => setActiveTab('badges')}
                  className="text-emerald-400 text-sm hover:underline"
                >
                  View all →
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {badges.filter(b => b.earned).slice(0, 5).map((badge) => (
                  <div key={badge.id} className="flex-shrink-0 bg-gradient-to-b from-yellow-900/30 to-amber-900/30 rounded-xl p-4 text-center w-24 border border-yellow-500/30">
                    <div className="text-3xl mb-2">{badge.emoji}</div>
                    <div className="text-xs text-white font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contribute */}
            <div className="bg-emerald-900/30 rounded-xl p-6 border border-emerald-500/30">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Quick Contribute
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contributionTypes.slice(0, 4).map((type) => (
                  <button key={type.id} className="bg-emerald-800/50 hover:bg-emerald-700/50 rounded-lg p-4 text-center transition-colors border border-emerald-500/30">
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-white text-sm font-medium">{type.name}</div>
                    <div className="text-emerald-400 text-xs">+{type.points} pts</div>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab('contribute')}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-medium transition-colors"
              >
                See all ways to contribute →
              </button>
            </div>

            {/* Unlocked Features */}
            <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Unlock className="w-5 h-5" />
                  Your Unlocked Features
                </h3>
                <button 
                  onClick={() => setActiveTab('levels')}
                  className="text-emerald-400 text-sm hover:underline"
                >
                  See all levels →
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {featureUnlocks.slice(0, userState.level).flatMap(u => u.features).slice(-6).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              {nextLevel && (
                <div className="mt-4 pt-4 border-t border-purple-500/30">
                  <p className="text-purple-300 text-sm">
                    <span className="text-yellow-400">Next unlock at Level {nextLevel.level}:</span> {featureUnlocks.find(u => u.level === nextLevel.level)?.features[0]}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contribute Tab */}
        {activeTab === 'contribute' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Ways to Contribute</h2>
              <p className="text-purple-300">Share your knowledge, earn points, level up your AI</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributionTypes.map((type) => (
                <ContributionCard key={type.id} contribution={type} />
              ))}
            </div>

            <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30 text-center">
              <h3 className="text-xl font-bold text-white mb-2">💡 Pro Tip</h3>
              <p className="text-yellow-200">
                Higher quality contributions earn bonus points! Add photos to your harvests, 
                write detailed tips, and help answer questions to maximize your earnings.
              </p>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Badges</h2>
              <p className="text-purple-300">
                {badges.filter(b => b.earned).length} of {badges.length} earned
              </p>
            </div>

            {['Growing', 'Sales', 'Network', 'Community', 'Engagement'].map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-bold text-white">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {badges.filter(b => b.category === category).map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Levels Tab */}
        {activeTab === 'levels' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Levels & Perks</h2>
              <p className="text-purple-300">Earn points to unlock new AI features</p>
            </div>

            <div className="space-y-4">
              {levels.map((level) => (
                <LevelCard 
                  key={level.level} 
                  level={level}
                  features={featureUnlocks.find(u => u.level === level.level)?.features || []}
                  isCurrentLevel={level.level === userState.level}
                  isUnlocked={level.level <= userState.level}
                  userPoints={userState.points}
                />
              ))}
            </div>

            {/* Skip the grind */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-xl p-8 border border-yellow-500/30 text-center mt-8">
              <h3 className="text-2xl font-bold text-white mb-2">⚡ Want It All Now?</h3>
              <p className="text-yellow-200 mb-6">
                Skip the grind and unlock every feature instantly with AMNI Pro
              </p>
              <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-amber-400 transition-all">
                Unlock Everything — $79/mo
              </button>
              <p className="text-yellow-300/70 text-sm mt-3">
                Or earn it for free by contributing to the community
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

function QuickStat({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div>
      <div className="text-lg mb-0.5">{icon}</div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-purple-300">{label}</div>
    </div>
  )
}

function ContributionCard({ contribution }: { contribution: typeof contributionTypes[0] }) {
  return (
    <div className="bg-purple-800/30 rounded-xl p-5 border border-purple-500/20 hover:border-emerald-500/50 transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{contribution.icon}</div>
        <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-sm font-bold">
          +{contribution.points}
        </div>
      </div>
      <h4 className="text-white font-bold mb-1">{contribution.name}</h4>
      <p className="text-purple-300 text-sm mb-2">{contribution.description}</p>
      {contribution.bonus && (
        <div className="text-amber-400 text-xs">{contribution.bonus}</div>
      )}
    </div>
  )
}

function BadgeCard({ badge }: { badge: typeof badges[0] }) {
  return (
    <div className={`
      rounded-xl p-4 text-center transition-all border
      ${badge.earned 
        ? 'bg-gradient-to-b from-yellow-900/30 to-amber-900/30 border-yellow-500/30' 
        : 'bg-gray-800/30 border-gray-700/30 opacity-50'
      }
    `}>
      <div className={`text-3xl mb-2 ${!badge.earned ? 'grayscale' : ''}`}>{badge.emoji}</div>
      <div className={`font-bold text-sm mb-1 ${badge.earned ? 'text-white' : 'text-gray-500'}`}>{badge.name}</div>
      <div className="text-xs text-gray-400">{badge.description}</div>
      {badge.earned && <div className="text-yellow-400 text-xs mt-2">✓ Earned</div>}
    </div>
  )
}

function LevelCard({ level, features, isCurrentLevel, isUnlocked, userPoints }: { 
  level: typeof levels[0]
  features: string[]
  isCurrentLevel: boolean
  isUnlocked: boolean
  userPoints: number
}) {
  return (
    <div className={`
      rounded-xl p-5 border transition-all
      ${isCurrentLevel 
        ? 'bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-500 ring-2 ring-emerald-500/30' 
        : isUnlocked
          ? 'bg-purple-800/30 border-purple-500/30'
          : 'bg-gray-800/30 border-gray-700/30 opacity-70'
      }
    `}>
      <div className="flex items-start gap-4">
        <div className={`text-4xl ${!isUnlocked ? 'grayscale' : ''}`}>{level.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
              Level {level.level}: {level.name}
            </span>
            {level.badge && isUnlocked && (
              <span className="bg-yellow-400 text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold">
                🏅 Badge
              </span>
            )}
            {isCurrentLevel && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                YOU
              </span>
            )}
          </div>
          <div className="text-purple-300 text-sm mb-2">
            {level.points.toLocaleString()} points required
            {isUnlocked && !isCurrentLevel && <span className="text-emerald-400"> ✓</span>}
          </div>
          
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {features.map((feature, i) => (
                <span 
                  key={i} 
                  className={`text-xs px-2 py-1 rounded-full ${
                    isUnlocked 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-gray-700/50 text-gray-500'
                  }`}
                >
                  {isUnlocked ? '✓' : '🔒'} {feature}
                </span>
              ))}
            </div>
          )}
        </div>
        {!isUnlocked && (
          <div className="text-right">
            <div className="text-gray-400 text-sm">
              {(level.points - userPoints).toLocaleString()} pts to go
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
