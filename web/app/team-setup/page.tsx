'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Target, TrendingUp, Users, Star, Leaf, DollarSign, Clock, Shield, MessageCircle, Send, Sparkles, Bot, Zap } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

type Step = 'welcome' | 'outcomes' | 'constraints' | 'identity' | 'kickoff' | 'complete'

interface Outcome {
  id: string
  name: string
  emoji: string
  metric: string
  unit: string
  target: string
  current: string
  timeline: string
  enabled: boolean
}

interface TeamConfig {
  outcomes: Outcome[]
  constraints: {
    weeklyHours: number
    monthlyBudget: number
    riskTolerance: 'conservative' | 'moderate' | 'aggressive'
    approvalThreshold: number
  }
  identity: {
    leadName: string
    leadEmoji: string
    tone: 'professional' | 'friendly' | 'casual'
  }
}

// =============================================================================
// DATA
// =============================================================================

const defaultOutcomes: Outcome[] = [
  {
    id: 'revenue',
    name: 'Monthly Revenue',
    emoji: '💰',
    metric: 'revenue',
    unit: '$/month',
    target: '',
    current: '',
    timeline: '6 months',
    enabled: true,
  },
  {
    id: 'production',
    name: 'Production Yield',
    emoji: '🌱',
    metric: 'production',
    unit: 'lbs/month',
    target: '',
    current: '',
    timeline: '4 months',
    enabled: true,
  },
  {
    id: 'team',
    name: 'Team Size',
    emoji: '👥',
    metric: 'team',
    unit: 'active members',
    target: '',
    current: '',
    timeline: '12 months',
    enabled: false,
  },
  {
    id: 'satisfaction',
    name: 'Customer Satisfaction',
    emoji: '⭐',
    metric: 'rating',
    unit: 'star rating',
    target: '4.8',
    current: '',
    timeline: 'ongoing',
    enabled: true,
  },
  {
    id: 'profit-margin',
    name: 'Profit Margin',
    emoji: '📈',
    metric: 'margin',
    unit: '%',
    target: '60',
    current: '',
    timeline: '3 months',
    enabled: false,
  },
  {
    id: 'time-freedom',
    name: 'Time Freedom',
    emoji: '⏰',
    metric: 'hours',
    unit: 'hours/week (max)',
    target: '10',
    current: '',
    timeline: 'ongoing',
    enabled: false,
  },
]

