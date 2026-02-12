'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: '📊 Dashboard' },
  { href: '/dashboard', label: '📊 Dashboard' },
  { 
    label: 'Learn',
    children: [
      { href: '/food-crisis', label: 'The Food Crisis' },
      { href: '/about', label: 'About AMNI' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/lifestyle', label: 'The Lifestyle' },
      { href: '/day-in-the-life', label: 'A Day in the Life' },
    ]
  },
  {
    label: 'Opportunity',
    children: [
      { href: '/compensation', label: 'Compensation Plan' },
      { href: '/packages', label: 'Packages' },
      { href: '/acquisition', label: 'Acquisition Fund' },
      { href: '/agents', label: 'Your AI Team' },
      { href: '/my-ai', label: '🎮 My AI Partner' },
      { href: '/network', label: '🌐 Agent Network' },
    ]
  },
  { href: '/marketplace', label: 'Marketplace' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold text-gray-900">AMNI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.children ? (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/packages"
              className="bg-emerald-600 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.label} className="py-2">
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {link.label}
                  </div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="px-4 pt-4">
              <Link
                href="/packages"
                className="block w-full bg-emerald-600 text-white px-5 py-3 rounded-full font-medium text-center hover:bg-emerald-700 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
