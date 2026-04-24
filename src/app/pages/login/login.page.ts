import { Component, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, cardOutline, fingerPrintOutline, arrowBackOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

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
  password = '';
  showPassword = false;
  loading = false;

  constructor(private router: Router) {
    addIcons({ mailOutline, cardOutline, fingerPrintOutline, arrowBackOutline, eyeOutline, eyeOffOutline });
  }

  goBack() {
    if (this.loginMethod()) { this.loginMethod.set(null); this.email = ''; this.password = ''; this.loading = false; return; }
    this.router.navigate(['/onboarding']);
  }

  login() {
    if (!this.email || !this.password) return;
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

  navigateHome() { this.router.navigate(['/home']); }
}