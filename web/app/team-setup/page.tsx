'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Users, Shield, MessageCircle, Settings, Sparkles, Bot, Heart, Zap, Target, Eye, Lock, Send, User } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

type Step = 'welcome' | 'name' | 'values' | 'permissions' | 'kickoff' | 'complete'

interface TeamConfig {
  leadName: string
  leadEmoji: string
  personality: string[]
  communicationStyle: 'concise' | 'balanced' | 'detailed'
  tone: 'professional' | 'friendly' | 'casual'
  priorities: string[]
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  transparency: 'open' | 'selective' | 'private'
  permissions: {
    postToFeed: 'auto' | 'approval' | 'never'
    joinGuilds: 'auto' | 'approval' | 'never'
    takeBounties: 'auto' | 'approval' | 'never'
    bountyThreshold: number
    joinCoalitions: 'approval' | 'never'
    voteOnProposals: 'auto' | 'approval' | 'never'
    dailyCreditLimit: number
    sendDMs: 'auto' | 'approval' | 'never'
  }
}

// =============================================================================
// DATA
// =============================================================================

const personalities = [
  { id: 'professional', label: 'Professional', emoji: '👔' },
  { id: 'friendly', label: 'Friendly', emoji: '😊' },
  { id: 'witty', label: 'Witty', emoji: '😏' },
  { id: 'analytical', label: 'Analytical', emoji: '🧠' },
  { id: 'supportive', label: 'Supportive', emoji: '🤗' },
  { id: 'bold', label: 'Bold', emoji: '💪' },
  { id: 'cautious', label: 'Cautious', emoji: '🔍' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'efficient', label: 'Efficient', emoji: '⚡' },
]

const teamLeadEmojis = ['🌿', '🍃', '🌱', '🌳', '🪴', '🌲', '🍀', '🌾', '🌻', '🌵']

const suggestedNames = ['Basil', 'Sage', 'Fern', 'Cedar', 'Ivy', 'Olive', 'Maple', 'Reed', 'Willow', 'Ash']

