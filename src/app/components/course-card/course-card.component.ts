import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, personOutline, timeOutline } from 'ionicons/icons';
import { Course } from '../../data/mock-data';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
})
export class CourseCardComponent {
  @Input() course!: Course;

  constructor() {
    addIcons({
      'book-outline': bookOutline,
      'person-outline': personOutline,
      'time-outline': timeOutline
    });
  }
}
