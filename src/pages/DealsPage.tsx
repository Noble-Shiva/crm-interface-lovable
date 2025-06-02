
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import { Plus, Filter, DollarSign, Calendar, User } from "lucide-react";

const DealsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const dealColumns = [
    { id: 'new', title: 'New', color: 'bg-gray-100' },
    { id: 'contacted', title: 'Contacted', color: 'bg-blue-100' },
    { id: 'proposal', title: 'Proposal', color: 'bg-yellow-100' },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-orange-100' },
    { id: 'closed', title: 'Closed Won', color: 'bg-green-100' }
  ];

  const deals = [
    {
      id: 1,
      title: "Website Redesign",
      company: "TechCorp Inc.",
      value: 45000,
      owner: "Sarah Johnson",
      closeDate: "2024-01-15",
      stage: "new",
      priority: "high"
    },
    {
      id: 2,
      title: "CRM Integration",
      company: "StartupIO",
      value: 25000,
      owner: "Michael Chen",
      closeDate: "2024-01-20",
      stage: "contacted",
      priority: "medium"
    },
    {
      id: 3,
      title: "Mobile App Development",
      company: "Design Studio",
      value: 75000,
      owner: "Emily Rodriguez",
      closeDate: "2024-02-01",
      stage: "proposal",
      priority: "high"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Deals Pipeline</h1>
              <p className="text-gray-600">Track and manage your sales opportunities</p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Deal</span>
            </button>
          </div>

          {/* Pipeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Pipeline</p>
                  <p className="text-2xl font-bold text-gray-800">$145K</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Deals</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">12</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Deal Size</p>
                  <p className="text-2xl font-bold text-gray-800">$12.1K</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                  <p className="text-2xl font-bold text-gray-800">68%</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Pipeline View</h2>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {dealColumns.map((column) => (
                <div key={column.id} className="space-y-4">
                  <div className={`${column.color} rounded-lg p-3`}>
                    <h3 className="font-semibold text-gray-800 text-center">{column.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {deals
                      .filter(deal => deal.stage === column.id)
                      .map((deal) => (
                        <div key={deal.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-800 text-sm">{deal.title}</h4>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(deal.priority)}`}></div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2">{deal.company}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3" />
                              <span>${deal.value.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{deal.owner}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{deal.closeDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DealsPage;
