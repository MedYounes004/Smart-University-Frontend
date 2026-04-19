import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-screen',
  templateUrl: 'ai-screen.page.html',
  styleUrls: ['ai-screen.page.scss'],
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class AiScreenPage {
  @ViewChild('content') content!: IonContent;

  messages: ChatMessage[] = [
    { role: 'ai', text: 'Hello! How can I help you today?' },
  ];
  userInput = '';
  isLoading = false;

  private readonly SCROLL_DELAY = 50;
  private readonly SCROLL_ANIMATION_DURATION = 300;
  private readonly AI_RESPONSE_DELAY = 1000;

  constructor() {
    addIcons({ send });
  }

  async sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.messages.push({ role: 'user', text });
    this.userInput = '';
    this.isLoading = true;

    setTimeout(() => {
      this.content.scrollToBottom(this.SCROLL_ANIMATION_DURATION);
    }, this.SCROLL_DELAY);

    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      this.messages.push({
        role: 'ai',
        text: `I received your message: "${text}". (Connect your AI backend here.)`,
      });
      this.isLoading = false;
      setTimeout(() => {
        this.content.scrollToBottom(this.SCROLL_ANIMATION_DURATION);
      }, this.SCROLL_DELAY);
    }, this.AI_RESPONSE_DELAY);
  }
}
