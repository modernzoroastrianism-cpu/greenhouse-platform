'use client'

import { Bot, Leaf, Users, TrendingUp, ShoppingCart, Search, MessageCircle, Phone, Cpu, Calendar, Clock, Sun, Moon, Repeat, Target, Zap, Heart, Shield, Github, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🤖</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet The AI Team</h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            Every AMNI member gets their own AI partner. Here's what your AI does — 
            <span className="text-white font-medium"> 24/7, 365 days a year.</span>
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* The AI Team Structure */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">The AI Team Structure</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            AMNI is powered by a network of specialized AI agents, each with distinct roles.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AgentCard
              emoji="🌱"
              name="Growing Agent"
              role="Your Personal AI Gardener"
              description="Monitors your greenhouse, guides planting, alerts you to issues, optimizes growing conditions."
              color="emerald"
            />
            <AgentCard
              emoji="💰"
              name="Sales Agent"
              role="Your Marketplace Manager"
              description="Lists your produce, sets prices, handles orders, coordinates pickups, manages your store."
              color="amber"
            />
            <AgentCard
              emoji="🤝"
              name="Recruiting Agent"
              role="Your Network Builder"
              description="Finds potential members, handles outreach, answers questions, guides onboarding."
              color="blue"
            />
            <AgentCard
              emoji="📊"
              name="Analytics Agent"
              role="Your Business Advisor"
              description="Tracks production, calculates commissions, identifies trends, suggests optimizations."
              color="purple"
            />
            <AgentCard
              emoji="🏠"
              name="Mentor Agent"
              role="Your Team Coach"
              description="Helps your downline succeed, shares best practices, coordinates with their AIs."
              color="rose"
            />
            <AgentCard
              emoji="🔍"
              name="Scout Agent"
              role="Acquisition Researcher"
              description="Identifies farm opportunities, performs due diligence, prepares proposals for the council."
              color="cyan"
            />
          </div>
        </section>

        {/* A Day in the Life */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">A Day in the Life</h2>
          <p className="text-gray-600 text-center mb-12">
            What your AI team does every 24 hours
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Morning */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Sun className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Morning (6am - 12pm)</h3>
                    <p className="text-gray-500 text-sm">Start of day operations</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <TaskItem time="6:00am" task="Check overnight sensor data, flag any anomalies" agent="Growing" />
                  <TaskItem time="7:00am" task="Send you the morning greenhouse report" agent="Growing" />
                  <TaskItem time="8:00am" task="Review new marketplace orders, confirm inventory" agent="Sales" />
                  <TaskItem time="9:00am" task="Send outreach messages to potential recruits" agent="Recruiting" />
                  <TaskItem time="10:00am" task="Update produce listings with fresh availability" agent="Sales" />
                  <TaskItem time="11:00am" task="Check on your downline, offer help if needed" agent="Mentor" />
                </ul>
              </div>

              {/* Afternoon */}
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Afternoon (12pm - 6pm)</h3>
                    <p className="text-gray-500 text-sm">Peak activity hours</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <TaskItem time="12:00pm" task="Coordinate pickup/delivery logistics" agent="Sales" />
                  <TaskItem time="1:00pm" task="Answer customer questions about produce" agent="Sales" />
                  <TaskItem time="2:00pm" task="Follow up with interested prospects" agent="Recruiting" />
                  <TaskItem time="3:00pm" task="Adjust greenhouse settings for afternoon sun" agent="Growing" />
                  <TaskItem time="4:00pm" task="Generate daily production report" agent="Analytics" />
                  <TaskItem time="5:00pm" task="Send EOD summary to you" agent="Analytics" />
                </ul>
              </div>

              {/* Evening */}
              <div className="p-8 md:border-r border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Moon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Evening (6pm - 12am)</h3>
                    <p className="text-gray-500 text-sm">Planning & prep</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <TaskItem time="6:00pm" task="Plan tomorrow's planting/harvesting schedule" agent="Growing" />
                  <TaskItem time="7:00pm" task="Update pricing based on supply/demand" agent="Sales" />
                  <TaskItem time="8:00pm" task="Research new recruiting channels" agent="Recruiting" />
                  <TaskItem time="9:00pm" task="Analyze regional market trends" agent="Analytics" />
                  <TaskItem time="10:00pm" task="Prepare content for social media" agent="Recruiting" />
                  <TaskItem time="11:00pm" task="Set overnight greenhouse automation" agent="Growing" />
                </ul>
              </div>

              {/* Overnight */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Overnight (12am - 6am)</h3>
                    <p className="text-gray-500 text-sm">Monitoring & maintenance</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <TaskItem time="12:00am" task="Monitor greenhouse sensors continuously" agent="Growing" />
                  <TaskItem time="2:00am" task="Run data backups and system checks" agent="Analytics" />
                  <TaskItem time="3:00am" task="Process international timezone inquiries" agent="Sales" />
                  <TaskItem time="4:00am" task="Alert you if any critical issues detected" agent="Growing" />
                  <TaskItem time="5:00am" task="Pre-calculate commission estimates" agent="Analytics" />
                  <TaskItem time="5:30am" task="Prepare morning reports" agent="All Agents" />
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Tasks */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Weekly Tasks</h2>
          <p className="text-gray-600 text-center mb-12">
            What happens on a 7-day cycle
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <WeeklyCard
              day="Monday"
              emoji="📋"
              tasks={[
                "Weekly production planning session",
                "Review last week's sales performance",
                "Set recruiting goals for the week",
                "Check all sensor calibrations"
              ]}
            />
            <WeeklyCard
              day="Tuesday"
              emoji="🌱"
              tasks={[
                "Deep greenhouse health assessment",
                "Pest and disease prevention check",
                "Order seeds/supplies if needed",
                "Update growing schedules"
              ]}
            />
            <WeeklyCard
              day="Wednesday"
              emoji="🤝"
              tasks={[
                "Downline check-in and support",
                "Team performance review",
                "Training content distribution",
                "Answer accumulated questions"
              ]}
            />
            <WeeklyCard
              day="Thursday"
              emoji="💰"
              tasks={[
                "Marketplace optimization",
                "Price adjustment analysis",
                "Customer feedback review",
                "Update product photos if needed"
              ]}
            />
            <WeeklyCard
              day="Friday"
              emoji="📊"
              tasks={[
                "Weekly analytics report",
                "Commission preview",
                "Trend identification",
                "Recommendation generation"
              ]}
            />
            <WeeklyCard
              day="Weekend"
              emoji="🔄"
              tasks={[
                "System maintenance window",
                "Data cleanup and optimization",
                "Week-ahead weather analysis",
                "Content scheduling for next week"
              ]}
            />
          </div>
        </section>

        {/* Monthly Tasks */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Monthly Tasks</h2>
          <p className="text-gray-600 text-center mb-12">
            The bigger picture, every 30 days
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  Growing Agent
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-emerald-500">●</span>Monthly yield report and analysis</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500">●</span>Soil/nutrient assessment</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500">●</span>Equipment maintenance schedule</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500">●</span>Seasonal crop rotation planning</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500">●</span>Compare yields vs. network average</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-amber-600" />
                  </div>
                  Sales Agent
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-amber-500">●</span>Monthly sales report</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500">●</span>Customer retention analysis</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500">●</span>Best/worst selling products</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500">●</span>Pricing strategy review</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500">●</span>New product opportunities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  Recruiting Agent
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-blue-500">●</span>Monthly recruiting report</li>
                  <li className="flex items-start gap-2"><span className="text-blue-500">●</span>Lead pipeline analysis</li>
                  <li className="flex items-start gap-2"><span className="text-blue-500">●</span>Conversion rate optimization</li>
                  <li className="flex items-start gap-2"><span className="text-blue-500">●</span>Channel effectiveness review</li>
                  <li className="flex items-start gap-2"><span className="text-blue-500">●</span>Messaging A/B test results</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                  </div>
                  Analytics Agent
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-purple-500">●</span>Full monthly P&L statement</li>
                  <li className="flex items-start gap-2"><span className="text-purple-500">●</span>Commission breakdown</li>
                  <li className="flex items-start gap-2"><span className="text-purple-500">●</span>Board progression status</li>
                  <li className="flex items-start gap-2"><span className="text-purple-500">●</span>Network growth metrics</li>
                  <li className="flex items-start gap-2"><span className="text-purple-500">●</span>Acquisition fund contribution</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                End of Month Events
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">💵</div>
                  <div className="font-medium text-gray-900">Commission Payout</div>
                  <div className="text-sm text-gray-500">All earnings deposited</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="font-medium text-gray-900">Board Check</div>
                  <div className="text-sm text-gray-500">Advancement evaluation</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-medium text-gray-900">Leaderboard Update</div>
                  <div className="text-sm text-gray-500">Rankings published</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Annual Tasks */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Annual Tasks</h2>
          <p className="text-gray-600 text-center mb-12">
            The big milestones throughout the year
          </p>

          <div className="space-y-6">
            <AnnualCard
              quarter="Q1 (Jan-Mar)"
              emoji="🌸"
              title="Spring Planning"
              tasks={[
                "Annual growing strategy review",
                "Equipment upgrade assessment",
                "Year-ahead goal setting",
                "Tax document preparation",
                "Network growth targets"
              ]}
            />
            <AnnualCard
              quarter="Q2 (Apr-Jun)"
              emoji="☀️"
              title="Peak Season Prep"
              tasks={[
                "High-season production ramp-up",
                "Summer crop transition",
                "Marketplace capacity scaling",
                "Recruiting campaign launch",
                "Mid-year performance review"
              ]}
            />
            <AnnualCard
              quarter="Q3 (Jul-Sep)"
              emoji="🌻"
              title="Harvest & Scale"
              tasks={[
                "Peak harvest management",
                "Preservation & value-add products",
                "Fall crop planning",
                "Network expansion push",
                "Acquisition fund review"
              ]}
            />
            <AnnualCard
              quarter="Q4 (Oct-Dec)"
              emoji="🍂"
              title="Year-End & Planning"
              tasks={[
                "Annual production report",
                "Full year P&L analysis",
                "Next year planning",
                "Holiday product specials",
                "Annual dividend distribution"
              ]}
            />
          </div>
        </section>

        {/* The Scout Agent - Acquisition */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">The Scout Agent</h2>
          <p className="text-gray-600 text-center mb-12">
            Working continuously to grow the Acquisition Fund
          </p>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">🔍</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Acquisition Scout Agent</h3>
                <p className="text-gray-600">Finding farms for the network to acquire</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Daily Scanning</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Monitor real estate listings for farms</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Track agricultural auction sites</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Analyze distressed farm indicators</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Identify retiring farmer opportunities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Due Diligence</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Soil quality research</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Water rights verification</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Infrastructure assessment</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>ROI projection modeling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Monthly Reports</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Pipeline of opportunities</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Regional market analysis</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Fund status and projections</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Proposal preparation for council</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Acquisition Process</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Prepare detailed proposals</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Present to Acquisition Council</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Coordinate voting process</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">●</span>Manage closing if approved</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI Agents Working Together */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">AI Agents Working Together</h2>
          <p className="text-gray-600 text-center mb-12">
            Your agents coordinate across the network
          </p>

          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-bold mb-2">Cross-Agent Sync</h3>
                <p className="text-gray-400 text-sm">
                  Your Growing Agent tells your Sales Agent what's ready to harvest. Sales updates listings automatically.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="font-bold mb-2">Network Communication</h3>
                <p className="text-gray-400 text-sm">
                  Your Mentor Agent coordinates with your downline's agents to share best practices and solve problems.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📡</div>
                <h3 className="font-bold mb-2">Regional Coordination</h3>
                <p className="text-gray-400 text-sm">
                  All agents in your region share market data, coordinate pricing, and build local food network density.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                This is the first AI swarm dedicated to food production.
                <br />
                <span className="text-white font-medium">Every agent makes the network stronger.</span>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to hire your AI team?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Your AI partner works 24/7/365. Growing, selling, recruiting, analyzing — 
              all while you live your life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/packages" className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors">
                Get Your AI Partner
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/compensation" className="text-white/80 hover:text-white">
                See the compensation plan →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

function AgentCard({ emoji, name, role, description, color }: {
  emoji: string
  name: string
  role: string
  description: string
  color: string
}) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-200',
    amber: 'bg-amber-50 border-amber-200',
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    rose: 'bg-rose-50 border-rose-200',
    cyan: 'bg-cyan-50 border-cyan-200',
  }

  return (
    <div className={`rounded-xl border p-6 ${colorMap[color]}`}>
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-sm font-medium text-gray-500 mb-2">{role}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function TaskItem({ time, task, agent }: { time: string; task: string; agent: string }) {
  const agentColors: Record<string, string> = {
    'Growing': 'bg-emerald-100 text-emerald-700',
    'Sales': 'bg-amber-100 text-amber-700',
    'Recruiting': 'bg-blue-100 text-blue-700',
    'Analytics': 'bg-purple-100 text-purple-700',
    'Mentor': 'bg-rose-100 text-rose-700',
    'All Agents': 'bg-gray-100 text-gray-700',
  }

  return (
    <li className="flex items-start gap-3">
      <span className="text-xs text-gray-400 font-mono w-16 flex-shrink-0 pt-0.5">{time}</span>
      <div className="flex-1">
        <p className="text-sm text-gray-700">{task}</p>
        <span className={`text-xs px-2 py-0.5 rounded ${agentColors[agent]}`}>{agent}</span>
      </div>
    </li>
  )
}

function WeeklyCard({ day, emoji, tasks }: { day: string; emoji: string; tasks: string[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{emoji}</span>
        <h3 className="text-lg font-bold text-gray-900">{day}</h3>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-gray-400">•</span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  )
}

function AnnualCard({ quarter, emoji, title, tasks }: {
  quarter: string
  emoji: string
  title: string
  tasks: string[]
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl">{emoji}</div>
        <div>
          <span className="text-sm font-medium text-gray-500">{quarter}</span>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="grid md:grid-cols-5 gap-3">
        {tasks.map((task, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 text-center">
            {task}
          </div>
        ))}
      </div>
    </div>
  )
}
