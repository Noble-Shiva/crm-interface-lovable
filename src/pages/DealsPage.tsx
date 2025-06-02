
import { useState } from "react";
import { useCRMStore } from "@/store/crmStore";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import DealForm from "@/components/crm/DealForm";
import { Plus, Filter, DollarSign, Calendar, User, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";

const DealsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [showDealForm, setShowDealForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const { deals, addDeal, updateDeal, deleteDeal } = useCRMStore();

  const stages = [
    { id: 'New', title: 'New', color: 'bg-gray-100' },
    { id: 'Contacted', title: 'Contacted', color: 'bg-blue-100' },
    { id: 'Proposal', title: 'Proposal', color: 'bg-yellow-100' },
    { id: 'Negotiation', title: 'Negotiation', color: 'bg-orange-100' },
    { id: 'Closed', title: 'Closed Won', color: 'bg-green-100' }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleSaveDeal = (dealData: any) => {
    if (editingDeal) {
      updateDeal(editingDeal.id, dealData);
    } else {
      addDeal(dealData);
    }
    setShowDealForm(false);
    setEditingDeal(null);
  };

  const handleEditDeal = (deal: any) => {
    setEditingDeal(deal);
    setShowDealForm(true);
    setDropdownOpen(null);
  };

  const handleDeleteDeal = (id: number) => {
    deleteDeal(id);
    setDropdownOpen(null);
  };

  const getPriorityColor = (stage: string) => {
    switch (stage) {
      case 'New': return 'bg-gray-500';
      case 'Contacted': return 'bg-blue-500';
      case 'Proposal': return 'bg-yellow-500';
      case 'Negotiation': return 'bg-orange-500';
      case 'Closed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const totalPipelineValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);

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
            <button 
              onClick={() => setShowDealForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Deal</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search deals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Stages</option>
                  {stages.map(stage => (
                    <option key={stage.id} value={stage.id}>{stage.title}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-600">
                Pipeline Value: <span className="font-semibold">${totalPipelineValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Pipeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Pipeline</p>
                  <p className="text-2xl font-bold text-gray-800">${totalPipelineValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Deals</p>
                  <p className="text-2xl font-bold text-gray-800">{filteredDeals.length}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">{filteredDeals.length}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Deal Size</p>
                  <p className="text-2xl font-bold text-gray-800">${filteredDeals.length > 0 ? Math.round(totalPipelineValue / filteredDeals.length).toLocaleString() : '0'}</p>
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
                <span>Export</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {stages.map((stage) => (
                <div key={stage.id} className="space-y-4">
                  <div className={`${stage.color} rounded-lg p-3`}>
                    <h3 className="font-semibold text-gray-800 text-center">{stage.title}</h3>
                    <p className="text-center text-sm text-gray-600">
                      {filteredDeals.filter(deal => deal.stage === stage.id).length} deals
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredDeals
                      .filter(deal => deal.stage === stage.id)
                      .map((deal) => (
                        <div key={deal.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-800 text-sm">{deal.title}</h4>
                            <div className="relative">
                              <button
                                onClick={() => setDropdownOpen(dropdownOpen === deal.id ? null : deal.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              {dropdownOpen === deal.id && (
                                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                                  <button
                                    onClick={() => handleEditDeal(deal)}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-t-lg"
                                  >
                                    <Edit className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDeal(deal.id)}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2">{deal.client}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3" />
                              <span>${deal.value.toLocaleString()}</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(deal.stage)}`}></div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{deal.owner}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{deal.expectedCloseDate}</span>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full" 
                                style={{ width: `${deal.probability}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{deal.probability}% probability</p>
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

      {/* Deal Form Modal */}
      {showDealForm && (
        <DealForm
          deal={editingDeal}
          onClose={() => {
            setShowDealForm(false);
            setEditingDeal(null);
          }}
          onSave={handleSaveDeal}
        />
      )}
    </div>
  );
};

export default DealsPage;
