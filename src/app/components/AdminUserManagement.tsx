import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, UserPlus, Edit2, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'professor';
  studentId?: string;
  department?: string;
  status: 'active' | 'inactive';
}

export function AdminUserManagement({ onBack }: { onBack: () => void }) {
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'professor'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.j@university.edu',
      role: 'student',
      studentId: 'STU001',
      status: 'active',
    },
    {
      id: 2,
      name: 'Dr. Sarah Mitchell',
      email: 'sarah.m@university.edu',
      role: 'professor',
      department: 'Computer Science',
      status: 'active',
    },
    {
      id: 3,
      name: 'Bob Smith',
      email: 'bob.s@university.edu',
      role: 'student',
      studentId: 'STU002',
      status: 'active',
    },
    {
      id: 4,
      name: 'Prof. John Davis',
      email: 'john.d@university.edu',
      role: 'professor',
      department: 'Mathematics',
      status: 'active',
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.studentId && user.studentId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const studentCount = users.filter(u => u.role === 'student').length;
  const professorCount = users.filter(u => u.role === 'professor').length;

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
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Button
              size="sm"
              className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl gap-1"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
          <p className="text-emerald-100 text-sm">Manage students and professors</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-sm text-emerald-100">Students</p>
            <p className="text-2xl font-bold">{studentCount}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-sm text-emerald-100">Professors</p>
            <p className="text-2xl font-bold">{professorCount}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-10 rounded-xl"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setFilterRole('all')}
              size="sm"
              variant={filterRole === 'all' ? 'default' : 'outline'}
              className="rounded-xl"
            >
              All ({users.length})
            </Button>
            <Button
              onClick={() => setFilterRole('student')}
              size="sm"
              variant={filterRole === 'student' ? 'default' : 'outline'}
              className="rounded-xl"
            >
              Students ({studentCount})
            </Button>
            <Button
              onClick={() => setFilterRole('professor')}
              size="sm"
              variant={filterRole === 'professor' ? 'default' : 'outline'}
              className="rounded-xl"
            >
              Professors ({professorCount})
            </Button>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge
                        variant="outline"
                        className={
                          user.role === 'student'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        }
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                    {user.studentId && (
                      <p className="text-xs text-muted-foreground">ID: {user.studentId}</p>
                    )}
                    {user.department && (
                      <p className="text-xs text-muted-foreground">
                        Department: {user.department}
                      </p>
                    )}
                  </div>
                  <Badge
                    className={
                      user.status === 'active'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'bg-gray-500/10 text-gray-600'
                    }
                  >
                    {user.status}
                  </Badge>
                </div>

                <div className="flex gap-2 pt-3 border-t border-border">
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl gap-1">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-xl gap-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
