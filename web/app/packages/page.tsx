'use client'

import { ArrowRight, Check, Bot, Leaf, Sun, Home, Building, Sprout, Zap, Shield, Phone, Truck, Users, Star, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PackagesPage() {
  const [showFinancing, setShowFinancing] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🌱</span>
            <span className="text-2xl font-bold">AMNI</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Growing Package</h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Every package includes your AI agent. Start producing. AMNI handles the rest.
          </p>
        </div>
      </header>

      {/* All Packages Include */}
      <section className="py-8 px-6 bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-emerald-800 font-medium mb-4">EVERY PACKAGE INCLUDES:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-700">
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Personal AI Agent
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              AMNI Handles Legal & Insurance
            </span>
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Guaranteed Market
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Network Profit Sharing
            </span>
          </div>
        </div>
      </section>

      {/* Main Packages */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Growing Packages</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <PackageCard
              name="Backyard Starter"
              icon="🌱"
              price={499}
              monthlyAI={19}
              description="Perfect for beginners. Start growing in your backyard with a small greenhouse."
              features={[
                '8x6 ft greenhouse kit',
                'Basic sensor kit (temp, humidity)',
                'Starter seeds & soil',
                'Setup guide & video training',
                'Personal AI gardener',
                'Sell surplus to AMNI',
                'Network profit sharing'
              ]}
              production="$100-300/month potential"
              color="emerald"
            />

            {/* Pro Package */}
            <PackageCard
              name="Backyard Pro"
              icon="🏡"
              price={1499}
              monthlyAI={29}
              description="Serious production for serious growers. Year-round growing capability."
              features={[
                '12x10 ft insulated greenhouse',
                'Smart sensor suite (soil, light, CO2)',
                'Automated irrigation system',
                'Heating/cooling controls',
                'Extended seed library',
                'Preserving equipment (canning)',
                'Priority AI support',
                'Enhanced profit sharing tier'
              ]}
              production="$300-800/month potential"
              popular
              color="amber"
            />

            {/* Indoor Package */}
            <PackageCard
              name="Urban Indoor"
              icon="🏢"
              price={899}
              monthlyAI={24}
              description="No yard? No problem. Grow indoors with vertical hydroponics."
              features={[
                'Vertical hydroponic tower',
                'Full-spectrum LED lighting',
                'Smart nutrient dosing',
                'Compact design (fits anywhere)',
                'Herb & greens optimized',
                'Personal AI gardener',
                'Apartment-friendly setup',
                'Network profit sharing'
              ]}
              production="$150-400/month potential"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Advanced Packages */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Advanced Production</h2>
          <p className="text-center text-gray-600 mb-12">For serious producers ready to scale</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Aquaponics */}
            <AdvancedPackageCard
              name="Aquaponics System"
              icon="🐟"
              price={3499}
              monthlyAI={49}
              description="Fish + plants in a closed-loop system. Zero waste, maximum yield. Protein and produce."
              features={[
                '500-gallon fish tank',
                'Grow beds for 50+ plants',
                'Full filtration system',
                'Fish (tilapia or trout)',
                'AI monitors entire ecosystem',
                'Training on fish care',
                'Both fish AND produce to sell'
              ]}
              production="$800-2000/month potential"
            />

            {/* Commercial */}
            <AdvancedPackageCard
              name="Micro-Farm"
              icon="🚜"
              price={9999}
              monthlyAI={99}
              description="Turn your land into a production powerhouse. Multiple growing systems working together."
              features={[
                '20x30 ft commercial greenhouse',
                'Aquaponics + soil beds',
                'Full automation suite',
                'Climate control systems',
                'Commercial-grade sensors',
                'Dedicated AI farm manager',
                'AMNI fulfillment integration',
                'Premium profit sharing tier'
              ]}
              production="$2000-5000/month potential"
            />
          </div>
        </div>
      </section>

      {/* Specialty Add-ons */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Add-On Modules</h2>
          <p className="text-center text-gray-600 mb-12">Expand your production with specialty add-ons</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AddOnCard icon="🍄" name="Mushroom Growing" price={199} description="Grow gourmet mushrooms" />
            <AddOnCard icon="🐝" name="Bee Keeping" price={349} description="Honey production + pollination" />
            <AddOnCard icon="🫙" name="Preserving Station" price={249} description="Canning, jamming, pickling" />
            <AddOnCard icon="🌶️" name="Hot House" price={399} description="Peppers, tropical plants" />
            <AddOnCard icon="🥬" name="Microgreens Kit" price={149} description="Fast-growing, high-value" />
            <AddOnCard icon="🌻" name="Cut Flowers" price={179} description="Sell bouquets locally" />
            <AddOnCard icon="🧄" name="Fermentation Lab" price={199} description="Kimchi, sauerkraut, kombucha" />
            <AddOnCard icon="🌿" name="Medicinal Herbs" price={229} description="Wellness herbs & teas" />
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 Financing Available</h2>
            <p className="text-gray-600">Start producing now, pay over time. All packages eligible.</p>
          </div>

          <button 
            onClick={() => setShowFinancing(!showFinancing)}
            className="w-full bg-white rounded-xl p-4 flex items-center justify-between border border-gray-200 mb-4"
          >
            <span className="font-medium text-gray-900">View financing options</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showFinancing ? 'rotate-180' : ''}`} />
          </button>

          {showFinancing && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="grid md:grid-cols-3 gap-6">
                <FinancingOption
                  months={6}
                  example="$499 package"
                  monthly={89}
                  apr={0}
                />
                <FinancingOption
                  months={12}
                  example="$1499 package"
                  monthly={135}
                  apr={9.9}
                />
                <FinancingOption
                  months={24}
                  example="$3499 package"
                  monthly={165}
                  apr={12.9}
                />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Subject to credit approval. APR varies based on creditworthiness.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* What's Included Breakdown */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">What Your AI Agent Does</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Grows Your Food</h3>
              <p className="text-gray-600 text-sm">
                24/7 monitoring. Tells you exactly what to do, when. Catches problems before they become disasters.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sells to AMNI</h3>
              <p className="text-gray-600 text-sm">
                Lists your surplus. Coordinates pickup. Handles all paperwork. Money in your account automatically.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Builds Your Network</h3>
              <p className="text-gray-600 text-sm">
                Recruits new producers. You earn on everyone they bring in. Passive income while you sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Compare Packages</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Feature</th>
                  <th className="text-center py-4 px-4 font-medium text-gray-600">Starter<br/><span className="text-emerald-600">$499</span></th>
                  <th className="text-center py-4 px-4 font-medium text-gray-600 bg-amber-50">Pro<br/><span className="text-amber-600">$1,499</span></th>
                  <th className="text-center py-4 px-4 font-medium text-gray-600">Urban<br/><span className="text-purple-600">$899</span></th>
                  <th className="text-center py-4 px-4 font-medium text-gray-600">Aquaponics<br/><span className="text-blue-600">$3,499</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <CompareRow feature="Growing Space" starter="48 sq ft" pro="120 sq ft" urban="8 sq ft" aqua="75 sq ft" />
                <CompareRow feature="AI Agent" starter="✓" pro="✓ Priority" urban="✓" aqua="✓ Premium" />
                <CompareRow feature="Climate Control" starter="Manual" pro="Automated" urban="Automated" aqua="Automated" />
                <CompareRow feature="Fish Production" starter="—" pro="—" urban="—" aqua="✓" />
                <CompareRow feature="Monthly AI Fee" starter="$19" pro="$29" urban="$24" aqua="$49" />
                <CompareRow feature="Profit Share Tier" starter="Standard" pro="Enhanced" urban="Standard" aqua="Premium" />
                <CompareRow feature="Est. Monthly Revenue" starter="$100-300" pro="$300-800" urban="$150-400" aqua="$800-2000" highlight />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start producing?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Pick a package. Your AI activates immediately. Start growing within days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/join" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="flex items-center gap-2 text-white/90 hover:text-white">
              <Phone className="w-5 h-5" />
              Talk to a human first
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
          <p>Production by the mass. Not mass production.</p>
        </div>
      </footer>
    </div>
  )
}

function PackageCard({ name, icon, price, monthlyAI, description, features, production, popular, color }: {
  name: string
  icon: string
  price: number
  monthlyAI: number
  description: string
  features: string[]
  production: string
  popular?: boolean
  color: 'emerald' | 'amber' | 'purple'
}) {
  const colorClasses = {
    emerald: 'border-emerald-500 bg-emerald-50',
    amber: 'border-amber-500 bg-amber-50',
    purple: 'border-purple-500 bg-purple-50'
  }
  const buttonClasses = {
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    amber: 'bg-amber-600 hover:bg-amber-700',
    purple: 'bg-purple-600 hover:bg-purple-700'
  }

  return (
    <div className={`bg-white rounded-2xl p-6 border-2 ${popular ? colorClasses[color] : 'border-gray-100'} relative`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium">
          Most Popular
        </span>
      )}
      
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900">${price.toLocaleString()}</div>
        <div className="text-sm text-gray-500">+ ${monthlyAI}/mo AI subscription</div>
      </div>

      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
        <div className="text-xs text-gray-500">Estimated earnings</div>
        <div className="font-bold text-emerald-600">{production}</div>
      </div>

      <button className={`w-full text-white py-3 rounded-xl font-semibold transition-colors ${buttonClasses[color]}`}>
        Select Package
      </button>
    </div>
  )
}

function AdvancedPackageCard({ name, icon, price, monthlyAI, description, features, production }: {
  name: string
  icon: string
  price: number
  monthlyAI: number
  description: string
  features: string[]
  production: string
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900">${price.toLocaleString()}</div>
        <div className="text-sm text-gray-500">+ ${monthlyAI}/mo AI subscription</div>
      </div>

      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">Estimated earnings</div>
          <div className="font-bold text-emerald-600">{production}</div>
        </div>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  )
}

function AddOnCard({ icon, name, price, description }: {
  icon: string
  name: string
  price: number
  description: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
      <p className="text-xs text-gray-500 mb-2">{description}</p>
      <div className="font-bold text-emerald-600">+${price}</div>
    </div>
  )
}

function FinancingOption({ months, example, monthly, apr }: {
  months: number
  example: string
  monthly: number
  apr: number
}) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">{months} months</div>
      <div className="text-sm text-gray-600 mb-2">{example}</div>
      <div className="text-xl font-bold text-emerald-600">${monthly}/mo</div>
      <div className="text-xs text-gray-500">{apr === 0 ? '0% APR' : `${apr}% APR`}</div>
    </div>
  )
}

function CompareRow({ feature, starter, pro, urban, aqua, highlight }: {
  feature: string
  starter: string
  pro: string
  urban: string
  aqua: string
  highlight?: boolean
}) {
  return (
    <tr className={highlight ? 'bg-emerald-50' : ''}>
      <td className="py-3 px-6 text-gray-900 font-medium">{feature}</td>
      <td className="py-3 px-4 text-center text-gray-600">{starter}</td>
      <td className="py-3 px-4 text-center text-gray-600 bg-amber-50/50">{pro}</td>
      <td className="py-3 px-4 text-center text-gray-600">{urban}</td>
      <td className="py-3 px-4 text-center text-gray-600">{aqua}</td>
    </tr>
  )
}
