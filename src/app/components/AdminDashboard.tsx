import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, FileText, Calendar, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface AdminDashboardProps {
  onNavigateToUsers: () => void;
  onNavigateToDocuments: () => void;
  onNavigateToEvents: () => void;
}

export function AdminDashboard({
  onNavigateToUsers,
  onNavigateToDocuments,
  onNavigateToEvents,
}: AdminDashboardProps) {
  const stats = {
    totalStudents: 1247,
    totalProfessors: 89,
    pendingDocuments: 23,
    pendingEvents: 5,
  };

  const recentRequests = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      documentType: 'Certificate of Enrollment',
      date: '2026-05-04',
      status: 'pending' as const,
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      documentType: 'Transcript',
      date: '2026-05-03',
      status: 'pending' as const,
    },
    {
      id: 3,
      studentName: 'Carol White',
      documentType: 'Internship Certificate',
      date: '2026-05-02',
      status: 'approved' as const,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'pending':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
      case 'rejected':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-b-3xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-emerald-100 text-sm">Manage users, documents, and events</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
          >
            <Users className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
            <p className="text-xs text-emerald-100">Students</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
          >
            <Users className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{stats.totalProfessors}</p>
            <p className="text-xs text-emerald-100">Professors</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
          >
            <FileText className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{stats.pendingDocuments}</p>
            <p className="text-xs text-emerald-100">Pending Docs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
          >
            <Calendar className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{stats.pendingEvents}</p>
            <p className="text-xs text-emerald-100">Pending Events</p>
          </motion.div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onNavigateToUsers}
            >
              <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Manage Users</h3>
                    <p className="text-sm text-muted-foreground">
                      View and manage students & professors
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={onNavigateToDocuments}
            >
              <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Document Requests</h3>
                    <p className="text-sm text-muted-foreground">
                      Approve or reject student requests
                    </p>
                  </div>
                  {stats.pendingDocuments > 0 && (
                    <Badge className="bg-orange-500 text-white">
                      {stats.pendingDocuments}
                    </Badge>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onNavigateToEvents}
            >
              <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Event Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Create and approve events
                    </p>
                  </div>
                  {stats.pendingEvents > 0 && (
                    <Badge className="bg-orange-500 text-white">
                      {stats.pendingEvents}
                    </Badge>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Recent Document Requests</h2>
          <div className="space-y-3">
            {recentRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{request.studentName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request.documentType}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {request.date}
                    </span>
                    <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                      {request.status}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={onNavigateToDocuments}
            variant="outline"
            className="w-full mt-4 rounded-xl"
          >
            View All Requests
          </Button>
        </section>
      </div>
    </div>
  );
}
