import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

type UserRole = 'student' | 'professor';
type Step = 'role' | 'form';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SignUpPage {
  @Output() signedUp = new EventEmitter<void>();
  @Output() backPressed = new EventEmitter<void>();

  step: Step = 'role';
  role: UserRole | null = null;
  showPassword = false;
  showConfirmPassword = false;

  formData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
  };

  handleRoleSelect(selectedRole: UserRole): void {
    this.role = selectedRole;
    this.step = 'form';
  }

  handleInputChange(field: keyof FormData, value: string): void {
    this.formData[field] = value;
  }

  isFormValid(): boolean {
    return (
      !!this.formData.firstName &&
      !!this.formData.lastName &&
      !!this.formData.email &&
      !!this.formData.idNumber &&
      !!this.formData.password &&
      this.formData.password === this.formData.confirmPassword &&
      this.formData.password.length >= 8
    );
  }

  handleSubmit(): void {
    if (this.isFormValid()) {
      this.signedUp.emit();
    }
  }

  onBack(): void {
    this.backPressed.emit();
  }
}