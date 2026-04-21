import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline, bookOutline, sparklesOutline,
  locationOutline, personOutline,
  home, book, sparkles, location, person
} from 'ionicons/icons';

interface Tab {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
}

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonLabel],
})
export class BottomNavComponent {
  @Input() activeTab: string = 'home';
  @Output() tabChange = new EventEmitter<string>();

  tabs: Tab[] = [
    { id: 'home',    label: 'Home',    icon: 'home-outline',     activeIcon: 'home' },
    { id: 'courses', label: 'Courses', icon: 'book-outline',     activeIcon: 'book' },
    { id: 'ai',      label: 'AI',      icon: 'sparkles-outline', activeIcon: 'sparkles' },
    { id: 'campus',  label: 'Campus',  icon: 'location-outline', activeIcon: 'location' },
    { id: 'profile', label: 'Profile', icon: 'person-outline',   activeIcon: 'person' },
  ];

  constructor() {
    addIcons({
      homeOutline, bookOutline, sparklesOutline, locationOutline, personOutline,
      home, book, sparkles, location, person
    });
  }

  onTabClick(tabId: string) {
    this.tabChange.emit(tabId);
  }
}