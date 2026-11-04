import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Plus, X, Users, Calendar, Clock, FileText, Edit, Trash2, Upload, File } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCourse } from '../contexts/CourseContext';

interface Course {
  id: number;
  name: string;
  code: string;
  students: number;
  schedule: string;
  room: string;
  semester: string;
  description: string;
}

export function ProfessorCoursesScreen() {
  const { addMaterial, getMaterialsByCourse, deleteMaterial } = useCourse();
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showUploadMaterial, setShowUploadMaterial] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: 'Advanced Algorithms',
      code: 'CS401',
      students: 45,
      schedule: 'Mon, Wed 09:00-10:30',
      room: 'Room A201',
      semester: 'Spring 2026',
      description: 'Advanced algorithmic techniques and analysis',
    },
    {
      id: 2,
      name: 'Data Structures',
      code: 'CS301',
      students: 52,
      schedule: 'Tue, Thu 11:00-12:30',
      room: 'Room B105',
      semester: 'Spring 2026',
      description: 'Fundamental data structures and their applications',
    },
    {
      id: 3,
      name: 'Machine Learning',
      code: 'CS501',
      students: 38,
      schedule: 'Wed, Fri 14:00-15:30',
      room: 'Lab C301',
      semester: 'Spring 2026',
      description: 'Introduction to machine learning algorithms and techniques',
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    schedule: '',
    room: '',
    semester: 'Spring 2026',
    description: '',
  });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code) {
      const course: Course = {
        id: Date.now(),
        name: newCourse.name,
        code: newCourse.code,
        students: 0,
        schedule: newCourse.schedule,
        room: newCourse.room,
        semester: newCourse.semester,
        description: newCourse.description,
      };
      setCourses([...courses, course]);
      setNewCourse({
        name: '',
        code: '',
        schedule: '',
        room: '',
        semester: 'Spring 2026',
        description: '',
      });
      setShowAddCourse(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'document' as 'pdf' | 'video' | 'slides' | 'document' | 'link',
    content: '',
    description: '',
  });

  const handleUploadMaterial = () => {
    if (selectedCourse && newMaterial.title && newMaterial.content) {
      addMaterial({
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
        title: newMaterial.title,
        type: newMaterial.type,
        content: newMaterial.content,
        description: newMaterial.description,
        professorName: 'Prof. Smith',
      });
      setNewMaterial({
        title: '',
        type: 'document',
        content: '',
        description: '',
      });
      setShowUploadMaterial(false);
      setSelectedCourse(null);
    }
  };

  const openUploadModal = (course: Course) => {
    setSelectedCourse(course);
    setShowUploadMaterial(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-b-3xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold mb-1">My Courses</h1>
            <p className="text-purple-100 text-sm">Manage your teaching schedule</p>
          </div>
          <Button
            onClick={() => setShowAddCourse(true)}
            className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Course
          </Button>
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold">{course.name}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary">
                    {course.code}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-accent rounded-xl transition-colors">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Students:</span>
                <span className="font-medium">{course.students}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{course.semester}</span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{course.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Room: {course.room}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl flex-1 gap-1"
                onClick={() => openUploadModal(course)}
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl flex-1 gap-1">
                <File className="w-4 h-4" />
                Materials ({getMaterialsByCourse(course.id).length})
              </Button>
            </div>
          </motion.div>
        ))}

        {courses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start by adding your first course
            </p>
            <Button
              onClick={() => setShowAddCourse(true)}
              className="rounded-xl gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Course
            </Button>
          </motion.div>
        )}
      </div>

      {/* Add Course Modal */}
      <AnimatePresence>
        {showAddCourse && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowAddCourse(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 bg-background rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Add New Course</h2>
                <button
                  onClick={() => setShowAddCourse(false)}
                  className="p-2 hover:bg-accent rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Course Name</label>
                  <Input
                    type="text"
                    placeholder="e.g., Advanced Algorithms"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Course Code</label>
                    <Input
                      type="text"
                      placeholder="e.g., CS401"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Semester</label>
                    <Input
                      type="text"
                      placeholder="e.g., Spring 2026"
                      value={newCourse.semester}
                      onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Schedule</label>
                  <Input
                    type="text"
                    placeholder="e.g., Mon, Wed 09:00-10:30"
                    value={newCourse.schedule}
                    onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Room</label>
                  <Input
                    type="text"
                    placeholder="e.g., Room A201"
                    value={newCourse.room}
                    onChange={(e) => setNewCourse({ ...newCourse, room: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    placeholder="Brief course description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full h-24 px-4 py-3 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddCourse(false)}
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCourse}
                  disabled={!newCourse.name || !newCourse.code}
                  className="flex-1 h-12 rounded-xl"
                >
                  Add Course
                </Button>
              </div>
            </motion.div>
          </>
        )}

        {/* Upload Material Modal */}
        {showUploadMaterial && selectedCourse && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowUploadMaterial(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 bg-background rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Upload Course Material</h2>
                  <p className="text-sm text-muted-foreground">{selectedCourse.name}</p>
                </div>
                <button
                  onClick={() => {
                    setShowUploadMaterial(false);
                    setSelectedCourse(null);
                  }}
                  className="p-2 hover:bg-accent rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Material Title</label>
                  <Input
                    type="text"
                    placeholder="e.g., Dynamic Programming Fundamentals"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Material Type</label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value as any })}
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="document">Document</option>
                    <option value="pdf">PDF</option>
                    <option value="slides">Slides</option>
                    <option value="video">Video</option>
                    <option value="link">Link</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Input
                    type="text"
                    placeholder="Brief description of the material"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <textarea
                    placeholder="Paste the content here (text, lecture notes, or key concepts that students can ask the AI about)"
                    value={newMaterial.content}
                    onChange={(e) => setNewMaterial({ ...newMaterial, content: e.target.value })}
                    className="w-full h-40 px-4 py-3 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This content will be available to the AI assistant for answering student questions
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUploadMaterial(false);
                    setSelectedCourse(null);
                  }}
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUploadMaterial}
                  disabled={!newMaterial.title || !newMaterial.content}
                  className="flex-1 h-12 rounded-xl gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Material
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
