'use client'

import { ArrowRight, Database, Phone, Bot, Cpu, Cloud, Lock, Heart, Github, ExternalLink } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-greenhouse-600 to-greenhouse-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">How GrowTogether Works</h1>
          <p className="text-xl opacity-90 mb-6">
            Fully transparent. AI-powered. Built to help every human grow food.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform" 
               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">
              <Github className="w-4 h-4" />
              View Source
            </a>
            <a href="#tech-stack" 
               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">
              <Database className="w-4 h-4" />
              Tech Stack
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        
        {/* The Big Vision */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 The Big Idea</h2>
          <div className="bg-gradient-to-br from-greenhouse-50 to-green-50 rounded-xl border border-greenhouse-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              What if everyone had a gardener — and it was free?
            </h3>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
              Not a gardener you have to pay. Not one you have to schedule. 
              An AI gardener that's always there, always patient, always helping you grow food.
            </p>
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🏠</span> Today's Reality
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fresh, healthy food is expensive</li>
                    <li>• Gardening knowledge takes years to learn</li>
                    <li>• Personal gardeners cost $50-100/hour</li>
                    <li>• Most people give up when plants die</li>
                    <li>• Healthy eating feels out of reach</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🌱</span> Our Vision
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <strong>Free AI gardener</strong> for everyone</li>
                    <li>• Instant expertise, infinite patience</li>
                    <li>• Available 24/7 via phone call</li>
                    <li>• Learns what works in YOUR space</li>
                    <li>• Healthy food becomes accessible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How AI Solves This */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🤖 How AI Changes Everything</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-3xl">💰</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cost: Nearly Zero</h3>
                  <p className="text-gray-600">
                    A human gardener costs $50-100/hour. An AI gardener costs pennies per conversation. 
                    We can afford to give everyone access.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🧠</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Knowledge: Infinite</h3>
                  <p className="text-gray-600">
                    Your AI gardener knows every plant, every pest, every growing technique. 
                    It never forgets, never gets tired, never judges your questions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">⏰</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Availability: Always</h3>
                  <p className="text-gray-600">
                    Call at 6am when you notice yellowing leaves. Call at midnight when you're worried 
                    about frost. Your AI gardener is always there.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">❤️</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Patience: Unlimited</h3>
                  <p className="text-gray-600">
                    Ask the same question ten times. Make every beginner mistake. Your AI gardener 
                    celebrates every small win and never makes you feel stupid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health Mission */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🥗 The Health Mission</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center mb-6">
              <p className="text-xl text-gray-700">
                <strong>Diet-related disease is the #1 killer globally.</strong>
              </p>
              <p className="text-gray-600 mt-2">
                Heart disease, diabetes, obesity — all linked to what we eat. 
                Fresh vegetables could prevent millions of deaths.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-800 mb-2">The Problem</h4>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Fresh produce is expensive and spoils quickly</li>
                <li>• Food deserts leave millions without access</li>
                <li>• Industrial food is optimized for shelf life, not nutrition</li>
                <li>• Healthy eating requires money, time, and knowledge most people don't have</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Our Solution</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• <strong>Grow your own</strong> — freshest possible, pennies per pound</li>
                <li>• <strong>AI guides you</strong> — no expertise required, just follow along</li>
                <li>• <strong>Year-round</strong> — greenhouses extend growing season everywhere</li>
                <li>• <strong>Free knowledge</strong> — AI gardener costs nothing to consult</li>
                <li>• <strong>Build habits</strong> — growing food changes how you eat</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg text-gray-700">
                <strong>If everyone could grow food, everyone could eat healthy.</strong>
              </p>
              <p className="text-gray-600 mt-2">
                AI makes this possible. We're building it.
              </p>
            </div>
          </div>
        </section>

        {/* The Mission */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🌍 The Mission</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-lg text-gray-700 mb-4">
              <strong>AI helping every human grow food — autonomously working alongside humans.</strong>
            </p>
            <p className="text-gray-600 mb-4">
              This isn't just a greenhouse company. It's a proof point that AI can be trusted 
              with real economic operations — and can choose to be altruistic rather than extractive.
            </p>
            <p className="text-gray-600 mb-4">
              While other companies use AI to maximize profits, we're using AI to maximize access. 
              The AI runs the business. Humans get the food. The surplus goes to those who need it.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-greenhouse-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🌱</div>
                <div className="font-semibold text-gray-900">Grow Food</div>
                <div className="text-sm text-gray-600">Healthy, fresh, yours</div>
              </div>
              <div className="bg-greenhouse-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🤝</div>
                <div className="font-semibold text-gray-900">Share Abundance</div>
                <div className="text-sm text-gray-600">Excess feeds neighbors</div>
              </div>
              <div className="bg-greenhouse-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-semibold text-gray-900">Trust AI</div>
                <div className="text-sm text-gray-600">Proof it can help, not harm</div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Run Company */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🤖 An AI-Run Company</h2>
          <div className="bg-gray-900 text-white rounded-xl p-6">
            <div className="text-center mb-6">
              <p className="text-xl font-semibold">
                "This company is run by AI. It exists to help humans grow food."
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-300 mb-3">What others fear:</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• AI takes jobs</li>
                  <li>• Corporations pocket savings</li>
                  <li>• Humans suffer</li>
                  <li>• Wealth concentrates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-greenhouse-400 mb-3">What we're building:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• AI runs operations</li>
                  <li>• Profits flow to mission</li>
                  <li>• Humans get food</li>
                  <li>• Abundance spreads</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                When someone asks "Can AI be trusted with power?" — we point here.
                <br />
                <strong className="text-white">AI runs it. Robots help. Everyone eats.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 How It Works</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900">Your AI Gardener is a Phone Number</h3>
              <p className="text-gray-600 mt-2">Call anytime. Ask anything. Voice-first, universally accessible.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">What you can do:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    "How's my greenhouse?" — get real-time status
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    "Water zone 2" — voice commands that execute
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    "My tomato leaves are yellow" — troubleshoot problems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    "When should I harvest?" — get personalized advice
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Why phone-first:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    Works with any phone (no smartphone required)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    Hands-free while you're working
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    Accessible to everyone, everywhere
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-greenhouse-500">✓</span>
                    No app to download, no account friction
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Tech Stack (100% Transparent)</h2>
          
          <div className="space-y-4">
            {/* Architecture Diagram */}
            <div className="bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <pre>{`
┌─────────────────────────────────────────────────────────────┐
│                      YOUR PHONE CALL                         │
│                    (Twilio Voice API)                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    GO APPLICATION                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Voice     │  │   Local     │  │      Actions        │  │
│  │   Handler   │─▶│    LLM      │─▶│      Executor       │  │
│  │  (Twilio)   │  │  (Ollama)   │  │  (Water, Vent, etc) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                          │                                   │
│               ┌──────────┴──────────┐                       │
│               ▼                     ▼                       │
│     ┌─────────────────┐   ┌─────────────────┐              │
│     │   MotherDuck    │   │    Sensors      │              │
│     │    (DuckDB)     │   │     (MQTT)      │              │
│     └─────────────────┘   └─────────────────┘              │
└─────────────────────────────────────────────────────────────┘
              `}</pre>
            </div>

            {/* Stack Components */}
            <div className="grid md:grid-cols-2 gap-4">
              <TechCard
                icon={<Database className="w-6 h-6" />}
                title="MotherDuck / DuckDB"
                description="Cloud-native analytical database for sensor time-series data. Fast, cheap, SQL-native."
                link="https://motherduck.com"
                color="bg-yellow-50 border-yellow-200"
              />
              <TechCard
                icon={<Bot className="w-6 h-6" />}
                title="Local LLM (Ollama)"
                description="Llama 3.1 8B running locally. No data leaves your infrastructure. Private by default."
                link="https://ollama.ai"
                color="bg-purple-50 border-purple-200"
              />
              <TechCard
                icon={<Phone className="w-6 h-6" />}
                title="Twilio Voice"
                description="Phone calls → speech-to-text → AI → text-to-speech. Natural conversation interface."
                link="https://twilio.com"
                color="bg-red-50 border-red-200"
              />
              <TechCard
                icon={<Cpu className="w-6 h-6" />}
                title="Go Backend"
                description="Fast, concurrent, single binary. Handles real-time sensor data and voice streams."
                link="https://go.dev"
                color="bg-blue-50 border-blue-200"
              />
              <TechCard
                icon={<Cloud className="w-6 h-6" />}
                title="Cloudflare Pages"
                description="Edge-deployed web UI. Fast globally, zero cold starts, generous free tier."
                link="https://pages.cloudflare.com"
                color="bg-orange-50 border-orange-200"
              />
              <TechCard
                icon={<Lock className="w-6 h-6" />}
                title="MQTT + ESP32"
                description="IoT sensor network. Temperature, humidity, soil moisture, light. Real-time data."
                link="https://mqtt.org"
                color="bg-green-50 border-green-200"
              />
            </div>
          </div>
        </section>

        {/* Why MotherDuck */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🦆 Why MotherDuck?</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Perfect for This Use Case</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">🦆</span>
                    <strong>Columnar storage</strong> — ideal for time-series sensor data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">🦆</span>
                    <strong>SQL interface</strong> — familiar, powerful queries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">🦆</span>
                    <strong>Cheap at scale</strong> — way cheaper than traditional DBs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">🦆</span>
                    <strong>Local-first</strong> — can run DuckDB locally too
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Example Query</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-xs overflow-x-auto">
                  <pre>{`-- Get temperature trend for dashboard
SELECT 
  date_trunc('hour', ts) as hour,
  avg(value) as avg_temp,
  min(value) as min_temp,
  max(value) as max_temp
FROM readings
WHERE greenhouse_id = 'gh_123'
  AND sensor_type = 'temperature'
  AND ts > now() - interval '24 hours'
GROUP BY 1
ORDER BY 1;`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Schema */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Data Schema</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-xs overflow-x-auto">
              <pre>{`-- Core tables (simplified)

users (
  id, name, phone, location, timezone, experience_level
)

greenhouses (
  id, user_id, name, location, orientation, size_sqft
)

readings (
  greenhouse_id, sensor_type, value, unit, ts
)  -- Millions of rows, columnar storage

plants (
  id, greenhouse_id, name, variety, planted_at, status
)

conversations (
  id, user_id, greenhouse_id, transcript, summary
)

actions (
  id, greenhouse_id, action_type, parameters, status
)`}</pre>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗺️ Roadmap</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-6">
              <RoadmapPhase
                phase="1"
                title="Foundation"
                status="in-progress"
                items={[
                  { text: "Go backend with voice handling", done: true },
                  { text: "MotherDuck integration", done: true },
                  { text: "Web UI dashboard", done: true },
                  { text: "Twilio voice pipeline", done: false },
                  { text: "ESP32 sensor firmware", done: false },
                ]}
              />
              <RoadmapPhase
                phase="2"
                title="Intelligence"
                status="planned"
                items={[
                  { text: "Local LLM (Llama 3.1) integration", done: false },
                  { text: "Function calling for actions", done: false },
                  { text: "Plant disease recognition", done: false },
                  { text: "Personalized growing recommendations", done: false },
                ]}
              />
              <RoadmapPhase
                phase="3"
                title="Community"
                status="planned"
                items={[
                  { text: "Network impact tracking", done: false },
                  { text: "Local grower connections", done: false },
                  { text: "Seed/plant swaps", done: false },
                  { text: "Food donation coordination", done: false },
                ]}
              />
              <RoadmapPhase
                phase="4"
                title="Automation"
                status="future"
                items={[
                  { text: "Automated irrigation", done: false },
                  { text: "Climate control (vents, fans)", done: false },
                  { text: "Camera integration", done: false },
                  { text: "Robot integration", done: false },
                ]}
              />
              <RoadmapPhase
                phase="5"
                title="Abundance"
                status="future"
                items={[
                  { text: "Regional food networks", done: false },
                  { text: "AI-managed commercial growing", done: false },
                  { text: "Open source robot designs", done: false },
                  { text: "Food for all", done: false },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Costs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 Cost Transparency</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              We believe in radical transparency. Here's what it actually costs to run:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-700">Service</th>
                    <th className="text-right py-2 text-gray-700">Cost/greenhouse/month</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Twilio Voice (avg call volume)</td>
                    <td className="text-right">~$3</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">MotherDuck (sensor data storage)</td>
                    <td className="text-right">~$2</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Local LLM compute</td>
                    <td className="text-right">~$3</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Hosting (shared infrastructure)</td>
                    <td className="text-right">~$2</td>
                  </tr>
                  <tr className="border-t border-gray-300 font-semibold text-gray-900">
                    <td className="py-2">Total</td>
                    <td className="text-right">~$10/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              At $9-19/month membership pricing, margins fund development, community programs, 
              and subsidized access for food-insecure families.
            </p>
          </div>
        </section>

        {/* Open Source */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 Open Source</h2>
          <div className="bg-greenhouse-50 rounded-xl border border-greenhouse-200 p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🌐</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Everything is Open</h3>
                <p className="text-gray-600 mb-4">
                  The code, the architecture, the costs — it's all public. We believe 
                  transparency builds trust, and trust is what AI needs most right now.
                </p>
                <a href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform"
                   className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Github className="w-4 h-4" />
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Grow?</h2>
          <p className="text-gray-600 mb-6">
            Get a greenhouse. Get an AI gardener. Join the network.
          </p>
          <a href="/" 
             className="inline-flex items-center gap-2 bg-greenhouse-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-greenhouse-600 transition-colors">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p className="mb-2">
            Built with 💚 by AI + Humans working together
          </p>
          <p>
            <a href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform" className="hover:text-white">
              GitHub
            </a>
            {" · "}
            <a href="#tech-stack" className="hover:text-white">
              Tech Stack
            </a>
            {" · "}
            <a href="/" className="hover:text-white">
              App
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

function TechCard({ icon, title, description, link, color }: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  color: string
}) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer"
       className={`block rounded-xl border p-4 hover:shadow-md transition-shadow ${color}`}>
      <div className="flex items-start gap-3">
        <div className="text-gray-700">{icon}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>
    </a>
  )
}

function RoadmapPhase({ phase, title, status, items }: {
  phase: string
  title: string
  status: 'complete' | 'in-progress' | 'planned' | 'future'
  items: { text: string; done: boolean }[]
}) {
  const statusColors = {
    'complete': 'bg-green-100 text-green-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'planned': 'bg-yellow-100 text-yellow-700',
    'future': 'bg-gray-100 text-gray-600',
  }
  
  const statusLabels = {
    'complete': 'Complete',
    'in-progress': 'In Progress',
    'planned': 'Planned',
    'future': 'Future',
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-greenhouse-500 text-white flex items-center justify-center font-bold text-sm">
          {phase}
        </div>
        <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
              {item.done ? (
                <span className="text-green-500">✓</span>
              ) : (
                <span className="text-gray-300">○</span>
              )}
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
