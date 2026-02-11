'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Info, Cog, Bot, Github, Phone, ExternalLink } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'App', icon: <Home className="w-4 h-4" /> },
    { href: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { href: '/how-it-works', label: 'How It Works', icon: <Cog className="w-4 h-4" /> },
    { href: '/agents', label: 'AI Contributors', icon: <Bot className="w-4 h-4" /> },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-semibold text-gray-900">GrowTogether</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-greenhouse-100 text-greenhouse-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <button className="flex items-center gap-1.5 bg-greenhouse-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-greenhouse-600 transition-colors">
              <Phone className="w-4 h-4" />
              Call Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-greenhouse-100 text-greenhouse-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-gray-100" />
              <a
                href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <button className="w-full flex items-center justify-center gap-2 bg-greenhouse-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-greenhouse-600 transition-colors mt-2">
                <Phone className="w-4 h-4" />
                Call Your AI Gardener
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
