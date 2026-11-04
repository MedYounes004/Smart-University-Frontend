import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  GraduationCap,
  Calendar,
  Award,
  FilePlus,
  X,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Mail,
  User,
  CreditCard,
  Bell,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface DocumentRequest {
  id: number;
  documentType: string;
  academicYear: string;
  notes: string;
  deliveryMethod: 'pdf' | 'email';
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  completedDate?: string;
}

interface DocumentType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export function DocumentRequestScreen({ onBack }: { onBack: () => void }) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [activeTab, setActiveTab] = useState<'request' | 'history'>('request');

  const [requestForm, setRequestForm] = useState({
    academicYear: '2025-2026',
    notes: '',
    deliveryMethod: 'pdf' as 'pdf' | 'email',
  });

  const [requests, setRequests] = useState<DocumentRequest[]>([
    {
      id: 1,
      documentType: 'Certificate of Enrollment',
      academicYear: '2025-2026',
      notes: 'For visa application',
      deliveryMethod: 'pdf',
      status: 'approved',
      requestDate: '2026-04-28',
      completedDate: '2026-04-29',
    },
    {
      id: 2,
      documentType: 'Transcript',
      academicYear: '2024-2025',
      notes: '',
      deliveryMethod: 'email',
      status: 'pending',
      requestDate: '2026-05-02',
    },
    {
      id: 3,
      documentType: 'Certificate of Attendance',
      academicYear: '2025-2026',
      notes: '',
      deliveryMethod: 'pdf',
      status: 'rejected',
      requestDate: '2026-04-25',
      completedDate: '2026-04-26',
    },
  ]);

  const documentTypes: DocumentType[] = [
    {
      id: 'enrollment',
      title: 'Certificate of Enrollment',
      description: 'Proof of current registration status',
      icon: GraduationCap,
      color: '#4F46E5',
    },
    {
      id: 'attendance',
      title: 'Certificate of Attendance',
      description: 'Attendance record and presence confirmation',
      icon: Calendar,
      color: '#0EA5E9',
    },
    {
      id: 'transcript',
      title: 'Academic Transcript',
      description: 'Complete record of grades and courses',
      icon: FileText,
      color: '#8B5CF6',
    },
    {
      id: 'internship',
      title: 'Internship Certificate',
      description: 'Internship completion confirmation',
      icon: Award,
      color: '#EC4899',
    },
    {
      id: 'other',
      title: 'Other Documents',
      description: 'Request any other official document',
      icon: FilePlus,
      color: '#F59E0B',
    },
  ];

  const handleRequestDocument = (doc: DocumentType) => {
    setSelectedDocument(doc);
    setShowRequestModal(true);
  };

  const handleSubmitRequest = () => {
    if (selectedDocument) {
      const newRequest: DocumentRequest = {
        id: Date.now(),
        documentType: selectedDocument.title,
        academicYear: requestForm.academicYear,
        notes: requestForm.notes,
        deliveryMethod: requestForm.deliveryMethod,
        status: 'pending',
        requestDate: new Date().toISOString().split('T')[0],
      };
      setRequests([newRequest, ...requests]);
      setShowRequestModal(false);
      setSelectedDocument(null);
      setRequestForm({
        academicYear: '2025-2026',
        notes: '',
        deliveryMethod: 'pdf',
      });
    }
  };

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
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg">
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
            <h1 className="text-2xl font-bold">Official Documents</h1>
            {pendingCount > 0 && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">{pendingCount} Pending</span>
              </div>
            )}
          </div>
          <p className="text-blue-100 text-sm">
            Request and track your official documents
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'request'
                ? 'bg-white text-indigo-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Request Document
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'history'
                ? 'bg-white text-indigo-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Request History
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'request' ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold mb-4">Available Documents</h2>
            {documentTypes.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: doc.color + '20' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: doc.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {doc.description}
                        </p>
                        <Button
                          onClick={() => handleRequestDocument(doc)}
                          size="sm"
                          className="rounded-xl"
                          style={{ backgroundColor: doc.color }}
                        >
                          Request Document
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Request History</h2>
              <Badge variant="outline" className="text-xs">
                {requests.length} Total
              </Badge>
            </div>

            {requests.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                <h3 className="font-semibold mb-2">No Requests Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by requesting your first document
                </p>
                <Button onClick={() => setActiveTab('request')} className="rounded-xl">
                  Request Document
                </Button>
              </Card>
            ) : (
              requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{request.documentType}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Academic Year: {request.academicYear}
                        </p>
                        {request.notes && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Note: {request.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Requested: {request.requestDate}</span>
                        {request.completedDate && (
                          <span>Completed: {request.completedDate}</span>
                        )}
                      </div>
                      <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>

                    {request.status === 'approved' && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 rounded-xl gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 rounded-xl gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Send Email
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {showRequestModal && selectedDocument && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowRequestModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 bg-background rounded-t-3xl p-6 z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Request Document</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedDocument.title}
                  </p>
                </div>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="p-2 hover:bg-accent rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Student Info - Auto-filled */}
                <Card className="p-4 bg-accent/50">
                  <h3 className="text-sm font-semibold mb-3">Student Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">Alex Johnson</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Student ID:</span>
                      <span className="font-medium">STU123456</span>
                    </div>
                  </div>
                </Card>

                {/* Academic Year */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requestForm.academicYear}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, academicYear: e.target.value })
                    }
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Delivery Method <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        setRequestForm({ ...requestForm, deliveryMethod: 'pdf' })
                      }
                      className={`p-4 rounded-xl border-2 transition-all ${
                        requestForm.deliveryMethod === 'pdf'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Download className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-medium text-sm">PDF Download</p>
                      <p className="text-xs text-muted-foreground">Instant download</p>
                    </button>
                    <button
                      onClick={() =>
                        setRequestForm({ ...requestForm, deliveryMethod: 'email' })
                      }
                      className={`p-4 rounded-xl border-2 transition-all ${
                        requestForm.deliveryMethod === 'email'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Mail className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-medium text-sm">Email</p>
                      <p className="text-xs text-muted-foreground">Send to inbox</p>
                    </button>
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    placeholder="e.g., For visa application, scholarship purpose..."
                    value={requestForm.notes}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, notes: e.target.value })
                    }
                    className="w-full h-24 px-4 py-3 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitRequest}
                  className="flex-1 h-12 rounded-xl"
                >
                  Submit Request
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
