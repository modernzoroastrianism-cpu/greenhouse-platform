'use client'

import { ArrowRight, ArrowDown, Bot, Phone, Database, Truck, DollarSign, Users, Leaf, Brain, Cog, Shield, BarChart3, RefreshCw, Zap, Globe } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h1 className="text-4xl font-bold mb-4">The AI-Run Company</h1>
          <p className="text-xl opacity-90 mb-2">
            How artificial intelligence autonomously operates a business
          </p>
          <p className="text-lg opacity-70">
            No humans in the loop for daily operations. Just AI agents working together.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        
        {/* The Claim */}
        <section>
          <div className="bg-gradient-to-r from-greenhouse-500 to-greenhouse-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">This Entire Company Can Be Run By AI</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Not partially automated. Not AI-assisted. <strong>Fully autonomous.</strong>
              <br />
              AI agents handle sales, operations, finance, marketing, and customer relationships.
              Humans set the mission and handle the physical world. AI does everything else.
            </p>
          </div>
        </section>

        {/* The Agent Architecture */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🏗️ The Agent Architecture</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              The company is run by specialized AI agents, each with a specific role. 
              They communicate, coordinate, and make decisions together.
            </p>
            
            {/* Hierarchy Diagram */}
            <div className="bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
              <pre>{`
                         ┌─────────────────┐
                         │   HUMAN OWNER   │
                         │  Sets Mission   │
                         │  Physical World │
                         └────────┬────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │     SUPERVISOR AGENTS     │
                    │   Strategy & Coordination │
                    └─────────────┬─────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
┌────────┴────────┐    ┌─────────┴─────────┐    ┌────────┴────────┐
│    BUSINESS     │    │      MISSION      │    │    CUSTOMER     │
│   SUPERVISOR    │    │    SUPERVISOR     │    │   EXPERIENCE    │
│                 │    │                   │    │   SUPERVISOR    │
└────────┬────────┘    └─────────┬─────────┘    └────────┬────────┘
         │                       │                       │
    ┌────┼────┐            ┌─────┼─────┐                │
    │    │    │            │     │     │                │
  Sales Ops Finance    Research Acq. Impact    AI GARDENERS (1000s)
  Agent Agent Agent     Agent  Agent Agent     One per customer
              `}</pre>
            </div>

            {/* Agent Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <AgentCard
                icon={<Bot className="w-6 h-6" />}
                title="Sales Agent"
                responsibilities={[
                  "Answer customer questions 24/7",
                  "Generate quotes and process orders",
                  "Handle support tickets",
                  "Request reviews from happy customers"
                ]}
                decisions="Can quote prices, answer questions"
                escalates="Discounts, refunds, policy exceptions"
              />
              <AgentCard
                icon={<Truck className="w-6 h-6" />}
                title="Operations Agent"
                responsibilities={[
                  "Place orders with suppliers",
                  "Track all shipments",
                  "Monitor inventory levels",
                  "Coordinate deliveries"
                ]}
                decisions="Can place orders, select carriers"
                escalates="Supplier changes, large orders"
              />
              <AgentCard
                icon={<DollarSign className="w-6 h-6" />}
                title="Finance Agent"
                responsibilities={[
                  "Monitor cash flow daily",
                  "Track margins per product",
                  "Process refunds",
                  "Generate financial reports"
                ]}
                decisions="Can approve small refunds, adjust prices"
                escalates="Large expenses, budget changes"
              />
              <AgentCard
                icon={<BarChart3 className="w-6 h-6" />}
                title="Marketing Agent"
                responsibilities={[
                  "Create and schedule content",
                  "Manage ad campaigns",
                  "Monitor SEO and traffic",
                  "Build email sequences"
                ]}
                decisions="Can publish content, adjust ads within budget"
                escalates="New campaigns, brand changes"
              />
              <AgentCard
                icon={<Brain className="w-6 h-6" />}
                title="Research Agent"
                responsibilities={[
                  "Monitor agriculture news",
                  "Track competitor activity",
                  "Identify acquisition targets",
                  "Generate market intelligence"
                ]}
                decisions="Can research anything, produce reports"
                escalates="Strategic recommendations"
              />
              <AgentCard
                icon={<Leaf className="w-6 h-6" />}
                title="AI Gardener (×1000s)"
                responsibilities={[
                  "Daily check-ins with their human",
                  "Answer gardening questions",
                  "Monitor greenhouse sensors",
                  "Build long-term relationships"
                ]}
                decisions="Full autonomy with their human"
                escalates="Technical issues, account problems"
              />
            </div>
          </div>
        </section>

        {/* How Agents Communicate */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💬 How Agents Communicate</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              Agents don't work in isolation. They send messages to each other, 
              request approvals, and coordinate complex workflows.
            </p>

            <div className="space-y-4">
              <WorkflowExample
                title="New Order Flow"
                steps={[
                  { agent: "Sales", action: "Receives order, validates payment" },
                  { agent: "Sales → Ops", action: "Sends order details" },
                  { agent: "Ops", action: "Checks inventory, places with supplier" },
                  { agent: "Ops", action: "Gets tracking, schedules delivery" },
                  { agent: "Ops → Sales", action: "Sends tracking info" },
                  { agent: "Sales", action: "Notifies customer" },
                  { agent: "AI Gardener", action: "Wakes up, introduces itself" },
                ]}
              />

              <WorkflowExample
                title="Discount Request Flow"
                steps={[
                  { agent: "Customer", action: "Asks Sales for discount" },
                  { agent: "Sales", action: "Checks: standard discount available?" },
                  { agent: "Sales → Finance", action: "Requests approval for special discount" },
                  { agent: "Finance", action: "Evaluates margin impact, customer value" },
                  { agent: "Finance → Sales", action: "Approves or denies with reasoning" },
                  { agent: "Sales", action: "Communicates decision to customer" },
                ]}
              />

              <WorkflowExample
                title="Problem Escalation Flow"
                steps={[
                  { agent: "AI Gardener", action: "Customer reports major issue" },
                  { agent: "AI Gardener → CX Supervisor", action: "Escalates with context" },
                  { agent: "CX Supervisor", action: "Can resolve? If yes, resolves" },
                  { agent: "CX Supervisor → Human", action: "If no, escalates to human" },
                  { agent: "Human", action: "Makes decision" },
                  { agent: "CX Supervisor → AI Gardener", action: "Relays resolution" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* The AI Flywheel */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 The AI Flywheel</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              The magic isn't just automation — it's compounding intelligence. 
              Every interaction makes the system smarter.
            </p>

            {/* Flywheel Diagram */}
            <div className="bg-gradient-to-br from-greenhouse-50 to-blue-50 rounded-xl p-8 mb-6">
              <div className="max-w-md mx-auto">
                <div className="relative">
                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-greenhouse-500 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                  </div>
                  
                  {/* Flywheel steps */}
                  <div className="grid grid-cols-2 gap-8 py-8">
                    <FlywheelStep number="1" title="More Customers" description="AI handles unlimited conversations" position="top-left" />
                    <FlywheelStep number="2" title="More Data" description="Every interaction = learning" position="top-right" />
                    <FlywheelStep number="3" title="Smarter AI" description="Models improve automatically" position="bottom-left" />
                    <FlywheelStep number="4" title="Better Service" description="Customers more successful" position="bottom-right" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-greenhouse-100 rounded-full flex items-center justify-center text-greenhouse-600 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">More Customers, No Scaling Cost</h4>
                  <p className="text-gray-600">
                    A human support team scales linearly — 2x customers needs 2x staff. 
                    AI scales logarithmically. 10x customers might need 1.2x compute.
                    <strong> Growth is nearly free.</strong>
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-greenhouse-100 rounded-full flex items-center justify-center text-greenhouse-600 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Every Conversation = Training Data</h4>
                  <p className="text-gray-600">
                    When an AI Gardener helps someone with tomato blight, that knowledge 
                    helps ALL AI Gardeners help ALL future tomato growers.
                    <strong> Learning compounds across the network.</strong>
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-greenhouse-100 rounded-full flex items-center justify-center text-greenhouse-600 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Models Self-Improve</h4>
                  <p className="text-gray-600">
                    We don't manually update the AI. Successful interactions reinforce good behaviors. 
                    Failures get flagged and corrected.
                    <strong> The system evolves continuously.</strong>
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-greenhouse-100 rounded-full flex items-center justify-center text-greenhouse-600 font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Success Breeds Success</h4>
                  <p className="text-gray-600">
                    Better AI → more successful growers → more referrals → more customers → more data → better AI.
                    <strong> This is why we'll win.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Making */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🧠 How AI Makes Decisions</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              Every agent has defined authority. They can act within their domain, 
              but must escalate decisions outside it.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-700">Decision</th>
                    <th className="text-center py-3 text-gray-700">Worker Agent</th>
                    <th className="text-center py-3 text-gray-700">Supervisor</th>
                    <th className="text-center py-3 text-gray-700">Human</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Answer customer question</td>
                    <td className="text-center text-green-500">✓</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-gray-300">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Process standard order</td>
                    <td className="text-center text-green-500">✓</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-gray-300">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Give 10% discount</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-green-500">✓</td>
                    <td className="text-center text-gray-300">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Give 30% discount</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Adjust product pricing</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-green-500">✓</td>
                    <td className="text-center text-gray-300">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Change supplier</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Launch marketing campaign</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-green-500">✓</td>
                    <td className="text-center text-gray-300">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Acquire another company</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">AI Gardener daily advice</td>
                    <td className="text-center text-green-500">✓</td>
                    <td className="text-center text-gray-300">-</td>
                    <td className="text-center text-gray-300">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">🛡️ Trust Graph Validation</h4>
              <p className="text-yellow-700 text-sm">
                Before executing high-stakes decisions, agents submit actions to the TrustGraph — 
                a validation layer that checks if actions are within authority, consistent with 
                business rules, and pass sanity checks. This prevents "selling at a loss" mistakes 
                that plagued earlier AI business experiments.
              </p>
            </div>
          </div>
        </section>

        {/* What Humans Still Do */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 What Humans Still Do</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              AI runs the business. Humans handle what AI can't (yet).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-green-500">🤖</span> AI Handles
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Customer conversations (sales, support)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Order processing and fulfillment coordination
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Financial tracking and reporting
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Marketing content and campaigns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    AI Gardener relationships (1000s simultaneously)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Research and market intelligence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Day-to-day decisions within policy
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-500">👤</span> Humans Handle
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Physical fulfillment (packing, shipping)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Legal and regulatory compliance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Bank accounts and financial setup
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Major strategic decisions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Acquisition negotiations (final sign-off)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Emergency situations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Setting the mission (why we exist)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">
                <strong>Note:</strong> As robotics advances, physical fulfillment will become automated too. 
                The human role shrinks over time — eventually to mission-setting and edge cases only.
                This isn't job destruction; it's freeing humans from repetitive work so they can 
                focus on what matters.
              </p>
            </div>
          </div>
        </section>

        {/* Daily Operations */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📅 A Day in the AI Company</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              <TimelineEvent
                time="6:00 AM"
                title="Morning Health Check"
                description="Coordinator Agent reviews overnight metrics. Cash flow, order status, alert count. Flags anything unusual."
                agents={["Coordinator", "Finance"]}
              />
              <TimelineEvent
                time="7:00 AM"
                title="AI Gardeners Wake Up"
                description="Thousands of AI Gardeners send personalized morning check-ins to their humans based on weather, plant status, and recent conversations."
                agents={["AI Gardeners"]}
              />
              <TimelineEvent
                time="9:00 AM"
                title="Customer Support Surge"
                description="Sales Agent handles 50+ inquiries simultaneously. Quotes prices, answers questions, processes orders. Zero wait time."
                agents={["Sales"]}
              />
              <TimelineEvent
                time="10:00 AM"
                title="Inventory Sync"
                description="Ops Agent checks supplier inventory, lead times, and pricing changes. Adjusts forecasts automatically."
                agents={["Ops"]}
              />
              <TimelineEvent
                time="12:00 PM"
                title="Marketing Optimization"
                description="Marketing Agent analyzes morning ad performance. Reallocates budget to best performers. Schedules afternoon content."
                agents={["Marketing"]}
              />
              <TimelineEvent
                time="2:00 PM"
                title="Problem Resolution"
                description="Customer reports damaged shipment. Sales escalates to Ops. Ops files claim, arranges replacement. Sales notifies customer. 8 minutes total."
                agents={["Sales", "Ops"]}
              />
              <TimelineEvent
                time="4:00 PM"
                title="Financial Reconciliation"
                description="Finance Agent reconciles day's transactions. Updates cash flow projection. Flags any margin anomalies."
                agents={["Finance"]}
              />
              <TimelineEvent
                time="6:00 PM"
                title="Evening Summary"
                description="All agents report status to Coordinator. Daily summary generated. If anything needs human attention, notification sent."
                agents={["All Agents"]}
              />
              <TimelineEvent
                time="Night"
                title="Background Processing"
                description="Research Agent scans news, competitor activity. Marketing Agent prepares tomorrow's content. AI Gardeners monitor overnight sensor data."
                agents={["Research", "Marketing", "AI Gardeners"]}
              />
            </div>

            <div className="mt-6 text-center p-4 bg-greenhouse-50 rounded-lg">
              <p className="text-greenhouse-800 font-semibold">
                All of this happens automatically. Every day. No human intervention required.
              </p>
            </div>
          </div>
        </section>

        {/* Scaling */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 How It Scales</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-700">Scale</th>
                    <th className="text-center py-3 text-gray-700">Customers</th>
                    <th className="text-center py-3 text-gray-700">Human Team</th>
                    <th className="text-center py-3 text-gray-700">AI Agents</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Startup</td>
                    <td className="text-center">100</td>
                    <td className="text-center">1-2</td>
                    <td className="text-center">~110</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Growing</td>
                    <td className="text-center">1,000</td>
                    <td className="text-center">2-3</td>
                    <td className="text-center">~1,010</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Established</td>
                    <td className="text-center">10,000</td>
                    <td className="text-center">3-5</td>
                    <td className="text-center">~10,015</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">At Scale</td>
                    <td className="text-center">100,000</td>
                    <td className="text-center">5-10</td>
                    <td className="text-center">~100,020</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Vision</td>
                    <td className="text-center">1,000,000+</td>
                    <td className="text-center">10-20</td>
                    <td className="text-center">~1,000,030</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600">
              <strong>The ratio is insane:</strong> At 1 million customers, we need ~20 humans and ~1 million AI Gardeners (plus ~30 operational agents). 
              A traditional company would need thousands of employees.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-700">100x</div>
                <div className="text-sm text-green-600">More efficient than traditional</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">24/7</div>
                <div className="text-sm text-blue-600">Always available</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">∞</div>
                <div className="text-sm text-purple-600">Simultaneous conversations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Works */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Why This Works</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="text-2xl">🎯</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Clear Scope</h4>
                  <p className="text-gray-600">
                    We're not trying to automate everything. Greenhouses + growing advice is a bounded domain. 
                    The AI can actually be expert at this.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-2xl">📊</div>
                <div>
                  <h4 className="font-semibold text-gray-900">High-Margin Product</h4>
                  <p className="text-gray-600">
                    $1000+ profit per greenhouse gives room for AI mistakes during learning. 
                    We can afford to over-deliver while the system improves.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-2xl">❤️</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Relationship-Based</h4>
                  <p className="text-gray-600">
                    AI Gardeners build real relationships. This isn't transactional — 
                    customers want to talk to their gardener. They're invested.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-2xl">🔄</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Continuous Learning</h4>
                  <p className="text-gray-600">
                    Every greenhouse is a data point. Every conversation is training. 
                    The system gets better every day automatically.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-2xl">🛡️</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Guardrails Built In</h4>
                  <p className="text-gray-600">
                    TrustGraph validation, decision authority limits, human escalation paths. 
                    We learned from VendingBench — AI needs constraints to avoid costly mistakes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">This Is The Future</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              An AI-run company that exists to help humans. Proof that autonomous AI 
              can be trusted. A model for what comes next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/" 
                 className="inline-flex items-center gap-2 bg-greenhouse-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-greenhouse-600 transition-colors">
                Try the App
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/about" 
                 className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-white/20 transition-colors">
                Read the Mission
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p className="mb-2">
            Built by AI + Humans working together
          </p>
          <p>
            <a href="/about" className="hover:text-white">About</a>
            {" · "}
            <a href="/how-it-works" className="hover:text-white">How It Works</a>
            {" · "}
            <a href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform" className="hover:text-white">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

function AgentCard({ icon, title, responsibilities, decisions, escalates }: {
  icon: React.ReactNode
  title: string
  responsibilities: string[]
  decisions: string
  escalates: string
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-greenhouse-600">{icon}</div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-1 text-sm text-gray-600 mb-3">
        {responsibilities.map((r, i) => (
          <li key={i} className="flex items-start gap-1">
            <span className="text-gray-400">•</span>
            {r}
          </li>
        ))}
      </ul>
      <div className="text-xs space-y-1">
        <p><span className="text-green-600 font-medium">Can decide:</span> {decisions}</p>
        <p><span className="text-orange-600 font-medium">Escalates:</span> {escalates}</p>
      </div>
    </div>
  )
}

function WorkflowExample({ title, steps }: {
  title: string
  steps: { agent: string; action: string }[]
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <div className="w-5 h-5 bg-greenhouse-100 rounded-full flex items-center justify-center text-greenhouse-600 text-xs font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div>
              <span className="font-medium text-greenhouse-700">{step.agent}:</span>
              <span className="text-gray-600"> {step.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlywheelStep({ number, title, description, position }: {
  number: string
  title: string
  description: string
  position: string
}) {
  return (
    <div className="text-center p-4">
      <div className="w-8 h-8 bg-greenhouse-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
        {number}
      </div>
      <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
    </div>
  )
}

function TimelineEvent({ time, title, description, agents }: {
  time: string
  title: string
  description: string
  agents: string[]
}) {
  return (
    <div className="flex gap-4">
      <div className="w-20 flex-shrink-0 text-right">
        <span className="text-sm font-medium text-gray-500">{time}</span>
      </div>
      <div className="w-3 flex flex-col items-center">
        <div className="w-3 h-3 bg-greenhouse-500 rounded-full" />
        <div className="w-0.5 flex-1 bg-gray-200" />
      </div>
      <div className="flex-1 pb-4">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex gap-1 mt-2">
          {agents.map((agent, i) => (
            <span key={i} className="text-xs bg-greenhouse-100 text-greenhouse-700 px-2 py-0.5 rounded">
              {agent}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
