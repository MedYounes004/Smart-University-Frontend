import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonBadge, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  documentTextOutline,
  locationOutline,
  personOutline,
  sparklesOutline,
  timeOutline,
} from 'ionicons/icons';
import { Course } from '../../data/mock-data';

type CourseTab = 'overview' | 'syllabus' | 'resources';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonBadge, IonButton],
})
export class DetailCourseComponent {
  activeTab: CourseTab = 'overview';

  private _course!: Course;

  @Input()
  set course(value: Course) {
    this._course = value;
    this.activeTab = 'overview';
  }

  get course(): Course {
    return this._course;
  }

  @Output() navigateToAI = new EventEmitter<Course>();

  constructor() {
    addIcons({
      'book-outline': bookOutline,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'person-outline': personOutline,
      'sparkles-outline': sparklesOutline,
      'document-text-outline': documentTextOutline,
    });
  }

  get roomShort(): string {
    const parts = this.course.room.split(',');
    return (parts[1] ?? parts[0] ?? '').trim();
  }

  setTab(tab: CourseTab): void {
    this.activeTab = tab;
  }

  askAI(): void {
    this.navigateToAI.emit(this.course);
  }
}
