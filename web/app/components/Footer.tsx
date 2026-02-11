'use client'

import Link from 'next/link'

const footerLinks = {
  learn: [
    { href: '/food-crisis', label: 'The Food Crisis' },
    { href: '/about', label: 'About AMNI' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/lifestyle', label: 'The Lifestyle' },
    { href: '/day-in-the-life', label: 'A Day in the Life' },
  ],
  opportunity: [
    { href: '/compensation', label: 'Compensation Plan' },
    { href: '/packages', label: 'Packages' },
    { href: '/acquisition', label: 'Acquisition Fund' },
    { href: '/agents', label: 'Your AI Team' },
    { href: '/marketplace', label: 'Marketplace' },
  ],
  resources: [
    { href: '#', label: 'Blog (Coming Soon)' },
    { href: '#', label: 'FAQ (Coming Soon)' },
    { href: '#', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold text-white">AMNI</span>
            </Link>
            <p className="text-sm">
              As Mother Nature Intended
            </p>
            <p className="text-sm mt-2">
              AI-powered food production for everyone.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-white font-semibold mb-4">Learn</h4>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunity */}
          <div>
            <h4 className="text-white font-semibold mb-4">Opportunity</h4>
            <ul className="space-y-2">
              {footerLinks.opportunity.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} AMNI — As Mother Nature Intended. All rights reserved.
            </p>
            <p className="text-xs text-center md:text-right text-gray-500">
              Earnings vary based on individual effort and production volume.
              <br className="hidden md:block" />
              See our Income Disclosure Statement for typical participant earnings.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
