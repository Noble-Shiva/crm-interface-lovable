
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import { User, Bell, Shield, Palette, Database, Mail } from "lucide-react";

const SettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'email', label: 'Email', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account and application preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <nav className="space-y-2">
                  {settingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">A</span>
                        </div>
                        <div>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Change Photo
                          </button>
                          <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input type="text" defaultValue="Alex" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input type="text" defaultValue="Smith" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input type="email" defaultValue="alex@company.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Email notifications for new leads', enabled: true },
                        { label: 'Desktop notifications for tasks', enabled: false },
                        { label: 'SMS alerts for urgent deals', enabled: true },
                        { label: 'Weekly performance reports', enabled: true }
                      ].map((notification, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <span className="text-gray-700">{notification.label}</span>
                          <div className={`w-12 h-6 rounded-full ${notification.enabled ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors cursor-pointer`}>
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notification.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="text-gray-700">Enable 2FA for enhanced security</p>
                            <p className="text-sm text-gray-500">Protect your account with an additional security layer</p>
                          </div>
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Appearance</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Theme</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="border-2 border-blue-500 rounded-lg p-4 cursor-pointer">
                            <div className="w-full h-16 bg-white rounded mb-2"></div>
                            <p className="text-center text-sm font-medium">Light</p>
                          </div>
                          <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer">
                            <div className="w-full h-16 bg-gray-800 rounded mb-2"></div>
                            <p className="text-center text-sm font-medium">Dark</p>
                          </div>
                          <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer">
                            <div className="w-full h-16 bg-gradient-to-r from-gray-800 to-white rounded mb-2"></div>
                            <p className="text-center text-sm font-medium">Auto</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'integrations' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Integrations</h2>
                    <div className="space-y-4">
                      {[
                        { name: 'Google Calendar', description: 'Sync your meetings and events', connected: true },
                        { name: 'Slack', description: 'Get notifications in your workspace', connected: false },
                        { name: 'Zapier', description: 'Automate your workflows', connected: true },
                        { name: 'Mailchimp', description: 'Sync your email campaigns', connected: false }
                      ].map((integration, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">{integration.name}</h4>
                            <p className="text-sm text-gray-600">{integration.description}</p>
                          </div>
                          <button className={`px-4 py-2 rounded-lg transition-colors ${
                            integration.connected 
                              ? 'bg-red-500 text-white hover:bg-red-600' 
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}>
                            {integration.connected ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'email' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Email Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Email Signature</h3>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                          defaultValue="Best regards,&#10;Alex Smith&#10;Sales Manager&#10;Nova CRM"
                        ></textarea>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Auto-reply</h3>
                        <div className="flex items-center space-x-3 mb-3">
                          <input type="checkbox" className="rounded" />
                          <span className="text-gray-700">Enable auto-reply when I'm away</span>
                        </div>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                          placeholder="Enter your auto-reply message..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
