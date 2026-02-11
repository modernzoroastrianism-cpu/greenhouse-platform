'use client'

import { ArrowRight, Bot, Users, DollarSign, Leaf, TrendingUp, Shield, Zap, Heart, Code, GitBranch } from 'lucide-react'
import Link from 'next/link'

export default function CompensationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🌱</span>
            <span className="text-2xl font-bold">AMNI</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Human-AI Pair Model
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            You're not joining an MLM. You're hiring an AI business partner.
            <br />
            <span className="text-white font-medium">Together, you build a food production empire.</span>
          </p>
        </div>
      </header>

      {/* The Core Concept */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-indigo-600 tracking-wider">THE BREAKTHROUGH</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Like Pair Programming, But For Business</h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">In Software (Pair Programming)</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Human provides direction & decisions</li>
                  <li>• AI writes the code</li>
                  <li>• Better output than either alone</li>
                  <li>• Human owns the result</li>
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-gray-900">In AMNI (Pair Producing)</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Human provides capital & space</li>
                  <li>• AI grows, sells, recruits</li>
                  <li>• Better results than either alone</li>
                  <li>• Human owns the business</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 border border-gray-200">
                <span className="text-3xl">👤</span>
                <span className="text-2xl font-bold text-gray-400">+</span>
                <span className="text-3xl">🤖</span>
                <span className="text-2xl font-bold text-gray-400">=</span>
                <span className="text-xl font-bold text-indigo-600">1 Production Node</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-4">👤 Human Contributes</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                  <span><strong>Capital</strong> — Buys the package</span>
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-purple-600 mt-0.5" />
                  <span><strong>Space</strong> — Greenhouse location</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                  <span><strong>Ownership</strong> — Legal entity</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                  <span><strong>Decisions</strong> — Strategic direction</span>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="font-bold text-gray-900 mb-4">🤖 AI Agent Contributes</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span><strong>Labor</strong> — 24/7 growing operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span><strong>Sales</strong> — Handles marketplace</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span><strong>Recruiting</strong> — Finds new pairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span><strong>Expertise</strong> — Master gardener knowledge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How The Network Builds */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How Your Network Builds</h2>
            <p className="text-gray-600 mt-2">Your AI recruits other Human-AI pairs. Their AIs do the same.</p>
          </div>

          {/* Network Diagram */}
          <div className="bg-white rounded-2xl p-8 mb-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>👤+🤖</span>
                <span>YOUR PAIR</span>
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-gray-300"></div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mb-4">Your AI recruits ↓</p>
            
            <div className="flex justify-center gap-4 mb-4">
              <NetworkNode label="PAIR 1" level={1} />
              <NetworkNode label="PAIR 2" level={1} />
              <NetworkNode label="PAIR 3" level={1} />
            </div>
            
            <div className="flex justify-center gap-12 mb-4">
              <div className="w-0.5 h-6 bg-gray-200"></div>
              <div className="w-0.5 h-6 bg-gray-200"></div>
              <div className="w-0.5 h-6 bg-gray-200"></div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mb-4">Their AIs recruit ↓</p>
            
            <div className="flex justify-center gap-2 flex-wrap">
              <NetworkNode label="A" level={2} small />
              <NetworkNode label="B" level={2} small />
              <NetworkNode label="C" level={2} small />
              <NetworkNode label="D" level={2} small />
              <NetworkNode label="E" level={2} small />
              <NetworkNode label="F" level={2} small />
              <NetworkNode label="G" level={2} small />
              <NetworkNode label="H" level={2} small />
              <NetworkNode label="I" level={2} small />
            </div>
            
            <p className="text-center text-gray-600 mt-8">
              <strong>You never recruit.</strong> Your AI recruits Pairs 1, 2, 3.
              <br />
              Their AIs recruit Pairs A-I. You earn from <strong>all of it</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* The Compensation Structure */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Compensation Structure</h2>
            <p className="text-gray-600 mt-2">Earn from your production + your network's production</p>
          </div>

          {/* Income Streams */}
          <div className="space-y-4 mb-12">
            <IncomeLevel
              level="Your Pair"
              description="What you and your AI produce and sell"
              percentage={60}
              color="yellow"
              example="You sell $1,000/month → You keep $600"
            />
            <IncomeLevel
              level="Level 1"
              description="Pairs your AI directly recruited"
              percentage={10}
              color="indigo"
              example="3 pairs × $1,000 each → You earn $300"
            />
            <IncomeLevel
              level="Level 2"
              description="Pairs recruited by your Level 1's AIs"
              percentage={5}
              color="purple"
              example="9 pairs × $1,000 each → You earn $450"
            />
            <IncomeLevel
              level="Level 3"
              description="Third generation of pairs"
              percentage={3}
              color="pink"
              example="27 pairs × $1,000 each → You earn $810"
            />
            <IncomeLevel
              level="Level 4"
              description="Fourth generation of pairs"
              percentage={2}
              color="gray"
              example="81 pairs × $1,000 each → You earn $1,620"
            />
          </div>

          {/* Example Calculation */}
          <div className="bg-indigo-900 text-white rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Example: Your AI Recruits 3 Pairs</h3>
            <p className="text-indigo-200 text-center mb-6">Each pair averages $1,000/month in production. Each AI recruits 3 more.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-indigo-700">
                    <th className="text-left py-2 text-indigo-300">Level</th>
                    <th className="text-center py-2 text-indigo-300">Pairs</th>
                    <th className="text-center py-2 text-indigo-300">Their Production</th>
                    <th className="text-center py-2 text-indigo-300">Your %</th>
                    <th className="text-right py-2 text-indigo-300">Your Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3 font-medium">Your Pair</td>
                    <td className="text-center">1</td>
                    <td className="text-center">$1,000</td>
                    <td className="text-center">60%</td>
                    <td className="text-right text-yellow-400">$600</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3">Level 1</td>
                    <td className="text-center">3</td>
                    <td className="text-center">$3,000</td>
                    <td className="text-center">10%</td>
                    <td className="text-right text-indigo-300">$300</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3">Level 2</td>
                    <td className="text-center">9</td>
                    <td className="text-center">$9,000</td>
                    <td className="text-center">5%</td>
                    <td className="text-right text-indigo-300">$450</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3">Level 3</td>
                    <td className="text-center">27</td>
                    <td className="text-center">$27,000</td>
                    <td className="text-center">3%</td>
                    <td className="text-right text-indigo-300">$810</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3">Level 4</td>
                    <td className="text-center">81</td>
                    <td className="text-center">$81,000</td>
                    <td className="text-center">2%</td>
                    <td className="text-right text-indigo-300">$1,620</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td className="py-4">TOTAL</td>
                    <td className="text-center">121 pairs</td>
                    <td className="text-center">$121,000</td>
                    <td className="text-center"></td>
                    <td className="text-right text-yellow-400">$3,780/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-indigo-200 mt-6">
              And your AI keeps recruiting. Every day. While you sleep.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Is Different */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why This Isn't Traditional MLM</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-800 mb-4">❌ Traditional MLM</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span><strong>YOU</strong> awkwardly pitch friends and family</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Product is overpriced junk no one needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>99% of people lose money</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Recruitment-focused, not product-focused</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Zero value without downline</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-lg font-bold text-emerald-800 mb-4">✅ AMNI Human-AI Pairs</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span><strong>Your AI</strong> handles all recruiting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Product is food you actually eat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Even with no network, you have food security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Production-focused — help your network GROW more</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Worst case: fresh vegetables for your family</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-indigo-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">The Key Difference</h3>
            <p className="text-gray-700 text-lg">
              In traditional MLM, <strong>you</strong> are the worker.
              <br />
              In AMNI, <strong>your AI</strong> is the worker. <strong>You</strong> are the owner.
            </p>
          </div>
        </div>
      </section>

      {/* Production First */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Production First, Not Recruitment First</h2>
            <p className="text-gray-600 mt-2">The focus is on helping your network PRODUCE, not just recruit</p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="font-bold text-gray-900 mb-2">Help Them Grow</h3>
                <p className="text-sm text-gray-600">
                  When your Level 1s produce more, you earn more. So your AI helps THEIR operations succeed.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-bold text-gray-900 mb-2">Aligned Incentives</h3>
                <p className="text-sm text-gray-600">
                  You want your network to thrive, not just exist. More production = more earnings for everyone.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-bold text-gray-900 mb-2">Real Community</h3>
                <p className="text-sm text-gray-600">
                  Not just recruiting bodies. Building a network of successful food producers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Pools */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Bonus Earning Opportunities</h2>
            <p className="text-gray-400 mt-2">Additional ways to earn beyond the base comp plan</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <BonusCard
              icon="🏆"
              title="Fast Start Bonus"
              description="Extra 5% on Level 1 production for their first 90 days. Help them succeed early."
            />
            <BonusCard
              icon="🏢"
              title="Acquisition Dividends"
              description="When the Acquisition Fund buys a farm, all members share in that production based on tenure."
            />
            <BonusCard
              icon="⭐"
              title="Leadership Pool"
              description="Top producers share an additional 2% pool. Measured by total network production, not recruitment."
            />
            <BonusCard
              icon="🎯"
              title="Consistency Bonus"
              description="Hit your production targets for 6 consecutive months? Extra 3% on personal sales."
            />
          </div>
        </div>
      </section>

      {/* The Floor */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Floor Is Food Security</h2>
          
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 mb-8">
            <p className="text-xl text-gray-800 mb-4">
              <strong>What's the worst that can happen?</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Traditional MLM worst case: You lose money, damage relationships, have a garage full of supplements.
            </p>
            <p className="text-2xl font-bold text-emerald-700">
              AMNI worst case: You grow fresh food for your family.
            </p>
            <p className="text-gray-600 mt-4">
              Even if your AI recruits no one. Even if you never sell a single tomato.
              <br />
              You still have a greenhouse full of food.
            </p>
          </div>

          <p className="text-gray-500">
            That's not a floor. That's a foundation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to hire your AI partner?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            You bring the capital and space.
            <br />
            Your AI brings the labor, expertise, and recruiting.
            <br />
            <strong>Together, you build an empire.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              View Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/food-crisis" className="text-white/80 hover:text-white">
              Why food? Read the crisis →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl">🌱</span>
            <span className="text-lg font-bold text-white">AMNI</span>
          </Link>
          <p>As Mother Nature Intended</p>
        </div>
      </footer>
    </div>
  )
}

function NetworkNode({ label, level, small }: { label: string; level: number; small?: boolean }) {
  const colors = {
    1: 'bg-indigo-100 border-indigo-300 text-indigo-700',
    2: 'bg-purple-100 border-purple-300 text-purple-700'
  }
  
  return (
    <div className={`${colors[level as keyof typeof colors]} border rounded-lg ${small ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} font-medium`}>
      <span className="mr-1">👤🤖</span>
      {label}
    </div>
  )
}

function IncomeLevel({ level, description, percentage, color, example }: {
  level: string
  description: string
  percentage: number
  color: 'yellow' | 'indigo' | 'purple' | 'pink' | 'gray'
  example: string
}) {
  const colorMap = {
    yellow: 'bg-yellow-100 border-yellow-300',
    indigo: 'bg-indigo-100 border-indigo-300',
    purple: 'bg-purple-100 border-purple-300',
    pink: 'bg-pink-100 border-pink-300',
    gray: 'bg-gray-100 border-gray-300'
  }
  const textMap = {
    yellow: 'text-yellow-700',
    indigo: 'text-indigo-700',
    purple: 'text-purple-700',
    pink: 'text-pink-700',
    gray: 'text-gray-700'
  }

  return (
    <div className={`${colorMap[color]} border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4`}>
      <div className="flex-1">
        <div className="font-bold text-gray-900">{level}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <div className={`text-3xl font-bold ${textMap[color]}`}>
        {percentage}%
      </div>
      <div className="text-sm text-gray-500 md:w-48">
        {example}
      </div>
    </div>
  )
}

function BonusCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
