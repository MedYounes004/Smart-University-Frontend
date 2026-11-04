import { motion } from 'motion/react';
import { Clock, Calendar, Bell, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { mockCourses, mockEvents, mockAnnouncements } from '../data/mockData';

interface DashboardProps {
  onNavigateToAI: () => void;
}

export function Dashboard({ onNavigateToAI }: DashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  
  const todayCourses = mockCourses.filter(c => c.nextClass);
  const upcomingEvents = mockEvents.slice(0, 2);
  const latestAnnouncements = mockAnnouncements.slice(0, 3);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'urgent': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'important': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-muted-foreground mb-1">Friday, February 13</p>
            <h1 className="text-2xl font-bold">{greeting}, Alex</h1>
          </motion.div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* AI Assistant Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            onClick={onNavigateToAI}
            className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 border-0 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                </div>
                <p className="text-sm text-indigo-100">
                  Ask me anything about courses, exams, or procedures
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Today's Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Today's Classes</h2>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {todayCourses.map((course) => (
              <Card key={course.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-1 h-full rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="font-semibold">{course.code}</p>
                        <p className="text-sm text-muted-foreground">{course.name}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs whitespace-nowrap">
                        {course.nextClass}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{course.room}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Announcements</h2>
            <Bell className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {latestAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                    {announcement.category.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {announcement.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center px-3 py-2 bg-primary/10 rounded-xl">
                    <p className="text-2xl font-bold text-primary">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase">
                      {new Date(event.date).toLocaleString('en', { month: 'short' })}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{event.time}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {event.attendees} attending
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
