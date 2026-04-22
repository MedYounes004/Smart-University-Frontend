import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, bookOutline, sparklesOutline, locationOutline, personOutline, home, book, sparkles, location, person } from 'ionicons/icons';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
})
export class BottomNavbarComponent implements OnInit {
  @Input() activeTab: string = 'home';
  @Output() tabChange = new EventEmitter<string>();

  tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'courses', label: 'Courses', icon: 'book' },
    { id: 'ai', label: 'AI', icon: 'sparkles' },
    { id: 'campus', label: 'Campus', icon: 'location' },
    { id: 'profile', label: 'Profile', icon: 'person' }
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

  onTabClick(tabId: string) {
    this.tabChange.emit(tabId);
  }
}
