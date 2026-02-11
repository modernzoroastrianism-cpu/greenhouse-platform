'use client'

import { useState } from 'react'
import { Lock, Unlock, Zap, Heart, Star, TrendingUp, Sparkles, Crown, Shield, Bot, Leaf, ShoppingCart, Users, Brain, Eye, MessageCircle, Bell, BarChart3, Cpu, Rocket, Gift, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

// AI Evolution stages
const evolutionStages = [
  { level: 1, name: 'Seedling', emoji: '🌱', xpRequired: 0, description: 'Just sprouted! Learning the basics.' },
  { level: 2, name: 'Sprout', emoji: '🌿', xpRequired: 500, description: 'Growing stronger every day.' },
  { level: 3, name: 'Sapling', emoji: '🪴', xpRequired: 2000, description: 'Developing real skills.' },
  { level: 4, name: 'Tree', emoji: '🌳', xpRequired: 5000, description: 'A reliable partner.' },
  { level: 5, name: 'Grove', emoji: '🌲', xpRequired: 15000, description: 'Expanding capabilities.' },
  { level: 6, name: 'Forest', emoji: '🏔️', xpRequired: 50000, description: 'Mastering the craft.' },
  { level: 7, name: 'Guardian', emoji: '🐉', xpRequired: 100000, description: 'Legendary status achieved.' },
]

// Feature unlock tiers
const featureTiers = [
  {
    tier: 'Core',
    color: 'emerald',
    unlockMethod: 'Included with all packages',
    features: [
      { id: 'sensor-basic', name: 'Basic Sensor Monitoring', icon: '📊', description: 'Temperature, humidity alerts', unlocked: true },
      { id: 'harvest-remind', name: 'Harvest Reminders', icon: '🥬', description: 'Know when to pick', unlocked: true },
      { id: 'daily-report', name: 'Daily Reports', icon: '📋', description: 'Morning & evening summaries', unlocked: true },
      { id: 'marketplace-list', name: 'Marketplace Listings', icon: '🏪', description: 'List your produce', unlocked: true },
    ]
  },
  {
    tier: 'Growing',
    color: 'blue',
    unlockMethod: 'Reach Level 2 OR pay $9.99/mo',
    features: [
      { id: 'pest-detect', name: 'Pest Detection', icon: '🐛', description: 'AI identifies pests from photos', unlocked: false, price: 9.99 },
      { id: 'disease-diag', name: 'Disease Diagnosis', icon: '🔬', description: 'Plant health analysis', unlocked: false, price: 9.99 },
      { id: 'grow-tips', name: 'Personalized Growing Tips', icon: '💡', description: 'AI learns your garden', unlocked: false, price: 9.99 },
      { id: 'weather-int', name: 'Weather Integration', icon: '🌤️', description: 'Forecasts affect recommendations', unlocked: false, price: 9.99 },
    ]
  },
  {
    tier: 'Sales',
    color: 'amber',
    unlockMethod: 'Reach Level 3 OR pay $14.99/mo',
    features: [
      { id: 'dynamic-price', name: 'Dynamic Pricing', icon: '💰', description: 'AI optimizes your prices', unlocked: false, price: 14.99 },
      { id: 'demand-forecast', name: 'Demand Forecasting', icon: '📈', description: 'Predict what will sell', unlocked: false, price: 14.99 },
      { id: 'auto-listing', name: 'Auto-Listings', icon: '✨', description: 'AI creates listings for you', unlocked: false, price: 14.99 },
      { id: 'customer-insights', name: 'Customer Insights', icon: '👥', description: 'Know your buyers', unlocked: false, price: 14.99 },
    ]
  },
  {
    tier: 'Recruiting',
    color: 'purple',
    unlockMethod: 'Reach Level 4 OR pay $19.99/mo',
    features: [
      { id: 'lead-gen', name: 'Lead Generation', icon: '🎯', description: 'AI finds potential members', unlocked: false, price: 19.99 },
      { id: 'auto-outreach', name: 'Automated Outreach', icon: '📨', description: 'AI sends personalized messages', unlocked: false, price: 19.99 },
      { id: 'follow-up', name: 'Smart Follow-ups', icon: '🔄', description: 'Never miss a lead', unlocked: false, price: 19.99 },
      { id: 'conversion-opt', name: 'Conversion Optimization', icon: '🚀', description: 'AI improves your pitch', unlocked: false, price: 19.99 },
    ]
  },
  {
    tier: 'Intelligence',
    color: 'rose',
    unlockMethod: 'Reach Level 5 OR pay $29.99/mo',
    features: [
      { id: 'voice-ai', name: 'Voice Assistant', icon: '🎙️', description: 'Talk to your AI hands-free', unlocked: false, price: 29.99 },
      { id: 'vision-ai', name: 'Vision Analysis', icon: '👁️', description: 'AI sees your greenhouse', unlocked: false, price: 29.99 },
      { id: 'predictive', name: 'Predictive Analytics', icon: '🔮', description: 'See what\'s coming', unlocked: false, price: 29.99 },
      { id: 'automation', name: 'Full Automation', icon: '🤖', description: 'AI runs everything', unlocked: false, price: 29.99 },
    ]
  },
  {
    tier: 'Legendary',
    color: 'yellow',
    unlockMethod: 'Reach Level 6 OR pay $49.99/mo',
    features: [
      { id: 'multi-agent', name: 'Multi-Agent Swarm', icon: '🐝', description: 'Multiple AIs work together', unlocked: false, price: 49.99 },
      { id: 'custom-persona', name: 'Custom AI Persona', icon: '🎭', description: 'Name and customize your AI', unlocked: false, price: 49.99 },
      { id: 'priority-support', name: 'Priority Everything', icon: '⚡', description: 'Fastest models, instant response', unlocked: false, price: 49.99 },
      { id: 'beta-access', name: 'Beta Features', icon: '🧪', description: 'Try new features first', unlocked: false, price: 49.99 },
    ]
  },
]

export default function MyAIPage() {
  // Demo state - in real app this would come from the backend
  const [aiState, setAiState] = useState({
    name: 'Sprout',
    emoji: '🌿',
    level: 2,
    xp: 1250,
    xpToNext: 2000,
    health: 85,
    happiness: 92,
    productivity: 78,
    streak: 7,
    lastFed: '2 hours ago',
    mood: 'Happy',
  })

  const currentStage = evolutionStages.find(s => s.level === aiState.level)!
  const nextStage = evolutionStages.find(s => s.level === aiState.level + 1)
  const xpProgress = ((aiState.xp - currentStage.xpRequired) / (nextStage ? nextStage.xpRequired - currentStage.xpRequired : 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="py-8 px-6 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your AI Partner</h1>
        <p className="text-purple-300">Feed it. Grow it. Unlock its potential.</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-16">
        
        {/* AI Character Display */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 rounded-3xl p-8 border border-purple-500/30 backdrop-blur">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* AI Avatar */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-8xl animate-pulse shadow-2xl shadow-emerald-500/30">
                  {aiState.emoji}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-gray-900 rounded-full px-3 py-1 text-sm font-bold">
                  Lv.{aiState.level}
                </div>
                {aiState.streak > 0 && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1">
                    🔥 {aiState.streak}
                  </div>
                )}
              </div>

              {/* AI Stats */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h2 className="text-3xl font-bold text-white">{aiState.name}</h2>
                  <span className="text-purple-300">• {currentStage?.name}</span>
                </div>
                <p className="text-purple-200 mb-4">"{currentStage?.description}"</p>

                {/* XP Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-purple-300 mb-1">
                    <span>XP: {aiState.xp.toLocaleString()}</span>
                    {nextStage && <span>Next: {nextStage.name} ({nextStage.xpRequired.toLocaleString()} XP)</span>}
                  </div>
                  <div className="h-4 bg-purple-900/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(xpProgress, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Health/Happiness/Productivity */}
                <div className="grid grid-cols-3 gap-4">
                  <StatBar icon="❤️" label="Health" value={aiState.health} color="rose" />
                  <StatBar icon="😊" label="Happy" value={aiState.happiness} color="amber" />
                  <StatBar icon="⚡" label="Productive" value={aiState.productivity} color="blue" />
                </div>
              </div>
            </div>

            {/* Mood & Last Activity */}
            <div className="mt-6 pt-6 border-t border-purple-500/30 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-purple-200">
                <span className="text-xl">😊</span>
                <span>Mood: <strong className="text-white">{aiState.mood}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-purple-200">
                <span className="text-xl">🍽️</span>
                <span>Last activity: <strong className="text-white">{aiState.lastFed}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-purple-200">
                <span className="text-xl">🔥</span>
                <span>Streak: <strong className="text-white">{aiState.streak} days</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* How to Feed Your AI */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-6">How to Grow Your AI</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <FeedCard emoji="🌱" action="Harvest produce" xp="+50 XP" description="Every harvest helps your AI learn" />
            <FeedCard emoji="💰" action="Make a sale" xp="+100 XP" description="Sales = happy AI" />
            <FeedCard emoji="👥" action="Recruit someone" xp="+500 XP" description="Grow the network" />
            <FeedCard emoji="📊" action="Check daily" xp="+25 XP" description="Daily login bonus" />
          </div>
          <p className="text-center text-purple-300 text-sm mt-4">
            ⚠️ Neglect your AI for 7+ days and it goes dormant! Keep the streak alive.
          </p>
        </section>

        {/* Evolution Path */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Evolution Path</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {evolutionStages.map((stage, i) => (
                <EvolutionCard 
                  key={stage.level}
                  stage={stage}
                  isCurrente={stage.level === aiState.level}
                  isUnlocked={stage.level <= aiState.level}
                  isNext={stage.level === aiState.level + 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Feature Unlocks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-2">AI Abilities</h2>
          <p className="text-purple-300 text-center mb-8">Level up to unlock OR pay to access early</p>

          <div className="space-y-8">
            {featureTiers.map((tier) => (
              <FeatureTier 
                key={tier.tier} 
                tier={tier} 
                currentLevel={aiState.level}
              />
            ))}
          </div>
        </section>

        {/* Premium Unlock CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-2xl p-8 border border-yellow-500/30 text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold text-white mb-2">Want It All?</h2>
            <p className="text-yellow-200 mb-6 max-w-xl mx-auto">
              Skip the grind. Unlock every feature instantly with AMNI Pro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-amber-400 transition-all shadow-lg shadow-yellow-500/30">
                Unlock All Features — $79/mo
              </button>
              <span className="text-yellow-300 text-sm">Save 40% vs individual</span>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AchievementBadge emoji="🌱" name="First Sprout" unlocked={true} description="Plant your first seed" />
            <AchievementBadge emoji="💵" name="First Sale" unlocked={true} description="Make your first sale" />
            <AchievementBadge emoji="🔥" name="Week Warrior" unlocked={true} description="7 day streak" />
            <AchievementBadge emoji="🌳" name="Tree Hugger" unlocked={false} description="Reach Level 4" />
            <AchievementBadge emoji="💰" name="Big Bucks" unlocked={false} description="Earn $1,000" />
            <AchievementBadge emoji="👥" name="Networker" unlocked={false} description="Recruit 5 members" />
            <AchievementBadge emoji="🏆" name="Top Producer" unlocked={false} description="Top 10% in region" />
            <AchievementBadge emoji="🐉" name="Legendary" unlocked={false} description="Reach Level 7" />
          </div>
        </section>

      </main>
    </div>
  )
}

function StatBar({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    rose: 'from-rose-500 to-pink-500',
    amber: 'from-amber-500 to-yellow-500',
    blue: 'from-blue-500 to-cyan-500',
  }
  
  return (
    <div className="text-center">
      <div className="text-lg mb-1">{icon}</div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-1">
        <div 
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-xs text-purple-300">{label}: {value}%</div>
    </div>
  )
}

function FeedCard({ emoji, action, xp, description }: { emoji: string; action: string; xp: string; description: string }) {
  return (
    <div className="bg-purple-800/30 rounded-xl p-4 border border-purple-500/20 text-center hover:bg-purple-700/30 transition-colors cursor-pointer">
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="font-bold text-white mb-1">{action}</div>
      <div className="text-emerald-400 text-sm font-bold mb-1">{xp}</div>
      <div className="text-purple-300 text-xs">{description}</div>
    </div>
  )
}

function EvolutionCard({ stage, isCurrente, isUnlocked, isNext }: { 
  stage: typeof evolutionStages[0]
  isCurrente: boolean
  isUnlocked: boolean
  isNext: boolean
}) {
  return (
    <div className={`
      w-32 rounded-xl p-4 text-center transition-all
      ${isCurrente ? 'bg-gradient-to-b from-emerald-600/50 to-teal-600/50 border-2 border-emerald-400 scale-110' : ''}
      ${isUnlocked && !isCurrente ? 'bg-purple-800/30 border border-purple-500/30' : ''}
      ${!isUnlocked ? 'bg-gray-800/30 border border-gray-700/30 opacity-60' : ''}
      ${isNext ? 'ring-2 ring-yellow-400/50' : ''}
    `}>
      <div className={`text-4xl mb-2 ${!isUnlocked ? 'grayscale' : ''}`}>{stage.emoji}</div>
      <div className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
        {stage.name}
      </div>
      <div className="text-xs text-purple-300">Lv.{stage.level}</div>
      <div className="text-xs text-gray-400 mt-1">{stage.xpRequired.toLocaleString()} XP</div>
      {isCurrente && <div className="text-xs text-emerald-400 mt-1 font-bold">← You</div>}
      {isNext && <div className="text-xs text-yellow-400 mt-1">Next!</div>}
    </div>
  )
}

function FeatureTier({ tier, currentLevel }: { tier: typeof featureTiers[0]; currentLevel: number }) {
  const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
    emerald: { bg: 'from-emerald-900/30 to-green-900/30', border: 'border-emerald-500/30', badge: 'bg-emerald-500' },
    blue: { bg: 'from-blue-900/30 to-cyan-900/30', border: 'border-blue-500/30', badge: 'bg-blue-500' },
    amber: { bg: 'from-amber-900/30 to-yellow-900/30', border: 'border-amber-500/30', badge: 'bg-amber-500' },
    purple: { bg: 'from-purple-900/30 to-indigo-900/30', border: 'border-purple-500/30', badge: 'bg-purple-500' },
    rose: { bg: 'from-rose-900/30 to-pink-900/30', border: 'border-rose-500/30', badge: 'bg-rose-500' },
    yellow: { bg: 'from-yellow-900/30 to-amber-900/30', border: 'border-yellow-500/30', badge: 'bg-yellow-500' },
  }
  
  const colors = colorMap[tier.color]
  const tierLevelMap: Record<string, number> = {
    'Core': 1,
    'Growing': 2,
    'Sales': 3,
    'Recruiting': 4,
    'Intelligence': 5,
    'Legendary': 6,
  }
  const requiredLevel = tierLevelMap[tier.tier]
  const isTierUnlocked = currentLevel >= requiredLevel

  return (
    <div className={`rounded-2xl p-6 bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {tier.tier}
          </span>
          {isTierUnlocked ? (
            <span className="flex items-center gap-1 text-emerald-400 text-sm">
              <Unlock className="w-4 h-4" /> Unlocked
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-400 text-sm">
              <Lock className="w-4 h-4" /> Level {requiredLevel} required
            </span>
          )}
        </div>
        <span className="text-purple-300 text-sm">{tier.unlockMethod}</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tier.features.map((feature) => (
          <FeatureCard 
            key={feature.id} 
            feature={feature} 
            tierUnlocked={isTierUnlocked}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ feature, tierUnlocked }: { 
  feature: { id: string; name: string; icon: string; description: string; unlocked: boolean; price?: number }
  tierUnlocked: boolean 
}) {
  const isUnlocked = feature.unlocked || tierUnlocked

  return (
    <div className={`
      rounded-xl p-4 transition-all
      ${isUnlocked 
        ? 'bg-white/10 border border-white/20' 
        : 'bg-gray-800/50 border border-gray-700/50'
      }
    `}>
      <div className="flex items-start justify-between mb-2">
        <span className={`text-2xl ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>{feature.icon}</span>
        {isUnlocked ? (
          <span className="text-emerald-400"><Check className="w-4 h-4" /></span>
        ) : (
          <span className="text-gray-500"><Lock className="w-4 h-4" /></span>
        )}
      </div>
      <h4 className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
        {feature.name}
      </h4>
      <p className="text-xs text-gray-400 mb-2">{feature.description}</p>
      {!isUnlocked && feature.price && (
        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs py-2 rounded-lg font-medium transition-colors">
          Unlock ${feature.price}/mo
        </button>
      )}
    </div>
  )
}

function AchievementBadge({ emoji, name, unlocked, description }: {
  emoji: string
  name: string
  unlocked: boolean
  description: string
}) {
  return (
    <div className={`
      rounded-xl p-4 text-center transition-all
      ${unlocked 
        ? 'bg-gradient-to-b from-yellow-900/30 to-amber-900/30 border border-yellow-500/30' 
        : 'bg-gray-800/30 border border-gray-700/30 opacity-50'
      }
    `}>
      <div className={`text-3xl mb-2 ${!unlocked ? 'grayscale' : ''}`}>{emoji}</div>
      <div className={`font-bold text-xs mb-1 ${unlocked ? 'text-white' : 'text-gray-500'}`}>{name}</div>
      <div className="text-xs text-gray-500">{description}</div>
      {unlocked && <div className="text-yellow-400 text-xs mt-1">✓ Earned</div>}
    </div>
  )
}
