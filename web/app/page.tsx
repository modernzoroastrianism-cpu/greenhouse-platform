'use client'

import { ArrowRight, Bot, Leaf, Users, TrendingUp, Home, DollarSign, Network, ShoppingCart, Sprout, Shield, Truck, Heart } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900" />
        
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            {/* AI for Good Banner */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm text-gray-300 mb-6">
              <span className="text-lg">🤖</span>
              <span>An AI company built to help humanity — not replace it</span>
            </div>

            {/* AMNI Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-5xl">🌱</span>
              <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">AMNI</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              What could be more important
              <br />
              <span className="text-emerald-400">than growing food?</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6">
              The future of food is the future of us.
            </p>

            <div className="bg-red-900/40 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-red-800/50">
              <p className="text-xl md:text-2xl text-white font-medium">
                The human race will consume more food in the next 50 years
                <br />
                than it has in the <span className="text-red-400 font-bold">past 10,000 years combined.</span>
              </p>
              <p className="text-lg text-gray-400 mt-4">Is this problem worth solving?</p>
              <Link href="/food-crisis" className="inline-block mt-4 text-red-400 font-medium hover:text-red-300 underline underline-offset-4">
                See the full crisis →
              </Link>
            </div>

            <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
              <span className="text-white font-semibold">AMNI is the solution.</span> Production by the mass, not mass production.
              <br />
              Get a growing package. Your AI handles the rest. Profit-share with your network.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/packages" 
               className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              View Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/marketplace"
               className="flex items-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Explore Marketplace
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-emerald-200/70 text-sm">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              AMNI Handles Legal & Insurance
            </span>
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Fulfillment Network
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Profit Sharing
            </span>
          </div>
        </div>
      </header>

      {/* The Problem */}
      <section className="py-16 px-6 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The grocery system is broken
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-2">🏪</div>
              <div className="font-bold text-gray-900">4 Retailers Control Everything</div>
              <div className="text-sm text-gray-600">They decide what's grown, how it's priced, who sells</div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-2">🗑️</div>
              <div className="font-bold text-gray-900">400M lbs Wasted</div>
              <div className="text-sm text-gray-600">Food perishes in warehouses while 1 billion go hungry</div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-2">🚚</div>
              <div className="font-bold text-gray-900">1,500+ Miles</div>
              <div className="text-sm text-gray-600">Average distance food travels from farm to plate</div>
            </div>
          </div>
        </div>
      </section>

      {/* The AMNI Solution */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The AMNI Solution
            </h2>
            <p className="text-xl text-gray-600">
              Direct connection: Producers → AMNI → Consumers
              <br />
              <strong>No retailers. No waste. Local everything.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <SolutionCard
              emoji="🌱"
              title="You Produce"
              description="Get a growing package. Your AI guides everything. Grow high-quality, local food."
              link="/packages"
              linkText="See packages"
            />
            <SolutionCard
              emoji="🏪"
              title="AMNI Buys"
              description="We purchase your surplus at fair prices. We handle legal, insurance, regulations."
              link="/marketplace"
              linkText="View marketplace"
            />
            <SolutionCard
              emoji="🛒"
              title="Consumers Get"
              description="Fresh, local, affordable. Subscriptions, meal kits, or individual orders."
              link="/shop"
              linkText="Shop now"
            />
          </div>
        </div>
      </section>

      {/* How It Works - For Producers */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works for producers
            </h2>
            <p className="text-xl text-gray-600">
              Your AI does the hard work. You share in the profits.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <StepCard
              number="1"
              icon={<Home className="w-8 h-8" />}
              title="Get a Package"
              description="Indoor, outdoor, or urban. Financing available."
            />
            <StepCard
              number="2"
              icon={<Bot className="w-8 h-8" />}
              title="AI Guides You"
              description="24/7 expert guidance. No experience needed."
            />
            <StepCard
              number="3"
              icon={<Leaf className="w-8 h-8" />}
              title="Sell to AMNI"
              description="We buy your surplus. Fair prices, instant payment."
            />
            <StepCard
              number="4"
              icon={<Network className="w-8 h-8" />}
              title="Grow Network"
              description="Your AI recruits. You earn on everyone they bring."
            />
          </div>
        </div>
      </section>

      {/* What Your AI Does */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your AI works 24/7
            </h2>
            <p className="text-xl text-gray-600">
              While you sleep, your agent is growing, selling, and building
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AITaskCard
              emoji="🌱"
              title="Grows Your Food"
              tasks={[
                "Monitors all conditions",
                "Tells you exactly what to do",
                "Catches problems early",
                "Maximizes yield & quality"
              ]}
            />
            <AITaskCard
              emoji="💰"
              title="Sells to AMNI"
              tasks={[
                "Lists your available surplus",
                "Coordinates pickup/delivery",
                "Handles all paperwork",
                "Deposits earnings instantly"
              ]}
            />
            <AITaskCard
              emoji="🚀"
              title="Recruits Producers"
              tasks={[
                "Finds potential growers",
                "Explains AMNI benefits",
                "Handles conversations",
                "Signs them under YOU"
              ]}
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-2">
              <strong>You don't recruit.</strong> Your AI does.
            </p>
            <p className="text-gray-500">
              No awkward conversations. No pitching friends. Just an AI working for you.
            </p>
          </div>
        </div>
      </section>

      {/* Earning Structure */}
      <section className="py-20 px-6 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three ways to earn
            </h2>
            <p className="text-xl text-emerald-200">
              Production by the mass. Profit sharing for all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <IncomeCard
              icon={<Leaf className="w-6 h-6" />}
              title="Food + Savings"
              amount="$200-500"
              period="/month"
              description="Eat what you grow. Save on groceries. Health included."
            />
            <IncomeCard
              icon={<DollarSign className="w-6 h-6" />}
              title="Surplus Sales"
              amount="$100-1000"
              period="/month"
              description="AMNI buys your excess at fair prices. Guaranteed market."
            />
            <IncomeCard
              icon={<Users className="w-6 h-6" />}
              title="Network Profit Share"
              amount="Unlimited"
              period=""
              description="Earn % on every producer your AI brings to AMNI."
            />
          </div>

          {/* Network Example */}
          <div className="bg-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Your AI recruits 3 producers...</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-emerald-300">Level</th>
                    <th className="text-center py-2 text-emerald-300">Producers</th>
                    <th className="text-center py-2 text-emerald-300">Combined Sales</th>
                    <th className="text-right py-2 text-emerald-300">Your Share</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3">You</td>
                    <td className="text-center">1</td>
                    <td className="text-center">$500/mo</td>
                    <td className="text-right">$500</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Level 1</td>
                    <td className="text-center">3</td>
                    <td className="text-center">$1,500/mo</td>
                    <td className="text-right text-emerald-400">+$150</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Level 2</td>
                    <td className="text-center">9</td>
                    <td className="text-center">$4,500/mo</td>
                    <td className="text-right text-emerald-400">+$225</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Level 3</td>
                    <td className="text-center">27</td>
                    <td className="text-center">$13,500/mo</td>
                    <td className="text-right text-emerald-400">+$337</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-3">Total</td>
                    <td className="text-center">40 producers</td>
                    <td className="text-center">$20,000/mo</td>
                    <td className="text-right text-yellow-400">$1,212/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-emerald-300 mt-4 text-sm">
              And your AI keeps recruiting. Every day. While you sleep.
            </p>
          </div>
        </div>
      </section>

      {/* Why AMNI is Different */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why AMNI is different
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-bold text-red-800 mb-4">❌ The Old Way</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  Retailers take 30-50% markup
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  You can't sell direct — regulations, insurance
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  Find your own customers
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  No expertise? Figure it out yourself.
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-800 mb-4">✅ The AMNI Way</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <strong>Fair prices</strong> — no retailer middlemen
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <strong>AMNI handles compliance</strong> — legal, insurance, regs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <strong>Guaranteed market</strong> — AMNI buys your surplus
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <strong>AI expert 24/7</strong> — no experience needed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Good Life */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              This isn't just business.
              <br />
              <span className="text-amber-700">It's the good life.</span>
            </h2>
            <p className="text-xl text-gray-600">
              Your grandparents had gardens, canned their harvest, knew their neighbors.
              <br />
              AMNI brings that back.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-2">🌱</div>
              <div className="font-semibold text-gray-900">Grow</div>
              <div className="text-sm text-gray-600">Your own food</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🫙</div>
              <div className="font-semibold text-gray-900">Preserve</div>
              <div className="text-sm text-gray-600">Jams, pickles, sauces</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <div className="font-semibold text-gray-900">Share</div>
              <div className="text-sm text-gray-600">Dinner with neighbors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🤝</div>
              <div className="font-semibold text-gray-900">Community</div>
              <div className="text-sm text-gray-600">Block by block</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Would we all be healthier and happier living like this?</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Growing food. Preserving the harvest. Sharing meals. Building community.
              <br />
              AI just makes it possible again.
            </p>
            <Link href="/lifestyle" className="text-amber-700 font-semibold hover:underline">
              Learn about the good life →
            </Link>
          </div>
        </div>
      </section>

      {/* FOMO */}
      <section className="py-20 px-6 bg-gradient-to-br from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Early producers build the biggest networks
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Every day you wait, someone else's AI is recruiting the producers who could be in YOUR network.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 rounded-xl p-6">
              <div className="text-3xl mb-2">🥇</div>
              <div className="font-bold text-gray-900">Join Month 1</div>
              <div className="text-sm text-gray-600">4 levels deep by month 6</div>
            </div>
            <div className="bg-white/70 rounded-xl p-6">
              <div className="text-3xl mb-2">🥈</div>
              <div className="font-bold text-gray-900">Join Month 3</div>
              <div className="text-sm text-gray-600">2 levels deep by month 6</div>
            </div>
            <div className="bg-white/50 rounded-xl p-6">
              <div className="text-3xl mb-2">🥉</div>
              <div className="font-bold text-gray-900">Join Month 6</div>
              <div className="text-sm text-gray-600">Starting from scratch</div>
            </div>
          </div>

          <Link href="/packages"
             className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg">
            Claim Your Position
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">🌱</span>
            <span className="text-3xl font-bold">AMNI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the ecosystem.
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get a package. Start producing. Your AI handles the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages"
               className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              View Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/marketplace"
               className="flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors">
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌱</span>
                <span className="text-xl font-bold text-white">AMNI</span>
              </div>
              <p className="text-sm">
                Production by the mass.
                <br />
                Not mass production.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Produce</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/packages" className="hover:text-white">Packages</Link></li>
                <li><Link href="/join" className="hover:text-white">Join Network</Link></li>
                <li><Link href="/calculator" className="hover:text-white">Earning Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Consume</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/marketplace" className="hover:text-white">Marketplace</Link></li>
                <li><Link href="/subscriptions" className="hover:text-white">Subscriptions</Link></li>
                <li><Link href="/meal-kits" className="hover:text-white">Meal Kits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">AMNI</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/acquisition" className="hover:text-white">Acquisition Fund</Link></li>
                <li><Link href="/lifestyle" className="hover:text-white">The Good Life</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>🌱 AMNI — Resilient sharing ecosystem for the future of food</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SolutionCard({ emoji, title, description, link, linkText }: {
  emoji: string
  title: string
  description: string
  link: string
  linkText: string
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 text-center">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={link} className="text-emerald-600 font-medium hover:underline">
        {linkText} →
      </Link>
    </div>
  )
}

function StepCard({ number, icon, title, description }: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="relative inline-block mb-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {number}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function AITaskCard({ emoji, title, tasks }: {
  emoji: string
  title: string
  tasks: string[]
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-emerald-500 mt-0.5">✓</span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  )
}

function IncomeCard({ icon, title, amount, period, description }: {
  icon: React.ReactNode
  title: string
  amount: string
  period: string
  description: string
}) {
  return (
    <div className="bg-white/10 rounded-xl p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-full text-emerald-300 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <div className="text-3xl font-bold text-yellow-400 mb-1">
        {amount}<span className="text-lg font-normal text-emerald-300">{period}</span>
      </div>
      <p className="text-emerald-200/70 text-sm">{description}</p>
    </div>
  )
}
