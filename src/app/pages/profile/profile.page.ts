import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BottomNavbarComponent } from '../../components/bottom-navbar/bottom-navbar.component';
import { AuthService } from '../../services/auth.service';
import { ApiService, StudentProfile, ProfessorProfile } from '../../services/api.service';

@Component({
  selector   : 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls  : ['./profile.page.scss'],
  standalone : true,
  imports    : [CommonModule, FormsModule, IonicModule, BottomNavbarComponent],
})
export class ProfilePage implements OnInit {

  // ── User data ──────────────────────────────────────
  fullName    = '';
  email       = '';
  role        = '';
  courseCount = 0;

  // ── Student specific ───────────────────────────────
  filiere = '';

  // ── Professor specific ─────────────────────────────
  grade       = '';
  departement = '';

  // ── UI state ───────────────────────────────────────
  isDarkMode = false;
  loading    = true;

  constructor(
    private router     : Router,
    private authService: AuthService,
    private apiService : ApiService
  ) {}

  ngOnInit(): void {
    // ── Dark mode ──────────────────────────────────────
    const savedDark = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode  = savedDark;
    document.body.classList.toggle('dark', savedDark);

    // ── Load profile ───────────────────────────────────
    this.loadProfile();
  }

  private loadProfile(): void {
    const token = this.authService.getToken();
    const user  = this.authService.getUser();

    if (!token || !user) {
      this.router.navigate(['/login']);
      return;
    }

    this.role = user.role;

    if (user.role === 'STUDENT') {
      this.apiService.getStudentProfile(token).subscribe({
        next: (profile: StudentProfile) => {
          this.fullName    = `${profile.prenom} ${profile.nom}`;
          this.email       = profile.email;
          this.filiere     = profile.filiere;
          this.courseCount = profile.courseIds?.length ?? 0;
          this.loading     = false;
        },
        error: () => {
          // Fallback to stored data
          this.loadFromStorage(user);
        }
      });

    } else if (user.role === 'PROFESSOR') {
      this.apiService.getProfessorProfile(token).subscribe({
        next: (profile: ProfessorProfile) => {
          this.fullName    = `${profile.prenom} ${profile.nom}`;
          this.email       = profile.email;
          this.grade       = profile.grade;
          this.departement = profile.departement;
          this.courseCount = profile.courseIds?.length ?? 0;
          this.loading     = false;
        },
        error: () => {
          this.loadFromStorage(user);
        }
      });
    }
  }

  private loadFromStorage(user: any): void {
    this.email   = '';
    this.loading = false;
  }

  onToggleDarkMode(): void {
    document.body.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  openAccountSettings(): void {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get roleLabel(): string {
    return this.role === 'PROFESSOR' ? 'Professor' : 'Student';
  }

  get roleDetail(): string {
    return this.role === 'PROFESSOR'
      ? `${this.grade} • ${this.departement}`
      : `${this.filiere}`;
  }
}