'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Leaf, Users, Bot, DollarSign, Shield, Sparkles, ChevronRight, Mail, User, Phone, MapPin, Home, Building, CreditCard, Lock } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

type Step = 'welcome' | 'goals' | 'package' | 'details' | 'payment' | 'complete'

interface PackageOption {
  id: string
  name: string
  price: number
  emoji: string
  description: string
  features: string[]
  popular?: boolean
  forWho: string
}

// =============================================================================
// DATA
// =============================================================================

const packages: PackageOption[] = [
  {
    id: 'starter',
    name: 'Backyard Starter',
    price: 499,
    emoji: '🌱',
    description: 'Perfect for beginners',
    forWho: 'Hobby growers, small spaces',
    features: [
      '4x8 starter greenhouse kit',
      'Basic sensor package',
      '3 AI agents (Growing, Sales, Analytics)',
      'Marketplace access',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Grower',
    price: 1499,
    emoji: '🌿',
    description: 'Most popular choice',
    forWho: 'Serious growers, side income',
    popular: true,
    features: [
      '8x12 professional greenhouse',
      'Full sensor suite + climate control',
      '5 AI agents (+ Recruiting, Mentor)',
      'Dynamic pricing AI',
      'Priority support',
      'Recruiting tools',
    ],
  },
  {
    id: 'urban',
    name: 'Urban Farmer',
    price: 899,
    emoji: '🏙️',
    description: 'Apartment & balcony',
    forWho: 'Urban dwellers, limited space',
    features: [
      'Vertical growing system',
      'Indoor-optimized sensors',
      '4 AI agents',
      'Space-efficient crops',
      'Community support',
    ],
  },
  {
    id: 'commercial',
    name: 'Micro-Farm',
    price: 9999,
    emoji: '🚜',
    description: 'Full business operation',
    forWho: 'Full-time farming, high volume',
    features: [
      'Commercial greenhouse (20x30)',
      'Enterprise sensor network',
      'All 6 AI agents unlocked',
      'Dedicated account manager',
      'White-glove setup',
      'Acquisition Council access',
    ],
  },
]

const goals = [
  { id: 'hobby', emoji: '🌱', label: 'Grow my own food', description: 'Fresh produce for my family' },
  { id: 'side', emoji: '💰', label: 'Earn extra income', description: 'Part-time selling at markets' },
  { id: 'business', emoji: '🚀', label: 'Build a business', description: 'Full-time food production' },
  { id: 'network', emoji: '👥', label: 'Build a team', description: 'Grow a network of growers' },
  { id: 'invest', emoji: '📈', label: 'Invest in farms', description: 'Participate in acquisitions' },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function JoinPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    referralCode: '',
  })

  const steps: Step[] = ['welcome', 'goals', 'package', 'details', 'payment', 'complete']
  const currentStepIndex = steps.indexOf(step)
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex])
    }
  }

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setStep(steps[prevIndex])
    }
  }

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    )
  }

  const selectedPkg = packages.find(p => p.id === selectedPackage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold text-gray-900">AMNI</span>
          </Link>
          {step !== 'welcome' && step !== 'complete' && (
            <div className="text-sm text-gray-500">
              Step {currentStepIndex} of {steps.length - 2}
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

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Welcome Step */}
        {step === 'welcome' && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🌱</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join AMNI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Start your journey to food independence with an AI-powered greenhouse and a network of fellow growers.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <FeatureCard 
                icon={<Leaf className="w-6 h-6" />}
                title="Grow Fresh Food"
                description="Year-round production with AI-optimized growing"
              />
              <FeatureCard 
                icon={<Bot className="w-6 h-6" />}
                title="AI Does the Work"
                description="6 agents handle sales, recruiting, and more"
              />
              <FeatureCard 
                icon={<Users className="w-6 h-6" />}
                title="Join a Network"
                description="12,000+ growers collaborating together"
              />
            </div>

            <button
              onClick={nextStep}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-6 text-gray-500 text-sm">
              Takes about 5 minutes • No credit card required to start
            </p>
          </div>
        )}

        {/* Goals Step */}
        {step === 'goals' && (
          <div className="max-w-2xl mx-auto">
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              What are your goals?
            </h1>
            <p className="text-gray-600 mb-8">
              Select all that apply. This helps us recommend the right package for you.
            </p>

            <div className="space-y-3 mb-8">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedGoals.includes(goal.id)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-3xl">{goal.emoji}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{goal.label}</div>
                    <div className="text-sm text-gray-500">{goal.description}</div>
                  </div>
                  {selectedGoals.includes(goal.id) && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={selectedGoals.length === 0}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Package Step */}
        {step === 'package' && (
          <div>
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Choose your package
              </h1>
              <p className="text-gray-600">
                All packages include AI agents, marketplace access, and community support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{pkg.emoji}</div>
                      <div className="font-bold text-xl text-gray-900">{pkg.name}</div>
                      <div className="text-gray-500 text-sm">{pkg.forWho}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">${pkg.price.toLocaleString()}</div>
                      <div className="text-gray-500 text-sm">one-time</div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {selectedPackage === pkg.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!selectedPackage}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue with {selectedPkg?.name || 'Package'}
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              <Shield className="w-4 h-4 inline mr-1" />
              30-day money-back guarantee • Equipment buyback program
            </p>
          </div>
        )}

        {/* Details Step */}
        {step === 'details' && (
          <div className="max-w-xl mx-auto">
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your information
            </h1>
            <p className="text-gray-600 mb-8">
              We'll use this to set up your account and ship your equipment.
            </p>

            <div className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Alex"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Johnson"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="alex@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="123 Garden Street"
                />
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Portland"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="OR"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP code
                  </label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="97201"
                  />
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Referral code <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.referralCode}
                  onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="ABC123"
                />
                <p className="text-gray-500 text-sm mt-1">
                  If someone referred you, enter their code here
                </p>
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={!formData.firstName || !formData.lastName || !formData.email}
              className="w-full mt-8 bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue to Payment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="max-w-xl mx-auto">
            <button onClick={prevStep} className="text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete your order
            </h1>
            <p className="text-gray-600 mb-8">
              Review your order and enter payment details.
            </p>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {selectedPkg && (
                <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{selectedPkg.emoji}</div>
                    <div>
                      <div className="font-medium text-gray-900">{selectedPkg.name}</div>
                      <div className="text-sm text-gray-500">{selectedPkg.description}</div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">${selectedPkg.price.toLocaleString()}</div>
                </div>
              )}

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${selectedPkg?.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${selectedPkg?.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Form (Mock) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                <span className="text-sm text-gray-600">
                  I agree to the <a href="/terms" className="text-emerald-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</a>. I understand this is a one-time purchase with a 30-day money-back guarantee.
                </span>
              </label>
            </div>

            <button
              onClick={nextStep}
              className="w-full bg-emerald-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Complete Purchase — ${selectedPkg?.price.toLocaleString()}
            </button>

            <div className="flex items-center justify-center gap-4 mt-6 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Secure checkout
              </span>
              <span>•</span>
              <span>Powered by Stripe</span>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {step === 'complete' && (
          <div className="text-center max-w-xl mx-auto">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to AMNI! 🎉
            </h1>
            <p className="text-gray-600 mb-8">
              Your order has been confirmed. We're setting up your AI team right now.
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 text-left">
              <h2 className="font-semibold text-gray-900 mb-4">What happens next?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Check your email</div>
                    <div className="text-sm text-gray-500">We've sent login details to {formData.email || 'your email'}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Equipment ships in 2-3 days</div>
                    <div className="text-sm text-gray-500">Track your order in your dashboard</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Your AI team is ready</div>
                    <div className="text-sm text-gray-500">Start chatting with your agents immediately</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Join the community</div>
                    <div className="text-sm text-gray-500">Connect with 12,000+ fellow growers</div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

// =============================================================================
// COMPONENTS
// =============================================================================

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  )
}
