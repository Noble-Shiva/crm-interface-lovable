
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import { User, Bell, Shield, Palette, Database, Mail, Save, Upload, Eye, EyeOff } from "lucide-react";

const SettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Smith",
    email: "alex@company.com",
    phone: "+1 (555) 123-4567",
    company: "Nova CRM",
    position: "Sales Manager",
    bio: "Experienced sales manager with 5+ years in CRM solutions."
  });

  const [notifications, setNotifications] = useState({
    emailLeads: true,
    desktopTasks: false,
    smsDeals: true,
    weeklyReports: true,
    pushNotifications: true,
    marketingEmails: false
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'email', label: 'Email', icon: Mail }
  ];

  const handleProfileSave = () => {
    console.log('Profile saved:', profileData);
    // Here you would typically save to your backend
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
                          <span className="text-white text-2xl font-bold">
                            {profileData.firstName[0]}{profileData.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                            <Upload className="w-4 h-4" />
                            <span>Change Photo</span>
                          </button>
                          <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input 
                            type="text" 
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input 
                            type="text" 
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input 
                            type="email" 
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input 
                            type="tel" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                          <input 
                            type="text" 
                            value={profileData.company}
                            onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                          <input 
                            type="text" 
                            value={profileData.position}
                            onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea 
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      
                      <button 
                        onClick={handleProfileSave}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { key: 'emailLeads', label: 'Email notifications for new leads', description: 'Get notified when new leads are added' },
                        { key: 'desktopTasks', label: 'Desktop notifications for tasks', description: 'Browser notifications for task updates' },
                        { key: 'smsDeals', label: 'SMS alerts for urgent deals', description: 'Text message alerts for high-priority deals' },
                        { key: 'weeklyReports', label: 'Weekly performance reports', description: 'Receive weekly summary reports via email' },
                        { key: 'pushNotifications', label: 'Push notifications', description: 'Mobile app push notifications' },
                        { key: 'marketingEmails', label: 'Marketing emails', description: 'Product updates and promotional content' }
                      ].map((notification) => (
                        <div key={notification.key} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-700">{notification.label}</p>
                            <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationToggle(notification.key)}
                            className={`w-12 h-6 rounded-full ${notifications[notification.key] ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors cursor-pointer ml-4`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications[notification.key] ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                          </button>
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
                            <div className="relative">
                              <input 
                                type={showPassword ? "text" : "password"} 
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
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
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <p className="text-gray-700 font-medium">Enable 2FA</p>
                              <p className="text-sm text-gray-500">Protect your account with an additional security layer</p>
                            </div>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                              Enable
                            </button>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Login Sessions</h4>
                            <div className="space-y-2">
                              {[
                                { device: "MacBook Pro", location: "New York, NY", time: "2 hours ago", current: true },
                                { device: "iPhone 13", location: "New York, NY", time: "1 day ago", current: false },
                                { device: "Chrome on Windows", location: "Boston, MA", time: "3 days ago", current: false }
                              ].map((session, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                  <div>
                                    <p className="font-medium text-gray-700">{session.device}</p>
                                    <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {session.current && (
                                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Current</span>
                                    )}
                                    {!session.current && (
                                      <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
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
                            <div className="w-full h-16 bg-white rounded mb-2 border"></div>
                            <p className="text-center text-sm font-medium">Light</p>
                          </div>
                          <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                            <div className="w-full h-16 bg-gray-800 rounded mb-2"></div>
                            <p className="text-center text-sm font-medium">Dark</p>
                          </div>
                          <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                            <div className="w-full h-16 bg-gradient-to-r from-gray-800 to-white rounded mb-2"></div>
                            <p className="text-center text-sm font-medium">Auto</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Display Options</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-700">Compact mode</p>
                              <p className="text-sm text-gray-500">Reduce spacing and padding</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-gray-300 relative transition-colors cursor-pointer">
                              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-0.5"></div>
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-700">High contrast</p>
                              <p className="text-sm text-gray-500">Enhance visibility and readability</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-gray-300 relative transition-colors cursor-pointer">
                              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-0.5"></div>
                            </button>
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
                        { name: 'Google Calendar', description: 'Sync your meetings and events', connected: true, logo: '📅' },
                        { name: 'Slack', description: 'Get notifications in your workspace', connected: false, logo: '💬' },
                        { name: 'Zapier', description: 'Automate your workflows', connected: true, logo: '⚡' },
                        { name: 'Mailchimp', description: 'Sync your email campaigns', connected: false, logo: '📧' },
                        { name: 'HubSpot', description: 'Import contacts and deals', connected: false, logo: '🎯' },
                        { name: 'Salesforce', description: 'Migrate data from Salesforce', connected: true, logo: '☁️' }
                      ].map((integration, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                              {integration.logo}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{integration.name}</h4>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {integration.connected && (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Connected</span>
                            )}
                            <button className={`px-4 py-2 rounded-lg transition-colors ${
                              integration.connected 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}>
                              {integration.connected ? 'Disconnect' : 'Connect'}
                            </button>
                          </div>
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
                          defaultValue="Best regards,&#10;Alex Smith&#10;Sales Manager&#10;Nova CRM&#10;Email: alex@company.com&#10;Phone: +1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Auto-reply</h3>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-gray-700">Enable auto-reply when I'm away</span>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-reply message</label>
                            <textarea 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                              placeholder="Thank you for your email. I'm currently out of office and will respond when I return..."
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Email Templates</h3>
                        <div className="space-y-3">
                          {[
                            { name: "Welcome Email", subject: "Welcome to our service!", usage: "12 times" },
                            { name: "Follow-up", subject: "Following up on our conversation", usage: "8 times" },
                            { name: "Proposal", subject: "Your custom proposal is ready", usage: "15 times" }
                          ].map((template, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-800">{template.name}</p>
                                <p className="text-sm text-gray-600">{template.subject}</p>
                                <p className="text-xs text-gray-500">Used {template.usage}</p>
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                                <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Add New Template
                        </button>
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
