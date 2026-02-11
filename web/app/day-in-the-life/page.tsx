'use client'

import { Sun, Coffee, Leaf, Phone, ShoppingBag, Users, TrendingUp, Moon, Bell, CheckCircle, Clock, Calendar, ArrowRight, Bot, Heart, Zap } from 'lucide-react'
import Link from 'next/link'

export default function DayInTheLifePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-emerald-800 via-green-700 to-teal-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">👤</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">A Day in the Life</h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            What it's actually like to be an AMNI member.
            <br />
            <span className="text-white font-medium">Spoiler: Your AI does most of the work.</span>
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">

        {/* The Big Difference */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-red-50 to-emerald-50 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-red-50">
                <h3 className="text-xl font-bold text-red-800 mb-4">❌ Traditional MLM Day</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Wake up, make list of friends to pitch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Awkward coffee meetings with "prospects"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Post cringe content on social media</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Host "parties" that no one wants to attend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Chase down orders and manage inventory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Strain relationships with friends & family</span>
                  </li>
                </ul>
                <p className="mt-6 text-sm text-red-700 font-medium">
                  Result: Exhausted, frustrated, and probably losing money.
                </p>
              </div>
              
              <div className="p-8 bg-emerald-50">
                <h3 className="text-xl font-bold text-emerald-800 mb-4">✅ AMNI Day</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Wake up, check your AI's morning report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Walk to greenhouse, harvest what's ready</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>AI already listed it on the marketplace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Customer picks up, you say hi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>AI recruited 2 new people while you slept</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Evening: Check earnings, plan tomorrow</span>
                  </li>
                </ul>
                <p className="mt-6 text-sm text-emerald-700 font-medium">
                  Result: Fresh food, growing income, no awkwardness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Morning */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
              <Sun className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Morning (6am - 12pm)</h2>
              <p className="text-gray-600">Start your day with fresh air, not cold calls</p>
            </div>
          </div>

          <div className="space-y-6">
            <TimeBlock
              time="6:30am"
              emoji="☀️"
              title="Wake Up to Your Morning Report"
              description="Your phone buzzes with a summary from your AI: overnight sensor data, what's ready to harvest, and any orders that came in."
              aiNote="Your AI already checked the greenhouse 6 times while you slept."
            />
            <TimeBlock
              time="7:00am"
              emoji="☕"
              title="Coffee & Quick Greenhouse Check"
              description="Walk out to your greenhouse with your coffee. Everything looks healthy — your AI adjusted the temperature at 3am when it got too cold."
              aiNote="Growing Agent handled climate control automatically."
            />
            <TimeBlock
              time="7:30am"
              emoji="🥬"
              title="Harvest What's Ready"
              description="Your AI told you the lettuce is ready. Spend 20 minutes harvesting a few pounds. It's actually enjoyable — you're not stressed."
              aiNote="Sales Agent already has buyers lined up for this harvest."
            />
            <TimeBlock
              time="8:00am"
              emoji="📱"
              title="Approve Today's Listings"
              description="Your AI drafted 3 marketplace listings. You glance at them, tap 'approve.' Done. Back to your morning."
              aiNote="AI handles photos, descriptions, pricing — you just confirm."
            />
            <TimeBlock
              time="9:00am"
              emoji="🏃"
              title="Live Your Life"
              description="Go to work, take the kids to school, hit the gym — whatever you do. Your AI is running the business."
              aiNote="Recruiting, sales, customer service — all handled."
            />
          </div>
        </section>

        {/* Afternoon */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Afternoon (12pm - 6pm)</h2>
              <p className="text-gray-600">Notifications, not obligations</p>
            </div>
          </div>

          <div className="space-y-6">
            <TimeBlock
              time="12:30pm"
              emoji="🔔"
              title="Quick Notification Check"
              description="Over lunch, you see your AI sent you a summary: 2 sales completed, 1 new recruit signed up (placed in your tree), and your tomatoes need water."
              aiNote="AI handles customer questions, you just see the wins."
            />
            <TimeBlock
              time="1:00pm"
              emoji="💧"
              title="Optional: Water the Tomatoes"
              description="If you want, you can water them yourself. Or tap 'auto-water' and your smart system handles it. Either way, 5 minutes max."
              aiNote="Growing Agent already reminded you and can automate if you're busy."
            />
            <TimeBlock
              time="3:00pm"
              emoji="📦"
              title="Customer Pickup"
              description="Sarah swings by to pick up her weekly produce box. You chat for 5 minutes about her garden. She's thinking of joining."
              aiNote="Sales Agent coordinated the pickup time with Sarah directly."
            />
            <TimeBlock
              time="4:00pm"
              emoji="🤝"
              title="AI Sends You a Win"
              description="Notification: 'New member joined your network! Meet James — placed under Tom in your Level 2. No action needed.'"
              aiNote="Recruiting Agent found James, answered his questions, processed his signup, and placed him optimally."
            />
          </div>
        </section>

        {/* Evening */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Moon className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Evening (6pm - 10pm)</h2>
              <p className="text-gray-600">Review the day, plan for tomorrow, relax</p>
            </div>
          </div>

          <div className="space-y-6">
            <TimeBlock
              time="6:30pm"
              emoji="🍽️"
              title="Dinner — With Your Own Produce"
              description="Tonight's salad came from your greenhouse. The kids think it's cool that 'your AI grew this.'"
              aiNote="Food security achieved. This is the floor, not the ceiling."
            />
            <TimeBlock
              time="7:30pm"
              emoji="📊"
              title="Check Your Dashboard"
              description="After dinner, you spend 10 minutes reviewing your dashboard. Today: $47 in sales, 1 new recruit, greenhouse is healthy."
              aiNote="Analytics Agent prepped everything — you just read it."
            />
            <TimeBlock
              time="8:00pm"
              emoji="💬"
              title="Optional: Chat With Your AI"
              description="You ask your AI: 'What should I plant next?' It recommends cherry tomatoes based on your climate, season, and local demand."
              aiNote="Growing Agent knows your zone, soil, and what's selling nearby."
            />
            <TimeBlock
              time="9:00pm"
              emoji="📅"
              title="Approve Tomorrow's Plan"
              description="Your AI shows you tomorrow's plan: harvest peppers, 2 scheduled pickups, outreach to 5 new prospects. You tap 'looks good.'"
              aiNote="You're the CEO. Your AI is the COO, CFO, and entire staff."
            />
            <TimeBlock
              time="10:00pm"
              emoji="😴"
              title="Go to Sleep"
              description="Your AI keeps working. It'll monitor the greenhouse, respond to inquiries, and prep your morning report."
              aiNote="Your AI doesn't sleep. Your business doesn't stop."
            />
          </div>
        </section>

        {/* Weekly Rhythm */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Your Weekly Rhythm</h2>
          <p className="text-gray-600 text-center mb-12">
            How much time do you actually spend? About 5-10 hours per week.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              <WeeklyActivity
                activity="Greenhouse Time"
                hours="3-4 hrs"
                description="Harvesting, planting, enjoying your garden"
                emoji="🌱"
              />
              <WeeklyActivity
                activity="Dashboard Review"
                hours="1-2 hrs"
                description="Check reports, approve plans, review earnings"
                emoji="📊"
              />
              <WeeklyActivity
                activity="Customer Interaction"
                hours="1-2 hrs"
                description="Pickups, quick chats, community building"
                emoji="🤝"
              />
              <WeeklyActivity
                activity="Team Support"
                hours="0-2 hrs"
                description="Help your downline (AI does most of this)"
                emoji="💪"
              />
            </div>
          </div>

          <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⏰</div>
              <div>
                <h3 className="font-bold text-gray-900">Compare to Traditional MLM: 20-40+ hours/week</h3>
                <p className="text-gray-600">
                  Prospecting, pitching, hosting parties, chasing orders, managing inventory, training...
                  <br />
                  <span className="text-emerald-700 font-medium">AMNI: 5-10 hours. Your AI handles the rest.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Highlights */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Monthly Highlights</h2>
          <p className="text-gray-600 text-center mb-12">
            The moments you look forward to
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <HighlightCard
              emoji="💵"
              title="Payday"
              when="1st of the month"
              description="Commission deposited directly. No chasing payments, no calculating — your AI handled it all."
            />
            <HighlightCard
              emoji="📈"
              title="Board Check"
              when="End of month"
              description="See if you advanced to the next board level. Production-based, so you always know where you stand."
            />
            <HighlightCard
              emoji="🏆"
              title="Leaderboard Drop"
              when="1st of the month"
              description="See how you rank in your region. Celebrate wins, learn from top producers."
            />
          </div>
        </section>

        {/* The Lifestyle */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">The Lifestyle</h2>
          <p className="text-gray-600 text-center mb-12">
            What AMNI members actually experience
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <LifestyleCard
              emoji="🌅"
              title="Morning Greenhouse Walks"
              description="Start your day with fresh air, green plants, and the satisfaction of growing your own food. No commute, no stress."
            />
            <LifestyleCard
              emoji="👨‍👩‍👧‍👦"
              title="Family Involvement"
              description="Kids love checking on the plants. Partner enjoys cooking with fresh produce. It becomes a family thing."
            />
            <LifestyleCard
              emoji="🏡"
              title="Work From Home (Really)"
              description="Your 'office' is your backyard. Your 'meetings' are approving AI recommendations. 10 hours/week max."
            />
            <LifestyleCard
              emoji="🤝"
              title="Community Connection"
              description="Meet your neighbors at pickup. Know where your food comes from. Build real local relationships."
            />
            <LifestyleCard
              emoji="💰"
              title="Growing Income"
              description="Start small, grow organically. Your AI builds your network while you sleep. Passive income becomes real."
            />
            <LifestyleCard
              emoji="🛡️"
              title="Food Security"
              description="Worst case scenario? You eat well. There's no downside. The floor is fresh vegetables."
            />
          </div>
        </section>

        {/* What You DON'T Do */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">What You DON'T Have To Do</h2>
          <p className="text-gray-600 text-center mb-12">
            Your AI handles all of this
          </p>

          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NoTaskCard emoji="🙅" task="Cold call anyone" />
              <NoTaskCard emoji="🙅" task="Pitch friends and family" />
              <NoTaskCard emoji="🙅" task="Host awkward parties" />
              <NoTaskCard emoji="🙅" task="Post cringey content" />
              <NoTaskCard emoji="🙅" task="Chase down payments" />
              <NoTaskCard emoji="🙅" task="Manage inventory systems" />
              <NoTaskCard emoji="🙅" task="Handle customer complaints" />
              <NoTaskCard emoji="🙅" task="Calculate commissions" />
              <NoTaskCard emoji="🙅" task="Train your downline alone" />
              <NoTaskCard emoji="🙅" task="Monitor sensors 24/7" />
              <NoTaskCard emoji="🙅" task="Research growing techniques" />
              <NoTaskCard emoji="🙅" task="Set optimal pricing" />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-2xl font-bold text-emerald-400 mb-2">
                Your AI does ALL of this.
              </p>
              <p className="text-gray-400">
                You focus on the greenhouse. The lifestyle. The community.
                <br />
                Your AI focuses on the business.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready for this lifestyle?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Fresh food. Growing income. 5-10 hours a week.
              <br />
              Your AI handles the rest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/packages" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/agents" className="text-white/80 hover:text-white">
                See what your AI does →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

function TimeBlock({ time, emoji, title, description, aiNote }: {
  time: string
  emoji: string
  title: string
  description: string
  aiNote: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="text-center flex-shrink-0">
          <div className="text-3xl mb-1">{emoji}</div>
          <div className="text-xs text-gray-400 font-mono">{time}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full w-fit">
            <Bot className="w-3 h-3" />
            <span>{aiNote}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function WeeklyActivity({ activity, hours, description, emoji }: {
  activity: string
  hours: string
  description: string
  emoji: string
}) {
  return (
    <div className="bg-white p-6 text-center">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-bold text-gray-900 mb-1">{activity}</h3>
      <div className="text-2xl font-bold text-emerald-600 mb-2">{hours}</div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}

function HighlightCard({ emoji, title, when, description }: {
  emoji: string
  title: string
  when: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-emerald-600 mb-3">{when}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function LifestyleCard({ emoji, title, description }: {
  emoji: string
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{emoji}</div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

function NoTaskCard({ emoji, task }: { emoji: string; task: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
      <span className="text-xl">{emoji}</span>
      <span className="text-gray-300">{task}</span>
    </div>
  )
}
