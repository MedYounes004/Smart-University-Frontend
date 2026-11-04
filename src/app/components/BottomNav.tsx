import { motion } from 'motion/react';
import { Home, BookOpen, Sparkles, Calendar, User, Settings } from 'lucide-react';

type UserRole = 'student' | 'professor' | 'admin';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole?: UserRole;
  onManagementClick?: () => void;
}

export function BottomNav({ activeTab, onTabChange, userRole = 'student', onManagementClick }: BottomNavProps) {
  const getTabsForRole = () => {
    if (userRole === 'student') {
      return [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'ai', label: 'AI', icon: Sparkles },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'profile', label: 'Profile', icon: User },
      ];
    } else if (userRole === 'professor') {
      return [
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'management', label: 'Manage', icon: Settings, onClick: onManagementClick },
        { id: 'ai', label: 'AI', icon: Sparkles },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'profile', label: 'Profile', icon: User },
      ];
    } else {
      return [
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'profile', label: 'Profile', icon: User },
      ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border">
      <nav className="max-w-md mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => tab.onClick ? tab.onClick() : onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center p-2 rounded-xl transition-colors flex-1"
              >
                <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Icon className="w-6 h-6" />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -inset-2 bg-primary/10 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
