import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, MapPin, User, FileText, ArrowLeft, Sparkles, File, Video, Presentation, Link as LinkIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockCourses, Course } from '../data/mockData';
import { useCourse } from '../contexts/CourseContext';

interface CoursesScreenProps {
  onNavigateToAI: () => void;
}

export function CoursesScreen({ onNavigateToAI }: CoursesScreenProps) {
  const { getMaterialsByCourse } = useCourse();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="p-6">
            <button
              onClick={() => setSelectedCourse(null)}
              className="mb-4 p-2 hover:bg-accent rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: selectedCourse.color + '20' }}
              >
                <BookOpen className="w-6 h-6" style={{ color: selectedCourse.color }} />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold mb-1">{selectedCourse.code}</h1>
                <p className="text-sm text-muted-foreground">{selectedCourse.name}</p>
              </div>
              <Badge className="rounded-lg">{selectedCourse.credits} Credits</Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Schedule</p>
                  <p className="text-sm font-medium">{selectedCourse.schedule}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Room</p>
                  <p className="text-sm font-medium">{selectedCourse.room.split(',')[1]}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Instructor */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Instructor</p>
                <p className="font-semibold">{selectedCourse.instructor}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                Contact
              </Button>
            </div>
          </Card>

          {/* AI Ask Button */}
          <Card
            onClick={onNavigateToAI}
            className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-indigo-200 dark:border-indigo-800 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Ask AI about this course</p>
                <p className="text-xs text-muted-foreground">Get instant answers about schedule, exams, and more</p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Course Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credits</span>
                    <span className="font-medium">{selectedCourse.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{selectedCourse.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Schedule</span>
                    <span className="font-medium">{selectedCourse.schedule}</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="syllabus" className="mt-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Course Syllabus</h3>
                <div className="space-y-2 text-sm whitespace-pre-wrap text-muted-foreground">
                  {selectedCourse.syllabus}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-3 mt-4">
              {(() => {
                const materials = getMaterialsByCourse(selectedCourse.id);
                const getIcon = (type: string) => {
                  switch (type) {
                    case 'pdf': return FileText;
                    case 'video': return Video;
                    case 'slides': return Presentation;
                    case 'link': return LinkIcon;
                    default: return File;
                  }
                };

                if (materials.length === 0) {
                  return (
                    <Card className="p-8 text-center">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
                      <p className="text-sm text-muted-foreground">
                        No materials uploaded yet
                      </p>
                    </Card>
                  );
                }

                return materials.map((material) => {
                  const Icon = getIcon(material.type);
                  return (
                    <Card key={material.id} className="p-4 hover:bg-accent cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm mb-1">{material.title}</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {material.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {material.type.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {material.professorName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • {material.uploadDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                });
              })()}

              <Card
                onClick={onNavigateToAI}
                className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Ask AI about these materials</p>
                    <p className="text-xs text-muted-foreground">Get help understanding course content</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="p-6">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-sm text-muted-foreground">Spring Semester 2026</p>
        </div>
      </div>

      {/* Course List */}
      <div className="p-6 space-y-4">
        {mockCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              onClick={() => setSelectedCourse(course)}
              className="p-5 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: course.color + '20' }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: course.color }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold">{course.code}</h3>
                      <p className="text-sm text-muted-foreground">{course.name}</p>
                    </div>
                    {course.nextClass && (
                      <Badge variant="secondary" className="text-xs whitespace-nowrap">
                        {course.nextClass}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{course.instructor.split(' ')[1]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.schedule.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{getMaterialsByCourse(course.id).length} Materials</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
