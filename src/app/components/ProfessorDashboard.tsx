import { motion } from 'motion/react';
import { Calendar, BookOpen, Users, Clock, Plus, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ProfessorDashboardProps {
  onNavigateToCourses: () => void;
  onNavigateToManagement?: () => void;
}

export function ProfessorDashboard({ onNavigateToCourses, onNavigateToManagement }: ProfessorDashboardProps) {
  const todaySchedule = [
    { id: 1, course: 'Advanced Algorithms', time: '09:00 - 10:30', room: 'Room A201', students: 45 },
    { id: 2, course: 'Data Structures', time: '11:00 - 12:30', room: 'Room B105', students: 52 },
    { id: 3, course: 'Machine Learning', time: '14:00 - 15:30', room: 'Lab C301', students: 38 },
  ];

  const myCourses = [
    { id: 1, name: 'Advanced Algorithms', students: 45, assignments: 3, completion: 78 },
    { id: 2, name: 'Data Structures', students: 52, assignments: 5, completion: 85 },
    { id: 3, name: 'Machine Learning', students: 38, assignments: 2, completion: 65 },
    { id: 4, name: 'Computer Networks', students: 41, assignments: 4, completion: 72 },
  ];

  const pendingTasks = [
    { id: 1, task: 'Grade ML Assignment #2', count: 38, due: 'Today' },
    { id: 2, task: 'Review DS Project Proposals', count: 15, due: 'Tomorrow' },
    { id: 3, task: 'Prepare Algorithms Midterm', count: 1, due: 'In 3 days' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-b-3xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-1">Welcome Back, Professor!</h1>
          <p className="text-purple-100 text-sm">You have 3 classes today</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
          >
            <BookOpen className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{myCourses.length}</p>
            <p className="text-xs text-purple-100">Courses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
          >
            <Users className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">176</p>
            <p className="text-xs text-purple-100">Students</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
          >
            <CheckCircle className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">14</p>
            <p className="text-xs text-purple-100">Pending</p>
          </motion.div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        {onNavigateToManagement && (
          <section>
            <Card
              onClick={onNavigateToManagement}
              className="p-4 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Student Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage attendance and grades
                  </p>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Today's Schedule */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Schedule
            </h2>
          </div>

          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.course}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {item.time}
                      </span>
                      <span>{item.room}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{item.students}</div>
                    <div className="text-xs text-muted-foreground">students</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* My Courses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              My Courses
            </h2>
            <Button
              onClick={onNavigateToCourses}
              size="sm"
              className="rounded-xl gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {myCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={onNavigateToCourses}
              >
                <h3 className="font-semibold mb-3 line-clamp-2 min-h-[2.5rem]">{course.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Assignments</span>
                    <span className="font-medium">{course.assignments}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium text-primary">{course.completion}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pending Tasks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Pending Tasks
            </h2>
          </div>

          <div className="space-y-3">
            {pendingTasks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.task}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.count} {item.count === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      item.due === 'Today'
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                        : item.due === 'Tomorrow'
                        ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>
                      {item.due}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
