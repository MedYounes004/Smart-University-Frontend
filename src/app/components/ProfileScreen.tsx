import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, BookOpen, Award, Settings, LogOut, Moon, Sun, FileText, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { mockCourses } from '../data/mockData';
import { DocumentRequestScreen } from './DocumentRequestScreen';

interface ProfileScreenProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ isDarkMode, onToggleDarkMode, onLogout }: ProfileScreenProps) {
  const [showDocumentRequest, setShowDocumentRequest] = useState(false);

  if (showDocumentRequest) {
    return <DocumentRequestScreen onBack={() => setShowDocumentRequest(false)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border-4 border-white/30">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-white">
            <h1 className="text-2xl font-bold">Alex Johnson</h1>
            <p className="text-indigo-100">Computer Science • Junior</p>
            <p className="text-sm text-indigo-200 mt-1">ID: 2023-CS-4567</p>
          </div>
        </motion.div>
      </div>

      <div className="px-6 -mt-12 space-y-6">
        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card className="p-4 bg-card">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{mockCourses.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Courses</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-card">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">3.8</p>
              <p className="text-sm text-muted-foreground mt-1">GPA</p>
            </div>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">alex.johnson@university.edu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Academic Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-3">Academic Progress</h2>
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm">Completed Credits</span>
              </div>
              <span className="font-semibold">89 / 120</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm">Dean's List</span>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">2 times</span>
            </div>
          </Card>
        </motion.div>

        {/* Official Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-lg font-semibold mb-3">Official Documents</h2>
          <Card
            onClick={() => setShowDocumentRequest(true)}
            className="p-4 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-200 dark:border-indigo-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Request Official Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Certificates, transcripts, and more
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="text-lg font-semibold mb-3">Settings</h2>
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <span className="text-sm">Dark Mode</span>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
            </div>
            
            <button className="w-full flex items-center justify-between py-2 hover:bg-accent rounded-lg transition-colors px-2">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-primary" />
                <span className="text-sm">Account Settings</span>
              </div>
            </button>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full rounded-xl h-12 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
