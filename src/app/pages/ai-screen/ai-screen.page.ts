import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonTextarea,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-screen',
  templateUrl: 'ai-screen.page.html',
  styleUrls: ['ai-screen.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonTextarea,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
  ],
})
export class AiScreenPage {
  @ViewChild('scrollContent') private scrollContent!: IonContent;

  messages: ChatMessage[] = [
    {
      text: 'Hello! I am your Smart University AI Assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ];

  userInput = '';
  isLoading = false;

  constructor() {
    addIcons({ send });
  }

  onEnterKey(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.isLoading) {
      return;
    }

    this.messages.push({ text, isUser: true, timestamp: new Date() });
    this.userInput = '';
    this.isLoading = true;
    this.scrollToBottom();

    // Simulate AI response after a short delay
    setTimeout(() => {
      this.messages.push({
        text: this.generateResponse(text),
        isUser: false,
        timestamp: new Date(),
      });
      this.isLoading = false;
      this.scrollToBottom();
    }, 1000);
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContent) {
        this.scrollContent.scrollToBottom(300);
      }
    }, 50);
  }

  private generateResponse(input: string): string {
    const lower = input.toLowerCase();
    if (lower.includes('schedule') || lower.includes('timetable')) {
      return 'You can view your class schedule in the Schedule section of the app.';
    }
    if (lower.includes('grade') || lower.includes('result')) {
      return 'Your grades and results are available in the Grades section.';
    }
    if (lower.includes('hello') || lower.includes('hi')) {
      return 'Hi there! How can I assist you with your university needs?';
    }
    return "I'm here to help with anything related to your university. Could you please provide more details?";
  }
}
