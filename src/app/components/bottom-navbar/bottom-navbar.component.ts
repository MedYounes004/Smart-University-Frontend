import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, bookOutline, sparklesOutline, locationOutline, personOutline, home, book, sparkles, location, person } from 'ionicons/icons';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IonIcon],
})
export class BottomNavbarComponent implements OnInit {
  tabs = [
    { id: 'home', label: 'Home', icon: 'home', route: '/home', exact: true },
    { id: 'courses', label: 'Courses', icon: 'book', route: '/courses', exact: true },
    { id: 'ai', label: 'AI', icon: 'sparkles', route: '/ai-assisstant', exact: true },
    { id: 'campus', label: 'Campus', icon: 'location', route: '/campus', exact: true },
    { id: 'profile', label: 'Profile', icon: 'person', route: '/profile', exact: true }
  ];

  ngOnInit() {
    addIcons({
      'home': home,
      'home-outline': homeOutline,
      'book': book,
      'book-outline': bookOutline,
      'sparkles': sparkles,
      'sparkles-outline': sparklesOutline,
      'location': location,
      'location-outline': locationOutline,
      'person': person,
      'person-outline': personOutline
    });
  }
}
