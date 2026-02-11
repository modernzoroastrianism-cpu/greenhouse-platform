'use client'

import { Search, MapPin, Filter, Star, Leaf, Clock, Truck, ShoppingBag, Heart, ChefHat, Package, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold text-gray-900">AMNI</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Marketplace</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Toronto, ON</span>
              </button>
              <button className="relative">
                <ShoppingBag className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search local produce, meal kits, preserves..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <CategoryPill active={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>
              All
            </CategoryPill>
            <CategoryPill active={activeCategory === 'produce'} onClick={() => setActiveCategory('produce')}>
              🥬 Fresh Produce
            </CategoryPill>
            <CategoryPill active={activeCategory === 'preserved'} onClick={() => setActiveCategory('preserved')}>
              🫙 Preserved
            </CategoryPill>
            <CategoryPill active={activeCategory === 'meals'} onClick={() => setActiveCategory('meals')}>
              🍽️ Meal Kits
            </CategoryPill>
            <CategoryPill active={activeCategory === 'subscriptions'} onClick={() => setActiveCategory('subscriptions')}>
              📦 Subscriptions
            </CategoryPill>
            <CategoryPill active={activeCategory === 'experiences'} onClick={() => setActiveCategory('experiences')}>
              👨‍🍳 Experiences
            </CategoryPill>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">Fresh from your neighbors</h1>
            <p className="text-emerald-100 mb-4">
              Local produce from AMNI producers in your area. Grown with care, delivered fresh.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Truck className="w-4 h-4" />
                Free delivery over $35
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                Same-day pickup available
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Leaf className="w-4 h-4" />
                100% local producers
              </span>
            </div>
          </div>
        </div>

        {/* Subscriptions Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📦 Subscription Boxes</h2>
            <Link href="/subscriptions" className="text-emerald-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <SubscriptionCard
              name="Weekly Essentials"
              price={29}
              frequency="week"
              description="Seasonal mix of vegetables, greens, and herbs from local producers"
              items={['5-7 types of vegetables', 'Fresh herbs', 'Recipe cards']}
              image="🥬"
            />
            <SubscriptionCard
              name="Family Box"
              price={49}
              frequency="week"
              description="Feeds a family of 4. Variety of produce plus preserved goods"
              items={['10+ types of produce', 'Preserves & sauces', 'Meal suggestions']}
              image="👨‍👩‍👧‍👦"
              popular
            />
            <SubscriptionCard
              name="Preserver's Box"
              price={39}
              frequency="month"
              description="Jams, pickles, sauces, and fermented foods from local producers"
              items={['4-6 preserved items', 'Seasonal rotation', 'Producer stories']}
              image="🫙"
            />
          </div>
        </section>

        {/* Meal Kits Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🍽️ Meal Kits</h2>
            <Link href="/meal-kits" className="text-emerald-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <MealKitCard
              name="Garden Fresh Salad Kit"
              producer="Sarah's Greenhouse"
              price={15}
              servings={2}
              time={15}
              image="🥗"
            />
            <MealKitCard
              name="Stir Fry Night"
              producer="Urban Roots Co-op"
              price={22}
              servings={4}
              time={25}
              image="🥘"
            />
            <MealKitCard
              name="Pasta Primavera"
              producer="Valley Farms"
              price={18}
              servings={3}
              time={30}
              image="🍝"
            />
            <MealKitCard
              name="Buddha Bowl"
              producer="Green Thumb Collective"
              price={16}
              servings={2}
              time={20}
              image="🥙"
            />
          </div>
        </section>

        {/* Fresh Produce Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🥬 Fresh Produce</h2>
            <Link href="/produce" className="text-emerald-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <ProduceCard name="Tomatoes" producer="Mike's Garden" price={4.99} unit="lb" distance={0.8} image="🍅" />
            <ProduceCard name="Lettuce Mix" producer="Sarah's Greenhouse" price={3.99} unit="bag" distance={1.2} image="🥬" />
            <ProduceCard name="Cucumbers" producer="Urban Roots" price={2.49} unit="each" distance={0.5} image="🥒" />
            <ProduceCard name="Bell Peppers" producer="Valley Farms" price={1.99} unit="each" distance={2.1} image="🫑" />
            <ProduceCard name="Fresh Herbs" producer="Herb Haven" price={2.99} unit="bunch" distance={1.5} image="🌿" />
            <ProduceCard name="Zucchini" producer="Green Thumb" price={2.99} unit="lb" distance={0.9} image="🥒" />
            <ProduceCard name="Kale" producer="Sarah's Greenhouse" price={3.49} unit="bunch" distance={1.2} image="🥬" />
            <ProduceCard name="Carrots" producer="Root Farm" price={3.99} unit="bunch" distance={3.2} image="🥕" />
            <ProduceCard name="Spinach" producer="Urban Roots" price={4.49} unit="bag" distance={0.5} image="🌱" />
            <ProduceCard name="Green Beans" producer="Mike's Garden" price={4.99} unit="lb" distance={0.8} image="🫛" />
          </div>
        </section>

        {/* Preserved Goods Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🫙 Preserved Goods</h2>
            <Link href="/preserved" className="text-emerald-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PreservedCard name="Strawberry Jam" producer="Berry Lane" price={8.99} size="250ml" image="🍓" />
            <PreservedCard name="Dill Pickles" producer="Pickle House" price={6.99} size="500ml" image="🥒" />
            <PreservedCard name="Tomato Sauce" producer="Nonna's Kitchen" price={7.99} size="750ml" image="🍅" />
            <PreservedCard name="Hot Sauce" producer="Fire Garden" price={9.99} size="150ml" image="🌶️" />
            <PreservedCard name="Apple Butter" producer="Orchard View" price={7.49} size="300ml" image="🍎" />
            <PreservedCard name="Sauerkraut" producer="Ferment Lab" price={6.99} size="500ml" image="🥬" />
            <PreservedCard name="Peach Preserves" producer="Valley Farms" price={8.49} size="250ml" image="🍑" />
            <PreservedCard name="Kimchi" producer="Seoul Garden" price={8.99} size="500ml" image="🥬" />
          </div>
        </section>

        {/* Experiences Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">👨‍🍳 Experiences</h2>
            <Link href="/experiences" className="text-emerald-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ExperienceCard
              title="Sunday Dinner at the Johnsons"
              host="The Johnson Family"
              date="Sun, Feb 16"
              time="5:00 PM"
              guests={8}
              spotsLeft={3}
              price={25}
              description="Farm-to-table dinner featuring our greenhouse harvest. Bring your appetite!"
              menu={['Garden salad', 'Roasted vegetables', 'Fresh bread', 'Seasonal dessert']}
            />
            <ExperienceCard
              title="Canning Workshop"
              host="Maria's Preserves"
              date="Sat, Feb 22"
              time="2:00 PM"
              guests={6}
              spotsLeft={2}
              price={45}
              description="Learn to can tomatoes, make jam, and preserve your harvest. Take home what you make!"
              menu={['Hands-on instruction', 'All supplies included', 'Take home 3 jars']}
            />
          </div>
        </section>

        {/* Local Producers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🌱 Featured Producers</h2>
            <Link href="/producers" className="text-emerald-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <ProducerCard
              name="Sarah's Greenhouse"
              specialty="Greens & Herbs"
              distance={1.2}
              rating={4.9}
              products={23}
            />
            <ProducerCard
              name="Urban Roots Co-op"
              specialty="Mixed Vegetables"
              distance={0.5}
              rating={4.8}
              products={45}
            />
            <ProducerCard
              name="Valley Farms"
              specialty="Tomatoes & Peppers"
              distance={2.1}
              rating={4.7}
              products={18}
            />
            <ProducerCard
              name="Pickle House"
              specialty="Fermented Foods"
              distance={1.8}
              rating={5.0}
              products={12}
            />
          </div>
        </section>

        {/* Become a Producer CTA */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Want to sell on AMNI?</h2>
          <p className="text-amber-100 mb-6 max-w-xl mx-auto">
            Get a growing package. Your AI helps you grow. AMNI handles the rest — legal, insurance, sales.
          </p>
          <Link href="/packages" className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50">
            Become a Producer
            <Leaf className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>🌱 AMNI Marketplace — Local food from local producers</p>
        </div>
      </footer>
    </div>
  )
}

function CategoryPill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        active 
          ? 'bg-emerald-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

function SubscriptionCard({ name, price, frequency, description, items, image, popular }: {
  name: string
  price: number
  frequency: string
  description: string
  items: string[]
  image: string
  popular?: boolean
}) {
  return (
    <div className={`bg-white rounded-2xl p-6 border-2 ${popular ? 'border-emerald-500' : 'border-gray-100'} relative`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <div className="text-4xl mb-4">{image}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
      <div className="text-2xl font-bold text-emerald-600 mb-2">
        ${price}<span className="text-sm font-normal text-gray-500">/{frequency}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <ul className="space-y-1 mb-4">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
        Subscribe
      </button>
    </div>
  )
}

function MealKitCard({ name, producer, price, servings, time, image }: {
  name: string
  producer: string
  price: number
  servings: number
  time: number
  image: string
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="h-24 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-5xl">
        {image}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-xs text-gray-500 mb-2">{producer}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-emerald-600">${price}</span>
          <span className="text-gray-500">{servings} servings · {time}min</span>
        </div>
      </div>
    </div>
  )
}

function ProduceCard({ name, producer, price, unit, distance, image }: {
  name: string
  producer: string
  price: number
  unit: string
  distance: number
  image: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-4xl mb-2 text-center">{image}</div>
      <h3 className="font-medium text-gray-900 text-sm">{name}</h3>
      <p className="text-xs text-gray-500 mb-2">{producer}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-emerald-600">${price.toFixed(2)}<span className="text-xs font-normal text-gray-500">/{unit}</span></span>
        <span className="text-xs text-gray-400">{distance}km</span>
      </div>
    </div>
  )
}

function PreservedCard({ name, producer, price, size, image }: {
  name: string
  producer: string
  price: number
  size: string
  image: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-4xl mb-2 text-center">{image}</div>
      <h3 className="font-medium text-gray-900 text-sm">{name}</h3>
      <p className="text-xs text-gray-500 mb-2">{producer} · {size}</p>
      <span className="font-bold text-emerald-600">${price.toFixed(2)}</span>
    </div>
  )
}

function ExperienceCard({ title, host, date, time, guests, spotsLeft, price, description, menu }: {
  title: string
  host: string
  date: string
  time: string
  guests: number
  spotsLeft: number
  price: number
  description: string
  menu: string[]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{host}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-600">${price}</div>
          <div className="text-xs text-gray-500">per person</div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {date} · {time}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {guests} guests · {spotsLeft} spots left
        </span>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="text-xs font-medium text-gray-500 mb-2">MENU</div>
        <div className="flex flex-wrap gap-2">
          {menu.map((item, i) => (
            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
              {item}
            </span>
          ))}
        </div>
      </div>
      
      <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
        Reserve Spot
      </button>
    </div>
  )
}

function ProducerCard({ name, specialty, distance, rating, products }: {
  name: string
  specialty: string
  distance: number
  rating: number
  products: number
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mb-3">
        🌱
      </div>
      <h3 className="font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500 mb-2">{specialty}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          {rating}
        </span>
        <span className="text-gray-400">{distance}km · {products} items</span>
      </div>
    </div>
  )
}
