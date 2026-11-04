import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, MapPin, Clock, Heart, CalendarPlus } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockEvents, mockClubs } from '../data/mockData';

export function EventsClubsScreen() {
  const [rsvpEvents, setRsvpEvents] = useState<Set<string>>(
    new Set(mockEvents.filter(e => e.isRSVP).map(e => e.id))
  );
  const [memberClubs, setMemberClubs] = useState<Set<string>>(
    new Set(mockClubs.filter(c => c.isMember).map(c => c.id))
  );

  const toggleRSVP = (eventId: string) => {
    setRsvpEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const toggleMembership = (clubId: string) => {
    setMemberClubs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clubId)) {
        newSet.delete(clubId);
      } else {
        newSet.add(clubId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'sports': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'cultural': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'social': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Campus Life</h1>
          <p className="text-sm text-muted-foreground">Events & Clubs</p>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4 mt-0">
            {mockEvents.map((event, index) => {
              const isRSVP = rsvpEvents.has(event.id);
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-5">
                    <div className="flex gap-4">
                      {/* Date Block */}
                      <div className="flex flex-col items-center justify-center px-4 py-3 bg-primary/10 rounded-2xl">
                        <p className="text-2xl font-bold text-primary">
                          {new Date(event.date).getDate()}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase">
                          {new Date(event.date).toLocaleString('en', { month: 'short' })}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => toggleRSVP(event.id)}
                            variant={isRSVP ? "default" : "outline"}
                            size="sm"
                            className="rounded-xl"
                          >
                            <Heart className={`w-4 h-4 mr-2 ${isRSVP ? 'fill-current' : ''}`} />
                            {isRSVP ? 'Going' : 'RSVP'}
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <CalendarPlus className="w-4 h-4 mr-2" />
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>

          <TabsContent value="clubs" className="space-y-4 mt-0">
            {mockClubs.map((club, index) => {
              const isMember = memberClubs.has(club.id);
              
              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Club Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold">{club.name}</h3>
                            <p className="text-sm text-muted-foreground">{club.category}</p>
                          </div>
                          {isMember && (
                            <Badge variant="secondary">Member</Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {club.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{club.members} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{club.nextMeeting}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => toggleMembership(club.id)}
                          variant={isMember ? "outline" : "default"}
                          size="sm"
                          className="rounded-xl"
                        >
                          {isMember ? 'Leave Club' : 'Join Club'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
