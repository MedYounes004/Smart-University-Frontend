// src/app/services/api.service.ts
// Central file for ALL HTTP calls to Spring Boot + FastAPI

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// ─── Interfaces ───────────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token : string;
  role  : string;
  userId: string;
}

export interface RegisterStudentRequest {
  nom     : string;
  prenom  : string;
  email   : string;
  password: string;
  filiere : string;
}

export interface RegisterProfessorRequest {
  nom        : string;
  prenom     : string;
  email      : string;
  password   : string;
  grade      : string;
  departement: string;
}

export interface Course {
  id            : string;
  name          : string;
  code          : string;
  description   : string;
  filiere       : string;
  semester      : string;
  professorId   : string;
  studentIds    : string[];
  documentsCount: number;
  uploadedFiles : string[];
}

export interface AskRequest {
  question: string;
}

export interface AskResponse {
  question : string;
  answer   : string;
  sources  : { file: string; page: number; score: number }[];
  course_id: string;
}

// ── NEW: Profile interfaces ────────────────────────────────────
export interface StudentProfile {
  id       : string;
  nom      : string;
  prenom   : string;
  email    : string;
  filiere  : string;
  role     : string;
  courseIds: string[];
}

export interface ProfessorProfile {
  id         : string;
  nom        : string;
  prenom     : string;
  email      : string;
  grade      : string;
  departement: string;
  role       : string;
  courseIds  : string[];
}

// ─── Service ──────────────────────────────────────────────────
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // ── Base URLs ──────────────────────────────────────────
  private readonly springUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  // ── Auth headers helper ────────────────────────────────
  private authHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json'
    });
  }

  // ══════════════════════════════════════════════════════
  //  AUTH
  // ══════════════════════════════════════════════════════

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.springUrl}/auth/login`, request
    );
  }

  registerStudent(request: RegisterStudentRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.springUrl}/auth/register/student`, request
    );
  }

  registerProfessor(request: RegisterProfessorRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.springUrl}/auth/register/professor`, request
    );
  }

  // ══════════════════════════════════════════════════════
  //  PROFILE
  // ══════════════════════════════════════════════════════

  getStudentProfile(token: string): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(
      `${this.springUrl}/student/profile`,
      { headers: this.authHeaders(token) }
    );
  }

  getProfessorProfile(token: string): Observable<ProfessorProfile> {
    return this.http.get<ProfessorProfile>(
      `${this.springUrl}/professor/profile`,
      { headers: this.authHeaders(token) }
    );
  }

  // ══════════════════════════════════════════════════════
  //  COURSES
  // ══════════════════════════════════════════════════════

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.springUrl}/courses`);
  }

  getMyCourses(token: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.springUrl}/student/courses`,
      { headers: this.authHeaders(token) }
    );
  }

  enrollInCourse(courseId: string, token: string): Observable<Course> {
    return this.http.post<Course>(
      `${this.springUrl}/student/courses/${courseId}/enroll`,
      {},
      { headers: this.authHeaders(token) }
    );
  }

  // ══════════════════════════════════════════════════════
  //  RAG ASSISTANT (student)
  // ══════════════════════════════════════════════════════

  askQuestion(courseCode: string, question: string, token: string): Observable<AskResponse> {
    return this.http.post<AskResponse>(
      `${this.springUrl}/student/courses/${courseCode}/ask`,
      { question },
      { headers: this.authHeaders(token) }
    );
  }

  // ══════════════════════════════════════════════════════
  //  PROFESSOR
  // ══════════════════════════════════════════════════════

  getProfessorCourses(token: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.springUrl}/professor/courses`,
      { headers: this.authHeaders(token) }
    );
  }

  createCourse(course: Partial<Course>, token: string): Observable<Course> {
    return this.http.post<Course>(
      `${this.springUrl}/professor/courses`,
      course,
      { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) }
    );
  }

  uploadPdf(courseCode: string, file: File, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `${this.springUrl}/professor/courses/${courseCode}/upload`,
      formData,
      { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) }
    );
  }
}