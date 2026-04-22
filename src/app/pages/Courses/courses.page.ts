import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, bookOutline, timeOutline, locationOutline, personOutline, sparklesOutline, documentTextOutline } from 'ionicons/icons';
import { Course, mockCourses } from '../../data/mock-data';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { BottomNavbarComponent } from '../../components/bottom-navbar/bottom-navbar.component';
import { DetailCourseComponent } from '../../components/detail-course/detail-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    CourseCardComponent,
    DetailCourseComponent,
    BottomNavbarComponent
  ]
})
export class CoursesPage implements OnInit {
  courses: Course[] = mockCourses;
  selectedCourse: Course | null = null;

  private readonly router = inject(Router);

  ngOnInit(): void {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'book-outline': bookOutline,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'person-outline': personOutline,
      'sparkles-outline': sparklesOutline,
      'document-text-outline': documentTextOutline
    });
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
  }

  goBack() {
    this.selectedCourse = null;
  }

  onNavigateToAI(course?: Course): void {
    const targetCourse = course ?? this.selectedCourse;

    if (targetCourse) {
      this.router.navigate(['/ai-assisstant'], {
        queryParams: { course: targetCourse.code },
      });
      return;
    }

    this.router.navigate(['/ai-assisstant']);
  }
}
