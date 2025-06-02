
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import { Plus, Filter, Calendar, User, CheckCircle, Circle, Clock } from "lucide-react";

const TasksPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');

  const tasks = [
    {
      id: 1,
      title: "Follow up with TechCorp Inc.",
      description: "Send proposal for website redesign project",
      assignee: "Sarah Johnson",
      dueDate: "2024-01-15",
      priority: "high",
      status: "pending",
      category: "Follow-up"
    },
    {
      id: 2,
      title: "Prepare demo for StartupIO",
      description: "Create custom demo showcasing CRM features",
      assignee: "Michael Chen",
      dueDate: "2024-01-12",
      priority: "medium",
      status: "completed",
      category: "Demo"
    },
    {
      id: 3,
      title: "Contract review",
      description: "Review and send contract to Design Studio",
      assignee: "Emily Rodriguez",
      dueDate: "2024-01-10",
      priority: "high",
      status: "overdue",
      category: "Legal"
    },
    {
      id: 4,
      title: "Team meeting preparation",
      description: "Prepare agenda for weekly sales meeting",
      assignee: "Alex Smith",
      dueDate: "2024-01-18",
      priority: "low",
      status: "pending",
      category: "Meeting"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'overdue': return <Clock className="w-5 h-5 text-red-500" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status === 'overdue').length
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
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Tasks</h1>
              <p className="text-gray-600">Manage your team's tasks and deadlines</p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Task Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-800">{taskStats.total}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{taskStats.total}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-gray-800">{taskStats.pending}</p>
                </div>
                <Circle className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-gray-800">{taskStats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overdue</p>
                  <p className="text-2xl font-bold text-gray-800">{taskStats.overdue}</p>
                </div>
                <Clock className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-800">Filter Tasks</h2>
                <div className="flex space-x-2">
                  {(['all', 'pending', 'completed', 'overdue'] as const).map((filterOption) => (
                    <button
                      key={filterOption}
                      onClick={() => setFilter(filterOption)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filter === filterOption
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Task List</h2>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{task.assignee}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{task.dueDate}</span>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
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

export default TasksPage;
