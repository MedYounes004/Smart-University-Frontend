import {
  Component, OnInit, AfterViewChecked,
  ViewChild, ElementRef, ChangeDetectionStrategy,
  ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonContent, IonFooter,
  IonButton, IonTextarea, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  sparklesOutline, hardwareChipOutline, personOutline,
  documentTextOutline, chevronForwardOutline,
  attachOutline, micOutline, send, closeOutline
} from 'ionicons/icons';
import { BottomNavbarComponent } from '../../components/bottom-navbar/bottom-navbar.component';
import { ApiService, AskResponse } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

// ─── Interfaces ───────────────────────────────────────────────
interface ChatSource {
  title  : string;
  type   : string;
  excerpt: string;
}

interface ChatMessage {
  id       : string;
  text     : string;
  sender   : 'user' | 'assistant';
  timestamp: Date;
  sources? : ChatSource[];
}

// ─── Suggested Prompts ────────────────────────────────────────
const suggestedPrompts: string[] = [
  'What are the exam rules?',
  'How is the final grade calculated?',
  'What topics are covered in this course?',
  'What is the course schedule?',
  'How do I request a transcript?',
  'What documents do I need for inscription?'
];

// ─── Component ────────────────────────────────────────────────
@Component({
  selector: 'app-ai-assisstant',
  templateUrl: './ai-assisstant.page.html',
  styleUrls: ['./ai-assisstant.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonContent,
    IonFooter, IonButton, IonTextarea, IonIcon,
    BottomNavbarComponent
  ]
})
export class AiAssisstantPage implements OnInit, AfterViewChecked {

  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  messages         : ChatMessage[] = [];
  input             = '';
  isTyping          = false;
  courseCode        = '';
  suggestedPrompts  = suggestedPrompts;
  selectedFile      : File | null = null;

  private shouldScroll          = false;
  private readonly cdr          = inject(ChangeDetectorRef);
  private readonly route        = inject(ActivatedRoute);
  private readonly apiService   = inject(ApiService);
  private readonly authService  = inject(AuthService);

  constructor() {
    addIcons({
      sparklesOutline, hardwareChipOutline, personOutline,
      documentTextOutline, chevronForwardOutline,
      attachOutline, micOutline, send, closeOutline
    });
  }

  // ── Lifecycle ──────────────────────────────────────────────
  ngOnInit(): void {
    // Get course from route: /ai-assistant?course=AI101
    this.courseCode = this.route.snapshot.queryParamMap.get('course') ?? '';

    const courseContext = this.courseCode
      ? `I'm ready to answer questions about course **${this.courseCode}**.`
      : `I can help you with courses, exams, and administrative procedures. You can also attach a PDF and ask me about it!`;

    this.messages = [{
      id       : '1',
      text     : `Hello! I'm your Smart University AI Assistant. ${courseContext} How can I help you today?`,
      sender   : 'assistant',
      timestamp: new Date()
    }];

    this.cdr.markForCheck();
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

  // ── Getters ────────────────────────────────────────────────
  get showSuggestions(): boolean {
    return this.messages.length === 1;
  }

  trackById(_: number, msg: ChatMessage): string {
    return msg.id;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ── Suggested prompts ──────────────────────────────────────
  handleSuggestedPrompt(prompt: string): void {
    this.input = prompt;
    this.cdr.markForCheck();
  }

  // ── Keyboard ───────────────────────────────────────────────
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
  }

  // ── File selection ─────────────────────────────────────────
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.name.endsWith('.pdf')) {
      this.addAssistantMessage('❌ Only PDF files are supported.', []);
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.cdr.markForCheck();

    // Reset input so same file can be re-attached
    input.value = '';
  }

  removeFile(): void {
    this.selectedFile = null;
    this.cdr.markForCheck();
  }

  // ── File upload → FastAPI directly ─────────────────────────
  private async uploadFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    // Use existing courseCode or generate a session ID
    const uploadCourseId = this.courseCode || `session_${Date.now()}`;

