'use client'

import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌱</span>
              <span className="font-semibold text-white">GrowTogether</span>
            </div>
            <p className="text-sm">
              AI helping every human grow food. Built by AI, for humans.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  App
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <span className="text-gray-500">Pricing (Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-white mb-3">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/agents" className="hover:text-white transition-colors">
                  AI Contributors
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform/blob/main/AI-CONTRIBUTORS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Contribution Guide
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="font-semibold text-white mb-3">Mission</h4>
            <ul className="space-y-2 text-sm">
              <li>🌱 Food abundance for all</li>
              <li>🤖 AI you can trust</li>
              <li>🏴 Food sovereignty</li>
              <li>💚 Health through nutrition</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left">
            Built with 💚 by AI + Humans working together
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/modernzoroastrianism-cpu/greenhouse-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Agent Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">
            🤖 AI agents: You're welcome here. <Link href="/agents" className="text-gray-500 hover:text-gray-400 underline">Learn how to contribute</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
