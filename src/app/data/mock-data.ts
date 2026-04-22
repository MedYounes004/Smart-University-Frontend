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
  color: string;
  nextClass?: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'PHY201',
    name: 'Quantum Mechanics',
    instructor: 'Dr. Emily Rodriguez',
    schedule: 'Mon, Wed, Fri 9:00 AM',
    room: 'Science Wing, Room 102',
    credits: 4,
    description: 'Introduction to quantum theory, wave functions, Schrödinger equation, and quantum systems.',
    syllabus: '1. Introduction to Quantum Concepts\n2. The Schrödinger Equation\n3. Potential Wells and Barriers\n4. Quantum Harmonic Oscillator\n5. Hydrogen Atom Model',
    color: '#6366f1',
    nextClass: 'Tomorrow, 9:00 AM'
  },
  {
    id: '2',
    code: 'CS301',
    name: 'Data Structures',
    instructor: 'Prof. Michael Chen',
    schedule: 'Tue, Thu 11:00 AM',
    room: 'Engineering Bldg, Room 304',
    credits: 3,
    description: 'Advanced data structures and algorithm analysis including trees, graphs, and hashing.',
    syllabus: '1. Review of Basic Data Structures\n2. Trees and Binary Search Trees\n3. AVL and Red-Black Trees\n4. Graph Algorithms\n5. Sorting and Searching',
    color: '#ec4899',
    nextClass: 'Today, 11:00 AM'
  },
  {
    id: '3',
    code: 'MAT204',
    name: 'Linear Algebra',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed 2:00 PM',
    room: 'Math Hall, Room 201',
    credits: 3,
    description: 'Study of vector spaces, linear transformations, matrices, and determinants.',
    syllabus: '1. Systems of Linear Equations\n2. Matrix Algebra\n3. Determinants\n4. Vector Spaces\n5. Eigenvalues and Eigenvectors',
    color: '#f59e0b'
  }
];
