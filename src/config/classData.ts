// ==============================================
// CENTRALIZED CLASS DATA MANAGEMENT
// ==============================================
// This file contains all class information used in the signup flow.
// Edit this file to easily add/remove classes, change levels, icons, and instructors.

export interface ClassData {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructors: string[]; // References to teamData member names
  description: string;
  shortDescription: string;
  icon: string;
  topics: string[];
  schedule?: string;
  active?: boolean; // Set to false to temporarily hide a class
}

// ==============================================
// AVAILABLE TOPICS - EASY TO MANAGE
// ==============================================
// Add or remove topics here, then assign them to classes below
export const availableTopics = [
  'Programming',
  'Scratch', 
  'Game Development',
  'Animation',
  'Engineering',
  'Problem Solving',
  'Design Process',
  'Prototyping',
  'Python',
  'Object-Oriented',
  'Data Analysis',
  'CAD',
  '3D Modeling',
  'Design',
  'Quantum Physics',
  'Quantum Computing',
  'Advanced Math',
  'Computer Science',
  'Cryptography',
  'Algorithms',
  'Hardware',
  'Physics',
  'Calculus',
  'AP Physics',
  'Visual Programming',
  'OOP',
  'Data Structures',
  'Technical Drawing',
  'Engineering Design'
];

// ==============================================
// CLASS DATA - EASY TO EDIT
// ==============================================
// To add a new class:
// 1. Add a new object to this array
// 2. Set the level (beginner/intermediate/advanced)
// 3. Choose an icon (emoji)
// 4. Use instructor names exactly as they appear in teamData.ts
// 5. Set active: true to show the class, false to hide it

export const classData: ClassData[] = [
  // BEGINNER CLASSES
  {
    id: 'scratch',
    name: 'Scratch',
    level: 'beginner',
    instructors: ['Vivaan Parikh'],
    description: 'Students will learn the fundamentals of programming through Scratch, a visual programming language. They will create interactive stories, games, and animations while developing computational thinking skills. The course covers basic programming concepts like loops, conditionals, variables, and events in a fun and engaging way.',
    shortDescription: 'Learn programming fundamentals through Scratch with interactive stories, games, and animations.',
    icon: '🎮',
    topics: ['Scratch', 'Visual Programming', 'Game Development', 'Animation'],
    schedule: 'Sunday: 5-6PM',
    active: true
  },
  {
    id: 'engineering-brainstorming',
    name: 'Engineering & Brainstorming',
    level: 'intermediate',
    instructors: ['Vivaan Parikh'],
    description: 'Students will develop critical thinking and problem-solving skills through engineering design challenges. They will learn brainstorming techniques, design thinking methodology, and project management. The course emphasizes creativity, collaboration, and iterative design processes to tackle real-world engineering problems.',
    shortDescription: 'Develop problem-solving skills through engineering design challenges and brainstorming techniques.',
    icon: '🔧',
    topics: ['Engineering', 'Design Thinking', 'Problem Solving', 'Project Management'],
    schedule: 'Wednesday: 4:00-5:00PM',
    active: true
  },
  
  // INTERMEDIATE CLASSES
  {
    id: 'python-basics',
    name: 'Python Basics',
    level: 'intermediate',
    instructors: ['Akshayraj Sanjai', 'Shresh Panda'],
    description: 'Students will dive into Python programming, starting with basic syntax and progressing to more complex concepts. They will learn about variables, data types, control structures, functions, and basic object-oriented programming. The course includes hands-on projects to reinforce learning and build practical programming skills.',
    shortDescription: 'Dive into Python programming with hands-on projects covering syntax to object-oriented concepts.',
    icon: '🐍',
    topics: ['Python', 'Programming', 'OOP', 'Data Structures'],
    schedule: 'Saturday and Sunday: 11:00-12:00',
    active: true
  },
  {
    id: 'cad',
    name: 'CAD',
    level: 'intermediate',
    instructors: [],
    description: 'Students will learn Computer-Aided Design (CAD) using industry-standard software. They will master 3D modeling techniques, technical drawing, and design principles. The course covers creating complex assemblies, simulations, and preparing designs for manufacturing, providing essential skills for engineering and product development.',
    shortDescription: 'Master 3D modeling and technical drawing with industry-standard CAD software.',
    icon: '📐',
    topics: ['CAD', '3D Modeling', 'Technical Drawing', 'Engineering Design'],
    schedule: 'Saturday: 5-6PM',
    active: true
  },
  
  // ADVANCED CLASSES
  {
    id: 'quantum-mechanics',
    name: 'Quantum Mechanics and Computations',
    level: 'advanced',
    instructors: ['Noah Lee', 'Siddharth Shailesh'],
    description: 'Students will explore the fascinating world of quantum mechanics and quantum computing. They will learn about quantum states, superposition, entanglement, and quantum algorithms. The course covers both theoretical foundations and practical applications, including programming quantum computers and understanding their potential impact on technology.',
    shortDescription: 'Explore quantum mechanics and computing with quantum states, algorithms, and programming.',
    icon: '⚛️',
    topics: ['Quantum Mechanics', 'Quantum Computing', 'Algorithms', 'Physics'],
    schedule: 'Wednesdays: 7:30-8:30PM, Sundays: 2:00-3:00PM',
    active: true
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    level: 'advanced',
    instructors: ['Akshayraj Sanjai', 'Siddharth Shailesh', 'Noah Lee', 'Dr. Sudarshan Iyengar'],
    description: 'Students will build a comprehensive foundation in computer science, covering algorithms, data structures, cryptography, and computer hardware. They will learn programming paradigms, computational complexity, and software engineering principles. The course prepares students for advanced computer science studies and careers in technology.',
    shortDescription: 'Comprehensive computer science foundation covering cryptography, algorithms, and hardware.',
    icon: '💻',
    topics: ['Computer Science', 'Cryptography', 'Algorithms', 'Hardware'],
    schedule: 'Saturday and Sunday: 9:00-10:00 AM',
    active: true
  },
  {
    id: 'physics',
    name: 'Physics',
    level: 'advanced',
    instructors: ['Siddharth Shailesh'],
    description: 'Students will build a solid understanding of the core principles of physics, beginning with vectors, scalars, matrices, gravitation, and Newton\'s laws (all at the middle and high school level). From there, they will progress to advanced applications such as predicting particle trajectories with vectors and equations, deriving and integrating kinematic equations, modeling simple harmonic oscillators, and exploring the fundamentals of electricity and magnetism (building up to the advanced high school level). By the end of the course, students will be well-prepared for AP Physics concepts and equipped with skills that extend into various topics.',
    shortDescription: 'Build understanding of core physics principles from vectors and Newton\'s laws to AP Physics preparation.',
    icon: '🔬',
    topics: ['Physics', 'Calculus', 'AP Physics'],
    schedule: 'Mondays: 4:00-5:00PM, Fridays: 4:00-5:00PM',
    active: true
  }
];

// ==============================================
// HELPER FUNCTIONS
// ==============================================
// Get classes by level
export const getClassesByLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
  return classData.filter(cls => cls.level === level && cls.active !== false);
};

// Get all active classes
export const getActiveClasses = () => {
  return classData.filter(cls => cls.active !== false);
};

// Get class by ID
export const getClassById = (id: string) => {
  return classData.find(cls => cls.id === id);
};