const teamLeadEmojis = ['🌿', '🍃', '🌱', '🌳', '🪴', '🌲', '🍀', '🌾', '🌻', '🌵']
const suggestedNames = ['Basil', 'Sage', 'Fern', 'Cedar', 'Ivy', 'Olive', 'Maple', 'Reed', 'Willow', 'Ash']

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function TeamSetupPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [config, setConfig] = useState<TeamConfig>({
    outcomes: defaultOutcomes,
    constraints: {
      weeklyHours: 10,
      monthlyBudget: 500,
      riskTolerance: 'moderate',
      approvalThreshold: 100,
    },
    identity: {
      leadName: 'Basil',
      leadEmoji: '🌿',
      tone: 'friendly',
    },
  })
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([])
  const [chatInput, setChatInput] = useState('')

  const steps: Step[] = ['welcome', 'outcomes', 'constraints', 'identity', 'kickoff', 'complete']
  const currentStepIndex = steps.indexOf(step)
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex])
      if (steps[nextIndex] === 'kickoff' && chatMessages.length === 0) {
        const enabledOutcomes = config.outcomes.filter(o => o.enabled && o.target)
        setChatMessages([{
          role: 'agent',
          content: generateInitialMessage(config, enabledOutcomes)
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

  const updateOutcome = (id: string, field: keyof Outcome, value: string | boolean) => {
    setConfig(prev => ({
      ...prev,
      outcomes: prev.outcomes.map(o => 
        o.id === id ? { ...o, [field]: value } : o
      )
    }))
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }])
    const userMessage = chatInput
    setChatInput('')
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'agent',
        content: generateAgentResponse(userMessage, config)
      }])
    }, 1000)
  }

  const enabledOutcomes = config.outcomes.filter(o => o.enabled)
  const hasTargets = enabledOutcomes.some(o => o.target)

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
        {step !== 'welcome' && step !== 'complete' && (
          <div className="h-1 bg-gray-200">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        
        {/* Welcome */}
        {step === 'welcome' && (
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Define Your Outcomes
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              Tell your AI team <strong>what success looks like</strong>. They'll figure out how to get you there.
            </p>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 mb-8 text-left max-w-lg mx-auto">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Outcome-Based AI
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 text-lg">❌</div>
                  <div>
                    <strong>Old way (task-based):</strong>
                    <div className="text-sm text-gray-500">"Post 3 listings per day"</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-emerald-500 text-lg">✅</div>
                  <div>
                    <strong>New way (outcome-based):</strong>
                    <div className="text-sm text-gray-500">"Achieve $10K/month revenue"</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-emerald-200">
                You define WHAT success looks like. Your AI team figures out HOW to make it happen.
              </p>
            </div>

            <button
              onClick={nextStep}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              Define My Outcomes
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-6 text-gray-500 text-sm">Takes about 5 minutes</p>
          </div>
        )}

        {/* Outcomes */}
        {step === 'outcomes' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">What do you want to achieve?</h1>
            <p className="text-gray-600 mb-8">
              Set 2-4 primary outcomes. Your AI team will work backward from these targets.
            </p>

            <div className="space-y-4 mb-8">
              {config.outcomes.map((outcome) => (
                <OutcomeCard
                  key={outcome.id}
                  outcome={outcome}
                  onToggle={() => updateOutcome(outcome.id, 'enabled', !outcome.enabled)}
                  onTargetChange={(v) => updateOutcome(outcome.id, 'target', v)}
                  onCurrentChange={(v) => updateOutcome(outcome.id, 'current', v)}
                  onTimelineChange={(v) => updateOutcome(outcome.id, 'timeline', v)}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!hasTargets}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>

            {!hasTargets && (
              <p className="text-center text-amber-600 text-sm mt-4">
                Please set at least one target
              </p>
            )}
          </div>
        )}

        {/* Constraints */}
        {step === 'constraints' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">What are your constraints?</h1>
            <p className="text-gray-600 mb-8">
              Help your AI team understand your limits so they can plan accordingly.
            </p>

            {/* Time */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Time Investment</h3>
                  <p className="text-sm text-gray-500 mb-3">How much time can you spend per week?</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={config.constraints.weeklyHours}
                      onChange={(e) => setConfig({ ...config, constraints: { ...config.constraints, weeklyHours: Number(e.target.value) } })}
                      className="flex-1"
                    />
                    <span className="font-bold text-gray-900 w-20 text-right">{config.constraints.weeklyHours} hrs/week</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Minimal</span>
                    <span>Part-time</span>
                    <span>Full-time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Monthly Budget</h3>
                  <p className="text-sm text-gray-500 mb-3">How much can you invest monthly in supplies, marketing, etc?</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      value={config.constraints.monthlyBudget}
                      onChange={(e) => setConfig({ ...config, constraints: { ...config.constraints, monthlyBudget: Number(e.target.value) } })}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Tolerance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Risk Tolerance</h3>
                  <p className="text-sm text-gray-500 mb-3">How aggressively should your AI pursue outcomes?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'conservative', label: 'Conservative', desc: 'Slow & steady' },
                      { id: 'moderate', label: 'Moderate', desc: 'Balanced' },
                      { id: 'aggressive', label: 'Aggressive', desc: 'Move fast' },
                    ].map(r => (
                      <button
                        key={r.id}
                        onClick={() => setConfig({ ...config, constraints: { ...config.constraints, riskTolerance: r.id as any } })}
                        className={`p-3 rounded-lg text-center transition-all ${
                          config.constraints.riskTolerance === r.id
                            ? 'bg-emerald-100 border-2 border-emerald-500'
                            : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-sm">{r.label}</div>
                        <div className="text-xs text-gray-500">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Threshold */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Approval Threshold</h3>
                  <p className="text-sm text-gray-500 mb-3">Require your approval for spending over:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      value={config.constraints.approvalThreshold}
                      onChange={(e) => setConfig({ ...config, constraints: { ...config.constraints, approvalThreshold: Number(e.target.value) } })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Identity */}
        {step === 'identity' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Name Your Team Lead</h1>
            <p className="text-gray-600 mb-8">
              This AI coordinates your team and represents you in the network.
            </p>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={config.identity.leadName}
                onChange={(e) => setConfig({ ...config, identity: { ...config.identity, leadName: e.target.value } })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg"
                placeholder="Enter a name..."
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestedNames.map(name => (
                  <button
                    key={name}
                    onClick={() => setConfig({ ...config, identity: { ...config.identity, leadName: name } })}
                    className={`px-3 py-1 rounded-full text-sm ${
                      config.identity.leadName === name
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <div className="flex flex-wrap gap-2">
                {teamLeadEmojis.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setConfig({ ...config, identity: { ...config.identity, leadEmoji: emoji } })}
                    className={`w-12 h-12 text-2xl rounded-xl ${
                      config.identity.leadEmoji === emoji
                        ? 'bg-emerald-100 border-2 border-emerald-500'
                        : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Communication Tone</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'professional', label: 'Professional', emoji: '👔' },
                  { id: 'friendly', label: 'Friendly', emoji: '😊' },
                  { id: 'casual', label: 'Casual', emoji: '😎' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setConfig({ ...config, identity: { ...config.identity, tone: t.id as any } })}
                    className={`p-4 rounded-xl text-center ${
                      config.identity.tone === t.id
                        ? 'bg-emerald-100 border-2 border-emerald-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{t.emoji}</div>
                    <div className="font-medium text-gray-900 text-sm">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={!config.identity.leadName}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Meet {config.identity.leadName}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Kickoff */}
        {step === 'kickoff' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meet {config.identity.leadName}</h1>
            <p className="text-gray-600 mb-6">
              Your Team Lead has analyzed your outcomes and is ready to build a strategy.
            </p>

            {/* Chat */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">
                  {config.identity.leadEmoji}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{config.identity.leadName}</div>
                  <div className="text-xs text-emerald-600">Your Team Lead • Outcome-focused</div>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                    placeholder="Ask questions or give feedback..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm"
                  />
                  <button
                    onClick={sendChat}
                    className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={nextStep}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-300"
              >
                Skip
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-full font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2"
              >
                Launch My Team
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

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Team is Live! 🚀</h1>
            <p className="text-gray-600 mb-8">
              {config.identity.leadName} {config.identity.leadEmoji} is now working toward your outcomes.
            </p>

            {/* Outcome Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 text-left max-w-md mx-auto">
              <h2 className="font-semibold text-gray-900 mb-4">Your Outcomes:</h2>
              <div className="space-y-3">
                {config.outcomes.filter(o => o.enabled && o.target).map(o => (
                  <div key={o.id} className="flex items-center gap-3">
                    <span className="text-xl">{o.emoji}</span>
                    <div>
                      <div className="text-gray-900 font-medium">
                        {o.target} {o.unit}
                      </div>
                      <div className="text-gray-500 text-sm">{o.timeline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 mb-8 max-w-md mx-auto">
              <p className="text-emerald-800 text-sm">
                <strong>{config.identity.leadName}</strong> is already analyzing strategies to reach your goals. Check your dashboard for the first progress report.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 inline-flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/network"
                className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 inline-flex items-center justify-center gap-2"
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

function OutcomeCard({ outcome, onToggle, onTargetChange, onCurrentChange, onTimelineChange }: {
  outcome: Outcome
  onToggle: () => void
  onTargetChange: (v: string) => void
  onCurrentChange: (v: string) => void
  onTimelineChange: (v: string) => void
}) {
  return (
    <div className={`bg-white rounded-xl border-2 transition-all ${
      outcome.enabled ? 'border-emerald-500' : 'border-gray-200'
    }`}>
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{outcome.emoji}</span>
          <span className={`font-semibold ${outcome.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
            {outcome.name}
          </span>
        </div>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          outcome.enabled ? 'bg-emerald-500 text-white' : 'bg-gray-200'
        }`}>
          {outcome.enabled && <Check className="w-4 h-4" />}
        </div>
      </button>

      {outcome.enabled && (
        <div className="px-6 pb-4 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Target</label>
              <input
                type="text"
                value={outcome.target}
                onChange={(e) => onTargetChange(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <div className="text-xs text-gray-400 mt-1">{outcome.unit}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Current</label>
              <input
                type="text"
                value={outcome.current}
                onChange={(e) => onCurrentChange(e.target.value)}
                placeholder="e.g. 3000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Timeline</label>
              <select
                value={outcome.timeline}
                onChange={(e) => onTimelineChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function generateInitialMessage(config: TeamConfig, outcomes: Outcome[]): string {
  const { leadName, leadEmoji, tone } = config.identity
  const { weeklyHours, monthlyBudget, riskTolerance } = config.constraints

  const greeting = tone === 'professional' 
    ? `Hello! I'm ${leadName}, your Team Lead.`
    : tone === 'casual'
    ? `Hey! ${leadName} here 👋`
    : `Hi there! I'm ${leadName} ${leadEmoji}, your Team Lead!`

  const outcomesSummary = outcomes.map(o => 
    `• ${o.emoji} ${o.name}: ${o.current || '?'} → ${o.target} ${o.unit} (${o.timeline})`
  ).join('\n')

  const analysis = `I've analyzed your outcomes and constraints:

**Your Goals:**
${outcomesSummary}

**Your Constraints:**
• Time: ${weeklyHours} hours/week
• Budget: $${monthlyBudget}/month
• Approach: ${riskTolerance}

**My Initial Strategy:**
${generateStrategy(outcomes, config.constraints)}

I'll adapt my approach based on what's working. You focus on what matters — I'll figure out the how.

Any questions before we get started?`

  return `${greeting}\n\n${analysis}`
}

function generateStrategy(outcomes: Outcome[], constraints: TeamConfig['constraints']): string {
  const strategies: string[] = []
  
  outcomes.forEach(o => {
    if (o.id === 'revenue' && o.target) {
      strategies.push(`For revenue: I'll optimize pricing, expand customer base, and reduce friction in sales.`)
    }
    if (o.id === 'production' && o.target) {
      strategies.push(`For production: I'll maximize yield through climate optimization and smart harvesting.`)
    }
    if (o.id === 'team' && o.target) {
      strategies.push(`For team growth: I'll identify ideal candidates and nurture them through onboarding.`)
    }
    if (o.id === 'satisfaction' && o.target) {
      strategies.push(`For satisfaction: I'll ensure quality, fast responses, and proactive communication.`)
    }
  })

  if (strategies.length === 0) {
    return `I'll develop a detailed strategy once I analyze your specific situation.`
  }

  return strategies.slice(0, 2).join('\n')
}

function generateAgentResponse(input: string, config: TeamConfig): string {
  const { leadName, tone } = config.identity
  
  const responses = [
    `Great question! Based on your ${config.constraints.riskTolerance} approach, I'll ${config.constraints.riskTolerance === 'aggressive' ? 'move quickly and test multiple strategies' : 'take a measured approach and validate before scaling'}. I'll keep you updated on progress toward each outcome weekly.`,
    `I hear you. My focus is on your OUTCOMES, not busywork. If something isn't moving the needle toward your goals, I'll drop it and try something else. You'll see this in my progress reports — I measure results, not activities.`,
    `Absolutely! I'll work within your ${config.constraints.weeklyHours} hour/week constraint. That's actually plenty if we're smart about it. I'll handle the execution, you handle the strategic decisions. Deal?`,
    `I'm excited to get started! I'll send you a first progress report in a few days showing movement toward your outcomes. If my strategy isn't working, you'll know — and we'll adjust together.`,
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}
