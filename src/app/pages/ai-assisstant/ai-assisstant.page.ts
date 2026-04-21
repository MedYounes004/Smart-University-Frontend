import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA          // ← fixes "ion-page is not a known element"
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  IonButton,
  IonTextarea,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  sparklesOutline,
  hardwareChipOutline,
  personOutline,
  documentTextOutline,
  chevronForwardOutline,
  attachOutline,
  micOutline,
  send
} from 'ionicons/icons';

// ─── Interfaces ───────────────────────────────────────────────
interface ChatSource {
  title: string;
  type: string;
  excerpt: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: ChatSource[];
}

// ─── Mock Data ────────────────────────────────────────────────
const suggestedPrompts: string[] = [
  'What documents do I need for inscription?',
  'When is the CS401 exam?',
  'How do I contact Dr. Mitchell?',
  'How do I request a transcript?',
  'What is the withdrawal deadline?',
  'How many credits is Linear Algebra?'
];

const aiKnowledgeBase = {
  inscription: {
    documents: [
      'National ID card or passport',
      'High school diploma (certified copy)',
      'Birth certificate',
      '4 passport-sized photos',
      'Medical certificate',
      'Proof of address'
    ],
    deadlines: 'Fall semester: September 15 | Spring semester: February 1'
  },
  exams: [
    { course: 'CS401',   date: 'June 12, 2026', time: '9:00 AM – 12:00 PM', location: 'Hall B, Room 201' },
    { course: 'MATH302', date: 'June 14, 2026', time: '2:00 PM – 5:00 PM',  location: 'Hall A, Room 105' }
  ],
  administrative: {
    transcriptRequest:
      '1. Log in to the Student Portal\n2. Go to Academic Records\n3. Click "Request Transcript"\n4. Fill in the form and submit\n5. Allow 3–5 business days for processing',
    courseWithdrawal:
      'You may withdraw from a course without academic penalty until Week 8 of the semester. After that, a "W" grade will appear on your transcript.'
  }
};

// ─── Component ────────────────────────────────────────────────
@Component({
  selector: 'app-ai-assisstant',
  templateUrl: './ai-assisstant.page.html',
  styleUrls: ['./ai-assisstant.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // CUSTOM_ELEMENTS_SCHEMA lets Angular accept ion-page (and any other
  // web components) without throwing "not a known element" errors.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    IonButton,
    IonTextarea,
    IonIcon
  ]
})
export class AiAssisstantPage implements OnInit, AfterViewChecked {

  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  messages: ChatMessage[] = [];
  input = '';
  isTyping = false;
  suggestedPrompts = suggestedPrompts;

  private shouldScroll = false;

  constructor(private cdr: ChangeDetectorRef) {
    addIcons({
      sparklesOutline,
      hardwareChipOutline,
      personOutline,
      documentTextOutline,
      chevronForwardOutline,
      attachOutline,
      micOutline,
      send
    });
  }

  ngOnInit(): void {
    this.messages = [{
      id: '1',
      text: "Hello! I'm your Smart University AI Assistant. I can help you with information about courses, exams, inscription documents, and administrative procedures. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }];
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  get showSuggestions(): boolean {
    return this.messages.length === 1;
  }

  trackById(_: number, msg: ChatMessage): string {
    return msg.id;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  handleSuggestedPrompt(prompt: string): void {
    this.input = prompt;
    this.cdr.markForCheck();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
  }

  handleSend(): void {
    if (!this.input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: this.input,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages = [...this.messages, userMessage];
    const sentText = this.input;
    this.input = '';
    this.isTyping = true;
    this.shouldScroll = true;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.messages = [...this.messages, this.generateAIResponse(sentText)];
      this.isTyping = false;
      this.shouldScroll = true;
      this.cdr.markForCheck();
    }, 1500);
  }

  private generateAIResponse(userMessage: string): ChatMessage {
    const lower = userMessage.toLowerCase();

    if (lower.includes('document') || lower.includes('inscription')) {
      return {
        id: Date.now().toString(),
        text: `For inscription, you'll need:\n\n${aiKnowledgeBase.inscription.documents.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n\nDeadlines: ${aiKnowledgeBase.inscription.deadlines}`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          { title: 'Student Registration Guide 2026', type: 'PDF Document',     excerpt: 'Complete list of required documents for new student registration...' },
          { title: 'Academic Calendar',               type: 'University Policy', excerpt: 'Important dates and deadlines for the academic year...' }
        ]
      };
    }

    if (lower.includes('exam') && lower.includes('cs401')) {
      const exam = aiKnowledgeBase.exams.find(e => e.course === 'CS401');
      return {
        id: Date.now().toString(),
        text: `The CS401 exam is scheduled for:\n\nDate: ${exam?.date}\nTime: ${exam?.time}\nLocation: ${exam?.location}\n\nArrive 15 minutes early with your student ID.`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          { title: 'Final Exam Schedule - Spring 2026', type: 'Academic Document', excerpt: 'Complete examination timetable for all courses...' }
        ]
      };
    }

    if (lower.includes('dr.') || lower.includes('professor') || lower.includes('mitchell')) {
      return {
        id: Date.now().toString(),
        text: `Dr. Sarah Mitchell — Professor, Computer Science Department.\n\nCourse: CS401 - Advanced Algorithms\nOffice: Building A, Room 405\nOffice Hours: Tue & Thu, 3:00–5:00 PM\nEmail: s.mitchell@university.edu`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          { title: 'Faculty Directory', type: 'University Database', excerpt: 'Contact information and profiles for all teaching staff...' }
        ]
      };
    }

    if (lower.includes('transcript')) {
      return {
        id: Date.now().toString(),
        text: `To request a transcript:\n\n${aiKnowledgeBase.administrative.transcriptRequest}`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          { title: 'Student Services Handbook', type: 'Policy Document', excerpt: 'Guidelines for requesting official academic documents...' }
        ]
      };
    }

    if (lower.includes('credit') && lower.includes('linear algebra')) {
      return {
        id: Date.now().toString(),
        text: `MATH302 - Linear Algebra is a 4-credit course.\n\nInstructor: Prof. James Chen\nSchedule: Tue & Thu, 2:00 PM\nLocation: Building B, Room 205`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          { title: 'Course Catalog 2025-2026', type: 'Academic Document', excerpt: 'Complete listing of all courses with credit information...' }
        ]
      };
    }

    if (lower.includes('withdrawal') || lower.includes('drop')) {
      return {
        id: Date.now().toString(),
        text: `Course Withdrawal:\n\n${aiKnowledgeBase.administrative.courseWithdrawal}`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          { title: 'Academic Policies', type: 'University Regulation', excerpt: 'Rules and procedures for course registration changes...' }
        ]
      };
    }

    return {
      id: Date.now().toString(),
      text: `I can help with:\n\n• Course information & schedules\n• Exam dates & locations\n• Instructor details & office hours\n• Inscription documents\n• Administrative procedures\n• Academic policies\n\nCould you be more specific?`,
      sender: 'assistant',
      timestamp: new Date(),
      sources: [
        { title: 'Student Handbook 2026', type: 'General Reference', excerpt: 'Comprehensive guide to university policies and procedures...' }
      ]
    };
  }
}