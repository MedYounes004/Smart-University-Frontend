import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonFooter, IonInput, IonButton, IonButtons, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule, NgFor, NgClass,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonFooter, IonInput, IonButton, IonButtons, IonIcon
  ],
})
export class HomePage {
  userInput = '';
  messages: Message[] = [
    { text: 'Hello! How can I assist you today?', sender: 'bot' }
  ];

  constructor() {
    addIcons({ send });
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text) return;
    this.messages.push({ text, sender: 'user' });
    this.userInput = '';
    setTimeout(() => {
      this.messages.push({ text: 'Thank you for your message. I will get back to you shortly.', sender: 'bot' });
    }, 500);
  }
}
