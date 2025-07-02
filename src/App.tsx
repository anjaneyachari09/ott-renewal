import React, { useState } from 'react'
import { Play, Calendar, DollarSign, Users, Star, Clock } from 'lucide-react'

interface OTTApp {
  id: string
  name: string
  logo: string
  category: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  nextRenewal: string
  status: 'active' | 'expired' | 'trial'
  rating: number
  subscribers: string
  description: string
  features: string[]
}

const ottApps: OTTApp[] = [
  {
    id: '1',
    name: 'Netflix',
    logo: '🎬',
    category: 'Entertainment',
    price: 15.49,
    billingCycle: 'monthly',
    nextRenewal: '2024-02-15',
    status: 'active',
    rating: 4.5,
    subscribers: '260M',
    description: 'Stream movies, TV shows and Netflix Originals',
    features: ['4K Ultra HD', 'Multiple Profiles', 'Offline Downloads', 'No Ads']
  },
  {
    id: '2',
    name: 'Disney+',
    logo: '🏰',
    category: 'Family',
    price: 10.99,
    billingCycle: 'monthly',
    nextRenewal: '2024-02-20',
    status: 'active',
    rating: 4.8,
    subscribers: '150M',
    description: 'Disney, Pixar, Marvel, Star Wars & National Geographic',
    features: ['Family Friendly', '4K Content', 'GroupWatch', 'IMAX Enhanced']
  },
  {
    id: '3',
    name: 'Amazon Prime',
    logo: '📦',
    category: 'Entertainment',
    price: 14.98,
    billingCycle: 'monthly',
    nextRenewal: '2024-02-10',
    status: 'active',
    rating: 4.3,
    subscribers: '200M',
    description: 'Prime Video + Free shipping + Music + More',
    features: ['Prime Shipping', 'Prime Music', 'Prime Reading', 'Exclusive Content']
  },
  {
    id: '4',
    name: 'HBO Max',
    logo: '🎭',
    category: 'Premium',
    price: 16.99,
    billingCycle: 'monthly',
    nextRenewal: '2024-01-28',
    status: 'expired',
    rating: 4.6,
    subscribers: '95M',
    description: 'HBO Originals, blockbuster movies, and more',
    features: ['Same-day Movie Releases', 'HBO Originals', '4K Content', 'Ad-free']
  },
  {
    id: '5',
    name: 'Spotify Premium',
    logo: '🎵',
    category: 'Music',
    price: 10.99,
    billingCycle: 'monthly',
    nextRenewal: '2024-02-12',
    status: 'active',
    rating: 4.4,
    subscribers: '220M',
    description: 'Music streaming with premium features',
    features: ['Ad-free Music', 'Offline Downloads', 'High Quality Audio', 'Unlimited Skips']
  },
  {
    id: '6',
    name: 'YouTube Premium',
    logo: '📺',
    category: 'Video',
    price: 13.99,
    billingCycle: 'monthly',
    nextRenewal: '2024-02-25',
    status: 'trial',
    rating: 4.2,
    subscribers: '80M',
    description: 'Ad-free YouTube + YouTube Music + Background play',
    features: ['No Ads', 'Background Play', 'YouTube Music', 'Offline Videos']
  },
  {
    id: '7',
    name: 'Apple TV+',
    logo: '🍎',
    category: 'Entertainment',
    price: 6.99,
    billingCycle: 'monthly',
    nextRenewal: '2024-02-18',
    status: 'active',
    rating: 4.1,
    subscribers: '40M',
    description: 'Apple Original shows and movies',
    features: ['Apple Originals', '4K HDR', 'Dolby Atmos', 'Family Sharing']
  },
  {
    id: '8',
    name: 'Hulu',
    logo: '🟢',
    category: 'Entertainment',
    price: 17.99,
    billingCycle: 'monthly',
    nextRenewal: '2024-02-08',
    status: 'active',
    rating: 4.0,
    subscribers: '48M',
    description: 'Current TV shows, movies and Hulu Originals',
    features: ['Next-day TV', 'Live TV Option', 'Hulu Originals', 'Multiple Profiles']
  }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(ottApps.map(app => app.category)))]
  const statuses = ['all', 'active', 'expired', 'trial']

  const filteredApps = ottApps.filter(app => {
    const categoryMatch = selectedCategory === 'all' || app.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || app.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'trial': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />
      case 'expired': return <Clock className="w-4 h-4" />
      case 'trial': return <Star className="w-4 h-4" />
      default: return null
    }
  }

  const totalMonthlySpend = ottApps
    .filter(app => app.status === 'active')
    .reduce((sum, app) => sum + app.price, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">OTT Subscription Manager</h1>
              <p className="text-gray-600 mt-1">Manage all your streaming subscriptions in one place</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">${totalMonthlySpend.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Monthly spend</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredApps.map(app => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{app.logo}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-500">{app.category}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    <span>{app.status}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{app.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{app.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{app.subscribers}</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-gray-900">${app.price}</span>
                    <span className="text-sm text-gray-500">/{app.billingCycle}</span>
                  </div>
                  {app.status === 'active' && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{app.nextRenewal}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {app.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {app.features.length > 2 && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{app.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {app.status === 'active' && (
                    <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Manage
                    </button>
                  )}
                  {app.status === 'expired' && (
                    <button className="flex-1 bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Renew
                    </button>
                  )}
                  {app.status === 'trial' && (
                    <button className="flex-1 bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Subscribe
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📱</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No apps found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App