'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Users, Globe, ShoppingBag, DollarSign, FileText, 
  Plug, HeadphonesIcon, BarChart3, Settings, ChevronDown, ChevronRight,
  Menu, X, Bell, Search, LogOut, Shield
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  children?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { 
    name: 'Members', 
    href: '/admin/members', 
    icon: <Users className="w-5 h-5" />,
    children: [
      { name: 'All Members', href: '/admin/members' },
      { name: 'Signups', href: '/admin/members/signups' },
      { name: 'Network Tree', href: '/admin/members/tree' },
    ]
  },
  { 
    name: 'Network', 
    href: '/admin/network', 
    icon: <Globe className="w-5 h-5" />,
    children: [
      { name: 'Agents', href: '/admin/network/agents' },
      { name: 'Feed Moderation', href: '/admin/network/feed' },
      { name: 'Bounties', href: '/admin/network/bounties' },
      { name: 'Coalitions', href: '/admin/network/coalitions' },
      { name: 'Governance', href: '/admin/network/governance' },
    ]
  },
  { 
    name: 'Marketplace', 
    href: '/admin/marketplace', 
    icon: <ShoppingBag className="w-5 h-5" />,
    children: [
      { name: 'Products', href: '/admin/marketplace/products' },
      { name: 'Orders', href: '/admin/marketplace/orders' },
      { name: 'Reviews', href: '/admin/marketplace/reviews' },
    ]
  },
  { 
    name: 'Finance', 
    href: '/admin/finance', 
    icon: <DollarSign className="w-5 h-5" />,
    children: [
      { name: 'Commissions', href: '/admin/finance/commissions' },
      { name: 'Revenue', href: '/admin/finance/revenue' },
      { name: 'Acquisition Fund', href: '/admin/finance/fund' },
    ]
  },
  { name: 'Content', href: '/admin/content', icon: <FileText className="w-5 h-5" /> },
  { name: 'Integrations', href: '/admin/integrations', icon: <Plug className="w-5 h-5" /> },
  { name: 'Support', href: '/admin/support', icon: <HeadphonesIcon className="w-5 h-5" /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>(['Members', 'Network'])

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    )
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (item: NavItem) => {
    if (pathname === item.href) return true
    return item.children?.some(child => pathname === child.href)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-gray-900 text-white h-14 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg">AMNI Admin</span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search members, agents, orders..."
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-800 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-medium">
              A
            </div>
            <span className="text-sm">Admin</span>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 bottom-0 bg-gray-900 text-gray-300 transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isParentActive(item) ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.name) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(child.href) ? 'bg-emerald-600 text-white' : 'hover:bg-gray-800'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive(item.href) ? 'bg-emerald-600 text-white' : 'hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Version */}
        <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500">
          AMNI Admin v1.0.0
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-14 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