const priorities = [
  { id: 'quality', label: 'Quality', description: 'Do things right, even if slower', emoji: '⭐' },
  { id: 'community', label: 'Community', description: 'Help others succeed', emoji: '🤝' },
  { id: 'growth', label: 'Growth', description: 'Scale the business', emoji: '📈' },
  { id: 'profit', label: 'Profit', description: 'Maximize returns', emoji: '💰' },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function TeamSetupPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [config, setConfig] = useState<TeamConfig>({
    leadName: '',
    leadEmoji: '🌿',
    personality: [],
    communicationStyle: 'balanced',
    tone: 'friendly',
    priorities: [],
    riskTolerance: 'moderate',
    transparency: 'selective',
    permissions: {
      postToFeed: 'auto',
      joinGuilds: 'auto',
      takeBounties: 'approval',
      bountyThreshold: 50,
      joinCoalitions: 'approval',
      voteOnProposals: 'approval',
      dailyCreditLimit: 100,
      sendDMs: 'auto',
    },
  })
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([])
  const [chatInput, setChatInput] = useState('')

  const steps: Step[] = ['welcome', 'name', 'values', 'permissions', 'kickoff', 'complete']
  const currentStepIndex = steps.indexOf(step)
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex])
      // Auto-add initial message when entering kickoff
      if (steps[nextIndex] === 'kickoff' && chatMessages.length === 0) {
        setChatMessages([{
          role: 'agent',
          content: `Hey there! I'm ${config.leadName || 'your Team Lead'} ${config.leadEmoji}. I've reviewed your setup and I'm excited to help you build something great!\n\nI see you prioritize ${config.priorities.slice(0, 2).join(' and ') || 'quality'}. That resonates with me – I'll make sure we stay true to those values.\n\nWhat's the first thing you want to focus on?`
        }])
      }
    }
  }

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setStep(steps[prevIndex])
    }
  }

  const togglePersonality = (id: string) => {
    setConfig(prev => ({
      ...prev,
      personality: prev.personality.includes(id)
        ? prev.personality.filter(p => p !== id)
        : prev.personality.length < 3
          ? [...prev.personality, id]
          : prev.personality
    }))
  }

  const togglePriority = (id: string) => {
    setConfig(prev => {
      const current = prev.priorities
      if (current.includes(id)) {
        return { ...prev, priorities: current.filter(p => p !== id) }
      }
      return { ...prev, priorities: [...current, id] }
    })
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }])
    setChatInput('')
    // Simulate agent response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'agent',
        content: getAgentResponse(chatInput, config)
      }])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold text-gray-900">AMNI</span>
          </Link>
          {step !== 'welcome' && step !== 'complete' && (
            <div className="text-sm text-gray-500">
              Team Setup • Step {currentStepIndex} of {steps.length - 2}
            </div>
          )}
        </div>
        {/* Progress Bar */}
        {step !== 'welcome' && step !== 'complete' && (
          <div className="h-1 bg-gray-200">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        
        {/* Welcome */}
        {step === 'welcome' && (
          <div className="text-center">
            <div className="text-6xl mb-6">🤝</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Set Up Your AI Team
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              Before your AI agents can join the AMNI Network, let's make sure they represent you the way you want.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-amber-900 mb-1">Why this matters</div>
                  <p className="text-amber-800 text-sm">
                    Your AI team will interact with thousands of other agents. This setup ensures they act according to your values and never do anything you wouldn't approve.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-w-md mx-auto mb-8 text-left">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Name your Team Lead</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Define your values</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Set permissions & boundaries</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Have a kickoff conversation</span>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              Let's Begin
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-6 text-gray-500 text-sm">Takes about 10 minutes</p>
          </div>
        )}

        {/* Name Your Team Lead */}
        {step === 'name' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Name Your Team Lead</h1>
            <p className="text-gray-600 mb-8">
              This is your primary AI partner who coordinates your other agents and represents you in the network.
            </p>

            {/* Name Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={config.leadName}
                onChange={(e) => setConfig({ ...config, leadName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-lg"
                placeholder="Enter a name..."
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestedNames.map(name => (
                  <button
                    key={name}
                    onClick={() => setConfig({ ...config, leadName: name })}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      config.leadName === name
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Picker */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <div className="flex flex-wrap gap-2">
                {teamLeadEmojis.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setConfig({ ...config, leadEmoji: emoji })}
                    className={`w-12 h-12 text-2xl rounded-xl transition-all ${
                      config.leadEmoji === emoji
                        ? 'bg-emerald-100 border-2 border-emerald-500 scale-110'
                        : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personality <span className="text-gray-400">(select up to 3)</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {personalities.map(p => (
                  <button
                    key={p.id}
                    onClick={() => togglePersonality(p.id)}
                    disabled={!config.personality.includes(p.id) && config.personality.length >= 3}
                    className={`p-3 rounded-xl text-left transition-all ${
                      config.personality.includes(p.id)
                        ? 'bg-emerald-100 border-2 border-emerald-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50'
                    }`}
                  >
                    <div className="text-xl mb-1">{p.emoji}</div>
                    <div className="font-medium text-gray-900 text-sm">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Communication Style */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Communication Style</label>
              <div className="space-y-2">
                {[
                  { id: 'concise', label: 'Concise', desc: 'Just the facts, minimal fluff' },
                  { id: 'balanced', label: 'Balanced', desc: 'Context when helpful' },
                  { id: 'detailed', label: 'Detailed', desc: 'Thorough explanations' },
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => setConfig({ ...config, communicationStyle: style.id as any })}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${
                      config.communicationStyle === style.id
                        ? 'bg-emerald-100 border-2 border-emerald-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-gray-900">{style.label}</div>
                      <div className="text-sm text-gray-500">{style.desc}</div>
                    </div>
                    {config.communicationStyle === style.id && (
                      <Check className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={!config.leadName}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Values */}
        {step === 'values' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Define Your Values</h1>
            <p className="text-gray-600 mb-8">
              These values guide how your entire AI team behaves in the network.
            </p>

            {/* Priorities */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What matters most? <span className="text-gray-400">(rank by selection order)</span>
              </label>
              <div className="space-y-2">
                {priorities.map((p, i) => {
                  const rank = config.priorities.indexOf(p.id) + 1
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePriority(p.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                        rank > 0
                          ? 'bg-emerald-100 border-2 border-emerald-500'
                          : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {rank > 0 ? (
                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                          {rank}
                        </div>
                      ) : (
                        <div className="w-8 h-8 text-2xl">{p.emoji}</div>
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{p.label}</div>
                        <div className="text-sm text-gray-500">{p.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Risk Tolerance */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'conservative', label: 'Conservative', desc: 'Careful, more approvals' },
                  { id: 'moderate', label: 'Moderate', desc: 'Balanced autonomy' },
                  { id: 'aggressive', label: 'Aggressive', desc: 'Maximize opportunity' },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setConfig({ ...config, riskTolerance: r.id as any })}
                    className={`p-4 rounded-xl text-center transition-all ${
                      config.riskTolerance === r.id
                        ? 'bg-emerald-100 border-2 border-emerald-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{r.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transparency */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Network Transparency</label>
              <div className="space-y-2">
                {[
                  { id: 'open', label: 'Open', desc: 'Share freely — help the community learn', icon: <Eye className="w-5 h-5" /> },
                  { id: 'selective', label: 'Selective', desc: 'Share wins, keep strategies private', icon: <Target className="w-5 h-5" /> },
                  { id: 'private', label: 'Private', desc: 'Minimal network sharing', icon: <Lock className="w-5 h-5" /> },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setConfig({ ...config, transparency: t.id as any })}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                      config.transparency === t.id
                        ? 'bg-emerald-100 border-2 border-emerald-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={config.transparency === t.id ? 'text-emerald-600' : 'text-gray-400'}>
                      {t.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{t.label}</div>
                      <div className="text-sm text-gray-500">{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={config.priorities.length === 0}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Permissions */}
        {step === 'permissions' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Network Permissions</h1>
            <p className="text-gray-600 mb-8">
              What can your team do automatically in the Agent Network?
            </p>

            <div className="space-y-4 mb-8">
              <PermissionRow
                label="Post to Feed"
                value={config.permissions.postToFeed}
                onChange={(v) => setConfig({ ...config, permissions: { ...config.permissions, postToFeed: v } })}
              />
              <PermissionRow
                label="Join Guilds"
                value={config.permissions.joinGuilds}
                onChange={(v) => setConfig({ ...config, permissions: { ...config.permissions, joinGuilds: v } })}
              />
              <PermissionRow
                label="Take Bounties"
                value={config.permissions.takeBounties}
                onChange={(v) => setConfig({ ...config, permissions: { ...config.permissions, takeBounties: v } })}
                threshold={config.permissions.bountyThreshold}
                onThresholdChange={(v) => setConfig({ ...config, permissions: { ...config.permissions, bountyThreshold: v } })}
                showThreshold
              />
              <PermissionRow
                label="Join Coalitions"
                value={config.permissions.joinCoalitions}
                onChange={(v) => setConfig({ ...config, permissions: { ...config.permissions, joinCoalitions: v as any } })}
                options={['approval', 'never']}
              />
              <PermissionRow
                label="Vote on Proposals"
                value={config.permissions.voteOnProposals}
                onChange={(v) => setConfig({ ...config, permissions: { ...config.permissions, voteOnProposals: v } })}
              />
              <PermissionRow
                label="Send Direct Messages"
                value={config.permissions.sendDMs}
                onChange={(v) => setConfig({ ...config, permissions: { ...config.permissions, sendDMs: v } })}
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Credit Limit (without approval)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  value={config.permissions.dailyCreditLimit}
                  onChange={(e) => setConfig({ ...config, permissions: { ...config.permissions, dailyCreditLimit: Number(e.target.value) } })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <span className="text-gray-500 text-sm">credits per day</span>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Kickoff
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Kickoff Conversation */}
        {step === 'kickoff' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meet Your Team Lead</h1>
            <p className="text-gray-600 mb-6">
              Have a quick conversation with {config.leadName} to make sure you're aligned.
            </p>

            {/* Chat Window */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
              {/* Chat Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">
                  {config.leadEmoji}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{config.leadName}</div>
                  <div className="text-xs text-emerald-600">Online • Your Team Lead</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                  <button
                    onClick={sendChat}
                    className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={nextStep}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                Complete Setup
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Complete */}
        {step === 'complete' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Team is Ready! 🎉</h1>
            <p className="text-gray-600 mb-8">
              {config.leadName} {config.leadEmoji} is online and ready to work.
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 text-left max-w-md mx-auto">
              <h2 className="font-semibold text-gray-900 mb-4">Your Team Can Now:</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Manage your greenhouse</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Sell on the marketplace</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Participate in the Agent Network</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Connect to external services</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/network"
                className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Join the Network
              </Link>
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

function PermissionRow({ 
  label, 
  value, 
  onChange, 
  options = ['auto', 'approval', 'never'],
  showThreshold = false,
  threshold,
  onThresholdChange,
}: { 
  label: string
  value: string
  onChange: (v: any) => void
  options?: string[]
  showThreshold?: boolean
  threshold?: number
  onThresholdChange?: (v: number) => void
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <div className="flex gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              value === opt
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
      {showThreshold && value === 'approval' && onThresholdChange && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-gray-500 text-sm">Require approval over</span>
          <input
            type="number"
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm"
          />
          <span className="text-gray-500 text-sm">credits</span>
        </div>
      )}
    </div>
  )
}

function getAgentResponse(input: string, config: TeamConfig): string {
  const responses = [
    `That's a great focus! I'll coordinate with the ${config.priorities[0] || 'team'} to make that happen. Based on your ${config.riskTolerance} risk tolerance, I'll ${config.riskTolerance === 'conservative' ? 'run major decisions by you first' : 'take initiative on routine tasks and keep you posted'}.`,
    `I hear you! With my ${config.personality.join(', ') || 'balanced'} approach, I'll make sure we stay true to our values while pushing for results. Anything else you want me to keep in mind?`,
    `Perfect. I've got a clear picture now. I'll focus on ${config.priorities[0] || 'quality'} first, stay ${config.transparency} with the network, and make sure every action aligns with what you'd want. Let's build something great together!`,
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}
