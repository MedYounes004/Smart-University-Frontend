import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  calendarOutline,
  notificationsOutline,
  sparklesOutline,
} from 'ionicons/icons';

export interface Course {
  id: string;
  code: string;
  name: string;
  nextClass?: string;
  room: string;
  color: string;
}

export interface AppEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  attendees: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'urgent' | 'important' | 'info';
}

// ── Mock data (swap with a service later) ────────────────────────────────────
const mockCourses: Course[] = [
  { id: '1', code: 'CS401',   name: 'Algorithms & Data Structures', nextClass: '08:30 AM', room: 'Room B-204', color: '#6366f1' },
  { id: '2', code: 'MATH302', name: 'Linear Algebra',               nextClass: '10:00 AM', room: 'Room A-110', color: '#8b5cf6' },
  { id: '3', code: 'WEB201',  name: 'Web Development',              nextClass: '02:00 PM', room: 'Lab C-01',   color: '#a855f7' },
];

const mockEvents: AppEvent[] = [
  { id: '1', title: 'Spring Tech Symposium', date: '2025-03-15', time: '10:00 AM – 4:00 PM',   category: 'Conference',  attendees: 240 },
  { id: '2', title: 'Hackathon 2025',        date: '2025-03-22', time: '09:00 AM – 09:00 PM', category: 'Competition', attendees: 120 },
];

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Exam Schedule Released', content: 'The final exam schedule for the spring semester is now available on the portal.', category: 'urgent' },
  { id: '2', title: 'Library Extended Hours', content: 'The main library will remain open until midnight during the exam period.',         category: 'important' },
  { id: '3', title: 'Campus Wi-Fi Maintenance', content: 'Planned maintenance on Saturday between 2 AM and 5 AM. Expect brief outages.',  category: 'info' },
];
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonRippleEffect,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @Output() navigateToAI = new EventEmitter<void>();

  greeting     = '';
  todayLabel   = '';
  todayCourses: Course[]       = [];
  upcomingEvents: AppEvent[]   = [];
  latestAnnouncements: Announcement[] = [];

  constructor() {
    addIcons({ timeOutline, calendarOutline, notificationsOutline, sparklesOutline });
  }

  ngOnInit(): void {
    this.setGreeting();
    this.todayCourses        = mockCourses.filter(c => c.nextClass);
    this.upcomingEvents      = mockEvents.slice(0, 2);
    this.latestAnnouncements = mockAnnouncements.slice(0, 3);
  }

  private setGreeting(): void {
    const now  = new Date();
    const hour = now.getHours();
    this.greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    this.todayLabel = now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
    });
  }

  getCategoryClass(cat: string): string {
    return cat; // maps to SCSS classes: .urgent / .important / .info
  }

  getDay(dateStr: string): number {
    return new Date(dateStr).getDate();
  }

  getMonth(dateStr: string): string {
    return new Date(dateStr).toLocaleString('en', { month: 'short' });
  }
}