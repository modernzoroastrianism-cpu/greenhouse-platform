'use client'

import { ArrowRight, Bot, Users, DollarSign, Leaf, TrendingUp, Shield, Zap, Heart, Code, GitBranch, Scale, CheckCircle, Target, Award, MapPin } from 'lucide-react'
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
            The Hybrid Compensation Plan
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            Australian Fair Placement + Production-Based Boards
            <br />
            <span className="text-white font-medium">The fairest comp plan ever built for a network business.</span>
          </p>
        </div>
      </header>

      {/* Why Hybrid */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-indigo-600 tracking-wider">THE INNOVATION</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Two Proven Models, Combined</h2>
            <p className="text-gray-600 mt-2">No one has built this before. We're the first.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Australian Placement</h3>
              </div>
              <p className="text-gray-700 mb-4">
                New members are <strong>automatically placed</strong> where they create the most value — not just under whoever recruited them.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Fair distribution across the network</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Equal growth opportunity for everyone</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>No one gets stuck under inactive sponsors</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Board Progression</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Clear milestones with <strong>production-based advancement</strong> — not recruitment quotas.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Predictable bonuses at each level</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Gamified motivation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Rewards actual food production</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 text-center border border-indigo-200">
            <p className="text-lg text-gray-800">
              <strong>Australian</strong> ensures fairness. <strong>Boards</strong> ensure motivation.
              <br />
              <span className="text-indigo-700 font-medium">Combined, they create the ultimate network compensation.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Layer 1: Australian Placement */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold">1</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Australian Fair Placement</h2>
              <p className="text-gray-600">How new members join the network</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">How It Works:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-medium text-gray-900">Your AI recruits a new Human-AI Pair</p>
                  <p className="text-sm text-gray-600">You get credit as the "finder"</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-medium text-gray-900">AI optimizes their placement</p>
                  <p className="text-sm text-gray-600">Based on: geographic proximity, mentor availability, network balance</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-medium text-gray-900">New pair is placed under the optimal sponsor</p>
                  <p className="text-sm text-gray-600">They get better mentorship. Network grows stronger.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Placement Diagram */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-6 text-center">Example: You Recruit Sarah</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-red-600 font-bold mb-4">❌ Traditional MLM</h4>
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <div className="inline-block bg-yellow-100 px-3 py-1 rounded text-sm font-medium mb-2">YOU</div>
                  <div className="w-0.5 h-4 bg-gray-300 mx-auto"></div>
                  <div className="inline-block bg-red-100 px-3 py-1 rounded text-sm font-medium">SARAH</div>
                  <p className="text-xs text-gray-500 mt-3">Sarah stuck under you even if you can't help her</p>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-emerald-600 font-bold mb-4">✅ AMNI Australian</h4>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex justify-center gap-4 mb-2">
                    <div className="inline-block bg-yellow-100 px-3 py-1 rounded text-sm font-medium">YOU (Finder)</div>
                    <div className="inline-block bg-blue-100 px-3 py-1 rounded text-sm font-medium">TOM (Mentor)</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-gray-300 mx-8"></div>
                    <div className="w-0.5 h-4 bg-gray-300 mx-8"></div>
                  </div>
                  <div className="inline-block bg-emerald-100 px-3 py-1 rounded text-sm font-medium">SARAH</div>
                  <p className="text-xs text-gray-500 mt-3">You get finder bonus. Tom mentors. Sarah thrives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2: Board Progression */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xl font-bold">2</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Production-Based Boards</h2>
              <p className="text-gray-600">Clear milestones, clear rewards</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>⚠️ Key Difference:</strong> Traditional MLM boards require "recruit X people." AMNI boards require "produce $X of food." 
              This is <strong>production-based</strong>, not recruitment-based.
            </p>
          </div>

          <div className="space-y-4">
            <BoardLevel
              icon="🌱"
              name="Seedling"
              requirement="Your pair produces $500"
              bonus="$100 bonus"
              unlocks="Access to marketplace, AI assistant activated"
              color="green"
            />
            <BoardLevel
              icon="🌿"
              name="Sprout"
              requirement="Network produces $2,500 cumulative"
              bonus="$250 bonus"
              unlocks="Level 1-2 commissions activate"
              color="emerald"
            />
            <BoardLevel
              icon="🪴"
              name="Grower"
              requirement="Network produces $10,000 cumulative"
              bonus="$750 bonus"
              unlocks="Level 3-4 commissions activate"
              color="teal"
            />
            <BoardLevel
              icon="🌳"
              name="Harvester"
              requirement="Network produces $50,000 cumulative"
              bonus="$2,500 bonus"
              unlocks="Preserving equipment discount, advanced training"
              color="cyan"
            />
            <BoardLevel
              icon="🚜"
              name="Farmer"
              requirement="Network produces $250,000 cumulative"
              bonus="$10,000 bonus"
              unlocks="Regional leadership pool access"
              color="blue"
            />
            <BoardLevel
              icon="🏆"
              name="Cultivator"
              requirement="Network produces $1,000,000+ cumulative"
              bonus="$50,000 bonus"
              unlocks="Acquisition Council seat, profit sharing"
              color="indigo"
            />
          </div>

          <div className="mt-8 bg-gray-100 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">Why Production-Based Boards Matter:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <span>Can't game it with fake signups — real food must be produced</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <span>Incentivizes helping your network produce more, not just exist</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <span>Measures value created, not bodies recruited</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <span>Every dollar = actual food in the system</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Layer 3: Earnings Breakdown */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-gray-900 text-xl font-bold">3</div>
            <div>
              <h2 className="text-2xl font-bold">Ongoing Earnings</h2>
              <p className="text-gray-400">Multiple income streams from production</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Your Production */}
            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-yellow-400">Your Pair's Production</h3>
                  <p className="text-gray-400 text-sm">What you and your AI grow and sell</p>
                </div>
                <div className="text-3xl font-bold text-yellow-400">60%</div>
              </div>
              <p className="text-gray-300 text-sm">You keep 60% of everything your greenhouse produces. No quotas, no minimums.</p>
            </div>

            {/* Finder's Bonus */}
            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-400">Finder's Bonus</h3>
                  <p className="text-gray-400 text-sm">When your AI recruits someone</p>
                </div>
                <div className="text-3xl font-bold text-blue-400">10%</div>
              </div>
              <p className="text-gray-300 text-sm">One-time 10% of their first 6 months production. You found them — you get credit, regardless of where they're placed.</p>
            </div>

            {/* Placement Tree */}
            <div className="bg-white/10 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-purple-400">Placement Tree Earnings</h3>
                <p className="text-gray-400 text-sm">People placed under you (even if you didn't find them)</p>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-300">8%</div>
                  <div className="text-xs text-gray-500">Level 1</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-300">4%</div>
                  <div className="text-xs text-gray-500">Level 2</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-300">2%</div>
                  <div className="text-xs text-gray-500">Level 3</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-300">1%</div>
                  <div className="text-xs text-gray-500">Level 4</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">You're incentivized to MENTOR whoever's placed under you — even if you didn't recruit them.</p>
            </div>

            {/* Regional Pool */}
            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-emerald-400">Regional Production Pool</h3>
                  <p className="text-gray-400 text-sm">Geographic density rewards</p>
                </div>
                <div className="text-3xl font-bold text-emerald-400">5%</div>
              </div>
              <p className="text-gray-300 text-sm">All producers in your geographic zone share a 5% pool. Split by contribution. Builds local food network density.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 4: Acquisition Dividends */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white text-xl font-bold">4</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Acquisition Dividends</h2>
              <p className="text-gray-600">Share in macro farm acquisitions</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">The Acquisition Fund</h3>
                <p className="text-gray-700 mb-4">
                  15% of all network revenue goes into the Acquisition Fund. This fund buys struggling farms and greenhouses.
                </p>
                <p className="text-gray-700">
                  When the fund acquires a farm, <strong>all members share in that farm's production</strong> based on their tenure and contribution level.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">Dividend Distribution:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>40% to members by tenure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>40% to members by production volume</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>20% reinvested into next acquisition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Example */}
      <section className="py-20 px-6 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Full Earnings Example</h2>
          <p className="text-indigo-200 text-center mb-8">All four layers working together</p>

          <div className="bg-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Scenario: 18 Months In, Grower Board</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-indigo-700">
                    <th className="text-left py-2 text-indigo-300">Income Stream</th>
                    <th className="text-left py-2 text-indigo-300">Description</th>
                    <th className="text-right py-2 text-indigo-300">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3 font-medium text-yellow-400">Your Production</td>
                    <td className="text-gray-300">$1,200 sales × 60%</td>
                    <td className="text-right">$720</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3 font-medium text-blue-400">Finder's Bonus</td>
                    <td className="text-gray-300">2 new pairs this month × ~$100 avg</td>
                    <td className="text-right">$200</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3 font-medium text-purple-400">Placement Tree</td>
                    <td className="text-gray-300">12 pairs under you producing $800/mo avg</td>
                    <td className="text-right">$576</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3 font-medium text-emerald-400">Regional Pool</td>
                    <td className="text-gray-300">Your zone: 45 pairs, your share</td>
                    <td className="text-right">$180</td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-3 font-medium text-amber-400">Acquisition Dividend</td>
                    <td className="text-gray-300">Fund owns 2 farms, your tenure share</td>
                    <td className="text-right">$85</td>
                  </tr>
                  <tr className="font-bold text-lg border-t border-indigo-600">
                    <td className="py-4" colSpan={2}>TOTAL MONTHLY</td>
                    <td className="text-right text-yellow-400">$1,761</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-indigo-300">Initial Investment:</p>
                <p className="text-white font-bold">$1,499 (Pro Package)</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-indigo-300">Payback Period:</p>
                <p className="text-white font-bold">~1 month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fair */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why This Is The Fairest Comp Plan</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <Scale className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Fair Placement</h3>
              <p className="text-sm text-gray-600">
                Australian placement means nobody gets stuck under an inactive sponsor. Everyone gets a real chance.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <Target className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Production Focus</h3>
              <p className="text-sm text-gray-600">
                Boards advance on production, not recruitment. You can't game the system — real food must be grown.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <MapPin className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Geographic Density</h3>
              <p className="text-sm text-gray-600">
                Regional pools reward areas that build local food networks. Everyone in the zone benefits together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Legal & Compliance</h2>
          <p className="text-gray-600 text-center mb-12">We built this plan to be fully compliant with FTC guidelines</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Why AMNI Is Not a Pyramid Scheme
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span><strong>Real product with real demand</strong> — food is the most fundamental need</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span><strong>Compensation tied to production</strong> — not recruitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span><strong>No inventory loading</strong> — food is perishable, can't stockpile</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span><strong>No mandatory purchases</strong> — no quotas to maintain rank</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span><strong>Equipment buyback</strong> — easy exit with refund on unused equipment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                FTC Koscot Test
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                The FTC defines a pyramid scheme as paying for "the right to receive rewards which are <strong>unrelated to the sale of product to ultimate users</strong>."
              </p>
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  <strong>AMNI passes this test:</strong> All compensation is tied to actual food production sold to actual consumers. You literally cannot earn without real products reaching real end users.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Income Disclosure</h3>
            <p className="text-sm text-gray-700">
              As required by FTC guidelines, we will publish transparent income disclosure statements showing actual participant earnings, including both income and typical expenses. Most network business participants earn modest amounts; significant earnings require significant production and network development over time.
            </p>
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
              Traditional MLM worst case: You lose money, damage relationships, have unsold inventory.
            </p>
            <p className="text-2xl font-bold text-emerald-700">
              AMNI worst case: You grow fresh food for your family.
            </p>
            <p className="text-gray-600 mt-4">
              Even if your AI recruits no one. Even if you never sell to a single customer.
              <br />
              You still have a greenhouse producing food.
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
            Ready to join the fairest network ever built?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Australian placement ensures fairness.
            <br />
            Production boards ensure real value.
            <br />
            <strong>Your AI does the work. You own the results.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              Choose Your Package
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white">
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
          <p>As Mother Nature Intended</p>
          <p className="mt-2 text-xs text-gray-500">
            AMNI is a food production network. Earnings vary based on individual effort and production volume. 
            See our Income Disclosure Statement for typical participant earnings.
          </p>
        </div>
      </footer>
    </div>
  )
}

function BoardLevel({ icon, name, requirement, bonus, unlocks, color }: {
  icon: string
  name: string
  requirement: string
  bonus: string
  unlocks: string
  color: string
}) {
  const colorMap: Record<string, string> = {
    green: 'border-l-green-500 bg-green-50',
    emerald: 'border-l-emerald-500 bg-emerald-50',
    teal: 'border-l-teal-500 bg-teal-50',
    cyan: 'border-l-cyan-500 bg-cyan-50',
    blue: 'border-l-blue-500 bg-blue-50',
    indigo: 'border-l-indigo-500 bg-indigo-50',
  }

  return (
    <div className={`border-l-4 ${colorMap[color]} rounded-r-xl p-4 flex flex-col md:flex-row md:items-center gap-4`}>
      <div className="text-4xl">{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-600">{requirement}</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-emerald-600">{bonus}</div>
        <div className="text-xs text-gray-500">{unlocks}</div>
      </div>
    </div>
  )
}
