import { Component, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline, cardOutline, fingerPrintOutline, arrowBackOutline
} from 'ionicons/icons';

type LoginMethod = 'email' | 'student-id' | 'biometric' | null;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, IonContent, IonIcon],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginMethod = signal<LoginMethod>(null);
  email = '';
  otpSent = false;
  otpDigits = ['', '', '', '', '', ''];
  loading = false;

  constructor(private router: Router) {
    addIcons({ mailOutline, cardOutline, fingerPrintOutline, arrowBackOutline });
  }

  get otpComplete() { return this.otpDigits.every(d => d.length === 1); }

  onOtpInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/, '').slice(-1);
    this.otpDigits[index] = val;
    if (val && index < 5) {
      const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
      inputs[index + 1]?.focus();
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      if (!this.otpDigits[index] && index > 0) {
        this.otpDigits[index - 1] = '';
        const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
        inputs[index - 1]?.focus();
      } else {
        this.otpDigits[index] = '';
      }
      event.preventDefault();
    }
  }

  goBack() {
    if (this.otpSent) {
      this.otpSent = false;
      this.otpDigits = ['', '', '', '', '', ''];
      return;
    }
    if (this.loginMethod()) {
      this.loginMethod.set(null);
      this.email = '';
      this.loading = false;
      return;
    }
    this.router.navigate(['/onboarding']);
  }

  sendOtp() {
    if (!this.email) return;
    this.otpSent = true;
  }

  verifyOtp() {
    if (!this.otpComplete) return;
    this.navigateHome();
  }

  simulateScan() {
    this.loading = true;
    setTimeout(() => { this.loading = false; this.navigateHome(); }, 1500);
  }

  simulateBiometric() {
    this.loading = true;
    setTimeout(() => { this.loading = false; this.navigateHome(); }, 1000);
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}