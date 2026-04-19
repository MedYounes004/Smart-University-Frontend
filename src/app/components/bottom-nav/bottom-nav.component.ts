import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  home,
  bookOutline,
  book,
  sparklesOutline,
  sparkles,
  locationOutline,
  location,
  personOutline,
  person,
} from 'ionicons/icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

interface Tab {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, IonTabBar, IonTabButton, IonIcon, IonLabel],
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  animations: [
    trigger('activeBackground', [
      state('inactive', style({ opacity: 0, transform: 'scale(0.7)' })),
      state('active',   style({ opacity: 1, transform: 'scale(1)' })),
      transition('inactive => active', animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)')),
      transition('active => inactive', animate('200ms ease-out')),
    ]),
  ],
})
export class BottomNavComponent {
  @Input() activeTab: string = 'home';
  @Output() tabChange = new EventEmitter<string>();

  tabs: Tab[] = [
    { id: 'home',    label: 'Home',    icon: 'home-outline',      activeIcon: 'home'          },
    { id: 'courses', label: 'Courses', icon: 'book-outline',      activeIcon: 'book'          },
    { id: 'ai',      label: 'AI',      icon: 'sparkles-outline',  activeIcon: 'sparkles'      },
    { id: 'campus',  label: 'Campus',  icon: 'location-outline',  activeIcon: 'location'      },
    { id: 'profile', label: 'Profile', icon: 'person-outline',    activeIcon: 'person'        },
  ];

  constructor() {
    addIcons({
      homeOutline, home,
      bookOutline, book,
      sparklesOutline, sparkles,
      locationOutline, location,
      personOutline, person,
    });
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  selectTab(tabId: string): void {
    this.tabChange.emit(tabId);
  }
}