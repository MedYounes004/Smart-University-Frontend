import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline, cardOutline, fingerPrintOutline,
  arrowBackOutline, eyeOutline, eyeOffOutline
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

type LoginMethod = 'email' | 'student-id' | 'biometric' | null;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, IonContent, IonIcon],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  loginMethod = signal<LoginMethod>(null);
  email       = '';
  password    = '';
  showPassword = false;
  loading     = false;
  errorMessage = '';

  constructor(
    private router     : Router,
    private apiService : ApiService,
    private authService: AuthService
  ) {
    addIcons({
      mailOutline, cardOutline, fingerPrintOutline,
      arrowBackOutline, eyeOutline, eyeOffOutline
    });
  }

  goBack(): void {
    if (this.loginMethod()) {
      this.loginMethod.set(null);
      this.email        = '';
      this.password     = '';
      this.loading      = false;
      this.errorMessage = '';
      return;
    }
    this.router.navigate(['/onboarding']);
  }

  // ── Email + Password Login ──────────────────────────
  login(): void {
    if (!this.email || !this.password) return;

    this.loading      = true;
    this.errorMessage = '';

    this.apiService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          // Save JWT + role + userId in localStorage
          this.authService.saveUser(
            response.token,
            response.role,
            response.userId
          );
          this.loading = false;
          this.navigateByRole(response.role);
        },
        error: (err) => {
          this.loading      = false;
          this.errorMessage = err.error || 'Invalid email or password.';
        }
      });
  }

  // ── Simulate NFC Scan (future feature) ─────────────
  simulateScan(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.errorMessage = 'NFC login coming soon!';
    }, 1500);
  }

  // ── Simulate Biometric (future feature) ────────────
  simulateBiometric(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.errorMessage = 'Biometric login coming soon!';
    }, 1000);
  }

  // ── Navigate based on role ──────────────────────────
 private navigateByRole(role: string): void {
  if (role === 'PROFESSOR') {
    this.router.navigate(['/home']);   // ← route both to home for now
  } else {
    this.router.navigate(['/home']);
  }
}
// In your login.page.ts

onGoToSignUp(): void {
  this.router.navigate(['/sign-up']);
}
}