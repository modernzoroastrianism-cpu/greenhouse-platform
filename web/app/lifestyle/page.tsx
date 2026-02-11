'use client'

import { ArrowRight, Heart, Users, Utensils, Home, Leaf, Clock, Sun, Music, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function LifestylePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-900 to-red-900" />
        
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-amber-200 text-sm font-medium mb-6">
              🏡 Remember how life used to be?
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The good life.
              <br />
              <span className="text-amber-300">AI just makes it possible.</span>
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Your grandparents had gardens, canned their harvest, and knew their neighbors.
              <br />
              <span className="text-white font-medium">We're bringing that back.</span>
            </p>
          </div>

          <Link href="/join" 
             className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-50 transition-colors shadow-lg">
            Start Living
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* What We Lost */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What we lost
            </h2>
            <p className="text-xl text-gray-600">
              Somewhere along the way, we traded community for convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-400 mb-4">🏚️ How we live now</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  Don't know our neighbors' names
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  Eat alone, staring at screens
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  Food from factories, shipped 1,500 miles
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  Isolated. Anxious. Disconnected.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  Skills our grandparents had? Gone.
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-4">🏡 How it used to be</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500">✦</span>
                  Knew everyone on the block
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500">✦</span>
                  Sunday dinners with the neighborhood
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500">✦</span>
                  Garden in the backyard, food on the table
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500">✦</span>
                  Connected. Purposeful. Rooted.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500">✦</span>
                  Canning, preserving, sharing abundance
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl text-gray-800">
              <strong>We didn't evolve for this.</strong>
            </p>
            <p className="text-gray-600 mt-2">
              Our bodies and minds were built for community, for growing, for sharing.
              <br />
              No wonder we're anxious, lonely, and sick.
            </p>
          </div>
        </div>
      </section>

      {/* The Good Life, Restored */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The good life, restored
            </h2>
            <p className="text-xl text-gray-600">
              AI doesn't replace the human parts. It enables them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <LifestyleCard
              emoji="🌱"
              title="Grow Your Own"
              description="Greenhouse in your backyard. AI tells you exactly what to do. Fresh food, grown by you — the way your grandparents did."
              details={[
                "No expertise needed — AI teaches you",
                "Year-round growing",
                "Kids learn where food comes from",
                "Meditative, grounding work"
              ]}
            />
            <LifestyleCard
              emoji="🫙"
              title="Preserve the Harvest"
              description="Canning, jamming, pickling, fermenting. Fill your pantry with food you made. Gifts that mean something."
              details={[
                "AI guides you through recipes",
                "Tomato sauce for winter",
                "Strawberry jam from your garden",
                "Pickles, sauerkraut, kimchi"
              ]}
            />
            <LifestyleCard
              emoji="🍽️"
              title="Dinner With Neighbors"
              description="Invite people over. Share what you grew. Build relationships over food — the way humans have for 10,000 years."
              details={[
                "AI helps coordinate gatherings",
                "\"Sunday dinner at the Johnsons\"",
                "Potluck with everyone's harvest",
                "Kids playing while adults cook"
              ]}
            />
            <LifestyleCard
              emoji="🤝"
              title="Real Community"
              description="As more neighbors join, your block transforms. You have people. People who'd help if you needed it."
              details={[
                "Trade surplus with neighbors",
                "Share tools and knowledge",
                "Watch each other's kids",
                "Actually know who lives next door"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Preserved Goods */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🫙 Beyond fresh — preserved
            </h2>
            <p className="text-xl text-gray-600">
              Your grandma's pantry was full of jars. Yours can be too.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <PreserveCard emoji="🍅" label="Tomato Sauce" />
            <PreserveCard emoji="🍓" label="Strawberry Jam" />
            <PreserveCard emoji="🥒" label="Dill Pickles" />
            <PreserveCard emoji="🥕" label="Pickled Carrots" />
            <PreserveCard emoji="🍑" label="Peach Preserves" />
            <PreserveCard emoji="🌶️" label="Hot Sauce" />
            <PreserveCard emoji="🥬" label="Sauerkraut" />
            <PreserveCard emoji="🍎" label="Apple Butter" />
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What AI helps with:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  Step-by-step canning instructions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  Food safety guidance (pH levels, processing times)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  Recipe scaling for your harvest size
                </li>
              </ul>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  "Your tomatoes are ready — here's what to make"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  Track your pantry inventory
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  Sell your preserves locally
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Dinners */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🍽️ Invite someone over
            </h2>
            <p className="text-xl text-gray-600">
              The most radical act in modern life: sharing a meal.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">How it works</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">1.</span>
                    Tell your AI you want to host dinner
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">2.</span>
                    AI suggests a menu based on your harvest
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">3.</span>
                    Invite neighbors (or AI finds interested locals)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">4.</span>
                    AI coordinates who brings what (potluck style)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">5.</span>
                    Share a meal. Make friends. Repeat.
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Example gathering:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>🏠 Host:</strong> Sarah (your neighbor)</p>
                  <p><strong>📅 When:</strong> Sunday, 5pm</p>
                  <p><strong>🍽️ Menu:</strong> Garden salad, grilled veggies, fresh bread</p>
                  <p><strong>👥 Guests:</strong> 4 families from the block</p>
                  <p><strong>🫙 Contributed:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• You: Tomatoes, basil</li>
                    <li>• Mike: Zucchini, peppers</li>
                    <li>• Lisa: Homemade bread</li>
                    <li>• Tom: Wine from last year's grapes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-800 mb-2">
              <strong>This is what humans are supposed to do.</strong>
            </p>
            <p className="text-gray-600">
              Grow food. Share it. Build bonds. AI just removes the friction.
            </p>
          </div>
        </div>
      </section>

      {/* The Block Transforms */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Watch your block transform
            </h2>
            <p className="text-xl text-gray-300">
              As more neighbors join, something magical happens.
            </p>
          </div>

          <div className="space-y-6">
            <TransformStage
              stage="1 Grower"
              description="You start. Fresh food for your family. Neighbors curious."
              icon="🌱"
            />
            <TransformStage
              stage="3 Growers"
              description="Variety emerges. You grow tomatoes, she grows greens, he grows herbs. Start trading."
              icon="🌿"
            />
            <TransformStage
              stage="5 Growers"
              description="First block dinner. Everyone brings something. Kids play together. Adults exchange numbers."
              icon="🍽️"
            />
            <TransformStage
              stage="10+ Growers"
              description="Your block is food-independent. Weekly dinners. Tool sharing. Canning parties. This is community."
              icon="🏘️"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl text-amber-400">
              <strong>Someone has to be the first.</strong>
            </p>
            <p className="text-gray-400 mt-2">
              Be the catalyst. Your AI will help bring the others.
            </p>
          </div>
        </div>
      </section>

      {/* Health & Happiness */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Would we all be healthier and happier?
            </h2>
            <p className="text-xl text-gray-600">
              The research says yes. Overwhelmingly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Heart className="w-8 h-8" />}
              title="Physical Health"
              benefits={[
                "Fresh food = better nutrition",
                "Gardening = moderate exercise",
                "Less processed food",
                "Food you trust"
              ]}
            />
            <BenefitCard
              icon={<Sun className="w-8 h-8" />}
              title="Mental Health"
              benefits={[
                "Growing things = reduced anxiety",
                "Purpose and accomplishment",
                "Time outdoors",
                "Creative outlet"
              ]}
            />
            <BenefitCard
              icon={<Users className="w-8 h-8" />}
              title="Social Health"
              benefits={[
                "Actually knowing neighbors",
                "Shared meals = bonding",
                "Kids have community",
                "Safety net of people"
              ]}
            />
          </div>

          <div className="mt-12 bg-amber-100 rounded-2xl p-8 text-center">
            <p className="text-xl text-gray-800">
              Our ancestors lived this way for millennia.
              <br />
              <strong>We've only been isolated for 50 years.</strong>
              <br />
              <span className="text-gray-600">The experiment failed. Time to go back.</span>
            </p>
          </div>
        </div>
      </section>

      {/* AI as Enabler */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            AI doesn't replace the human parts.
            <br />
            <span className="text-amber-600">It makes them possible again.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">What AI does:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Guides your growing (no expertise needed)</li>
                <li>✓ Coordinates logistics (who brings what)</li>
                <li>✓ Handles the marketplace (selling surplus)</li>
                <li>✓ Connects you with neighbors</li>
                <li>✓ Tracks inventory and recipes</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">What humans do:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>❤️ Actually grow the food (hands in dirt)</li>
                <li>❤️ Cook and eat together</li>
                <li>❤️ Have conversations over dinner</li>
                <li>❤️ Build genuine friendships</li>
                <li>❤️ Feel alive, connected, purposeful</li>
              </ul>
            </div>
          </div>

          <p className="mt-12 text-gray-600">
            The good life isn't about technology. But sometimes technology can bring it back.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-600 to-orange-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to live differently?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Get a greenhouse. Grow food. Meet your neighbors.
            <br />
            Your AI handles everything else.
          </p>
          <Link href="/join"
             className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-50 transition-colors shadow-lg">
            Start the Good Life
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="mb-4">🌱 Growing food. Building community. Living well.</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/join" className="hover:text-white">Join</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LifestyleCard({ emoji, title, description, details }: {
  emoji: string
  title: string
  description: string
  details: string[]
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-1">
        {details.map((detail, i) => (
          <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
            <span className="text-amber-500">•</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PreserveCard({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
    </div>
  )
}

function TransformStage({ stage, description, icon }: {
  stage: string
  description: string
  icon: string
}) {
  return (
    <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="font-bold text-amber-400">{stage}</div>
        <div className="text-gray-300">{description}</div>
      </div>
    </div>
  )
}

function BenefitCard({ icon, title, benefits }: {
  icon: React.ReactNode
  title: string
  benefits: string[]
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="text-amber-600 mb-4">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {benefits.map((b, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-green-500">✓</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}
