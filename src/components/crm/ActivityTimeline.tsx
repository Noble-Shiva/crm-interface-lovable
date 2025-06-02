
import { Clock, User, Target, CheckSquare, Calendar, MessageCircle } from "lucide-react";

const ActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      type: "deal",
      icon: Target,
      user: "Sarah Johnson",
      action: "closed deal with",
      target: "Acme Corp",
      value: "$45,000",
      time: "2 minutes ago",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      id: 2,
      type: "task",
      icon: CheckSquare,
      user: "Mike Roberts",
      action: "completed task",
      target: "Follow up with Enterprise Co",
      time: "15 minutes ago",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      type: "meeting",
      icon: Calendar,
      user: "Lisa Kim",
      action: "scheduled meeting with",
      target: "Tech Solutions",
      time: "1 hour ago",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      type: "contact",
      icon: User,
      user: "John Davis",
      action: "added new contact",
      target: "Innovation Labs",
      time: "2 hours ago",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      type: "note",
      icon: MessageCircle,
      user: "Sarah Johnson",
      action: "added note to",
      target: "Global Inc deal",
      time: "3 hours ago",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-4 group hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors">
              <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-800">{activity.user}</span>
                  <span className="text-gray-600">{activity.action}</span>
                  <span className="font-medium text-gray-800">{activity.target}</span>
                  {activity.value && (
                    <span className="text-emerald-600 font-semibold">{activity.value}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
