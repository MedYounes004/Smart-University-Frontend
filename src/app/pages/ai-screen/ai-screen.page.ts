import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon } from '@ionic/angular/standalone';
import type { IonContent as IonContentType } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  sendOutline, micOutline, attachOutline, hardwareChipOutline,
  personOutline, documentTextOutline, chevronForwardOutline, sparklesOutline,
} from 'ionicons/icons';
import {
  trigger, transition, style, animate, query, stagger,
} from '@angular/animations';

// ── Interfaces ──────────────────────────────────────────────────────────────
export interface MessageSource {
  title: string;
  type: string;
  excerpt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: MessageSource[];
}

// ── Mock data ────────────────────────────────────────────────────────────────
const SUGGESTED_PROMPTS = [
  'What documents do I need for inscription?',
  'When is the CS401 exam?',
  'How many credits is Linear Algebra?',
  'How do I request a transcript?',
];

const AI_KNOWLEDGE_BASE = {
  inscription: {
    documents: [
      'National ID or Passport',
      'High School Diploma (original + copy)',
      'Birth Certificate',
      '4 Passport Photos',
      'Proof of Residence',
      'Medical Certificate',
    ],
    deadlines: 'September 15 – October 5, 2026',
  },
  exams: [
    { course: 'CS401', date: 'June 15, 2026', time: '9:00 AM', location: 'Hall A, Room 101' },
  ],
  administrative: {
    transcriptRequest: 'Submit a request via the Student Portal → Academic Records → Request Transcript. Processing takes 5–7 business days.',
    courseWithdrawal: 'Withdrawal deadline: Week 8 of semester. Submit form at the Registrar\'s Office.',
  },
};

// ── Component ────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonContent, IonFooter, IonIcon],
  templateUrl: './ai-screen.page.html',
  styleUrls: ['./ai-screen.page.scss'],
  animations: [
    trigger('messageIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('promptsIn', [
      transition(':enter', [
        query('.prompt-btn', [
          style({ opacity: 0, transform: 'translateX(-16px)' }),
          stagger(80, [
            animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class AiAssistantComponent implements OnInit, AfterViewChecked {
  @ViewChild('ionContent') private ionContent!: IonContentType;

  messages: ChatMessage[] = [];
  input = '';
  isTyping = false;
  suggestedPrompts = SUGGESTED_PROMPTS;

  private shouldScroll = false;

  constructor() {
    addIcons({
      sendOutline, micOutline, attachOutline, hardwareChipOutline,
      personOutline, documentTextOutline, chevronForwardOutline, sparklesOutline,
    });
  }

  ngOnInit(): void {
    this.messages = [
      {
        id: '1',
        text: "Hello! I'm your Smart University AI Assistant. I can help you with information about courses, exams, inscription documents, and administrative procedures. How can I assist you today?",
        sender: 'assistant',
        timestamp: new Date(),
      },
    ];
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  get showSuggestedPrompts(): boolean {
    return this.messages.length === 1;
  }

  selectPrompt(prompt: string): void {
    this.input = prompt;
  }

  handleSend(): void {
    if (!this.input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: this.input,
      sender: 'user',
      timestamp: new Date(),
    };

    this.messages = [...this.messages, userMessage];
    const question = this.input;
    this.input = '';
    this.isTyping = true;
    this.shouldScroll = true;

    setTimeout(() => {
      const response = this.generateAIResponse(question);
      this.messages = [...this.messages, response];
      this.isTyping = false;
      this.shouldScroll = true;
    }, 1500);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  trackById(_: number, msg: ChatMessage): string {
    return msg.id;
  }

  private scrollToBottom(): void {
    this.ionContent?.scrollToBottom(300);
  }

  private generateAIResponse(userMessage: string): ChatMessage {
    const q = userMessage.toLowerCase();

    if (q.includes('document') || q.includes('inscription')) {
      const docs = AI_KNOWLEDGE_BASE.inscription.documents;
      return this.buildResponse(
        `For inscription, you'll need:\n\n${docs.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n\nDeadlines: ${AI_KNOWLEDGE_BASE.inscription.deadlines}`,
        [
          { title: 'Student Registration Guide 2026', type: 'PDF Document', excerpt: 'Complete list of required documents for new student registration...' },
          { title: 'Academic Calendar', type: 'University Policy', excerpt: 'Important dates and deadlines for the academic year...' },
        ]
      );
    }

    if (q.includes('exam') && q.includes('cs401')) {
      const exam = AI_KNOWLEDGE_BASE.exams[0];
      return this.buildResponse(
        `The CS401 (Advanced Algorithms) exam is scheduled for:\n\nDate: ${exam.date}\nTime: ${exam.time}\nLocation: ${exam.location}\n\nArrive 15 minutes early with your student ID.`,
        [{ title: 'Final Exam Schedule – Spring 2026', type: 'Academic Document', excerpt: 'Complete examination timetable for all courses...' }]
      );
    }

    if (q.includes('dr.') || q.includes('professor') || q.includes('mitchell')) {
      return this.buildResponse(
        `Dr. Sarah Mitchell is a Professor in the Computer Science Department.\n\nOffice: Building A, Room 405\nOffice Hours: Tue & Thu, 3:00–5:00 PM\nEmail: s.mitchell@university.edu`,
        [
          { title: 'Faculty Directory', type: 'University Database', excerpt: 'Contact information for all teaching staff...' },
          { title: 'CS Department Page', type: 'Website', excerpt: 'Computer Science faculty and specializations...' },
        ]
      );
    }

    if (q.includes('transcript')) {
      return this.buildResponse(
        `To request a transcript:\n\n${AI_KNOWLEDGE_BASE.administrative.transcriptRequest}`,
        [{ title: 'Student Services Handbook', type: 'Policy Document', excerpt: 'Guidelines for requesting official academic documents...' }]
      );
    }

    if (q.includes('credit') && q.includes('linear algebra')) {
      return this.buildResponse(
        `MATH302 – Linear Algebra is a 4-credit course.\n\nInstructor: Prof. James Chen\nSchedule: Tue & Thu, 2:00 PM\nLocation: Building B, Room 205`,
        [{ title: 'Course Catalog 2025–2026', type: 'Academic Document', excerpt: 'Complete listing of all courses with credit information...' }]
      );
    }

    if (q.includes('withdrawal') || q.includes('drop')) {
      return this.buildResponse(
        `Course Withdrawal:\n\n${AI_KNOWLEDGE_BASE.administrative.courseWithdrawal}\n\nWithdrawing after the deadline may result in a "W" grade on your transcript.`,
        [{ title: 'Academic Policies', type: 'University Regulation', excerpt: 'Rules for course registration changes...' }]
      );
    }

    return this.buildResponse(
      `I can help with:\n\n• Course information and schedules\n• Exam dates and locations\n• Instructor details and office hours\n• Inscription documents\n• Administrative procedures\n\nCould you be more specific?`,
      [{ title: 'Student Handbook 2026', type: 'General Reference', excerpt: 'Comprehensive guide to university policies and procedures...' }]
    );
  }

  private buildResponse(text: string, sources: MessageSource[]): ChatMessage {
    return { id: Date.now().toString(), text, sender: 'assistant', timestamp: new Date(), sources };
  }
}