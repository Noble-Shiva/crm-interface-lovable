
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const CalendarPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "Client Meeting - TechCorp",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "meeting",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Demo Call - StartupIO",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "call",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Contract Review",
      date: "2024-01-17",
      time: "11:00 AM",
      type: "task",
      color: "bg-yellow-500"
    }
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Calendar</h1>
              <p className="text-gray-600">Schedule and manage your appointments</p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`p-2 h-24 border border-gray-100 ${
                        day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                      } transition-colors`}
                    >
                      {day && (
                        <>
                          <div className="text-sm font-medium text-gray-800">{day}</div>
                          {/* Example event dots */}
                          {day === 15 && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                          {day === 16 && <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>}
                          {day === 17 && <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {events.map(event => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-3 h-3 rounded-full ${event.color} mt-1`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Calendar Widget */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CalendarIcon className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Quick View</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">{new Date().getDate()}</div>
                  <div className="text-sm text-gray-600">
                    {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
