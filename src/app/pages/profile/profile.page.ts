import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { mockCourses } from '../../data/mock-data';
import { BottomNavbarComponent } from '../../components/bottom-navbar/bottom-navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BottomNavbarComponent],
})
export class ProfilePage implements OnInit {
  courses = mockCourses;
  isDarkMode = false;

  ngOnInit() {
    const savedDark = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = savedDark;
    document.body.classList.toggle('dark', savedDark);
  }

  onToggleDarkMode() {
    document.body.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  openAccountSettings() {}

  onLogout() {}
}