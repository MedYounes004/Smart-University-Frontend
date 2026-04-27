// src/app/services/auth.service.ts
// Stores JWT token and user info in localStorage

import { Injectable } from '@angular/core';

export interface StoredUser {
  token : string;
  role  : string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'uni_token';
  private readonly USER_KEY  = 'uni_user';

  // ── Save after login ────────────────────────────────
  saveUser(token: string, role: string, userId: string): void {
    const user: StoredUser = { token, role, userId };
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // ── Get stored token ────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ── Get stored user ─────────────────────────────────
  getUser(): StoredUser | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // ── Get role ────────────────────────────────────────
  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  // ── Check if logged in ──────────────────────────────
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ── Check role ──────────────────────────────────────
  isProfessor(): boolean {
    return this.getRole() === 'PROFESSOR';
  }

  isStudent(): boolean {
    return this.getRole() === 'STUDENT';
  }

  // ── Logout ──────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}