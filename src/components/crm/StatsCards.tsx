
import { Users, Target, CheckSquare, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Contacts",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Deals",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Tasks Due Today",
      value: "23",
      change: "-3.1%",
      trend: "down",
      icon: CheckSquare,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Monthly Revenue",
      value: "$847.2K",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                <TrendIcon className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
