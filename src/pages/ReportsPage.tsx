
import { useState } from "react";
import { useCRMStore } from "@/store/crmStore";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import { BarChart3, TrendingUp, Download, Filter, DollarSign, Users, Target, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";

const ReportsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeFilter, setTimeFilter] = useState("month");

  const { contacts, deals, tasks } = useCRMStore();

  const reportCards = [
    {
      title: "Total Revenue",
      value: `$${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}`,
      change: "+15.3%",
      trend: "up",
      description: "Pipeline value",
      icon: DollarSign
    },
    {
      title: "Active Contacts",
      value: contacts.length.toString(),
      change: "+8.2%",
      trend: "up",
      description: "Total contacts",
      icon: Users
    },
    {
      title: "Deals Closed",
      value: deals.filter(d => d.stage === 'Closed').length.toString(),
      change: "+12.1%",
      trend: "up",
      description: "This month",
      icon: Target
    },
    {
      title: "Tasks Completed",
      value: tasks.filter(t => t.status === 'Done').length.toString(),
      change: "+5.7%",
      trend: "up",
      description: "This month",
      icon: Calendar
    }
  ];

  // Sales data for charts
  const salesData = [
    { month: 'Jan', revenue: 45000, deals: 12 },
    { month: 'Feb', revenue: 52000, deals: 15 },
    { month: 'Mar', revenue: 48000, deals: 11 },
    { month: 'Apr', revenue: 61000, deals: 18 },
    { month: 'May', revenue: 55000, deals: 14 },
    { month: 'Jun', revenue: 67000, deals: 19 }
  ];

  // Deal stage distribution
  const stageData = [
    { name: 'New', value: deals.filter(d => d.stage === 'New').length, color: '#8884d8' },
    { name: 'Contacted', value: deals.filter(d => d.stage === 'Contacted').length, color: '#82ca9d' },
    { name: 'Proposal', value: deals.filter(d => d.stage === 'Proposal').length, color: '#ffc658' },
    { name: 'Negotiation', value: deals.filter(d => d.stage === 'Negotiation').length, color: '#ff7300' },
    { name: 'Closed', value: deals.filter(d => d.stage === 'Closed').length, color: '#00C49F' }
  ];

  // Task completion data
  const taskData = [
    { status: 'To Do', count: tasks.filter(t => t.status === 'To Do').length },
    { status: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length },
    { status: 'Review', count: tasks.filter(t => t.status === 'Review').length },
    { status: 'Done', count: tasks.filter(t => t.status === 'Done').length }
  ];

  const topPerformers = [
    { name: "Sarah Johnson", deals: 12, revenue: 145000 },
    { name: "Michael Chen", deals: 8, revenue: 98000 },
    { name: "Emily Rodriguez", deals: 6, revenue: 76000 },
    { name: "Alex Smith", deals: 4, revenue: 52000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Track your business performance and insights</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {reportCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                    <Icon className={`w-6 h-6 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-gray-800">{card.value}</span>
                    <span className={`ml-2 text-sm ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {card.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{card.description}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Revenue Trend</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Deal Pipeline Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Deal Pipeline Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Task Completion Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Task Completion</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Deals Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Deals Closed</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="deals" stroke="#8B5CF6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Performers</h3>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{performer.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{performer.name}</p>
                        <p className="text-xs text-gray-600">{performer.deals} deals closed</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-800">${performer.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Reports</h3>
              <div className="space-y-4">
                {[
                  { name: "Monthly Sales Report", date: "Jan 15, 2024", type: "Sales", status: "Generated" },
                  { name: "Lead Analysis", date: "Jan 12, 2024", type: "Marketing", status: "Generated" },
                  { name: "Performance Review", date: "Jan 10, 2024", type: "HR", status: "Generated" },
                  { name: "Customer Satisfaction", date: "Jan 08, 2024", type: "Support", status: "Pending" }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{report.name}</p>
                      <p className="text-xs text-gray-600">{report.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {report.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        report.status === 'Generated' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
