import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { Dashboard } from './components/Dashboard';
import { ProfessorDashboard } from './components/ProfessorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AIAssistant } from './components/AIAssistant';
import { CoursesScreen } from './components/CoursesScreen';
import { ProfessorCoursesScreen } from './components/ProfessorCoursesScreen';
import { ProfessorManagementScreen } from './components/ProfessorManagementScreen';
import { EventsFormationsScreen } from './components/EventsFormationsScreen';
import { AdminUserManagement } from './components/AdminUserManagement';
import { AdminDocumentManagement } from './components/AdminDocumentManagement';
import { AdminEventManagement } from './components/AdminEventManagement';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { CourseProvider } from './contexts/CourseContext';
import { clearSession } from './services/api';

type AppState = 'welcome' | 'login' | 'signup' | 'app';
type AppTab = 'home' | 'courses' | 'ai' | 'events' | 'profile';
type AdminView = 'dashboard' | 'users' | 'documents' | 'events';
type ProfessorView = 'dashboard' | 'courses' | 'management';
type UserRole = 'student' | 'professor' | 'admin';

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [professorView, setProfessorView] = useState<ProfessorView>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleGetStarted = () => {
    setAppState('login');
  };

  const handleGoToSignUp = () => {
    setAppState('signup');
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setAppState('app');
    setActiveTab('home');
  };

  const handleSignUp = (role: UserRole) => {
    setUserRole(role);
    setAppState('app');
    setActiveTab('home');
  };

  const handleLogout = () => {
    clearSession();
    setAppState('welcome');
    setActiveTab('home');
    setUserRole('student');
  };

  const handleNavigateToAI = () => {
    setActiveTab('ai');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  if (appState === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (appState === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onBack={() => setAppState('welcome')}
        onGoToSignUp={handleGoToSignUp}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignUpScreen
        onSignUp={handleSignUp}
        onBack={() => setAppState('welcome')}
      />
    );
  }

  return (
    <CourseProvider>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="max-w-md mx-auto bg-background min-h-screen relative">
        {userRole === 'student' ? (
          <>
            {activeTab === 'home' && <Dashboard onNavigateToAI={handleNavigateToAI} />}
            {activeTab === 'courses' && <CoursesScreen onNavigateToAI={handleNavigateToAI} />}
            {activeTab === 'ai' && <AIAssistant />}
            {activeTab === 'events' && <EventsFormationsScreen />}
            {activeTab === 'profile' && (
              <ProfileScreen
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
                onLogout={handleLogout}
              />
            )}
          </>
        ) : userRole === 'professor' ? (
          <>
            {professorView === 'dashboard' && (
              <ProfessorDashboard
                onNavigateToCourses={() => setProfessorView('courses')}
                onNavigateToManagement={() => setProfessorView('management')}
              />
            )}
            {professorView === 'courses' && <ProfessorCoursesScreen />}
            {professorView === 'management' && <ProfessorManagementScreen onBack={() => setProfessorView('dashboard')} />}
            {activeTab === 'ai' && <AIAssistant />}
            {activeTab === 'events' && <EventsFormationsScreen />}
            {activeTab === 'profile' && (
              <ProfileScreen
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
                onLogout={handleLogout}
              />
            )}
          </>
        ) : (
          <>
            {adminView === 'dashboard' && (
              <AdminDashboard
                onNavigateToUsers={() => setAdminView('users')}
                onNavigateToDocuments={() => setAdminView('documents')}
                onNavigateToEvents={() => setAdminView('events')}
              />
            )}
            {adminView === 'users' && <AdminUserManagement onBack={() => setAdminView('dashboard')} />}
            {adminView === 'documents' && <AdminDocumentManagement onBack={() => setAdminView('dashboard')} />}
            {adminView === 'events' && <AdminEventManagement onBack={() => setAdminView('dashboard')} />}
            {activeTab === 'profile' && (
              <ProfileScreen
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
                onLogout={handleLogout}
              />
            )}
          </>
        )}

        {/* Bottom Navigation - Only for students and professor AI/Events/Profile */}
        {(userRole === 'student' || (userRole === 'professor' && (activeTab === 'ai' || activeTab === 'events' || activeTab === 'profile')) || (userRole === 'admin' && activeTab === 'profile')) && (
          <BottomNav
            activeTab={userRole === 'professor' && professorView !== 'dashboard' ? activeTab : userRole === 'admin' ? 'home' : activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab as AppTab);
              if (userRole === 'professor') {
                if (tab === 'home') setProfessorView('dashboard');
              }
              if (userRole === 'admin') {
                if (tab === 'home') setAdminView('dashboard');
              }
            }}
            userRole={userRole}
            onManagementClick={userRole === 'professor' ? () => setProfessorView('management') : undefined}
          />
        )}
        </div>
      </div>
    </CourseProvider>
  );
}
