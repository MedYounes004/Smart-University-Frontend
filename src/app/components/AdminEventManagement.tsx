import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, CheckCircle, XCircle, Clock, Edit2, Trash2, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  category: 'workshop' | 'training' | 'seminar' | 'conference';
  status: 'pending' | 'approved' | 'rejected';
  submittedBy?: string;
}

export function AdminEventManagement({ onBack }: { onBack: () => void }) {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Web Development Workshop',
      description: 'Learn modern web development with React, Node.js, and MongoDB.',
      date: '2026-05-15',
      time: '14:00 - 17:00',
      location: 'Computer Lab A301',
      capacity: 30,
      category: 'workshop',
      status: 'approved',
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Build mobile apps with React Native',
      date: '2026-05-22',
      time: '10:00 - 13:00',
      location: 'Lab B202',
      capacity: 25,
      category: 'workshop',
      status: 'pending',
      submittedBy: 'Tech Club',
    },
    {
      id: 3,
      title: 'Cybersecurity Awareness',
      description: 'Learn about online security and privacy',
      date: '2026-05-28',
      time: '15:00 - 17:00',
      location: 'Main Hall',
      capacity: 100,
      category: 'seminar',
      status: 'pending',
      submittedBy: 'Security Club',
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    category: 'workshop' as 'workshop' | 'training' | 'seminar' | 'conference',
  });

  const handleApprove = (id: number) => {
    setEvents(events.map(e =>
      e.id === id ? { ...e, status: 'approved' as const } : e
    ));
  };

  const handleReject = (id: number) => {
    setEvents(events.map(e =>
      e.id === id ? { ...e, status: 'rejected' as const } : e
    ));
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      const event: Event = {
        id: Date.now(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        capacity: parseInt(newEvent.capacity) || 30,
        category: newEvent.category,
        status: 'approved',
      };
      setEvents([event, ...events]);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        category: 'workshop',
      });
      setShowCreateEvent(false);
    }
  };

  const filteredEvents = events.filter(e =>
    filterStatus === 'all' || e.status === filterStatus
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workshop': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'training': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
      case 'seminar': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
      case 'conference': return 'bg-green-500/10 text-green-600 dark:text-green-400';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const pendingCount = events.filter(e => e.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">Event Management</h1>
              {pendingCount > 0 && (
                <Badge className="bg-white/20 text-white px-2 py-1">
                  {pendingCount} Pending
                </Badge>
              )}
            </div>
            <p className="text-emerald-100 text-sm">Create and approve events</p>
          </div>
          <Button
            onClick={() => setShowCreateEvent(true)}
            size="sm"
            className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl gap-1"
          >
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            onClick={() => setFilterStatus('all')}
            size="sm"
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            className="rounded-xl whitespace-nowrap"
          >
            All ({events.length})
          </Button>
          <Button
            onClick={() => setFilterStatus('pending')}
            size="sm"
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            className="rounded-xl whitespace-nowrap"
          >
            Pending ({events.filter(e => e.status === 'pending').length})
          </Button>
          <Button
            onClick={() => setFilterStatus('approved')}
            size="sm"
            variant={filterStatus === 'approved' ? 'default' : 'outline'}
            className="rounded-xl whitespace-nowrap"
          >
            Approved ({events.filter(e => e.status === 'approved').length})
          </Button>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>📅 {event.date}</span>
                      <span>🕐 {event.time}</span>
                      <span>📍 {event.location}</span>
                      <span>👥 {event.capacity} capacity</span>
                    </div>
                    {event.submittedBy && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Submitted by: {event.submittedBy}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    {getStatusIcon(event.status)}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Badge className={event.status === 'approved' ? 'bg-green-500/10 text-green-600' : event.status === 'pending' ? 'bg-orange-500/10 text-orange-600' : 'bg-red-500/10 text-red-600'}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>

                  <div className="flex gap-2">
                    {event.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => handleReject(event.id)}
                          size="sm"
                          variant="outline"
                          className="rounded-xl text-red-600"
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleApprove(event.id)}
                          size="sm"
                          className="rounded-xl bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                      </>
                    )}
                    {event.status === 'approved' && (
                      <Button
                        onClick={() => handleDelete(event.id)}
                        size="sm"
                        variant="outline"
                        className="rounded-xl gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCreateEvent(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 bg-background rounded-t-3xl p-6 z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Create Event</h2>
                <button
                  onClick={() => setShowCreateEvent(false)}
                  className="p-2 hover:bg-accent rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Event Title</label>
                  <Input
                    placeholder="e.g., Web Development Workshop"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="training">Training</option>
                    <option value="seminar">Seminar</option>
                    <option value="conference">Conference</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time</label>
                    <Input
                      placeholder="14:00 - 17:00"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    placeholder="e.g., Computer Lab A301"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Capacity</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    placeholder="Event description..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full h-24 px-4 py-3 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateEvent(false)}
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateEvent}
                  disabled={!newEvent.title || !newEvent.date || !newEvent.location}
                  className="flex-1 h-12 rounded-xl"
                >
                  Create Event
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
