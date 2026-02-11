'use client'

import { ArrowRight, AlertTriangle, Globe, Truck, Store, TrendingDown, Heart, Users, Leaf, Scale, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function FoodCrisisPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <header className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-gray-900 to-gray-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 text-8xl">🌾</div>
          <div className="absolute top-40 right-20 text-6xl">🍞</div>
          <div className="absolute bottom-20 left-1/4 text-7xl">🥬</div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white">
            <span className="text-xl">🌱</span>
            <span className="font-bold">AMNI</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Food Crisis
            <br />
            <span className="text-red-500">No One Talks About</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The future of food is the future of us.
            <br />
            What could be more important than growing food?
          </p>

          <div className="bg-red-900/50 backdrop-blur rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-2xl font-bold text-red-300">
              The human race will consume more food in the next 50 years
              than it has in the <span className="text-white">past 10,000 years combined.</span>
            </p>
          </div>
        </div>
      </header>

      {/* The Paradox */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Paradox</h2>
            <p className="text-xl text-gray-400">
              There is <span className="text-white font-bold">no shortage of food</span> in this world.
              <br />
              There is more than enough to feed every single person.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <StatCard
              color="red"
              stat="1 Billion+"
              label="People go to bed hungry every night"
              context="Not because there isn't enough food — because the system is broken"
            />
            <StatCard
              color="amber"
              stat="30-50%"
              label="Of food westerners buy is wasted"
              context="We throw away nearly half of what we produce"
            />
            <StatCard
              color="red"
              stat="49 Million"
              label="Americans in food-insecure households"
              context="Going hungry or lacking proper nutrition"
            />
            <StatCard
              color="amber"
              stat="1/3 Adults + 17% Kids"
              label="In the USA suffer from obesity"
              context="While others go hungry. Same country. Same system."
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl text-gray-300">
              <strong className="text-white">Millions go hungry</strong> not from scarcity,
              <br />
              but from <strong className="text-red-400">outdated business ideology</strong> and
              <strong className="text-red-400"> poor economic understanding</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 2050 Problem */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-8">
            THE 2050 PROBLEM
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            By 2050, we need to feed
            <br />
            <span className="text-red-500">9+ billion people</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-red-500 mb-2">70%</div>
              <div className="text-gray-300">More food production needed</div>
              <div className="text-sm text-gray-500 mt-2">Experts agree this is the minimum</div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-amber-500 mb-2">1/3</div>
              <div className="text-gray-300">Of food produced is wasted</div>
              <div className="text-sm text-gray-500 mt-2">And we need to produce 70% more?</div>
            </div>
          </div>

          <p className="text-xl text-gray-400">
            Every global leader has plans. None of them work.
            <br />
            <span className="text-white">We need a completely different approach.</span>
          </p>
        </div>
      </section>

      {/* Production Crisis */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-emerald-500 tracking-wider">PRODUCTION</span>
            <h2 className="text-3xl font-bold mt-2">The Land Problem</h2>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-bold mb-6 text-center">How We Use Earth's Land</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <LandCard
                percent={57}
                label="Inhabitable"
                description="Deserts, ice, mountains"
                color="gray"
              />
              <LandCard
                percent={23}
                label="Livestock"
                description="Size of Africa"
                color="amber"
              />
              <LandCard
                percent={11}
                label="Crops"
                description="Size of South America"
                color="emerald"
              />
              <LandCard
                percent={3}
                label="Urban"
                description="Cities, towns"
                color="blue"
              />
            </div>
            <p className="text-center text-gray-400 mt-6">
              As population rises, we keep consuming more land. This is not sustainable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-900/30 rounded-2xl p-6 border border-red-800">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="text-xl font-bold mb-2">90% of American Farms</h3>
              <p className="text-gray-400">
                Produce commodity crops for processed foods.
                <br />
                <span className="text-red-400">Not optimized for human health.</span>
              </p>
            </div>
            <div className="bg-amber-900/30 rounded-2xl p-6 border border-amber-800">
              <div className="text-5xl mb-4">🚜</div>
              <h3 className="text-xl font-bold mb-2">92% of Plants</h3>
              <p className="text-gray-400">
                Have not even been explored for food qualities.
                <br />
                <span className="text-amber-400">We're barely scratching the surface.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Crisis */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-red-500 tracking-wider">THE HUMAN COST</span>
            <h2 className="text-3xl font-bold mt-2">Farmers Are Dying</h2>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
              <SuicideStat country="USA" rate="2 per day" flag="🇺🇸" />
              <SuicideStat country="UK" rate="1 per week" flag="🇬🇧" />
              <SuicideStat country="Australia" rate="Every 5 days" flag="🇦🇺" />
              <SuicideStat country="France" rate="Every 2 days" flag="🇫🇷" />
            </div>
            <p className="text-center text-red-400 font-bold">
              Farmer suicide rates are higher than any other occupation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="text-5xl font-bold text-amber-500 mb-2">66</div>
              <div className="text-gray-300">Average age of an American farmer</div>
              <div className="text-sm text-gray-500 mt-2">Hardly any young people are farming</div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="text-5xl font-bold text-red-500 mb-2">0</div>
              <div className="text-gray-300">Succession plans for most farms</div>
              <div className="text-sm text-gray-500 mt-2">When they retire, farms disappear</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-gray-300">
              We need a production system that has as its goal
              <br />
              <strong className="text-white">the health of its community</strong>, not corporate profits.
            </p>
          </div>
        </div>
      </section>

      {/* Distribution Crisis */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-blue-500 tracking-wider">DISTRIBUTION</span>
            <h2 className="text-3xl font-bold mt-2">Retailers Control Everything</h2>
          </div>

          <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-800 mb-12">
            <h3 className="text-xl font-bold mb-6 text-center">Retailer Power Abuse</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Determine what will and won't be stocked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Dictate quality, packaging, delivery schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Set prices and payment conditions unilaterally</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Delay payments to squeeze manufacturers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Threaten to delist products as leverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Push goods that maximize retailer profit, not health</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <StatCard
              color="blue"
              stat="1,500 miles"
              label="Average distance food travels"
              context="Farm to plate in the US"
            />
            <StatCard
              color="blue"
              stat="400M lbs"
              label="Wasted by supermarkets annually"
              context="Nearly 1/3 of what they stock"
            />
            <StatCard
              color="blue"
              stat="5x larger"
              label="Walmart vs. its biggest supplier"
              context="No manufacturer has negotiating power"
            />
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-xl text-gray-300">
              <strong className="text-white">Humans have given up access to our food system.</strong>
              <br />
              A resource should be an asset to the local community, not Wall Street.
            </p>
          </div>
        </div>
      </section>

      {/* Healthcare Flip */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">We Have It Backwards</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="text-sm text-gray-500 mb-2">1960s</div>
              <div className="text-4xl mb-4">🥗 → 🏥</div>
              <p className="text-gray-300">Spent more on <strong>food</strong> than healthcare</p>
            </div>
            <div className="bg-red-900/50 rounded-2xl p-8 border-2 border-red-500">
              <div className="text-sm text-gray-400 mb-2">Today</div>
              <div className="text-4xl mb-4">🏥 → 🥗</div>
              <p className="text-gray-300">Spend <strong>2x more</strong> on healthcare than food</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-red-400">$2.9 Trillion</div>
                <div className="text-gray-400">Healthcare spending (USA)</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-400">$1.42 Trillion</div>
                <div className="text-gray-400">Food spending (USA)</div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xl text-gray-300">
            We're spending twice as much treating disease
            <br />
            as we are on the food that could <strong className="text-white">prevent it</strong>.
          </p>
        </div>
      </section>

      {/* MLM Problem */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-purple-500 tracking-wider">COMPENSATION</span>
            <h2 className="text-3xl font-bold mt-2">Why Traditional MLM Fails</h2>
            <p className="text-gray-400 mt-2">1 in 13 adults have participated in multi-level marketing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <MLMStat stat="99%" label="Earn less than minimum wage" bad />
            <MLMStat stat="47%" label="Report losing money" bad />
            <MLMStat stat="90%" label="Drop out every year" bad />
            <MLMStat stat="95%" label="Quit within 5 years" bad />
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <p className="text-center text-gray-300">
              According to the FTC, MLM has <strong className="text-red-400">worse profit rates than gambling</strong>.
              <br />
              The industry generated $189 billion in 2017. Almost none of it reached distributors.
            </p>
          </div>

          <div className="bg-purple-900/30 rounded-2xl p-8 border border-purple-700">
            <h3 className="text-xl font-bold mb-4 text-center">Why They Fail</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Products are overpriced and unnecessary
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Value only exists if you recruit — Ponzi structure
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                YOU have to do the awkward recruiting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                No real product that people actually need
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Solution - AMNI */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-emerald-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-5xl">🌱</span>
            <span className="text-4xl font-bold">AMNI</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A Different Model
          </h2>

          <p className="text-xl text-emerald-200 mb-12 max-w-2xl mx-auto">
            What if we fixed MLM by making the product <strong className="text-white">actual food</strong>?
            <br />
            What if AI did the recruiting instead of you?
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
            <div className="bg-emerald-800/30 rounded-2xl p-6 border border-emerald-600">
              <h3 className="font-bold text-emerald-300 mb-4">✓ AMNI Fixes MLM</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Product is <strong>food you actually eat</strong></li>
                <li>• AI recruits for you — zero awkwardness</li>
                <li>• Value exists even without network (food security)</li>
                <li>• Worst case: fresh vegetables for your family</li>
              </ul>
            </div>
            <div className="bg-emerald-800/30 rounded-2xl p-6 border border-emerald-600">
              <h3 className="font-bold text-emerald-300 mb-4">✓ AMNI Fixes Food</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Local production</strong> — not 1,500 mile shipping</li>
                <li>• Direct to consumer — no retailer middlemen</li>
                <li>• Profit sharing — not corporate extraction</li>
                <li>• AI makes growing accessible to anyone</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-bold mb-4">Production By The Mass, Not Mass Production</h3>
            <p className="text-gray-300">
              100 local greenhouses → 1,000 → 10,000 → everywhere.
              <br />
              Each one owned by someone in the community. Each one AI-guided.
              <br />
              <strong className="text-white">Decentralized. Resilient. Local.</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              Join the Solution
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white">
              Learn more about AMNI →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl">🌱</span>
            <span className="text-lg font-bold text-white">AMNI</span>
          </Link>
          <p>The future of food is the future of us.</p>
        </div>
      </footer>
    </div>
  )
}

function StatCard({ stat, label, context, color }: {
  stat: string
  label: string
  context: string
  color: 'red' | 'amber' | 'blue' | 'emerald'
}) {
  const colorMap = {
    red: 'text-red-500',
    amber: 'text-amber-500',
    blue: 'text-blue-500',
    emerald: 'text-emerald-500'
  }

  return (
    <div className="bg-gray-700/50 rounded-xl p-6">
      <div className={`text-4xl font-bold ${colorMap[color]} mb-2`}>{stat}</div>
      <div className="text-white font-medium mb-1">{label}</div>
      <div className="text-sm text-gray-500">{context}</div>
    </div>
  )
}

function LandCard({ percent, label, description, color }: {
  percent: number
  label: string
  description: string
  color: 'gray' | 'amber' | 'emerald' | 'blue'
}) {
  const colorMap = {
    gray: 'bg-gray-600',
    amber: 'bg-amber-600',
    emerald: 'bg-emerald-600',
    blue: 'bg-blue-600'
  }

  return (
    <div className="text-center">
      <div className={`h-32 rounded-xl ${colorMap[color]} flex items-end justify-center p-2 mb-2`} style={{ height: `${Math.max(percent * 2, 40)}px` }}>
        <span className="text-white font-bold text-lg">{percent}%</span>
      </div>
      <div className="font-medium text-white">{label}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  )
}

function SuicideStat({ country, rate, flag }: { country: string; rate: string; flag: string }) {
  return (
    <div>
      <div className="text-3xl mb-2">{flag}</div>
      <div className="text-red-400 font-bold">{rate}</div>
      <div className="text-sm text-gray-500">{country}</div>
    </div>
  )
}

function MLMStat({ stat, label, bad }: { stat: string; label: string; bad?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${bad ? 'bg-red-900/30 border border-red-800' : 'bg-gray-800'}`}>
      <div className={`text-3xl font-bold ${bad ? 'text-red-400' : 'text-white'} mb-1`}>{stat}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}
