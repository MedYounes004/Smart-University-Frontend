import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, GraduationCap, Briefcase, Mail, IdCard, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api } from '../services/api';


interface SignUpScreenProps {
  onSignUp: (role: UserRole) => void;
  onBack: () => void;
}

type UserRole = 'student' | 'professor' | 'admin';

export function SignUpScreen({ onSignUp, onBack }: SignUpScreenProps) {
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [role, setRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('form');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.idNumber &&
      formData.password &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid() || !role) return;
    if (role === 'admin') { setError('Administrator accounts must be created by an existing administrator.'); return; }
    setSubmitting(true); setError('');
    try { await api.register({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email, password: formData.password, role, studentId: role === 'student' ? formData.idNumber : undefined, employeeId: role === 'professor' ? formData.idNumber : undefined }); onSignUp(role); }
    catch (e) { setError(e instanceof Error ? e.message : 'Registration failed'); }
    finally { setSubmitting(false); }
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen bg-background flex flex-col p-6">
        <button
          onClick={onBack}
          className="self-start mb-8 p-2 hover:bg-accent rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
        >
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-muted-foreground mb-12">
            Select your role to get started
          </p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('student')}
              className="w-full p-8 rounded-2xl border-2 border-border hover:border-primary bg-card flex flex-col items-center gap-4 transition-all"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">I'm a Student</h3>
                <p className="text-sm text-muted-foreground">Access courses, events, and campus resources</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('professor')}
              className="w-full p-8 rounded-2xl border-2 border-border hover:border-primary bg-card flex flex-col items-center gap-4 transition-all"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">I'm a Professor</h3>
                <p className="text-sm text-muted-foreground">Manage courses, students, and academic content</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('admin')}
              className="w-full p-8 rounded-2xl border-2 border-border hover:border-primary bg-card flex flex-col items-center gap-4 transition-all"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">I'm an Administrator</h3>
                <p className="text-sm text-muted-foreground">Manage users, events, and document requests</p>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <button
        onClick={() => setStep('role')}
        className="self-start mb-8 p-2 hover:bg-accent rounded-xl transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col max-w-md mx-auto w-full"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              role === 'student'
                ? 'bg-gradient-to-br from-primary to-blue-600'
                : 'bg-gradient-to-br from-purple-600 to-indigo-600'
            }`}>
              {role === 'student' ? (
                <GraduationCap className="w-6 h-6 text-white" />
              ) : (
                <Briefcase className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                {role === 'student' ? 'Student' : 'Professor'} Registration
              </h2>
            </div>
          </div>
          <p className="text-muted-foreground">
            Fill in your details to create your account
          </p>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="h-12 rounded-xl pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Last Name</label>
              <Input
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">University Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder={role === 'student' ? 'student@university.edu' : 'professor@university.edu'}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 rounded-xl pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              {role === 'student' ? 'Student ID' : 'Employee ID'}
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={role === 'student' ? 'STU123456' : 'EMP789012'}
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className="h-12 rounded-xl pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="h-12 rounded-xl pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.password && formData.password.length < 8 && (
              <p className="text-xs text-red-500 mt-1">Password must be at least 8 characters</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="h-12 rounded-xl pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
        </div>

        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        <div className="space-y-3 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || submitting}
            className="w-full h-14 rounded-2xl"
          >
            {submitting ? 'Creating account...' : 'Create Account'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}
