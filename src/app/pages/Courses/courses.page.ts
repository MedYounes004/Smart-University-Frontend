import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, bookOutline, timeOutline, locationOutline, personOutline, sparklesOutline, documentTextOutline } from 'ionicons/icons';
import { Course, mockCourses } from '../../data/mock-data';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonButton, 
    IonIcon, 
    IonBadge,
    CourseCardComponent
  ]
})
export class CoursesPage implements OnInit {
  courses: Course[] = mockCourses;
  selectedCourse: Course | null = null;
  activeTab: string = 'overview';

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
    this.activeTab = 'overview';
  }

  goBack() {
    this.selectedCourse = null;
  }

  onNavigateToAI() {
    // Navigate to AI tab or page
    console.log('Navigate to AI');
  }
}
