'use client'

import { ArrowRight, TrendingUp, Building2, Handshake, PiggyBank, Users, Leaf, BarChart3, Target, Shield, DollarSign, Sprout } from 'lucide-react'
import Link from 'next/link'

export default function AcquisitionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🌱</span>
            <span className="text-2xl font-bold">AMNI</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Micro + Macro
            <br />
            <span className="text-purple-300">Two Engines of Growth</span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Individual producers grow the network from the ground up.
            <br />
            The Acquisition Fund scales it from the top down.
          </p>
        </div>
      </header>

      {/* The Two Engines */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Micro */}
            <div className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">MICRO</h2>
                  <p className="text-emerald-700">Grassroots Growth</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Individual Producers</strong> — Backyard, urban, home greenhouses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>AI MLM Model</strong> — Your AI recruits new producers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Network Effect</strong> — Each producer brings more</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Community</strong> — Block by block food security</span>
                </li>
              </ul>

              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-emerald-600">1,000s</div>
                <div className="text-sm text-gray-600">of small producers growing together</div>
              </div>
            </div>

            {/* Macro */}
            <div className="bg-indigo-50 rounded-2xl p-8 border-2 border-indigo-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">MACRO</h2>
                  <p className="text-indigo-700">Strategic Acquisitions</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 font-bold">✓</span>
                  <span><strong>Acquisition Fund</strong> — Pool of capital from all sales</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 font-bold">✓</span>
                  <span><strong>Buy Existing Operations</strong> — Farms, greenhouses, food businesses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 font-bold">✓</span>
                  <span><strong>Instant Scale</strong> — Established production capacity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 font-bold">✓</span>
                  <span><strong>Same Profit Sharing</strong> — Members earn from acquisitions too</span>
                </li>
              </ul>

              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-indigo-600">10x-100x</div>
                <div className="text-sm text-gray-600">capacity added per acquisition</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xl text-gray-700">
              <strong>Micro grows the base. Macro accelerates it.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* The Acquisition Fund */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <PiggyBank className="inline w-8 h-8 mr-2 text-indigo-600" />
              The Acquisition Fund
            </h2>
            <p className="text-xl text-gray-600">
              Every sale contributes. The fund grows. Acquisitions happen.
            </p>
          </div>

          {/* Revenue Split */}
          <div className="bg-white rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">How Revenue Flows</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - Producer payouts */}
              <div>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-emerald-600">60%</div>
                  <div className="text-gray-600">Producer Payouts</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-emerald-50 rounded-lg p-3">
                    <span className="text-gray-700">Your Direct Sales</span>
                    <span className="font-bold text-emerald-600">40%</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50 rounded-lg p-3">
                    <span className="text-gray-700">Network Commissions</span>
                    <span className="font-bold text-emerald-600">20%</span>
                  </div>
                </div>
              </div>

              {/* Right side - AMNI Operations */}
              <div>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-indigo-600">40%</div>
                  <div className="text-gray-600">AMNI Operations</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                    <span className="text-gray-700 font-medium">🏢 Acquisition Fund</span>
                    <span className="font-bold text-indigo-600">15%</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-700">Operations & Tech</span>
                    <span className="font-bold text-gray-600">15%</span>
                  </div>
                  <div className="flex justify-between items-center bg-pink-50 rounded-lg p-3">
                    <span className="text-gray-700">Donation & Impact</span>
                    <span className="font-bold text-pink-600">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fund Growth Example */}
          <div className="bg-indigo-900 text-white rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Watch the Fund Grow</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-indigo-700">
                    <th className="text-left py-2 text-indigo-300">Stage</th>
                    <th className="text-center py-2 text-indigo-300">Producers</th>
                    <th className="text-center py-2 text-indigo-300">Monthly Revenue</th>
                    <th className="text-right py-2 text-indigo-300">Acquisition Fund (15%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3">Launch</td>
                    <td className="text-center">100</td>
                    <td className="text-center">$50,000</td>
                    <td className="text-right text-indigo-300">$7,500/mo</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3">Year 1</td>
                    <td className="text-center">1,000</td>
                    <td className="text-center">$500,000</td>
                    <td className="text-right text-indigo-300">$75,000/mo</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3">Year 2</td>
                    <td className="text-center">5,000</td>
                    <td className="text-center">$2,500,000</td>
                    <td className="text-right text-purple-300">$375,000/mo</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Year 3+</td>
                    <td className="text-center font-bold">10,000+</td>
                    <td className="text-center font-bold">$5,000,000+</td>
                    <td className="text-right font-bold text-yellow-400">$750,000+/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <p className="text-indigo-200">
                At $750K/month, we can acquire a commercial farm every quarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Acquire */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Acquire</h2>
            <p className="text-xl text-gray-600">
              Opportunities everywhere. The fund makes it possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AcquisitionTypeCard
              icon={<Building2 className="w-8 h-8" />}
              title="Struggling Farms"
              description="Family farms that can't compete with industrial ag. Good land, good people, just need better market access."
              opportunity="AMNI provides guaranteed market + AI optimization"
              color="emerald"
            />
            <AcquisitionTypeCard
              icon={<Leaf className="w-8 h-8" />}
              title="Closing Greenhouses"
              description="Commercial greenhouses going out of business due to energy costs or market pressures."
              opportunity="AMNI absorbs fixed costs across network"
              color="blue"
            />
            <AcquisitionTypeCard
              icon={<Handshake className="w-8 h-8" />}
              title="Retirement Sales"
              description="Farmers with no succession plan. Want to sell but don't want their life's work to become a subdivision."
              opportunity="AMNI continues their legacy, keeps it producing"
              color="purple"
            />
            <AcquisitionTypeCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Expansion Partners"
              description="Existing operations that want to grow but lack capital or market reach."
              opportunity="AMNI injects capital + provides distribution"
              color="amber"
            />
            <AcquisitionTypeCard
              icon={<Target className="w-8 h-8" />}
              title="Strategic Locations"
              description="Properties in food deserts or underserved areas where local production would have high impact."
              opportunity="AMNI serves communities others ignore"
              color="pink"
            />
            <AcquisitionTypeCard
              icon={<Shield className="w-8 h-8" />}
              title="Distressed Assets"
              description="Foreclosures, bankruptcies, and fire sales where good infrastructure is available cheap."
              opportunity="AMNI rehabilitates and integrates"
              color="gray"
            />
          </div>
        </div>
      </section>

      {/* How Members Benefit */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How YOU Benefit from Acquisitions
            </h2>
            <p className="text-xl text-gray-600">
              Every acquisition grows the pie. You get a slice.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Direct Earnings
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    Acquired operations join the profit-sharing pool
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    More production = more sales = more commissions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    Network effects: their sales count toward your volume
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Network Value
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">✓</span>
                    More products available = more customer options
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">✓</span>
                    Better geographic coverage = faster delivery
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">✓</span>
                    Stronger brand = easier recruiting
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-indigo-100 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">Example: AMNI Acquires a 50-Acre Farm</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">+$100K</div>
                  <div className="text-gray-600">Monthly production added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">+$15K</div>
                  <div className="text-gray-600">Added to payout pool monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">All Members</div>
                  <div className="text-gray-600">Benefit from the growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Flywheel */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Unstoppable Flywheel</h2>
            <p className="text-xl text-gray-300">
              Micro feeds Macro. Macro accelerates Micro. Both benefit you.
            </p>
          </div>

          <div className="relative">
            {/* Flywheel Steps */}
            <div className="space-y-4">
              <FlywheelStep
                number="1"
                title="Micro producers join"
                description="AI MLM recruits backyard/urban growers"
              />
              <FlywheelStep
                number="2"
                title="Sales generate revenue"
                description="Products flow to marketplace, money comes in"
              />
              <FlywheelStep
                number="3"
                title="15% goes to Acquisition Fund"
                description="Every sale builds the war chest"
              />
              <FlywheelStep
                number="4"
                title="Fund acquires macro operations"
                description="Struggling farms, closing greenhouses, expansion deals"
              />
              <FlywheelStep
                number="5"
                title="Acquisitions add massive capacity"
                description="One farm = 50-100x a backyard greenhouse"
              />
              <FlywheelStep
                number="6"
                title="More production = more sales"
                description="Network value increases, customer base grows"
              />
              <FlywheelStep
                number="7"
                title="Easier to recruit + more to earn"
                description="Micro producers see bigger opportunity, join faster"
              />
            </div>

            {/* Loop Arrow */}
            <div className="mt-8 text-center text-4xl text-indigo-400">
              ↻ Repeat Forever
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Full Transparency</h2>
            <p className="text-xl text-gray-600">
              You'll always know where the fund is and how it's being used.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">📊 Public Dashboard</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Current fund balance (updated daily)</li>
                <li>• Monthly contributions to fund</li>
                <li>• Acquisitions in progress</li>
                <li>• Completed acquisitions and their performance</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">🗳️ Member Input</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Vote on major acquisition decisions</li>
                <li>• Submit acquisition targets you know about</li>
                <li>• Review quarterly acquisition reports</li>
                <li>• Community discussion on strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Be Part of Both Engines
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join as a micro producer. Every sale you make grows the fund.
            <br />
            Every acquisition the fund makes grows your earnings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              Get Your Package
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-white/90 hover:text-white">
              Learn more about AMNI →
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
          <p>Micro + Macro. Growing together.</p>
        </div>
      </footer>
    </div>
  )
}

function AcquisitionTypeCard({ icon, title, description, opportunity, color }: {
  icon: React.ReactNode
  title: string
  description: string
  opportunity: string
  color: 'emerald' | 'blue' | 'purple' | 'amber' | 'pink' | 'gray'
}) {
  const colorMap = {
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    pink: 'bg-pink-100 text-pink-600',
    gray: 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[color]}`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="bg-gray-50 rounded-lg p-3 text-sm">
        <span className="font-medium text-gray-700">✓ </span>
        <span className="text-gray-600">{opportunity}</span>
      </div>
    </div>
  )
}

function FlywheelStep({ number, title, description }: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
        {number}
      </div>
      <div>
        <div className="font-bold text-white">{title}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
    </div>
  )
}