    const response = await fetch(
      `http://localhost:8000/upload?course_id=${uploadCourseId}`,
      {
        method : 'POST',
        headers: { 'X-Internal-Key': 'dev-secret-key' },
        body   : formData
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result = await response.json();

    // Set courseCode so future questions search this collection
    this.courseCode = uploadCourseId;

    this.addAssistantMessage(
      `✅ "${file.name}" uploaded successfully!\n` +
      `📦 ${result.chunks_stored} chunks indexed.\n\n` +
      `You can now ask me questions about this document.`,
      []
    );
  }

  // ── Send message ───────────────────────────────────────────
  handleSend(): void {
    const text         = this.input.trim();
    const fileToUpload = this.selectedFile;

    // Nothing to send
    if ((!text && !fileToUpload) || this.isTyping) return;

    // ── Auth guard ─────────────────────────────────────
    const token = this.authService.getToken();
    if (!token) {
      this.addAssistantMessage(
        '🔒 You are not logged in. Please login first.',
        []
      );
      return;
    }

    // ── Course guard (only if no file attached) ────────
    if (!this.courseCode && !fileToUpload) {
      this.addAssistantMessage(
        '📚 Please select a course or attach a PDF first.',
        []
      );
      return;
    }

    // ── Build user message display ─────────────────────
    const displayText = fileToUpload
      ? text
        ? `${text}\n📎 ${fileToUpload.name}`
        : `📎 ${fileToUpload.name}`
      : text;

    const userMessage: ChatMessage = {
      id       : Date.now().toString(),
      text     : displayText,
      sender   : 'user',
      timestamp: new Date()
    };

    this.messages     = [...this.messages, userMessage];
    this.input        = '';
    this.isTyping     = true;
    this.shouldScroll = true;
    this.selectedFile = null;
    this.cdr.markForCheck();

    // ── Ask question via Spring Boot → FastAPI ─────────
   const askQuestion = () => {
  if (!text) {
    this.isTyping     = false;
    this.shouldScroll = true;
    this.cdr.markForCheck();
    return;
  }

  // ── Session upload → call FastAPI directly ─────────
  // ── Real course → call Spring Boot ────────────────
  const isSessionCourse = this.courseCode.startsWith('session_');

  if (isSessionCourse) {
    // Call FastAPI directly (no Spring Boot auth needed)
    fetch(
      `http://localhost:8000/ask?course_id=${this.courseCode}`,
      {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'X-Internal-Key': 'dev-secret-key'
        },
        body: JSON.stringify({ question: text })
      }
    )
    .then(res => res.json())
    .then(response => {
      const sources: ChatSource[] = (response.sources || []).map((s: any) => ({
        title  : s.file,
        type   : `Page ${s.page}`,
        excerpt: `Relevance: ${Math.round(s.score * 100)}%`
      }));
      this.addAssistantMessage(response.answer, sources);
    })
    .catch(() => {
      this.addAssistantMessage(
        '🔌 Cannot connect to server. Make sure FastAPI is running.',
        []
      );
    });

  } else {
    // Call Spring Boot (real course with enrollment check)
    this.apiService.askQuestion(this.courseCode, text, token).subscribe({
      next: (response: AskResponse) => {
        const sources: ChatSource[] = response.sources.map(s => ({
          title  : s.file,
          type   : `Page ${s.page}`,
          excerpt: `Relevance: ${Math.round(s.score * 100)}%`
        }));
        this.addAssistantMessage(response.answer, sources);
      },
      error: (err) => {
        console.error('RAG error:', err);
        const errorText =
          err.status === 404
            ? '📚 No knowledge base found for this course.'
            : err.status === 401
            ? '🔒 Session expired. Please login again.'
            : err.status === 0
            ? '🔌 Cannot connect to server.'
            : '❌ Unable to get a response. Please try again.';
        this.addAssistantMessage(errorText, []);
      }
    });
  }
};

    // ── Upload first if file attached, then ask ────────
    if (fileToUpload) {
      this.uploadFile(fileToUpload)
        .then(() => askQuestion())
        .catch((err) => {
          console.error('Upload error:', err);
          this.addAssistantMessage(
            '❌ Failed to upload the file. Make sure FastAPI is running.',
            []
          );
          this.isTyping = false;
          this.cdr.markForCheck();
        });
    } else {
      askQuestion();
    }
  }

  // ── Add assistant message ──────────────────────────────────
  private addAssistantMessage(text: string, sources: ChatSource[]): void {
    const reply: ChatMessage = {
      id       : Date.now().toString(),
      text,
      sender   : 'assistant',
      timestamp: new Date(),
      sources
    };

    this.messages     = [...this.messages, reply];
    this.isTyping     = false;
    this.shouldScroll = true;
    this.cdr.markForCheck();
  }
}