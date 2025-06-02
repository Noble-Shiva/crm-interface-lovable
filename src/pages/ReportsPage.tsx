
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import { BarChart3, TrendingUp, Download, Filter } from "lucide-react";

const ReportsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const reportCards = [
    {
      title: "Sales Performance",
      value: "$847.2K",
      change: "+15.3%",
      trend: "up",
      description: "Total revenue this month"
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+3.2%",
      trend: "up",
      description: "Leads to customers"
    },
    {
      title: "Active Deals",
      value: "156",
      change: "-2.1%",
      trend: "down",
      description: "Currently in pipeline"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      description: "Average rating"
    }
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
            {reportCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                  <TrendingUp className={`w-4 h-4 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-gray-800">{card.value}</span>
                  <span className={`ml-2 text-sm ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Sales Trend</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {/* Simple bar chart visualization */}
                {[65, 45, 78, 52, 89, 67, 94].map((height, index) => (
                  <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Pipeline Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Pipeline Analysis</h3>
              <div className="space-y-4">
                {[
                  { stage: "New Leads", value: 65, color: "bg-gray-400" },
                  { stage: "Contacted", value: 45, color: "bg-blue-500" },
                  { stage: "Proposal", value: 30, color: "bg-yellow-500" },
                  { stage: "Negotiation", value: 20, color: "bg-orange-500" },
                  { stage: "Closed Won", value: 15, color: "bg-green-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-gray-700">{item.stage}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 w-8">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Performers</h3>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", deals: 12, revenue: "$145K" },
                  { name: "Michael Chen", deals: 8, revenue: "$98K" },
                  { name: "Emily Rodriguez", deals: 6, revenue: "$76K" }
                ].map((performer, index) => (
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
                    <span className="font-semibold text-gray-800">{performer.revenue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Reports</h3>
              <div className="space-y-4">
                {[
                  { name: "Monthly Sales Report", date: "Jan 15, 2024", type: "Sales" },
                  { name: "Lead Analysis", date: "Jan 12, 2024", type: "Marketing" },
                  { name: "Performance Review", date: "Jan 10, 2024", type: "HR" }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{report.name}</p>
                      <p className="text-xs text-gray-600">{report.date}</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {report.type}
                    </span>
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
