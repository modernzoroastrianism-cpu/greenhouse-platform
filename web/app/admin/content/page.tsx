'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, Image, Video, Edit, Eye, Trash2, Plus, 
  Clock, CheckCircle, Globe, Upload, FolderOpen, Search
} from 'lucide-react'

// Mock data
const pages = [
  { id: 1, name: 'Homepage', route: '/', status: 'published', lastUpdated: 'Feb 11, 2024', author: 'Admin' },
  { id: 2, name: 'How It Works', route: '/how-it-works', status: 'published', lastUpdated: 'Feb 10, 2024', author: 'Admin' },
  { id: 3, name: 'About', route: '/about', status: 'published', lastUpdated: 'Feb 8, 2024', author: 'Admin' },
  { id: 4, name: 'Food Crisis', route: '/food-crisis', status: 'published', lastUpdated: 'Feb 5, 2024', author: 'Admin' },
  { id: 5, name: 'Packages', route: '/packages', status: 'published', lastUpdated: 'Feb 11, 2024', author: 'Admin' },
  { id: 6, name: 'Compensation', route: '/compensation', status: 'published', lastUpdated: 'Feb 9, 2024', author: 'Admin' },
  { id: 7, name: 'Lifestyle', route: '/lifestyle', status: 'published', lastUpdated: 'Feb 7, 2024', author: 'Admin' },
  { id: 8, name: 'Agents', route: '/agents', status: 'published', lastUpdated: 'Feb 11, 2024', author: 'Admin' },
  { id: 9, name: 'Day in the Life', route: '/day-in-the-life', status: 'published', lastUpdated: 'Feb 6, 2024', author: 'Admin' },
  { id: 10, name: 'Acquisition', route: '/acquisition', status: 'published', lastUpdated: 'Feb 4, 2024', author: 'Admin' },
  { id: 11, name: 'My AI Partner', route: '/my-ai', status: 'published', lastUpdated: 'Feb 11, 2024', author: 'Admin' },
  { id: 12, name: 'Network', route: '/network', status: 'published', lastUpdated: 'Feb 11, 2024', author: 'Admin' },
  { id: 13, name: 'Dashboard', route: '/dashboard', status: 'published', lastUpdated: 'Feb 11, 2024', author: 'Admin' },
  { id: 14, name: 'Join', route: '/join', status: 'published', lastUpdated: 'Feb 10, 2024', author: 'Admin' },
  { id: 15, name: 'Marketplace', route: '/marketplace', status: 'published', lastUpdated: 'Feb 8, 2024', author: 'Admin' },
  { id: 16, name: 'Integrations', route: '/integrations', status: 'published', lastUpdated: 'Feb 9, 2024', author: 'Admin' },
  { id: 17, name: 'Team Setup', route: '/team-setup', status: 'published', lastUpdated: 'Feb 11, 2024', author: 'Admin' },
]

const blogPosts = [
  { id: 1, title: 'Welcome to AMNI', status: 'published', date: 'Feb 1, 2024', views: 1234 },
  { id: 2, title: 'How AI is Revolutionizing Urban Farming', status: 'published', date: 'Feb 5, 2024', views: 892 },
  { id: 3, title: 'Getting Started: Your First Week', status: 'draft', date: 'Feb 10, 2024', views: 0 },
  { id: 4, title: 'Success Story: From Balcony to Business', status: 'scheduled', date: 'Feb 15, 2024', views: 0 },
]

const mediaFiles = [
  { id: 1, name: 'hero-image.jpg', type: 'image', size: '2.4 MB', uploaded: 'Feb 1, 2024' },
  { id: 2, name: 'greenhouse-video.mp4', type: 'video', size: '45 MB', uploaded: 'Feb 3, 2024' },
  { id: 3, name: 'product-photo-1.jpg', type: 'image', size: '1.8 MB', uploaded: 'Feb 5, 2024' },
  { id: 4, name: 'infographic.png', type: 'image', size: '890 KB', uploaded: 'Feb 8, 2024' },
  { id: 5, name: 'testimonial-video.mp4', type: 'video', size: '32 MB', uploaded: 'Feb 10, 2024' },
]

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'pages' | 'blog' | 'media'>('pages')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-500">Manage pages, blog posts, and media</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus className="w-4 h-4" />
          {activeTab === 'pages' ? 'New Page' : activeTab === 'blog' ? 'New Post' : 'Upload'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('pages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === 'pages' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Pages ({pages.length})
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === 'blog' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Edit className="w-4 h-4" />
          Blog ({blogPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === 'media' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Image className="w-4 h-4" />
          Media ({mediaFiles.length})
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Page</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Route</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Last Updated</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((page) => (
                <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{page.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{page.route}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-emerald-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{page.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={page.route} target="_blank" className="p-1 hover:bg-gray-100 rounded" title="View">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Link>
                      <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                        <Edit className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Views</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((post) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{post.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                      post.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{post.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{post.views.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded" title="View">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                        <Edit className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div>
          {/* Upload Zone */}
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 mb-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <div className="text-gray-600 mb-1">Drop files here or click to upload</div>
            <div className="text-sm text-gray-400">PNG, JPG, GIF, MP4 up to 50MB</div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-5 gap-4">
            {mediaFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())).map((file) => (
              <div key={file.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  {file.type === 'image' ? (
                    <Image className="w-12 h-12 text-gray-300" />
                  ) : (
                    <Video className="w-12 h-12 text-gray-300" />
                  )}
                </div>
                <div className="p-3">
                  <div className="font-medium text-gray-900 text-sm truncate">{file.name}</div>
                  <div className="text-xs text-gray-500">{file.size}</div>
                </div>
                <div className="px-3 pb-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 px-2 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200">
                    Copy URL
                  </button>
                  <button className="p-1 bg-red-100 rounded hover:bg-red-200">
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage Stats */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Storage Used</span>
          <span className="text-sm text-gray-500">2.4 GB of 10 GB</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }} />
        </div>
      </div>
    </div>
  )
}
