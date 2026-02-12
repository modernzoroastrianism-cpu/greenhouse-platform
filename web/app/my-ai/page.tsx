'use client'

import { useState } from 'react'
import { Lock, Unlock, Zap, Heart, Star, TrendingUp, Sparkles, Crown, Shield, Bot, Leaf, ShoppingCart, Users, Brain, Eye, MessageCircle, Bell, BarChart3, Cpu, Rocket, Gift, ArrowRight, Check, Camera, MapPin, Award, Target, Trophy, Flame, Calendar, Clock, ThumbsUp, MessageSquare, Image, Edit3, HelpCircle, Flag, Plus, Settings, Activity, Wifi, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

// =============================================================================
// AGENT DEFINITIONS - Maps to AI_OPERATING_SYSTEM.md
// =============================================================================

type SkillStatus = 'locked' | 'unlocked' | 'active'

interface Skill {
  id: string
  name: string
  description: string
  status: SkillStatus
  unlockLevel: number
  unlockPrice?: number // Optional pay-to-unlock
  lastUsed?: string
  usageCount?: number
}

interface Agent {
  id: string
  name: string
  emoji: string
  description: string
  color: string
  skills: Skill[]
  baseLevel: number // Level required to activate this agent
}

// Skills mapped to AI_OPERATING_SYSTEM.md
const agents: Agent[] = [
  {
    id: 'growing',
    name: 'Growing Agent',
    emoji: '🌱',
    description: 'Monitors your greenhouse, optimizes growing conditions, predicts harvests',
    color: 'emerald',
    baseLevel: 1,
    skills: [
      { id: 'GROW-001', name: 'Sensor Analysis', description: 'Interpret IoT sensor data, get health assessments', status: 'active', unlockLevel: 1, usageCount: 234, lastUsed: '2 hours ago' },
      { id: 'GROW-002', name: 'Climate Control', description: 'Automatic greenhouse environment adjustments', status: 'active', unlockLevel: 1, usageCount: 1892, lastUsed: '15 min ago' },
      { id: 'GROW-004', name: 'Harvest Timing', description: 'Know exactly when to harvest for peak quality', status: 'active', unlockLevel: 2, usageCount: 45, lastUsed: 'Yesterday' },
      { id: 'GROW-005', name: 'Pest Detection', description: 'AI identifies pests from photos', status: 'unlocked', unlockLevel: 4, unlockPrice: 9.99, usageCount: 12, lastUsed: '3 days ago' },
      { id: 'GROW-006', name: 'Disease Diagnosis', description: 'Plant health analysis and treatment plans', status: 'unlocked', unlockLevel: 4, unlockPrice: 9.99, usageCount: 8, lastUsed: 'Last week' },
      { id: 'GROW-007', name: 'Nutrient Management', description: 'Optimize fertilization schedules', status: 'locked', unlockLevel: 5, unlockPrice: 14.99 },
      { id: 'GROW-008', name: 'Water Management', description: 'Smart irrigation optimization', status: 'locked', unlockLevel: 5, unlockPrice: 14.99 },
      { id: 'GROW-009', name: 'Crop Rotation', description: 'AI plans seasonal rotations', status: 'locked', unlockLevel: 6, unlockPrice: 19.99 },
      { id: 'GROW-010', name: 'Yield Prediction', description: 'ML-powered production forecasting', status: 'locked', unlockLevel: 7, unlockPrice: 29.99 },
      { id: 'GROW-003', name: 'Planting Schedule', description: 'Optimal planting calendar generation', status: 'locked', unlockLevel: 6, unlockPrice: 19.99 },
    ]
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    emoji: '💰',
    description: 'Lists your produce, handles pricing, manages orders, talks to customers',
    color: 'amber',
    baseLevel: 1,
    skills: [
      { id: 'SALE-001', name: 'Listing Creation', description: 'AI generates marketplace listings from photos', status: 'active', unlockLevel: 1, usageCount: 67, lastUsed: 'Today' },
      { id: 'SALE-003', name: 'Order Management', description: 'Automated order processing and tracking', status: 'active', unlockLevel: 1, usageCount: 89, lastUsed: '3 hours ago' },
      { id: 'SALE-005', name: 'Inventory Tracking', description: 'Real-time stock monitoring', status: 'active', unlockLevel: 2, usageCount: 456, lastUsed: '1 hour ago' },
      { id: 'SALE-002', name: 'Dynamic Pricing', description: 'AI optimizes prices based on supply/demand', status: 'unlocked', unlockLevel: 5, unlockPrice: 14.99, usageCount: 34, lastUsed: 'Yesterday' },
      { id: 'SALE-004', name: 'Customer Communication', description: 'AI handles customer inquiries', status: 'locked', unlockLevel: 5, unlockPrice: 14.99 },
      { id: 'SALE-006', name: 'Pickup Coordination', description: 'Automated pickup/delivery scheduling', status: 'locked', unlockLevel: 6, unlockPrice: 19.99 },
      { id: 'SALE-007', name: 'Review Management', description: 'AI responds to customer reviews', status: 'locked', unlockLevel: 6, unlockPrice: 19.99 },
      { id: 'SALE-008', name: 'Promotion Creation', description: 'AI designs sales campaigns', status: 'locked', unlockLevel: 7, unlockPrice: 29.99 },
      { id: 'SALE-009', name: 'Demand Forecasting', description: 'Predict what will sell', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'SALE-010', name: 'Customer Segmentation', description: 'Group customers by behavior', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
    ]
  },
  {
    id: 'recruiting',
    name: 'Recruiting Agent',
    emoji: '👥',
    description: 'Finds leads, sends outreach, handles follow-ups — you just approve',
    color: 'purple',
    baseLevel: 4,
    skills: [
      { id: 'RECR-001', name: 'Lead Generation', description: 'AI finds potential members matching criteria', status: 'locked', unlockLevel: 4, unlockPrice: 19.99 },
      { id: 'RECR-002', name: 'Outreach Messaging', description: 'Personalized outreach at scale', status: 'locked', unlockLevel: 4, unlockPrice: 19.99 },
      { id: 'RECR-005', name: 'Onboarding', description: 'Automated new member setup', status: 'locked', unlockLevel: 4, unlockPrice: 19.99 },
      { id: 'RECR-003', name: 'Qualification', description: 'AI assesses lead fit', status: 'locked', unlockLevel: 5, unlockPrice: 24.99 },
      { id: 'RECR-004', name: 'Objection Handling', description: 'AI addresses concerns automatically', status: 'locked', unlockLevel: 6, unlockPrice: 29.99 },
      { id: 'RECR-006', name: 'Follow-Up Sequences', description: 'Nurture leads over time', status: 'locked', unlockLevel: 6, unlockPrice: 29.99 },
      { id: 'RECR-007', name: 'Referral Requests', description: 'AI asks for referrals at the right time', status: 'locked', unlockLevel: 7, unlockPrice: 34.99 },
      { id: 'RECR-008', name: 'Content Creation', description: 'AI creates recruiting content', status: 'locked', unlockLevel: 7, unlockPrice: 34.99 },
      { id: 'RECR-009', name: 'Channel Optimization', description: 'Optimize which channels work best', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'RECR-010', name: 'Conversion Analysis', description: 'AI improves your recruiting funnel', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    emoji: '📊',
    description: 'Tracks commissions, board progress, P&L, network health',
    color: 'blue',
    baseLevel: 1,
    skills: [
      { id: 'ANLY-001', name: 'Commission Calculation', description: 'Automatic commission tracking', status: 'active', unlockLevel: 1, usageCount: 12, lastUsed: 'Monthly' },
      { id: 'ANLY-002', name: 'Board Tracking', description: 'Track your board progression', status: 'active', unlockLevel: 1, usageCount: 45, lastUsed: 'Weekly' },
      { id: 'ANLY-007', name: 'Goal Tracking', description: 'Track progress toward goals', status: 'active', unlockLevel: 2, usageCount: 89, lastUsed: 'Today' },
      { id: 'ANLY-003', name: 'P&L Generation', description: 'Profit/loss statements', status: 'unlocked', unlockLevel: 5, unlockPrice: 14.99, usageCount: 8, lastUsed: 'Monthly' },
      { id: 'ANLY-006', name: 'Benchmark Comparison', description: 'Compare to network averages', status: 'locked', unlockLevel: 5, unlockPrice: 14.99 },
      { id: 'ANLY-004', name: 'Network Analysis', description: 'Analyze network health', status: 'locked', unlockLevel: 6, unlockPrice: 19.99 },
      { id: 'ANLY-005', name: 'Trend Detection', description: 'AI identifies patterns', status: 'locked', unlockLevel: 7, unlockPrice: 29.99 },
      { id: 'ANLY-008', name: 'Anomaly Detection', description: 'Flag unusual patterns', status: 'locked', unlockLevel: 7, unlockPrice: 29.99 },
      { id: 'ANLY-009', name: 'Forecasting', description: 'Predict future performance', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'ANLY-010', name: 'Report Generation', description: 'Custom formatted reports', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
    ]
  },
  {
    id: 'mentor',
    name: 'Mentor Agent',
    emoji: '🎓',
    description: 'Coaches your downline, shares best practices, celebrates wins',
    color: 'rose',
    baseLevel: 5,
    skills: [
      { id: 'MENT-001', name: 'Downline Monitoring', description: 'Track downline performance', status: 'locked', unlockLevel: 5, unlockPrice: 24.99 },
      { id: 'MENT-002', name: 'Intervention Triggers', description: 'Know when to help', status: 'locked', unlockLevel: 5, unlockPrice: 24.99 },
      { id: 'MENT-003', name: 'Best Practice Sharing', description: 'Distribute what works', status: 'locked', unlockLevel: 6, unlockPrice: 29.99 },
      { id: 'MENT-004', name: 'Training Delivery', description: 'Automated training content', status: 'locked', unlockLevel: 6, unlockPrice: 29.99 },
      { id: 'MENT-005', name: 'Motivation Messaging', description: 'Send encouragement', status: 'locked', unlockLevel: 6, unlockPrice: 29.99 },
      { id: 'MENT-006', name: 'Problem Solving', description: 'Help resolve issues', status: 'locked', unlockLevel: 7, unlockPrice: 34.99 },
      { id: 'MENT-007', name: 'Cross-Team Coordination', description: 'Coordinate with downline AIs', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'MENT-008', name: 'Success Celebration', description: 'Recognize achievements', status: 'locked', unlockLevel: 6, unlockPrice: 29.99 },
      { id: 'MENT-009', name: 'Churn Prevention', description: 'Identify at-risk members', status: 'locked', unlockLevel: 7, unlockPrice: 34.99 },
      { id: 'MENT-010', name: 'Escalation Routing', description: 'Route issues appropriately', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
    ]
  },
  {
    id: 'scout',
    name: 'Scout Agent',
    emoji: '🔭',
    description: 'Finds acquisition opportunities, researches properties, builds proposals',
    color: 'indigo',
    baseLevel: 7,
    skills: [
      { id: 'SCOT-001', name: 'Property Search', description: 'Find farm/greenhouse listings', status: 'locked', unlockLevel: 7, unlockPrice: 34.99 },
      { id: 'SCOT-002', name: 'Due Diligence', description: 'Research property details', status: 'locked', unlockLevel: 7, unlockPrice: 34.99 },
      { id: 'SCOT-003', name: 'ROI Modeling', description: 'Calculate investment returns', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'SCOT-004', name: 'Proposal Creation', description: 'Create acquisition proposals', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'SCOT-005', name: 'Council Briefing', description: 'Prepare council presentations', status: 'locked', unlockLevel: 9, unlockPrice: 49.99 },
      { id: 'SCOT-006', name: 'Market Analysis', description: 'Analyze regional markets', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'SCOT-007', name: 'Seller Outreach', description: 'Contact property owners', status: 'locked', unlockLevel: 8, unlockPrice: 39.99 },
      { id: 'SCOT-008', name: 'Negotiation Support', description: 'Support price negotiations', status: 'locked', unlockLevel: 9, unlockPrice: 49.99 },
      { id: 'SCOT-009', name: 'Closing Coordination', description: 'Manage acquisition closing', status: 'locked', unlockLevel: 9, unlockPrice: 49.99 },
      { id: 'SCOT-010', name: 'Asset Onboarding', description: 'Integrate acquired assets', status: 'locked', unlockLevel: 9, unlockPrice: 49.99 },
    ]
  },
]

// Contribution types with points
const contributionTypes = [
  { id: 'harvest', icon: '🥬', name: 'Log Harvest', points: 10, bonus: '+5 with photo' },
  { id: 'photo', icon: '📸', name: 'Add Photo', points: 5, bonus: '+3 with tags' },
  { id: 'tip', icon: '💡', name: 'Growing Tip', points: 15, bonus: '+10 if verified' },
  { id: 'answer', icon: '💬', name: 'Answer Question', points: 3, bonus: '+5 best answer' },
  { id: 'sale', icon: '💰', name: 'Complete Sale', points: 25, bonus: '+10 repeat customer' },
  { id: 'recruit', icon: '👥', name: 'Recruit Member', points: 100, bonus: '+50 when active' },
  { id: 'streak', icon: '🔥', name: 'Daily Check-in', points: 5, bonus: '+1 per streak day' },
]

// Level system
const levels = [
  { level: 1, name: 'Seed', emoji: '🌰', points: 0, agentsUnlocked: ['growing', 'sales', 'analytics'] },
  { level: 2, name: 'Sprout', emoji: '🌱', points: 50, agentsUnlocked: [] },
  { level: 3, name: 'Seedling', emoji: '🌿', points: 150, agentsUnlocked: [] },
  { level: 4, name: 'Sapling', emoji: '🪴', points: 500, agentsUnlocked: ['recruiting'] },
  { level: 5, name: 'Tree', emoji: '🌳', points: 1500, agentsUnlocked: ['mentor'] },
  { level: 6, name: 'Grove', emoji: '🌲', points: 5000, agentsUnlocked: [] },
  { level: 7, name: 'Forest', emoji: '🏔️', points: 15000, agentsUnlocked: ['scout'] },
  { level: 8, name: 'Ecosystem', emoji: '🌍', points: 50000, agentsUnlocked: [] },
  { level: 9, name: 'Guardian', emoji: '🛡️', points: 100000, agentsUnlocked: [] },
  { level: 10, name: 'Legend', emoji: '🐉', points: 250000, agentsUnlocked: [] },
]

export default function MyAIPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'skills' | 'contribute'>('dashboard')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  
  // Demo state - in production this comes from backend
  const [userState] = useState({
    name: 'Alex',
    level: 4,
    points: 623,
    pointsThisMonth: 187,
    streak: 12,
    totalSkillsUnlocked: 14,
    totalSkillsAvailable: 60,
    activeAgents: 4,
    totalAgents: 6,
  })

  const currentLevel = levels.find(l => l.level === userState.level)!
  const nextLevel = levels.find(l => l.level === userState.level + 1)
  const progressToNext = nextLevel 
    ? ((userState.points - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100
    : 100

  // Calculate skill stats per agent based on user level
  const getAgentWithStats = (agent: Agent) => {
    const skills = agent.skills.map(skill => ({
      ...skill,
      status: skill.unlockLevel <= userState.level 
        ? (skill.status === 'locked' ? 'unlocked' : skill.status) 
        : 'locked' as SkillStatus
    }))
    const unlockedCount = skills.filter(s => s.status !== 'locked').length
    const activeCount = skills.filter(s => s.status === 'active').length
    const isAgentActive = agent.baseLevel <= userState.level
    return { ...agent, skills, unlockedCount, activeCount, isAgentActive }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="py-6 px-6 border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Your AI Team</h1>
            <p className="text-purple-300 text-sm">6 agents, 60 skills — unlock by leveling up</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white font-bold">Level {userState.level} {currentLevel.emoji}</div>
              <div className="text-purple-300 text-sm">{userState.points.toLocaleString()} points</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-2xl">
              {currentLevel.emoji}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'agents', label: 'Your Agents', icon: '🤖' },
              { id: 'skills', label: 'All Skills', icon: '⚡' },
              { id: 'contribute', label: 'Earn Points', icon: '➕' },
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

      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Level Progress */}
              <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{currentLevel.emoji}</div>
                  <div>
                    <div className="text-white font-bold">Level {userState.level}</div>
                    <div className="text-purple-300 text-sm">{currentLevel.name}</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-300">{userState.points.toLocaleString()}</span>
                    {nextLevel && <span className="text-purple-400">{nextLevel.points.toLocaleString()}</span>}
                  </div>
                  <div className="h-3 bg-purple-900/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                      style={{ width: `${progressToNext}%` }}
                    />
                  </div>
                </div>
                {nextLevel && (
                  <p className="text-purple-400 text-sm">
                    {(nextLevel.points - userState.points).toLocaleString()} points to Level {nextLevel.level}
                  </p>
                )}
              </div>

              {/* Agent Summary */}
              <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-purple-300" />
                  <span className="text-white font-bold">Agents</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {agents.filter(a => a.baseLevel <= userState.level).length} / {agents.length}
                </div>
                <p className="text-purple-300 text-sm mb-3">agents active</p>
                <div className="flex gap-2">
                  {agents.map(agent => (
                    <div 
                      key={agent.id}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        agent.baseLevel <= userState.level
                          ? 'bg-emerald-500/30 border border-emerald-500'
                          : 'bg-gray-700/30 border border-gray-600 grayscale opacity-50'
                      }`}
                    >
                      {agent.emoji}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Summary */}
              <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-purple-300" />
                  <span className="text-white font-bold">Skills</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {userState.totalSkillsUnlocked} / {userState.totalSkillsAvailable}
                </div>
                <p className="text-purple-300 text-sm mb-3">skills unlocked</p>
                <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                    style={{ width: `${(userState.totalSkillsUnlocked / userState.totalSkillsAvailable) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Active Agents Grid */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Your Active Agents
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map(agent => {
                  const stats = getAgentWithStats(agent)
                  return (
                    <AgentCard 
                      key={agent.id}
                      agent={stats}
                      userLevel={userState.level}
                      onClick={() => {
                        setSelectedAgent(agent.id)
                        setActiveTab('agents')
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Next Unlocks */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-xl p-6 border border-yellow-500/30">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Coming Up Next
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Next Level */}
                {nextLevel && (
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-2xl mb-2">{nextLevel.emoji}</div>
                    <div className="text-white font-bold">Level {nextLevel.level}: {nextLevel.name}</div>
                    <div className="text-yellow-300 text-sm">{(nextLevel.points - userState.points).toLocaleString()} points away</div>
                    {nextLevel.agentsUnlocked.length > 0 && (
                      <div className="mt-2 text-emerald-400 text-sm">
                        Unlocks: {agents.filter(a => nextLevel.agentsUnlocked.includes(a.id)).map(a => a.name).join(', ')}
                      </div>
                    )}
                  </div>
                )}
                {/* Next Skills */}
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-white font-bold">New Skills at Level {userState.level + 1}</div>
                  <div className="text-purple-300 text-sm mt-1">
                    {agents.flatMap(a => a.skills).filter(s => s.unlockLevel === userState.level + 1).slice(0, 3).map(s => s.name).join(', ')}
                  </div>
                </div>
                {/* Pro Upgrade */}
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-white font-bold">Skip the Grind?</div>
                  <div className="text-yellow-300 text-sm">Unlock everything now with AMNI Pro</div>
                  <button className="mt-2 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    $79/mo →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            {selectedAgent ? (
              // Agent Detail View
              <AgentDetailView 
                agent={getAgentWithStats(agents.find(a => a.id === selectedAgent)!)}
                userLevel={userState.level}
                onBack={() => setSelectedAgent(null)}
              />
            ) : (
              // Agent List View
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Your AI Team</h2>
                  <p className="text-purple-300">6 specialized agents working for you 24/7</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {agents.map(agent => {
                    const stats = getAgentWithStats(agent)
                    return (
                      <AgentFullCard 
                        key={agent.id}
                        agent={stats}
                        userLevel={userState.level}
                        onClick={() => setSelectedAgent(agent.id)}
                      />
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">All 60 Skills</h2>
              <p className="text-purple-300">
                {userState.totalSkillsUnlocked} unlocked • {userState.totalSkillsAvailable - userState.totalSkillsUnlocked} locked
              </p>
            </div>
            
            {agents.map(agent => {
              const stats = getAgentWithStats(agent)
              return (
                <div key={agent.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.emoji}</span>
                    <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      stats.isAgentActive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      {stats.isAgentActive ? 'Active' : `Unlocks at Level ${agent.baseLevel}`}
                    </span>
                    <span className="text-purple-300 text-sm ml-auto">
                      {stats.unlockedCount}/{agent.skills.length} skills
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stats.skills.map(skill => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Contribute Tab */}
        {activeTab === 'contribute' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Earn Points</h2>
              <p className="text-purple-300">Level up to unlock more agents and skills</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributionTypes.map(type => (
                <div 
                  key={type.id}
                  className="bg-purple-800/30 rounded-xl p-5 border border-purple-500/20 hover:border-emerald-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{type.icon}</div>
                    <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-sm font-bold">
                      +{type.points}
                    </div>
                  </div>
                  <h4 className="text-white font-bold mb-1">{type.name}</h4>
                  <div className="text-amber-400 text-xs">{type.bonus}</div>
                </div>
              ))}
            </div>

            {/* Streak Bonus */}
            <div className="bg-orange-900/30 rounded-xl p-6 border border-orange-500/30 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {userState.streak} Day Streak!
              </h3>
              <p className="text-orange-200">
                Keep checking in daily to earn +{userState.streak} bonus points per action
              </p>
            </div>

            {/* Level Unlocks Reference */}
            <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-bold text-white mb-4">What You Unlock</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {levels.slice(userState.level, userState.level + 4).map(level => (
                  <div key={level.level} className="flex items-start gap-3">
                    <div className="text-2xl">{level.emoji}</div>
                    <div>
                      <div className="text-white font-bold">Level {level.level}: {level.name}</div>
                      <div className="text-purple-300 text-sm">{level.points.toLocaleString()} points</div>
                      {level.agentsUnlocked.length > 0 && (
                        <div className="text-emerald-400 text-sm">
                          + {agents.filter(a => level.agentsUnlocked.includes(a.id)).map(a => a.name).join(', ')}
                        </div>
                      )}
                      <div className="text-purple-400 text-xs">
                        + {agents.flatMap(a => a.skills).filter(s => s.unlockLevel === level.level).length} new skills
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

// =============================================================================
// COMPONENTS
// =============================================================================

function AgentCard({ agent, userLevel, onClick }: { 
  agent: Agent & { unlockedCount: number; activeCount: number; isAgentActive: boolean }
  userLevel: number
  onClick: () => void
}) {
  const colorMap: Record<string, { bg: string; border: string }> = {
    emerald: { bg: 'from-emerald-900/30 to-green-900/30', border: 'border-emerald-500/30' },
    amber: { bg: 'from-amber-900/30 to-yellow-900/30', border: 'border-amber-500/30' },
    purple: { bg: 'from-purple-900/30 to-indigo-900/30', border: 'border-purple-500/30' },
    blue: { bg: 'from-blue-900/30 to-cyan-900/30', border: 'border-blue-500/30' },
    rose: { bg: 'from-rose-900/30 to-pink-900/30', border: 'border-rose-500/30' },
    indigo: { bg: 'from-indigo-900/30 to-violet-900/30', border: 'border-indigo-500/30' },
  }
  const colors = colorMap[agent.color] || colorMap.purple

  return (
    <div 
      onClick={onClick}
      className={`
        rounded-xl p-5 cursor-pointer transition-all hover:scale-[1.02] border
        ${agent.isAgentActive 
          ? `bg-gradient-to-br ${colors.bg} ${colors.border}` 
          : 'bg-gray-800/30 border-gray-700/30 opacity-60'
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-2xl ${!agent.isAgentActive ? 'grayscale' : ''}`}>{agent.emoji}</span>
          <span className="text-white font-bold">{agent.name}</span>
        </div>
        {agent.isAgentActive ? (
          <span className="flex items-center gap-1 text-emerald-400 text-xs">
            <Wifi className="w-3 h-3" /> Active
          </span>
        ) : (
          <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Lock className="w-3 h-3" /> Lv.{agent.baseLevel}
          </span>
        )}
      </div>
      <p className="text-purple-300 text-sm mb-3 line-clamp-2">{agent.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-purple-400 text-sm">{agent.unlockedCount}/{agent.skills.length} skills</span>
        <ArrowRight className="w-4 h-4 text-purple-400" />
      </div>
    </div>
  )
}

function AgentFullCard({ agent, userLevel, onClick }: { 
  agent: Agent & { unlockedCount: number; activeCount: number; isAgentActive: boolean }
  userLevel: number
  onClick: () => void
}) {
  const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
    emerald: { bg: 'from-emerald-900/30 to-green-900/30', border: 'border-emerald-500/30', badge: 'bg-emerald-500' },
    amber: { bg: 'from-amber-900/30 to-yellow-900/30', border: 'border-amber-500/30', badge: 'bg-amber-500' },
    purple: { bg: 'from-purple-900/30 to-indigo-900/30', border: 'border-purple-500/30', badge: 'bg-purple-500' },
    blue: { bg: 'from-blue-900/30 to-cyan-900/30', border: 'border-blue-500/30', badge: 'bg-blue-500' },
    rose: { bg: 'from-rose-900/30 to-pink-900/30', border: 'border-rose-500/30', badge: 'bg-rose-500' },
    indigo: { bg: 'from-indigo-900/30 to-violet-900/30', border: 'border-indigo-500/30', badge: 'bg-indigo-500' },
  }
  const colors = colorMap[agent.color] || colorMap.purple

  return (
    <div 
      onClick={onClick}
      className={`
        rounded-xl p-6 cursor-pointer transition-all hover:scale-[1.01] border
        ${agent.isAgentActive 
          ? `bg-gradient-to-br ${colors.bg} ${colors.border}` 
          : 'bg-gray-800/30 border-gray-700/30 opacity-70'
        }
      `}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`text-4xl p-3 rounded-xl ${agent.isAgentActive ? 'bg-white/10' : 'bg-gray-700/30 grayscale'}`}>
          {agent.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-bold text-lg">{agent.name}</span>
            {agent.isAgentActive ? (
              <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge} text-white`}>Active</span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-300">
                🔒 Level {agent.baseLevel}
              </span>
            )}
          </div>
          <p className="text-purple-300 text-sm">{agent.description}</p>
        </div>
      </div>

      {/* Skill Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-purple-300">Skills Unlocked</span>
          <span className="text-white">{agent.unlockedCount}/{agent.skills.length}</span>
        </div>
        <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
          <div 
            className={`h-full ${colors.badge} rounded-full`}
            style={{ width: `${(agent.unlockedCount / agent.skills.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Top Skills Preview */}
      <div className="space-y-2">
        {agent.skills.slice(0, 3).map(skill => (
          <div key={skill.id} className="flex items-center justify-between text-sm">
            <span className={skill.status !== 'locked' ? 'text-white' : 'text-gray-500'}>
              {skill.status !== 'locked' ? '✓' : '🔒'} {skill.name}
            </span>
            {skill.usageCount !== undefined && (
              <span className="text-purple-400 text-xs">{skill.usageCount} uses</span>
            )}
          </div>
        ))}
        {agent.skills.length > 3 && (
          <div className="text-purple-400 text-sm">+{agent.skills.length - 3} more skills →</div>
        )}
      </div>
    </div>
  )
}

function AgentDetailView({ agent, userLevel, onBack }: { 
  agent: Agent & { unlockedCount: number; activeCount: number; isAgentActive: boolean }
  userLevel: number
  onBack: () => void
}) {
  return (
    <div>
      <button onClick={onBack} className="text-purple-300 hover:text-white mb-6 flex items-center gap-2">
        ← Back to all agents
      </button>

      {/* Agent Header */}
      <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-500/20 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl p-4 rounded-xl bg-white/10">{agent.emoji}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
              {agent.isAgentActive ? (
                <span className="bg-emerald-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Wifi className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="bg-gray-600 text-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Unlocks at Level {agent.baseLevel}
                </span>
              )}
            </div>
            <p className="text-purple-200 mb-4">{agent.description}</p>
            <div className="flex gap-6">
              <div>
                <div className="text-2xl font-bold text-white">{agent.unlockedCount}</div>
                <div className="text-purple-300 text-sm">Skills Unlocked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{agent.skills.length - agent.unlockedCount}</div>
                <div className="text-purple-300 text-sm">Skills Locked</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Skills for this Agent */}
      <h3 className="text-lg font-bold text-white mb-4">All Skills ({agent.skills.length})</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {agent.skills.map(skill => (
          <SkillCardLarge key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className={`
      rounded-lg p-3 border transition-all
      ${skill.status === 'active' 
        ? 'bg-emerald-900/30 border-emerald-500/30' 
        : skill.status === 'unlocked'
          ? 'bg-purple-800/30 border-purple-500/20'
          : 'bg-gray-800/30 border-gray-700/30 opacity-60'
      }
    `}>
      <div className="flex items-start justify-between mb-1">
        <span className={`font-medium text-sm ${skill.status !== 'locked' ? 'text-white' : 'text-gray-400'}`}>
          {skill.name}
        </span>
        {skill.status === 'active' && <span className="text-emerald-400 text-xs">Active</span>}
        {skill.status === 'unlocked' && <span className="text-purple-400 text-xs">Ready</span>}
        {skill.status === 'locked' && <span className="text-gray-500 text-xs">Lv.{skill.unlockLevel}</span>}
      </div>
      <p className="text-gray-400 text-xs">{skill.description}</p>
    </div>
  )
}

function SkillCardLarge({ skill }: { skill: Skill }) {
  return (
    <div className={`
      rounded-xl p-4 border transition-all
      ${skill.status === 'active' 
        ? 'bg-emerald-900/30 border-emerald-500/30' 
        : skill.status === 'unlocked'
          ? 'bg-purple-800/30 border-purple-500/20'
          : 'bg-gray-800/30 border-gray-700/30'
      }
    `}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-xs text-gray-500 font-mono">{skill.id}</span>
          <h4 className={`font-bold ${skill.status !== 'locked' ? 'text-white' : 'text-gray-400'}`}>
            {skill.name}
          </h4>
        </div>
        {skill.status === 'active' && (
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> Active
          </span>
        )}
        {skill.status === 'unlocked' && (
          <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">
            Unlocked
          </span>
        )}
        {skill.status === 'locked' && (
          <span className="bg-gray-700/50 text-gray-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3" /> Level {skill.unlockLevel}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
      
      {skill.status !== 'locked' && skill.usageCount !== undefined && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-purple-300">Used {skill.usageCount} times</span>
          {skill.lastUsed && <span className="text-gray-500">{skill.lastUsed}</span>}
        </div>
      )}
      
      {skill.status === 'locked' && skill.unlockPrice && (
        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm py-2 rounded-lg transition-colors">
          Unlock Early — ${skill.unlockPrice}/mo
        </button>
      )}
    </div>
  )
}
