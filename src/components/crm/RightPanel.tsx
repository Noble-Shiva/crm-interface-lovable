
import { Calendar as CalendarIcon, Plus, StickyNote, Clock } from "lucide-react";

const RightPanel = () => {
  const upcomingTasks = [
    { id: 1, task: "Call Enterprise Co", time: "10:00 AM", priority: "high" },
    { id: 2, task: "Send proposal to StartupX", time: "2:00 PM", priority: "medium" },
    { id: 3, task: "Team standup meeting", time: "4:00 PM", priority: "low" },
  ];

  const notes = [
    { id: 1, title: "Client Feedback", content: "Great meeting with Acme Corp. They're interested in the premium package." },
    { id: 2, title: "Product Demo", content: "Schedule demo for Tech Solutions next week." },
  ];

  return (
    <div className="space-y-6">
      {/* Mini Calendar Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Today's Tasks</h3>
          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                task.priority === 'high' ? 'bg-red-500' : 
                task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{task.task}</p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{task.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Notes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Quick Notes</h3>
          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:shadow-sm transition-all">
              <div className="flex items-start space-x-2">
                <StickyNote className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">{note.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{note.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Calendar</h3>
          <CalendarIcon className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="p-2 text-gray-500 font-medium">{day}</div>
          ))}
          
          {Array.from({ length: 35 }, (_, i) => {
            const date = i - 6; // Starting from a Sunday
            const isToday = date === 15;
            const hasEvent = [12, 18, 22, 28].includes(date);
            
            return (
              <div
                key={i}
                className={`p-2 text-sm cursor-pointer rounded transition-colors ${
                  date <= 0 ? 'text-gray-300' :
                  isToday ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold' :
                  hasEvent ? 'bg-blue-100 text-blue-700 font-medium' :
                  'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {date > 0 ? date : ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
