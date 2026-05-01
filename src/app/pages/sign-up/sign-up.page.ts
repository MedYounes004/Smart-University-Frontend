import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

type UserRole = 'student' | 'professor';
type Step     = 'role' | 'form';

interface FormData {
  firstName      : string;
  lastName       : string;
  email          : string;
  password       : string;
  confirmPassword: string;
  // Student only
  filiere        : string;
  // Professor only
  grade          : string;
  departement    : string;
}

@Component({
  selector   : 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls  : ['./sign-up.page.scss'],
  standalone : true,
  imports    : [CommonModule, FormsModule, IonicModule],
})
export class SignUpPage {

  step               : Step     = 'role';
  role               : UserRole | null = null;
  showPassword        = false;
  showConfirmPassword = false;
  loading             = false;
  errorMessage        = '';

  formData: FormData = {
    firstName      : '',
    lastName       : '',
    email          : '',
    password       : '',
    confirmPassword: '',
    filiere        : '',
    grade          : '',
    departement    : ''
  };

  constructor(
    private router     : Router,
    private apiService : ApiService,
    private authService: AuthService
  ) {}

  handleRoleSelect(selectedRole: UserRole): void {
    this.role = selectedRole;
    this.step = 'form';
    this.errorMessage = '';
  }

  isFormValid(): boolean {
    const base =
      !!this.formData.firstName        &&
      !!this.formData.lastName         &&
      !!this.formData.email            &&
      !!this.formData.password         &&
      this.formData.password === this.formData.confirmPassword &&
      this.formData.password.length >= 8;

    if (this.role === 'student') {
      return base && !!this.formData.filiere;
    }
    if (this.role === 'professor') {
      return base && !!this.formData.grade && !!this.formData.departement;
    }
    return base;
  }

  handleSubmit(): void {
    if (!this.isFormValid() || this.loading) return;

    this.loading      = true;
    this.errorMessage = '';

    if (this.role === 'student') {
      this.apiService.registerStudent({
        nom     : this.formData.lastName,
        prenom  : this.formData.firstName,
        email   : this.formData.email,
        password: this.formData.password,
        filiere : this.formData.filiere
      }).subscribe({
        next : (res) => this.onSuccess(res),
        error: (err) => this.onError(err)
      });

    } else if (this.role === 'professor') {
      this.apiService.registerProfessor({
        nom         : this.formData.lastName,
        prenom      : this.formData.firstName,
        email       : this.formData.email,
        password    : this.formData.password,
        grade       : this.formData.grade,
        departement : this.formData.departement
      }).subscribe({
        next : (res) => this.onSuccess(res),
        error: (err) => this.onError(err)
      });
    }
  }

  private onSuccess(res: any): void {
    this.loading = false;
    // Save JWT + role + userId
    this.authService.saveUser(res.token, res.role, res.userId);
    // Navigate based on role
    this.router.navigate(['/home']);
  }

  private onError(err: any): void {
    this.loading      = false;
    this.errorMessage = err.error || 'Registration failed. Please try again.';
  }

  onBack(): void {
    if (this.step === 'form') {
      this.step = 'role';
    } else {
      this.router.navigate(['/login']);
    }
  }
}