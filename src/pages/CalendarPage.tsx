
import { useState } from "react";
import Header from "@/components/crm/Header";
import Sidebar from "@/components/crm/Sidebar";
import EventForm from "@/components/crm/EventForm";
import { useCRMStore } from "@/store/crmStore";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Edit, Trash2 } from "lucide-react";

const CalendarPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const { events, addEvent, updateEvent, deleteEvent } = useCRMStore();

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

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const handleSaveEvent = (eventData: any) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setEditingEvent(null);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setEditingEvent(null);
    setShowEventForm(true);
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
            <button 
              onClick={() => {
                setEditingEvent(null);
                setSelectedDate("");
                setShowEventForm(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
            >
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
                  {days.map((day, index) => {
                    const dayEvents = day ? getEventsForDate(day) : [];
                    const isToday = day && 
                      currentDate.getFullYear() === new Date().getFullYear() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      day === new Date().getDate();

                    return (
                      <div
                        key={index}
                        onClick={() => day && handleDayClick(day)}
                        className={`p-2 h-32 border border-gray-100 ${
                          day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                        } ${isToday ? 'bg-blue-50 border-blue-200' : ''} transition-colors`}
                      >
                        {day && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
                              {day}
                            </div>
                            <div className="space-y-1 overflow-hidden">
                              {dayEvents.slice(0, 3).map(event => (
                                <div
                                  key={event.id}
                                  className={`text-xs px-1 py-0.5 rounded text-white truncate ${event.color}`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="group flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-3 h-3 rounded-full ${event.color} mt-1 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm truncate">{event.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{event.date}</span>
                          <Clock className="w-3 h-3 ml-2" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {upcomingEvents.length === 0 && (
                    <p className="text-gray-500 text-sm">No upcoming events</p>
                  )}
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
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">Events today</div>
                    <div className="text-xl font-semibold text-blue-600">
                      {events.filter(event => {
                        const today = new Date();
                        const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
                        return event.date === todayStr;
                      }).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          event={editingEvent ? editingEvent : { date: selectedDate }}
          onClose={() => {
            setShowEventForm(false);
            setEditingEvent(null);
            setSelectedDate("");
          }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
