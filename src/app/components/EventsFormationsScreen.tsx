import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Plus, X } from 'lucide-react';
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
  registered: number;
  image: string;
  category: 'workshop' | 'training' | 'seminar' | 'conference';
  isRegistered: boolean;
}

export function EventsFormationsScreen() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Web Development Workshop',
      description: 'Learn modern web development with React, Node.js, and MongoDB. Build a full-stack application from scratch.',
      date: '2026-05-15',
      time: '14:00 - 17:00',
      location: 'Computer Lab A301',
      capacity: 30,
      registered: 18,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      category: 'workshop',
      isRegistered: false,
    },
    {
      id: 2,
      title: 'Data Science Bootcamp',
      description: 'Intensive training on Python, machine learning, and data visualization techniques.',
      date: '2026-05-20',
      time: '09:00 - 16:00',
      location: 'Main Auditorium',
      capacity: 50,
      registered: 42,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      category: 'training',
      isRegistered: true,
    },
    {
      id: 3,
      title: 'Career Development Seminar',
      description: 'Expert insights on building your career in tech. Network with industry professionals.',
      date: '2026-05-18',
      time: '15:00 - 18:00',
      location: 'Conference Hall B',
      capacity: 100,
      registered: 67,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      category: 'seminar',
      isRegistered: false,
    },
    {
      id: 4,
      title: 'AI & Ethics Conference',
      description: 'Explore the ethical implications of artificial intelligence and machine learning in society.',
      date: '2026-05-25',
      time: '10:00 - 15:00',
      location: 'Grand Hall',
      capacity: 200,
      registered: 156,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      category: 'conference',
      isRegistered: false,
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

  const handleRegister = (eventId: number) => {
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, isRegistered: !e.isRegistered, registered: e.isRegistered ? e.registered - 1 : e.registered + 1 } : e
    ));
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(prev => prev ? { ...prev, isRegistered: !prev.isRegistered } : null);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workshop': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'training': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
      case 'seminar': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
      case 'conference': return 'bg-green-500/10 text-green-600 dark:text-green-400';
      default: return 'bg-gray-500/10 text-gray-600';
    }
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
        registered: 0,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        category: newEvent.category,
        isRegistered: false,
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

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="relative">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-6 left-6 p-2 bg-white/90 hover:bg-white rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div className="p-6 -mt-12 relative z-10">
          <Card className="p-6 mb-6">
            <Badge className={`mb-3 ${getCategoryColor(selectedEvent.category)}`}>
              {selectedEvent.category.toUpperCase()}
            </Badge>
            <h1 className="text-2xl font-bold mb-2">{selectedEvent.title}</h1>
            <p className="text-muted-foreground mb-6">{selectedEvent.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-5 h-5 text-primary" />
                <span>{selectedEvent.registered} / {selectedEvent.capacity} registered</span>
              </div>
            </div>

            <Button
              onClick={() => handleRegister(selectedEvent.id)}
              className="w-full h-12 rounded-2xl"
              variant={selectedEvent.isRegistered ? 'outline' : 'default'}
            >
              {selectedEvent.isRegistered ? 'Cancel Registration' : 'Register Now'}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold mb-1">Events & Formations</h1>
            <p className="text-blue-100 text-sm">Workshops, trainings, and conferences</p>
          </div>
          <Button
            onClick={() => setShowCreateEvent(true)}
            size="sm"
            className="bg-white text-indigo-600 hover:bg-blue-50 rounded-xl gap-1"
          >
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedEvent(event)}
          >
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all">
              <div className="relative h-40">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                {event.isRegistered && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-500 text-white">Registered</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {event.registered} / {event.capacity} seats
                  </span>
                  <Button
                    size="sm"
                    className="rounded-xl"
                    variant={event.isRegistered ? 'outline' : 'default'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister(event.id);
                    }}
                  >
                    {event.isRegistered ? 'Registered' : 'Join'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
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
                  Submit for Approval
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
