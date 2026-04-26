import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
import {
  IonContent,
  IonIcon,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  schoolOutline,
  bulbOutline,
  calendarOutline,
  locationOutline,
} from 'ionicons/icons';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonRippleEffect],
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @Output() getStarted = new EventEmitter<void>();

  features: Feature[] = [
    {
      icon: 'bulb-outline',
      title: 'AI Assistant',
      description: 'Get instant answers about courses, exams, and procedures',
    },
    {
      icon: 'calendar-outline',
      title: 'Smart Schedule',
      description: 'Never miss a class or event with personalized reminders',
    },
    {
      icon: 'location-outline',
      title: 'Campus Navigator',
      description: 'Find study spaces and book rooms effortlessly',
    },
  ];

  constructor(private navCtrl: NavController) {
     addIcons({ schoolOutline, bulbOutline, calendarOutline, locationOutline });
  }

  onGetStarted(): void {
  this.navCtrl.navigateForward('/login');
  }

  ngOnInit(): void {}
}