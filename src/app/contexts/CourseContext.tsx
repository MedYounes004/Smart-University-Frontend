import { createContext, useContext, useState, ReactNode } from 'react';

export interface CourseMaterial {
  id: number;
  courseId: number;
  courseName: string;
  title: string;
  type: 'pdf' | 'video' | 'slides' | 'document' | 'link';
  content: string;
  description: string;
  uploadDate: string;
  professorName: string;
}

interface CourseContextType {
  materials: CourseMaterial[];
  addMaterial: (material: Omit<CourseMaterial, 'id' | 'uploadDate'>) => void;
  deleteMaterial: (id: number) => void;
  getMaterialsByCourse: (courseId: number) => CourseMaterial[];
  getAllMaterials: () => CourseMaterial[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<CourseMaterial[]>([
    {
      id: 1,
      courseId: 1,
      courseName: 'Advanced Algorithms',
      title: 'Dynamic Programming Fundamentals',
      type: 'document',
      content: 'Dynamic programming is an algorithmic technique for solving optimization problems by breaking them down into simpler subproblems. Key concepts include: 1) Optimal substructure - the optimal solution contains optimal solutions to subproblems. 2) Overlapping subproblems - the same subproblems are solved multiple times. Common applications include: Fibonacci sequence, shortest paths, knapsack problem, and sequence alignment. Time complexity is typically O(n²) or O(n³) depending on the problem structure.',
      description: 'Introduction to dynamic programming techniques and applications',
      uploadDate: '2026-04-15',
      professorName: 'Prof. Smith',
    },
    {
      id: 2,
      courseId: 1,
      courseName: 'Advanced Algorithms',
      title: 'Graph Algorithms Overview',
      type: 'slides',
      content: 'Graph algorithms lecture covering: Breadth-First Search (BFS) for finding shortest paths in unweighted graphs with O(V+E) complexity. Depth-First Search (DFS) for topological sorting and cycle detection. Dijkstra\'s algorithm for shortest paths in weighted graphs with non-negative weights, using priority queues for O((V+E)logV) complexity. Bellman-Ford for graphs with negative weights. Minimum Spanning Trees using Kruskal\'s and Prim\'s algorithms.',
      description: 'Comprehensive guide to graph traversal and pathfinding algorithms',
      uploadDate: '2026-04-20',
      professorName: 'Prof. Smith',
    },
    {
      id: 3,
      courseId: 2,
      courseName: 'Data Structures',
      title: 'Binary Search Trees',
      type: 'document',
      content: 'Binary Search Trees (BST) are hierarchical data structures where each node has at most two children. Properties: left child < parent < right child. Operations: Insert O(h), Search O(h), Delete O(h) where h is height. Balanced BSTs like AVL trees and Red-Black trees maintain O(log n) height through rotations. Self-balancing ensures worst-case performance remains logarithmic. Applications include database indexing, expression parsing, and priority queues.',
      description: 'Complete guide to BST implementation and balancing techniques',
      uploadDate: '2026-04-18',
      professorName: 'Prof. Johnson',
    },
    {
      id: 4,
      courseId: 3,
      courseName: 'Machine Learning',
      title: 'Linear Regression Explained',
      type: 'pdf',
      content: 'Linear regression is a supervised learning algorithm for predicting continuous values. Model: y = mx + b (simple) or y = w₁x₁ + w₂x₂ + ... + b (multiple). Training uses gradient descent to minimize Mean Squared Error (MSE). Key assumptions: linear relationship, independence of errors, homoscedasticity, and normality of residuals. Regularization techniques like Ridge (L2) and Lasso (L1) prevent overfitting. Evaluation metrics include R², RMSE, and MAE.',
      description: 'Mathematical foundations and practical applications of linear regression',
      uploadDate: '2026-04-22',
      professorName: 'Prof. Davis',
    },
  ]);

  const addMaterial = (material: Omit<CourseMaterial, 'id' | 'uploadDate'>) => {
    const newMaterial: CourseMaterial = {
      ...material,
      id: Date.now(),
      uploadDate: new Date().toISOString().split('T')[0],
    };
    setMaterials([...materials, newMaterial]);
  };

  const deleteMaterial = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const getMaterialsByCourse = (courseId: number) => {
    return materials.filter(m => m.courseId === courseId);
  };

  const getAllMaterials = () => {
    return materials;
  };

  return (
    <CourseContext.Provider value={{
      materials,
      addMaterial,
      deleteMaterial,
      getMaterialsByCourse,
      getAllMaterials,
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}
