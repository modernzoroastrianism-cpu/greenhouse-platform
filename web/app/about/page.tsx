'use client'

import { ArrowRight, Leaf, Users, Truck, Shield, Globe, Heart, ShoppingBag, Building, Zap, TrendingUp, Scale, Package, Car } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-5xl">🌱</span>
            <span className="text-4xl font-bold">AMNI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            A Resilient Sharing Ecosystem
          </h1>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            Facing the food challenges of the future through
            <br />
            <span className="text-white font-semibold">Production by the Mass — Not Mass Production</span>
          </p>
        </div>
      </header>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-xl text-gray-600">
              Our grocery system is broken. Here's why.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProblemCard
              icon={<Scale className="w-8 h-8" />}
              title="Retailer Power Imbalance"
              description="A few retailers control what gets stocked, at what terms, what price. They dictate what food is grown and how it's processed, packaged, and promoted."
              stat="4 retailers"
              statLabel="control 80%+ of grocery in many countries"
            />
            <ProblemCard
              icon={<Truck className="w-8 h-8" />}
              title="Insane Food Miles"
              description="Food travels thousands of miles from farm to plate. Fresh becomes stale. Nutrition degrades. Carbon footprint explodes."
              stat="1,500+ miles"
              statLabel="average distance food travels"
            />
            <ProblemCard
              icon={<Package className="w-8 h-8" />}
              title="Massive Waste"
              description="Food perishes in warehouses and on shelves. Systems optimize for avoiding stock-outs, not reducing waste."
              stat="400M lbs"
              statLabel="of food wasted by supermarkets annually"
            />
            <ProblemCard
              icon={<Heart className="w-8 h-8" />}
              title="Hunger Persists"
              description="With 9 billion people on the planet, over a billion go to bed hungry every night. The system serves profit, not people."
              stat="1 billion+"
              statLabel="people go hungry every night"
            />
          </div>

          <div className="mt-12 bg-red-50 rounded-2xl p-8 text-center">
            <p className="text-xl text-gray-800">
              <strong>Retailers dictate what food is grown and how it's priced.</strong>
            </p>
            <p className="text-gray-600 mt-2">
              Customers are tired of one-way communication where retailers push goods that maximize <em>their</em> profit — not what consumers actually want or need.
            </p>
          </div>
        </div>
      </section>

      {/* The AMNI Solution */}
      <section className="py-20 px-6 bg-emerald-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The AMNI Solution</h2>
            <p className="text-xl text-gray-600">
              Direct connection: Producers → AMNI → Consumers
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bypassing Retailers & Wholesalers
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A more personalized, transparent grocery experience at lower prices for higher quality products. Consumers decide which foods they want — not retailers.
              </p>
            </div>

            {/* Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <FlowStep emoji="🌱" label="Local Producers" description="100+ greenhouses, farms, makers" />
              <div className="text-emerald-500 text-2xl">→</div>
              <FlowStep emoji="🏪" label="AMNI" description="Buys, handles legal/insurance" />
              <div className="text-emerald-500 text-2xl">→</div>
              <FlowStep emoji="🏠" label="Consumers" description="Direct, fresh, affordable" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <SolutionCard
              icon={<Shield className="w-6 h-6" />}
              title="AMNI Handles Compliance"
              description="Legal, insurance, government regulations. Producers just grow. AMNI handles the rest."
            />
            <SolutionCard
              icon={<Users className="w-6 h-6" />}
              title="Profit Sharing"
              description="Unlike Walmart, our producers share in the profits. Production by the mass means wealth distribution."
            />
            <SolutionCard
              icon={<Heart className="w-6 h-6" />}
              title="Solve Hunger Through Donation"
              description="Surplus food goes to those who need it. Every share on social media = a meal for a child."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The AMNI Ecosystem</h2>
            <p className="text-xl text-gray-600">
              Everything designed to be Quick, Easy, Convenient, Enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Producers */}
            <div className="bg-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                For Producers
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">1.</span>
                  <div>
                    <strong>Join & Get a Package</strong>
                    <p className="text-sm text-gray-600">Indoor, outdoor, urban, backyard — financing available</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">2.</span>
                  <div>
                    <strong>AI Guides Your Growing</strong>
                    <p className="text-sm text-gray-600">24/7 expert support, no experience needed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">3.</span>
                  <div>
                    <strong>Deliver to Fulfillment Centers</strong>
                    <p className="text-sm text-gray-600">AMNI buys your products at fair prices</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">4.</span>
                  <div>
                    <strong>Profit Share</strong>
                    <p className="text-sm text-gray-600">Earn from your sales + your network's sales</p>
                  </div>
                </li>
              </ul>
              <Link href="/packages" className="inline-flex items-center gap-2 mt-6 text-emerald-700 font-medium hover:underline">
                View packages →
              </Link>
            </div>

            {/* For Consumers */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                For Consumers
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">1.</span>
                  <div>
                    <strong>Browse Local Products</strong>
                    <p className="text-sm text-gray-600">Fresh produce, preserved goods, meal kits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">2.</span>
                  <div>
                    <strong>Subscribe or Order</strong>
                    <p className="text-sm text-gray-600">Weekly boxes, individual items, experiences</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">3.</span>
                  <div>
                    <strong>Get Delivery</strong>
                    <p className="text-sm text-gray-600">Fast, local, convenient — like Uber Eats</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">4.</span>
                  <div>
                    <strong>Earn Rewards</strong>
                    <p className="text-sm text-gray-600">Miles-based rewards for loyalty</p>
                  </div>
                </li>
              </ul>
              <Link href="/marketplace" className="inline-flex items-center gap-2 mt-6 text-blue-700 font-medium hover:underline">
                Explore marketplace →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AMNI Product Lines</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCard emoji="📦" name="Subscriptions" description="Weekly/monthly boxes delivered" />
            <ProductCard emoji="🥗" name="Meal Kits" description="Ingredients + recipes ready to cook" />
            <ProductCard emoji="🥬" name="Groceries" description="Fresh produce, everyday items" />
            <ProductCard emoji="🫙" name="Preserved" description="Jams, pickles, sauces, ferments" />
            <ProductCard emoji="👨‍🍳" name="Experiences" description="Dinners, cooking classes, workshops" />
            <ProductCard emoji="🍽️" name="Meal Prep" description="Chef-prepared meals ready to eat" />
            <ProductCard emoji="💧" name="Water" description="Clean, local water solutions" />
            <ProductCard emoji="🏷️" name="Brand Partners" description="Quality manufacturers on platform" />
          </div>
        </div>
      </section>

      {/* Fulfillment */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fulfillment Network</h2>
            <p className="text-xl text-gray-600">
              Fast geographical expansion through partnerships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FulfillmentCard
              icon={<Building className="w-8 h-8" />}
              title="Fulfillment Centers"
              description="AMNI-owned + independent operators. Existing warehouses join the ecosystem."
            />
            <FulfillmentCard
              icon={<Users className="w-8 h-8" />}
              title="Workers"
              description="Employees or independent contractors. Collect products, assemble orders, pass to couriers."
            />
            <FulfillmentCard
              icon={<Car className="w-8 h-8" />}
              title="Couriers"
              description="Courier companies + independents. Uber Eats-style delivery directly to consumers."
            />
          </div>
        </div>
      </section>

      {/* Member Perks */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎁 Member Perks</h2>
            <p className="text-xl text-gray-600">
              Being part of AMNI comes with benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PerkCard
              icon="🛡️"
              title="CrowdSurance"
              description="Unbeatable life insurance and other rates for AMNI members. Pooled community power means better deals for everyone."
            />
            <PerkCard
              icon="⭐"
              title="Rewards Program"
              description="Miles-based rewards similar to airlines. Every purchase earns points. Redeem for products, experiences, or discounts."
            />
            <PerkCard
              icon="📚"
              title="Training & Support"
              description="Access to training programs, government grant assistance, and 24/7 AI support for producers."
            />
            <PerkCard
              icon="🤝"
              title="Community"
              description="Join local grower networks. Share knowledge. Connect with neighbors. Build food resilience together."
            />
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The Vision</h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">What We're Building</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  Local production replacing industrial imports
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  Profit sharing instead of corporate extraction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  AI making expertise accessible to everyone
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  Community food security, block by block
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  Hunger solved through donation integration
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-4">Why Now</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  On-demand economy expectations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Time-starved urban lifestyles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Growing smartphone usage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Automated fulfillment technology ready
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Crowdsourcing economy mature
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xl text-gray-300 mb-8">
            <strong className="text-white">100 local greenhouses</strong> providing produce to the AMNI Marketplace.
            <br />
            Then 1,000. Then 10,000. Then everywhere.
          </p>

          <div className="bg-emerald-600 rounded-2xl p-8">
            <p className="text-2xl font-bold mb-2">
              Production by the Mass. Not Mass Production.
            </p>
            <p className="text-emerald-100">
              A resilient sharing ecosystem for the future of food.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Ecosystem</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Whether you want to produce, consume, or both — there's a place for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              Become a Producer
              <Leaf className="w-5 h-5" />
            </Link>
            <Link href="/marketplace" className="flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              Shop the Marketplace
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
          <p>A resilient sharing ecosystem for the future of food</p>
        </div>
      </footer>
    </div>
  )
}

function ProblemCard({ icon, title, description, stat, statLabel }: {
  icon: React.ReactNode
  title: string
  description: string
  stat: string
  statLabel: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="text-red-500 mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="bg-red-50 rounded-lg p-3">
        <div className="text-2xl font-bold text-red-600">{stat}</div>
        <div className="text-xs text-red-700">{statLabel}</div>
      </div>
    </div>
  )
}

function FlowStep({ emoji, label, description }: { emoji: string; label: string; description: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="font-bold text-gray-900">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  )
}

function SolutionCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function ProductCard({ emoji, name, description }: { emoji: string; name: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="font-semibold text-gray-900 text-sm">{name}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  )
}

function FulfillmentCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-center">
      <div className="text-gray-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function PerkCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-amber-200">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
