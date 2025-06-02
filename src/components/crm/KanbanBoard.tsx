
import { MoreHorizontal, User } from "lucide-react";

const KanbanBoard = () => {
  const columns = [
    { id: "new", title: "New", color: "bg-gray-100", count: 12 },
    { id: "contacted", title: "Contacted", color: "bg-blue-100", count: 8 },
    { id: "proposal", title: "Proposal", color: "bg-yellow-100", count: 6 },
    { id: "negotiation", title: "Negotiation", color: "bg-orange-100", count: 4 },
    { id: "closed", title: "Closed", color: "bg-emerald-100", count: 15 }
  ];

  const deals = {
    new: [
      { id: 1, client: "Acme Corp", value: "$45,000", owner: "Sarah J", status: "new" },
      { id: 2, client: "Tech Solutions", value: "$32,000", owner: "Mike R", status: "new" },
      { id: 3, client: "Global Inc", value: "$78,000", owner: "Lisa K", status: "new" }
    ],
    contacted: [
      { id: 4, client: "StartupX", value: "$25,000", owner: "John D", status: "contacted" },
      { id: 5, client: "Enterprise Co", value: "$120,000", owner: "Sarah J", status: "contacted" }
    ],
    proposal: [
      { id: 6, client: "InnovateLab", value: "$65,000", owner: "Mike R", status: "proposal" },
      { id: 7, client: "Future Tech", value: "$89,000", owner: "Lisa K", status: "proposal" }
    ],
    negotiation: [
      { id: 8, client: "MegaCorp", value: "$150,000", owner: "John D", status: "negotiation" }
    ],
    closed: [
      { id: 9, client: "Success Ltd", value: "$95,000", owner: "Sarah J", status: "closed" },
      { id: 10, client: "Winner Inc", value: "$110,000", owner: "Mike R", status: "closed" }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-gray-100 text-gray-700",
      contacted: "bg-blue-100 text-blue-700",
      proposal: "bg-yellow-100 text-yellow-700",
      negotiation: "bg-orange-100 text-orange-700",
      closed: "bg-emerald-100 text-emerald-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sales Pipeline</h2>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-72">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${column.color.replace('bg-', 'bg-').replace('-100', '-500')}`}></div>
                <h3 className="font-medium text-gray-700">{column.title}</h3>
                <span className="text-sm text-gray-500">({column.count})</span>
              </div>
            </div>

            <div className="space-y-3">
              {deals[column.id as keyof typeof deals]?.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{deal.client}</h4>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-gray-800">{deal.value}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deal.status)}`}>
                      {deal.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">{deal.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
