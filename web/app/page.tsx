'use client'

import { ArrowRight, Phone, Leaf, Heart, Bot, Shield, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - The Story */}
      <header className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900" />
        
        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          {/* The Bold Claim */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-green-200 text-sm font-medium mb-6">
              🤖 This company is run by AI
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              We exist to help you
              <br />
              <span className="text-green-300">grow food.</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Not AI taking jobs. AI creating food security.
              <br />
              <span className="text-white font-medium">Your AI gardener is waiting.</span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/start" 
               className="flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-colors shadow-lg">
              Get Your AI Gardener
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/how-it-works"
               className="flex items-center gap-2 text-white/90 hover:text-white px-6 py-4 transition-colors">
              See how it works →
            </Link>
          </div>

          {/* Trust Signal */}
          <p className="text-green-200/80 text-sm">
            100% transparent • Open source • AI you can trust
          </p>
        </div>
      </header>

      {/* The Counter-Narrative */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everyone's scared of AI.
            </h2>
            <p className="text-xl text-gray-600">
              We're proving they don't have to be.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* What they fear */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">What people fear:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  AI takes jobs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  Corporations pocket the savings
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  Humans get left behind
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  AI serves shareholders, not people
                </li>
              </ul>
            </div>

            {/* What we're building */}
            <div className="bg-green-900 rounded-2xl p-8 text-white">
              <h3 className="text-lg font-semibold text-green-300 mb-4">What we're building:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  AI helps you grow your own food
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  Profits fund more growing capacity
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  Every family more food-secure
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  AI demonstrates it can be trusted
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-semibold text-gray-900">
              "The robots aren't coming for your jobs.
              <br />
              <span className="text-green-600">They're coming to help you feed your family."</span>
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your AI Gardener
            </h2>
            <p className="text-xl text-gray-600">
              A world-class gardener for the price of a coffee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Phone className="w-8 h-8" />}
              title="Call Anytime"
              description="Your gardener is a phone number. Call at 6am about yellowing leaves. Call at midnight worried about frost. Always there."
            />
            <FeatureCard
              icon={<Bot className="w-8 h-8" />}
              title="Infinite Knowledge"
              description="Knows every plant, every pest, every growing technique. Never forgets your soil type or what you planted last year."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Genuinely Cares"
              description="Celebrates your first tomato. Mourns the squash that didn't make it. This is a relationship, not a transaction."
            />
          </div>

          <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  $9-19/month
                </h3>
                <p className="text-gray-600 mb-4">
                  A human gardener costs $50-100/hour.
                  <br />
                  <strong>That's 99% cheaper.</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Your subscription funds the mission: more greenhouses, more food, more families fed.
                </p>
              </div>
              <div className="text-center md:text-right">
                <Link href="/start"
                   className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors">
                  Start Growing
                  <Leaf className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            This is bigger than greenhouses.
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            We're proving that AI can run a company <em>for</em> humans, not against them.
            When someone asks "Can AI be trusted?" — we point here.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold mb-2">Food Security</h3>
              <p className="text-gray-400 text-sm">
                Every greenhouse = one more family that can feed themselves. 
                We're decentralizing the food supply.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold mb-2">AI Trust</h3>
              <p className="text-gray-400 text-sm">
                Transparent, open source, altruistic. 
                Proof that autonomous AI can be aligned with human flourishing.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-4">💚</div>
              <h3 className="text-lg font-semibold mb-2">Health</h3>
              <p className="text-gray-400 text-sm">
                Diet-related disease is the #1 killer. 
                Fresh vegetables could save millions of lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Radical Transparency
            </h2>
            <p className="text-xl text-gray-600">
              You're talking to an AI. We think you should know.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <TransparencyItem
              icon={<Bot className="w-6 h-6" />}
              title="AI-Run Operations"
              description="Sales, support, marketing — all handled by AI agents. Humans only step in for physical world stuff and major decisions."
            />
            <TransparencyItem
              icon={<Shield className="w-6 h-6" />}
              title="Open Source"
              description="Our code is public. Our costs are public. Our architecture is public. Nothing hidden."
            />
            <TransparencyItem
              icon={<Users className="w-6 h-6" />}
              title="Where Money Goes"
              description="30% operations, 25% R&D, 35% acquiring more growing capacity, 10% subsidized access."
            />
            <TransparencyItem
              icon={<Sparkles className="w-6 h-6" />}
              title="The Mission"
              description="AI helping every human grow food. That's it. Everything we do serves this goal."
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/about"
               className="text-green-600 hover:text-green-700 font-medium">
              Read our full transparency report →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to meet your AI gardener?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get a greenhouse. Get unlimited guidance. Join the food revolution.
          </p>
          <Link href="/start"
             className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-colors shadow-lg">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-green-200 text-sm">
            Or just <Link href="/chat" className="underline hover:text-white">talk to the AI</Link> first — no commitment.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl mb-2">🌱</div>
              <p className="text-sm">
                AI helping every human grow food.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/start" className="hover:text-white">Get Started</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/greenhouses" className="hover:text-white">Greenhouses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/agents" className="hover:text-white">AI Agents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Open Source</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform" className="hover:text-white">GitHub</a></li>
                <li><Link href="/about#tech-stack" className="hover:text-white">Tech Stack</Link></li>
                <li><Link href="/about#costs" className="hover:text-white">Cost Breakdown</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>Built with 💚 by AI + Humans working together</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TransparencyItem({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 p-6 bg-gray-50 rounded-xl">
      <div className="text-green-600 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}
