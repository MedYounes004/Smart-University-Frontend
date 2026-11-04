import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, CheckCircle, XCircle, Edit2, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface Student {
  id: number;
  name: string;
  studentId: string;
  attendance: boolean;
  grade: number | null;
}

interface Subject {
  id: number;
  name: string;
  code: string;
  students: Student[];
}

export function ProfessorManagementScreen({ onBack }: { onBack: () => void }) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [editingGrades, setEditingGrades] = useState(false);

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: 'Advanced Algorithms',
      code: 'CS401',
      students: [
        { id: 1, name: 'Alice Johnson', studentId: 'STU001', attendance: true, grade: 85 },
        { id: 2, name: 'Bob Smith', studentId: 'STU002', attendance: true, grade: 92 },
        { id: 3, name: 'Carol White', studentId: 'STU003', attendance: false, grade: 78 },
        { id: 4, name: 'David Brown', studentId: 'STU004', attendance: true, grade: null },
        { id: 5, name: 'Eve Davis', studentId: 'STU005', attendance: true, grade: 88 },
      ],
    },
    {
      id: 2,
      name: 'Data Structures',
      code: 'CS301',
      students: [
        { id: 6, name: 'Frank Miller', studentId: 'STU006', attendance: true, grade: 90 },
        { id: 7, name: 'Grace Lee', studentId: 'STU007', attendance: false, grade: 82 },
        { id: 8, name: 'Henry Wilson', studentId: 'STU008', attendance: true, grade: 95 },
      ],
    },
    {
      id: 3,
      name: 'Machine Learning',
      code: 'CS501',
      students: [
        { id: 9, name: 'Ivy Martinez', studentId: 'STU009', attendance: true, grade: 87 },
        { id: 10, name: 'Jack Taylor', studentId: 'STU010', attendance: true, grade: 91 },
      ],
    },
  ]);

  const toggleAttendance = (studentId: number) => {
    if (!selectedSubject) return;

    setSubjects(subjects.map(subject =>
      subject.id === selectedSubject.id
        ? {
            ...subject,
            students: subject.students.map(student =>
              student.id === studentId
                ? { ...student, attendance: !student.attendance }
                : student
            ),
          }
        : subject
    ));

    setSelectedSubject({
      ...selectedSubject,
      students: selectedSubject.students.map(student =>
        student.id === studentId
          ? { ...student, attendance: !student.attendance }
          : student
      ),
    });
  };

  const updateGrade = (studentId: number, grade: string) => {
    if (!selectedSubject) return;

    const gradeValue = grade === '' ? null : parseFloat(grade);

    setSelectedSubject({
      ...selectedSubject,
      students: selectedSubject.students.map(student =>
        student.id === studentId
          ? { ...student, grade: gradeValue }
          : student
      ),
    });
  };

  const saveGrades = () => {
    if (!selectedSubject) return;

    setSubjects(subjects.map(subject =>
      subject.id === selectedSubject.id ? selectedSubject : subject
    ));
    setEditingGrades(false);
  };

  if (selectedSubject) {
    const presentCount = selectedSubject.students.filter(s => s.attendance).length;
    const totalStudents = selectedSubject.students.length;

    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-b-3xl shadow-lg">
          <button
            onClick={() => setSelectedSubject(null)}
            className="mb-4 p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold mb-1">{selectedSubject.name}</h1>
            <p className="text-purple-100 text-sm mb-4">{selectedSubject.code}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-sm text-purple-100">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-sm text-purple-100">Present Today</p>
                <p className="text-2xl font-bold">{presentCount}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Student Management</h2>
            {editingGrades ? (
              <Button
                onClick={saveGrades}
                size="sm"
                className="rounded-xl gap-2"
              >
                <Save className="w-4 h-4" />
                Save Grades
              </Button>
            ) : (
              <Button
                onClick={() => setEditingGrades(true)}
                size="sm"
                variant="outline"
                className="rounded-xl gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Grades
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {selectedSubject.students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.studentId}</p>
                    </div>
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`p-2 rounded-xl transition-all ${
                        student.attendance
                          ? 'bg-green-500/10 hover:bg-green-500/20'
                          : 'bg-red-500/10 hover:bg-red-500/20'
                      }`}
                    >
                      {student.attendance ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Grade
                      </label>
                      {editingGrades ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Enter grade"
                          value={student.grade ?? ''}
                          onChange={(e) => updateGrade(student.id, e.target.value)}
                          className="h-10 rounded-xl"
                        />
                      ) : (
                        <div className="h-10 px-4 rounded-xl border border-border bg-accent/50 flex items-center">
                          <span className="font-semibold">
                            {student.grade !== null ? `${student.grade}/100` : 'Not graded'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Status
                      </label>
                      <Badge
                        className={student.attendance
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400'
                        }
                      >
                        {student.attendance ? 'Present' : 'Absent'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-1">Student Management</h1>
          <p className="text-purple-100 text-sm">Attendance and grade management</p>
        </motion.div>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">My Subjects</h2>
        <div className="space-y-3">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedSubject(subject)}
            >
              <Card className="p-5 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.code}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {subject.students.length} Students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-muted-foreground">
                      {subject.students.filter(s => s.grade !== null).length} Graded
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
