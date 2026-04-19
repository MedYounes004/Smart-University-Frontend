import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
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
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
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
    IonTextarea,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonSpinner,
  ],
})
export class AiScreenPage {
  private static readonly SCROLL_DELAY_MS = 50;
  private static readonly SCROLL_ANIMATION_DURATION = 300;

  @ViewChild('scrollContent') scrollContent!: IonContent;

  userInput = '';
  messages: ChatMessage[] = [];
  isLoading = false;

  constructor() {
    addIcons({ send });
  }

  onEnterKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.sendMessage();
    }
  }

  async sendMessage(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.isLoading) {
      return;
    }

    this.messages.push({ role: 'user', content: text });
    this.userInput = '';
    this.isLoading = true;
    this.scrollToBottom();

    try {
      const reply = await this.getAiReply(text);
      this.messages.push({ role: 'ai', content: reply });
    } catch {
      this.messages.push({
        role: 'ai',
        content: 'Sorry, I could not process your request. Please try again.',
      });
    } finally {
      this.isLoading = false;
      this.scrollToBottom();
    }
  }

  private async getAiReply(userMessage: string): Promise<string> {
    // Placeholder: replace with actual AI service call
    await new Promise((resolve) => setTimeout(resolve, 800));
    return `You said: "${userMessage}". (Connect your AI service here.)`;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.scrollContent?.scrollToBottom(AiScreenPage.SCROLL_ANIMATION_DURATION);
    }, AiScreenPage.SCROLL_DELAY_MS);
  }
}
