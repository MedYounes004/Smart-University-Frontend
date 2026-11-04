export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  room: string;
  credits: number;
  description: string;
  syllabus: string;
  nextClass?: string;
  color: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'social' | 'sports' | 'cultural';
  description: string;
  attendees: number;
  isRSVP: boolean;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  members: number;
  description: string;
  nextMeeting: string;
  isMember: boolean;
}

export interface StudySpace {
  id: string;
  name: string;
  capacity: number;
  available: number;
  floor: string;
  amenities: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'urgent' | 'important' | 'info';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: {
    title: string;
    type: string;
    excerpt: string;
  }[];
}

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS401',
    name: 'Advanced Algorithms',
    instructor: 'Dr. Sarah Mitchell',
    schedule: 'Mon, Wed 10:00 AM',
    room: 'Building A, Room 301',
    credits: 3,
    description: 'Study of advanced algorithmic techniques including dynamic programming, greedy algorithms, and graph algorithms.',
    syllabus: 'Week 1-4: Dynamic Programming\nWeek 5-8: Graph Algorithms\nWeek 9-12: Advanced Data Structures\nWeek 13-15: Algorithm Design Patterns',
    nextClass: 'Today, 10:00 AM',
    color: '#6366f1'
  },
  {
    id: '2',
    code: 'MATH302',
    name: 'Linear Algebra',
    instructor: 'Prof. James Chen',
    schedule: 'Tue, Thu 2:00 PM',
    room: 'Building B, Room 205',
    credits: 4,
    description: 'Vector spaces, linear transformations, eigenvalues and eigenvectors, applications to differential equations.',
    syllabus: 'Week 1-3: Vector Spaces\nWeek 4-6: Linear Transformations\nWeek 7-10: Eigenvalues & Eigenvectors\nWeek 11-15: Applications',
    nextClass: 'Tomorrow, 2:00 PM',
    color: '#ec4899'
  },
  {
    id: '3',
    code: 'PHY201',
    name: 'Quantum Mechanics',
    instructor: 'Dr. Emily Rodriguez',
    schedule: 'Mon, Wed, Fri 9:00 AM',
    room: 'Science Wing, Room 102',
    credits: 4,
    description: 'Introduction to quantum theory, wave functions, Schrödinger equation, and quantum systems.',
    syllabus: 'Week 1-4: Wave Mechanics\nWeek 5-8: Schrödinger Equation\nWeek 9-12: Quantum Systems\nWeek 13-15: Applications',
    color: '#10b981'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Career Fair 2026',
    date: '2026-02-20',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    category: 'academic',
    description: 'Meet with top tech companies and explore internship opportunities.',
    attendees: 450,
    isRSVP: false
  },
  {
    id: '2',
    title: 'Spring Music Festival',
    date: '2026-02-25',
    time: '6:00 PM - 10:00 PM',
    location: 'Campus Green',
    category: 'cultural',
    description: 'Annual spring concert featuring student bands and performances.',
    attendees: 320,
    isRSVP: true
  },
  {
    id: '3',
    title: 'Basketball Championship',
    date: '2026-02-18',
    time: '7:00 PM',
    location: 'Sports Complex',
    category: 'sports',
    description: 'Final game of the university basketball championship.',
    attendees: 280,
    isRSVP: false
  }
];

export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Robotics Club',
    category: 'Technology',
    members: 85,
    description: 'Build autonomous robots and compete in national competitions.',
    nextMeeting: 'Thursday, 5:00 PM',
    isMember: true
  },
  {
    id: '2',
    name: 'Debate Society',
    category: 'Academic',
    members: 62,
    description: 'Develop critical thinking and public speaking skills through structured debates.',
    nextMeeting: 'Tuesday, 6:00 PM',
    isMember: false
  },
  {
    id: '3',
    name: 'Photography Club',
    category: 'Arts',
    members: 94,
    description: 'Explore photography techniques and showcase your work in exhibitions.',
    nextMeeting: 'Friday, 4:00 PM',
    isMember: true
  }
];

export const mockStudySpaces: StudySpace[] = [
  {
    id: '1',
    name: 'Main Library - Study Hall',
    capacity: 120,
    available: 45,
    floor: '2nd Floor',
    amenities: ['WiFi', 'Power Outlets', 'Quiet Zone']
  },
  {
    id: '2',
    name: 'Engineering Building - Lab 3',
    capacity: 30,
    available: 8,
    floor: '3rd Floor',
    amenities: ['Computers', 'Projector', 'Whiteboard']
  },
  {
    id: '3',
    name: 'Student Center - Group Rooms',
    capacity: 24,
    available: 12,
    floor: '1st Floor',
    amenities: ['Whiteboard', 'TV Screen', 'Collaborative Space']
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Registration for Summer Semester Opens',
    content: 'Course registration for Summer 2026 opens on February 20th at 8:00 AM.',
    date: '2026-02-13',
    category: 'important'
  },
  {
    id: '2',
    title: 'Library Closure Notice',
    content: 'The main library will be closed on February 16th for maintenance.',
    date: '2026-02-12',
    category: 'info'
  },
  {
    id: '3',
    title: 'Scholarship Deadline Approaching',
    content: 'Submit your scholarship applications by February 28th. Don\'t miss out!',
    date: '2026-02-10',
    category: 'urgent'
  }
];

export const aiKnowledgeBase = {
  inscription: {
    documents: [
      'Valid photo ID (National ID or Passport)',
      'High school diploma or equivalent certificate',
      'Official transcripts from previous institutions',
      'Proof of address (utility bill, not older than 3 months)',
      'Two passport-sized photos',
      'Medical certificate',
      'Payment receipt for registration fees'
    ],
    deadlines: 'Fall semester: August 15th, Spring semester: January 10th'
  },
  courses: mockCourses,
  exams: [
    { course: 'CS401', date: '2026-05-15', time: '9:00 AM', location: 'Exam Hall A' },
    { course: 'MATH302', date: '2026-05-18', time: '2:00 PM', location: 'Exam Hall B' },
    { course: 'PHY201', date: '2026-05-20', time: '10:00 AM', location: 'Science Wing' }
  ],
  administrative: {
    transcriptRequest: 'Submit request via Student Portal. Processing time: 3-5 business days. Fee: $10',
    idCardReplacement: 'Visit Student Services with a photo ID. Replacement fee: $15',
    courseWithdrawal: 'Deadline: Week 8 of the semester. Submit form to Academic Advisor'
  }
};

export const suggestedPrompts = [
  'What documents do I need for inscription?',
  'When is the CS401 exam?',
  'How do I request a transcript?',
  'Tell me about Dr. Sarah Mitchell',
  'What are the Linear Algebra course credits?',
  'When is the course withdrawal deadline?'
];
