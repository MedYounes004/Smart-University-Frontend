import { motion } from 'motion/react';
import { MapPin, Wifi, Zap, Monitor, Users, DoorOpen, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { mockStudySpaces } from '../data/mockData';

export function SmartCampusScreen() {
  const getAvailabilityColor = (available: number, capacity: number) => {
    const percentage = (available / capacity) * 100;
    if (percentage > 50) return 'text-green-600 dark:text-green-400';
    if (percentage > 20) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (available: number, capacity: number) => {
    const percentage = (available / capacity) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'Power Outlets': Zap,
    'Computers': Monitor,
    'Projector': Monitor,
    'Whiteboard': DoorOpen,
    'TV Screen': Monitor,
    'Quiet Zone': Users,
    'Collaborative Space': Users
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Smart Campus</h1>
          <p className="text-sm text-muted-foreground">Find & Book Study Spaces</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Campus Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-primary opacity-20" />
              </div>
              <div className="relative z-10 text-center p-6">
                <h3 className="font-semibold mb-2">Interactive Campus Map</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Navigate to buildings, classrooms, and facilities
                </p>
                <Button variant="secondary" className="rounded-xl">
                  Open Map
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Study Spaces */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Available Study Spaces</h2>
            <Badge variant="outline" className="rounded-lg">
              <Clock className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>

          <div className="space-y-4">
            {mockStudySpaces.map((space, index) => {
              const availabilityPercentage = (space.available / space.capacity) * 100;

              return (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{space.name}</h3>
                        <p className="text-sm text-muted-foreground">{space.floor}</p>
                      </div>
                      <div className={`text-right ${getAvailabilityColor(space.available, space.capacity)}`}>
                        <p className="text-2xl font-bold">{space.available}</p>
                        <p className="text-xs">available</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Capacity</span>
                        <span>{space.available}/{space.capacity} seats</span>
                      </div>
                      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full transition-all ${getProgressColor(space.available, space.capacity)}`}
                          style={{ width: `${availabilityPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {space.amenities.map((amenity) => {
                          const Icon = amenityIcons[amenity] || Wifi;
                          return (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              <Icon className="w-3 h-3 mr-1" />
                              {amenity}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 rounded-xl"
                        disabled={space.available === 0}
                      >
                        Book Space
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4">Campus Stats</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <DoorOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Open Labs</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Group Rooms</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-xs text-muted-foreground">WiFi Access</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-muted-foreground">Computers</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
