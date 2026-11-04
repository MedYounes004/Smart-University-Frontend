import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Filter, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface DocumentRequest {
  id: number;
  studentName: string;
  studentId: string;
  documentType: string;
  academicYear: string;
  notes: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function AdminDocumentManagement({ onBack }: { onBack: () => void }) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [requests, setRequests] = useState<DocumentRequest[]>([
    {
      id: 1,
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      documentType: 'Certificate of Enrollment',
      academicYear: '2025-2026',
      notes: 'For visa application',
      requestDate: '2026-05-04',
      status: 'pending',
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      studentId: 'STU002',
      documentType: 'Transcript',
      academicYear: '2024-2025',
      notes: '',
      requestDate: '2026-05-03',
      status: 'pending',
    },
    {
      id: 3,
      studentName: 'Carol White',
      studentId: 'STU003',
      documentType: 'Internship Certificate',
      academicYear: '2025-2026',
      notes: 'Internship at Tech Corp',
      requestDate: '2026-05-02',
      status: 'approved',
    },
    {
      id: 4,
      studentName: 'David Brown',
      studentId: 'STU004',
      documentType: 'Certificate of Attendance',
      academicYear: '2025-2026',
      notes: '',
      requestDate: '2026-05-01',
      status: 'rejected',
    },
    {
      id: 5,
      studentName: 'Eve Davis',
      studentId: 'STU005',
      documentType: 'Certificate of Enrollment',
      academicYear: '2025-2026',
      notes: 'For scholarship',
      requestDate: '2026-04-30',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch = req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
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

  const pendingCount = requests.filter(r => r.status === 'pending').length;

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
            <h1 className="text-2xl font-bold">Document Requests</h1>
            {pendingCount > 0 && (
              <Badge className="bg-white/20 text-white px-3 py-1">
                {pendingCount} Pending
              </Badge>
            )}
          </div>
          <p className="text-emerald-100 text-sm">Review and manage student requests</p>
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by student name, ID, or document type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-10 rounded-xl"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              onClick={() => setFilterStatus('all')}
              size="sm"
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              className="rounded-xl whitespace-nowrap"
            >
              All ({requests.length})
            </Button>
            <Button
              onClick={() => setFilterStatus('pending')}
              size="sm"
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              className="rounded-xl whitespace-nowrap"
            >
              Pending ({requests.filter(r => r.status === 'pending').length})
            </Button>
            <Button
              onClick={() => setFilterStatus('approved')}
              size="sm"
              variant={filterStatus === 'approved' ? 'default' : 'outline'}
              className="rounded-xl whitespace-nowrap"
            >
              Approved ({requests.filter(r => r.status === 'approved').length})
            </Button>
            <Button
              onClick={() => setFilterStatus('rejected')}
              size="sm"
              variant={filterStatus === 'rejected' ? 'default' : 'outline'}
              className="rounded-xl whitespace-nowrap"
            >
              Rejected ({requests.filter(r => r.status === 'rejected').length})
            </Button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {filteredRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
              <h3 className="font-semibold mb-2">No requests found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </Card>
          ) : (
            filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{request.studentName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {request.studentId}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-primary mb-1">
                        {request.documentType}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Academic Year: {request.academicYear}
                      </p>
                      {request.notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Note: {request.notes}
                        </p>
                      )}
                    </div>
                    {getStatusIcon(request.status)}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {request.requestDate}
                      </span>
                      <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleReject(request.id)}
                          size="sm"
                          variant="outline"
                          className="rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleApprove(request.id)}
                          size="sm"
                          className="rounded-xl bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
