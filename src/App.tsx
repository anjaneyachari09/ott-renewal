import React, { useState } from 'react';
import { 
  Play, 
  Settings, 
  Bell, 
  User, 
  DollarSign, 
  TrendingUp, 
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Zap,
  Users,
  Calendar,
  GitBranch,
  Server,
  Monitor
} from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'expiring' | 'expired';
  renewalDate: string;
  cost: number;
  plan: string;
  autoRenewal: boolean;
  devopsStatus: 'deployed' | 'deploying' | 'failed';
}

interface Pipeline {
  id: string;
  name: string;
  status: 'success' | 'running' | 'failed';
  lastRun: string;
  duration: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Netflix',
      icon: '🎬',
      status: 'active',
      renewalDate: '2024-02-15',
      cost: 15.99,
      plan: 'Premium',
      autoRenewal: true,
      devopsStatus: 'deployed'
    },
    {
      id: '2',
      name: 'Disney+',
      icon: '🏰',
      status: 'expiring',
      renewalDate: '2024-01-20',
      cost: 7.99,
      plan: 'Standard',
      autoRenewal: false,
      devopsStatus: 'deploying'
    },
    {
      id: '3',
      name: 'Prime Video',
      icon: '📺',
      status: 'active',
      renewalDate: '2024-03-10',
      cost: 8.99,
      plan: 'Monthly',
      autoRenewal: true,
      devopsStatus: 'deployed'
    },
    {
      id: '4',
      name: 'HBO Max',
      icon: '🎭',
      status: 'expired',
      renewalDate: '2024-01-05',
      cost: 14.99,
      plan: 'Ad-Free',
      autoRenewal: false,
      devopsStatus: 'failed'
    }
  ];

  const pipelines: Pipeline[] = [
    {
      id: '1',
      name: 'Netflix Integration',
      status: 'success',
      lastRun: '2 mins ago',
      duration: '1m 23s'
    },
    {
      id: '2',
      name: 'Payment Processing',
      status: 'running',
      lastRun: '5 mins ago',
      duration: '0m 45s'
    },
    {
      id: '3',
      name: 'Notification Service',
      status: 'success',
      lastRun: '1 hour ago',
      duration: '2m 15s'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
      case 'deployed':
        return 'text-green-600 bg-green-100';
      case 'expiring':
      case 'running':
      case 'deploying':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired':
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
      case 'deployed':
        return <CheckCircle className="w-4 h-4" />;
      case 'expiring':
      case 'running':
      case 'deploying':
        return <Clock className="w-4 h-4" />;
      case 'expired':
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const totalCost = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const expiringSubscriptions = subscriptions.filter(sub => sub.status === 'expiring').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StreamOps
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Monitor },
              { id: 'subscriptions', label: 'Subscriptions', icon: Play },
              { id: 'devops', label: 'DevOps', icon: GitBranch },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
                    <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-green-600">{activeSubscriptions}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                    <p className="text-2xl font-bold text-yellow-600">{expiringSubscriptions}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                    <p className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { action: 'Netflix subscription renewed automatically', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
                    { action: 'Disney+ renewal reminder sent', time: '4 hours ago', icon: Bell, color: 'text-blue-600' },
                    { action: 'HBO Max subscription expired', time: '1 day ago', icon: XCircle, color: 'text-red-600' },
                    { action: 'Prime Video pipeline deployed successfully', time: '2 days ago', icon: Zap, color: 'text-green-600' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {/* Subscription Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{subscription.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{subscription.name}</h3>
                          <p className="text-sm text-gray-500">{subscription.plan}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(subscription.status)}`}>
                        {getStatusIcon(subscription.status)}
                        <span className="capitalize">{subscription.status}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Renewal Date</span>
                        <span className="text-sm font-medium">{subscription.renewalDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Monthly Cost</span>
                        <span className="text-sm font-medium">${subscription.cost}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Auto Renewal</span>
                        <div className={`w-8 h-4 rounded-full transition-colors ${subscription.autoRenewal ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${subscription.autoRenewal ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">DevOps Status</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(subscription.devopsStatus)}`}>
                          {getStatusIcon(subscription.devopsStatus)}
                          <span className="capitalize">{subscription.devopsStatus}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        Renew Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'devops' && (
          <div className="space-y-6">
            {/* Pipeline Status */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">CI/CD Pipelines</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pipelines.map((pipeline) => (
                    <div key={pipeline.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${getStatusColor(pipeline.status)}`}>
                          {getStatusIcon(pipeline.status)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{pipeline.name}</h4>
                          <p className="text-sm text-gray-500">Last run: {pipeline.lastRun}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{pipeline.duration}</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deployment Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Infrastructure Status</h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { name: 'Production Environment', status: 'Healthy', uptime: '99.9%' },
                    { name: 'Staging Environment', status: 'Healthy', uptime: '99.5%' },
                    { name: 'Database Cluster', status: 'Healthy', uptime: '99.8%' },
                    { name: 'Load Balancer', status: 'Warning', uptime: '98.2%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Server className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{item.uptime}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Healthy' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Deployments</h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { version: 'v2.1.3', environment: 'Production', status: 'Success', time: '2 hours ago' },
                    { version: 'v2.1.2', environment: 'Staging', status: 'Success', time: '4 hours ago' },
                    { version: 'v2.1.1', environment: 'Development', status: 'Success', time: '6 hours ago' },
                    { version: 'v2.1.0', environment: 'Production', status: 'Failed', time: '1 day ago' }
                  ].map((deployment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{deployment.version}</p>
                        <p className="text-xs text-gray-500">{deployment.environment}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">{deployment.time}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deployment.status.toLowerCase())}`}>
                          {deployment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Cost Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Spending</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {subscriptions.map((sub, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{sub.icon}</span>
                          <span className="text-sm font-medium text-gray-900">{sub.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                              style={{ width: `${(sub.cost / Math.max(...subscriptions.map(s => s.cost))) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">${sub.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Usage Metrics</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Renewal Success Rate</span>
                        <span className="text-sm font-medium text-green-600">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Auto-Renewal Coverage</span>
                        <span className="text-sm font-medium text-blue-600">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Cost Optimization</span>
                        <span className="text-sm font-medium text-purple-600">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trends */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Subscription Trends</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">23%</p>
                    <p className="text-sm text-gray-600">Cost Savings</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-sm text-gray-600">User Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">99.5%</p>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;