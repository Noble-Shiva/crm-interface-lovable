
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import StatsCards from "@/components/crm/StatsCards";
import KanbanBoard from "@/components/crm/KanbanBoard";
import ActivityTimeline from "@/components/crm/ActivityTimeline";
import RightPanel from "@/components/crm/RightPanel";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        
        <main className="p-6 space-y-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome back, Alex 👋</h1>
            <p className="text-gray-600">Here's what's happening with your business today.</p>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Kanban Board */}
            <div className="xl:col-span-3">
              <KanbanBoard />
            </div>

            {/* Right Panel */}
            <div className="xl:col-span-1">
              <RightPanel />
            </div>
          </div>

          {/* Activity Timeline */}
          <ActivityTimeline />
        </main>
      </div>
    </div>
  );
};

export default Index;
