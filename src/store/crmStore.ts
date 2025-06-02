
import { create } from 'zustand';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  location: string;
  avatar: string;
  status: string;
  notes?: string;
  createdAt: string;
}

interface Deal {
  id: number;
  title: string;
  client: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  description?: string;
  owner: string;
  createdAt: string;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  category: string;
  priority: string;
  assignee: string;
  dueDate: string;
  status: string;
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  location?: string;
  attendees?: string;
  description?: string;
  reminder: string;
  color: string;
}

interface CRMStore {
  contacts: Contact[];
  deals: Deal[];
  tasks: Task[];
  events: Event[];
  
  // Contact actions
  addContact: (contact: Contact) => void;
  updateContact: (id: number, contact: Partial<Contact>) => void;
  deleteContact: (id: number) => void;
  
  // Deal actions
  addDeal: (deal: Deal) => void;
  updateDeal: (id: number, deal: Partial<Deal>) => void;
  deleteDeal: (id: number) => void;
  
  // Task actions
  addTask: (task: Task) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  
  // Event actions
  addEvent: (event: Event) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
}

// Mock data
const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    position: "Marketing Director",
    location: "New York, NY",
    avatar: "SJ",
    status: "Hot Lead",
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@startup.io",
    phone: "+1 (555) 987-6543",
    company: "StartupIO",
    position: "CEO",
    location: "San Francisco, CA",
    avatar: "MC",
    status: "Customer",
    createdAt: "2024-01-02"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@design.studio",
    phone: "+1 (555) 456-7890",
    company: "Design Studio",
    position: "Creative Lead",
    location: "Los Angeles, CA",
    avatar: "ER",
    status: "Prospect",
    createdAt: "2024-01-03"
  }
];

const mockDeals: Deal[] = [
  {
    id: 1,
    title: "Enterprise Software License",
    client: "TechCorp Inc.",
    value: 50000,
    stage: "Proposal",
    probability: 75,
    expectedCloseDate: "2024-02-15",
    owner: "You",
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    title: "Marketing Automation Platform",
    client: "StartupIO",
    value: 25000,
    stage: "Negotiation",
    probability: 60,
    expectedCloseDate: "2024-02-28",
    owner: "Sarah Johnson",
    createdAt: "2024-01-05"
  },
  {
    id: 3,
    title: "Design Consulting Package",
    client: "Design Studio",
    value: 15000,
    stage: "New",
    probability: 25,
    expectedCloseDate: "2024-03-15",
    owner: "Michael Chen",
    createdAt: "2024-01-10"
  }
];

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Follow up with TechCorp",
    description: "Send proposal and schedule next meeting",
    category: "Sales",
    priority: "High",
    assignee: "You",
    dueDate: "2024-01-20",
    status: "To Do",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Prepare demo for StartupIO",
    description: "Customize demo based on their requirements",
    category: "Meeting",
    priority: "Medium",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-22",
    status: "In Progress",
    createdAt: "2024-01-16"
  },
  {
    id: 3,
    title: "Review contract terms",
    description: "Legal review of new contract template",
    category: "General",
    priority: "Low",
    assignee: "Michael Chen",
    dueDate: "2024-01-25",
    status: "Review",
    createdAt: "2024-01-17"
  }
];

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Client Meeting - TechCorp",
    date: "2024-01-20",
    time: "10:00",
    duration: "60",
    type: "meeting",
    location: "Conference Room A",
    color: "bg-blue-500",
    reminder: "15"
  },
  {
    id: 2,
    title: "Demo Call - StartupIO",
    date: "2024-01-22",
    time: "14:00",
    duration: "90",
    type: "demo",
    location: "Zoom",
    color: "bg-purple-500",
    reminder: "30"
  },
  {
    id: 3,
    title: "Contract Review",
    date: "2024-01-25",
    time: "11:00",
    duration: "60",
    type: "task",
    color: "bg-yellow-500",
    reminder: "60"
  }
];

export const useCRMStore = create<CRMStore>((set) => ({
  contacts: mockContacts,
  deals: mockDeals,
  tasks: mockTasks,
  events: mockEvents,
  
  // Contact actions
  addContact: (contact) => set((state) => ({
    contacts: [...state.contacts, { ...contact, createdAt: new Date().toISOString() }]
  })),
  
  updateContact: (id, updatedContact) => set((state) => ({
    contacts: state.contacts.map(contact => 
      contact.id === id ? { ...contact, ...updatedContact } : contact
    )
  })),
  
  deleteContact: (id) => set((state) => ({
    contacts: state.contacts.filter(contact => contact.id !== id)
  })),
  
  // Deal actions
  addDeal: (deal) => set((state) => ({
    deals: [...state.deals, { ...deal, createdAt: new Date().toISOString() }]
  })),
  
  updateDeal: (id, updatedDeal) => set((state) => ({
    deals: state.deals.map(deal => 
      deal.id === id ? { ...deal, ...updatedDeal } : deal
    )
  })),
  
  deleteDeal: (id) => set((state) => ({
    deals: state.deals.filter(deal => deal.id !== id)
  })),
  
  // Task actions
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, createdAt: new Date().toISOString() }]
  })),
  
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  // Event actions
  addEvent: (event) => set((state) => ({
    events: [...state.events, event]
  })),
  
  updateEvent: (id, updatedEvent) => set((state) => ({
    events: state.events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    )
  })),
  
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(event => event.id !== id)
  }))
}));
