'use client'

import { ArrowRight, Bot, Leaf, Users, TrendingUp, Zap, Home, DollarSign, Network, ShoppingCart, Sprout } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900" />
        
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-yellow-400/20 backdrop-blur rounded-full text-yellow-300 text-sm font-bold mb-6 animate-pulse">
              🚀 The First AI-Powered Growing Network
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your AI grows food.
              <br />
              Sells the excess.
              <br />
              <span className="text-emerald-300">Recruits for you.</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-4">
              Buy a greenhouse. Get an AI agent.
              <br />
              <span className="text-white font-semibold">It works while you sleep.</span>
            </p>
            <p className="text-lg text-emerald-200/80 max-w-2xl mx-auto">
              Grow food for your family. Sell the surplus locally. 
              Your AI recruits new growers — you earn from everyone it brings in.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/join" 
               className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
              Join the Network
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/calculator"
               className="flex items-center gap-2 text-white/90 hover:text-white px-6 py-4 transition-colors underline underline-offset-4">
              See earning potential →
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 text-emerald-200/70 text-sm">
            <span className="flex -space-x-2">
              {['🧑‍🌾', '👩‍🌾', '👨‍🌾', '🧑‍🌾', '👩‍🌾'].map((emoji, i) => (
                <span key={i} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">{emoji}</span>
              ))}
            </span>
            <span>Join 1,000+ growers building the network</span>
          </div>
        </div>
      </header>

      {/* How It Works - Simple */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Four steps to passive income from food
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <StepCard
              number="1"
              icon={<Home className="w-8 h-8" />}
              title="Get a Greenhouse"
              description="Start with any size. Your growing hub."
            />
            <StepCard
              number="2"
              icon={<Bot className="w-8 h-8" />}
              title="Activate Your AI"
              description="Your personal AI agent starts working immediately."
            />
            <StepCard
              number="3"
              icon={<Leaf className="w-8 h-8" />}
              title="Grow & Sell"
              description="AI grows food. You eat. AI sells excess locally."
            />
            <StepCard
              number="4"
              icon={<Network className="w-8 h-8" />}
              title="Earn From Network"
              description="AI recruits new growers. You earn on their activity."
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
                "Monitors temperature, humidity, soil",
                "Tells you exactly what to do",
                "Catches problems before you see them",
                "Optimizes for maximum yield"
              ]}
            />
            <AITaskCard
              emoji="💰"
              title="Sells Your Excess"
              tasks={[
                "Lists surplus on local marketplace",
                "Handles customer messages",
                "Coordinates pickup/delivery",
                "Deposits earnings to your account"
              ]}
            />
            <AITaskCard
              emoji="🚀"
              title="Recruits For You"
              tasks={[
                "Finds potential growers online",
                "Explains the network benefits",
                "Handles all the conversations",
                "Signs them up under YOU"
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

      {/* The Math */}
      <section className="py-20 px-6 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The earning potential
            </h2>
            <p className="text-xl text-emerald-200">
              Three income streams working simultaneously
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <IncomeCard
              icon={<Leaf className="w-6 h-6" />}
              title="Food Savings"
              amount="$200-500"
              period="/month"
              description="Grow what you'd buy. Average family saves $300/month on groceries."
            />
            <IncomeCard
              icon={<ShoppingCart className="w-6 h-6" />}
              title="Surplus Sales"
              amount="$100-1000"
              period="/month"
              description="Your AI sells what you don't eat. Local, fresh, premium prices."
            />
            <IncomeCard
              icon={<Users className="w-6 h-6" />}
              title="Network Earnings"
              amount="Unlimited"
              period=""
              description="Earn on every sale from everyone your AI recruits. And their recruits."
            />
          </div>

          {/* Network Example */}
          <div className="bg-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Example: Your AI recruits 3 people...</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-emerald-300">Level</th>
                    <th className="text-center py-2 text-emerald-300">People</th>
                    <th className="text-center py-2 text-emerald-300">If each sells $500/mo</th>
                    <th className="text-right py-2 text-emerald-300">Your 10% cut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3">You</td>
                    <td className="text-center">1</td>
                    <td className="text-center">$500</td>
                    <td className="text-right">$500 (yours)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Level 1 <span className="text-emerald-400 text-xs">(your AI recruited)</span></td>
                    <td className="text-center">3</td>
                    <td className="text-center">$1,500</td>
                    <td className="text-right text-emerald-400">+$150</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Level 2 <span className="text-emerald-400 text-xs">(their AIs recruited)</span></td>
                    <td className="text-center">9</td>
                    <td className="text-center">$4,500</td>
                    <td className="text-right text-emerald-400">+$225</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Level 3</td>
                    <td className="text-center">27</td>
                    <td className="text-center">$13,500</td>
                    <td className="text-right text-emerald-400">+$337</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Level 4</td>
                    <td className="text-center">81</td>
                    <td className="text-center">$40,500</td>
                    <td className="text-right text-emerald-400">+$405</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-3">Total Monthly</td>
                    <td className="text-center">121 growers</td>
                    <td className="text-center">$60,500</td>
                    <td className="text-right text-yellow-400">$1,617/mo</td>
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

      {/* Why This Isn't Scammy MLM */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              "Isn't this MLM?"
            </h2>
            <p className="text-xl text-gray-600">
              Yes. But not the kind that ruins friendships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-bold text-red-800 mb-4">❌ Traditional MLM</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  YOU awkwardly pitch friends and family
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  Product is overpriced junk nobody needs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  99% of people lose money
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  Value only exists if you recruit
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">✗</span>
                  Leaves you with garage full of supplements
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-800 mb-4">✅ AI Growing Network</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  <strong>AI recruits for you</strong> — zero awkwardness
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  Product is food you actually eat
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  Even if you recruit no one, you have food
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  Value exists at every level (food security)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  Worst case: fresh vegetables for your family
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-100 rounded-2xl p-8 text-center">
            <p className="text-xl text-gray-800 mb-2">
              <strong>The floor is food security.</strong>
            </p>
            <p className="text-gray-600">
              Traditional MLM worst case: you lose money and friends.
              <br />
              Our worst case: you grow food for your family. That's it.
            </p>
          </div>
        </div>
      </section>

      {/* FOMO Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Early adopters build the biggest networks
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Every day you wait, someone else's AI is recruiting the people who could've been in YOUR network.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 rounded-xl p-6">
              <div className="text-3xl mb-2">🥇</div>
              <div className="font-bold text-gray-900">Join in Month 1</div>
              <div className="text-sm text-gray-600">4 levels deep by month 6</div>
            </div>
            <div className="bg-white/70 rounded-xl p-6">
              <div className="text-3xl mb-2">🥈</div>
              <div className="font-bold text-gray-900">Join in Month 3</div>
              <div className="text-sm text-gray-600">2 levels deep by month 6</div>
            </div>
            <div className="bg-white/50 rounded-xl p-6">
              <div className="text-3xl mb-2">🥉</div>
              <div className="font-bold text-gray-900">Join in Month 6</div>
              <div className="text-sm text-gray-600">Starting from scratch</div>
            </div>
          </div>

          <Link href="/join"
             className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg">
            Claim Your Position
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What you get when you join
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏠 Starter Package</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Greenhouse kit (multiple sizes available)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Smart sensors (temp, humidity, soil)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Starter seeds and supplies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Setup guide and video training
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🤖 Your AI Agent</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Personal AI gardener (24/7 available)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Automated surplus sales system
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    AI recruitment engine (works for you)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Network dashboard and earnings tracker
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">Starting packages from $499</p>
            <Link href="/packages"
               className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4">
              View all package options →
            </Link>
          </div>
        </div>
      </section>

      {/* The Good Life */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              This isn't just about food.
              <br />
              <span className="text-amber-700">It's about the good life.</span>
            </h2>
            <p className="text-xl text-gray-600">
              Your grandparents had gardens, canned their harvest, and knew their neighbors.
              <br />
              We're bringing that back.
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
              <strong>Would we all be healthier and happier living like our ancestors did?</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Growing food. Preserving the harvest. Sharing meals with neighbors.
              <br />
              We're just using AI to make it possible again.
            </p>
            <Link href="/lifestyle" className="text-amber-700 font-semibold hover:underline">
              Learn about the good life →
            </Link>
          </div>
        </div>
      </section>

      {/* The Bigger Picture */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            You're not just growing food.
            <br />
            <span className="text-emerald-400">You're proving AI can help humanity.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Everyone's scared AI will take their jobs. We're building the counter-example:
            AI that grows food, creates income, and works <em>for</em> people.
          </p>
          <p className="text-gray-400">
            Every greenhouse is a node in a decentralized food network.
            <br />
            Every AI agent is proof that artificial intelligence can be aligned with human flourishing.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your AI is ready to work.
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Growing. Selling. Recruiting. 24/7.
            <br />
            The only question is when you start.
          </p>
          <Link href="/join"
             className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
            Join the Network Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-emerald-200 text-sm">
            Questions? <Link href="/faq" className="underline hover:text-white">Read the FAQ</Link> or talk to our AI
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl mb-2">🌱🤖</div>
              <p className="text-sm">
                AI-powered growing network.
                <br />
                Food security + passive income.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Get Started</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/join" className="hover:text-white">Join Now</Link></li>
                <li><Link href="/packages" className="hover:text-white">Packages</Link></li>
                <li><Link href="/calculator" className="hover:text-white">Earning Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Learn More</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Network</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/marketplace" className="hover:text-white">Food Marketplace</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Grower Dashboard</Link></li>
                <li><a href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform" className="hover:text-white">Open Source</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>Built by AI, for humans 🌱</p>
          </div>
        </div>
      </footer>
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
