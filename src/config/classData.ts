// ==============================================
// CENTRALIZED CLASS DATA MANAGEMENT
// ==============================================
// This file contains all class information used in the signup flow.
// Edit this file to easily add/remove classes, change levels, icons, and instructors.

export interface ClassData {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructors: string[];
  topics: string[];
  icon: string;
  active?: boolean; // Set to false to temporarily hide a class
  notes?: string;
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
  'Electrodynamics'
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
    name: 'Intro to Programming with Scratch',
    level: 'beginner',
    instructors: ['Vivaan Parikh'],
    description: 'Discover the world of programming through Scratch\'s intuitive drag-and-drop interface. Students learn fundamental programming concepts like loops, conditionals, and variables while creating interactive stories, games, and animations. Perfect for young minds to develop logical thinking and creativity.',
    shortDescription: 'Learn programming basics through Scratch\'s drag-and-drop interface while creating games and animations.',
    icon: '🎮',
    topics: ['Programming', 'Scratch', 'Game Development', 'Animation'],
    active: true
  },
  {
    id: 'engineering-brainstorming',
    name: 'Engineering & Brainstorming',
    level: 'beginner',
    instructors: ['Vivaan Parikh'],
    description: 'Develop critical thinking and problem-solving skills through hands-on engineering challenges. Students learn the engineering design process, brainstorming techniques, and how to approach complex problems systematically. Includes building prototypes and testing solutions.',
    shortDescription: 'Develop problem-solving skills through hands-on engineering challenges and design thinking.',
    icon: '⚙️',
    topics: ['Engineering', 'Problem Solving', 'Design Process', 'Prototyping'],
    active: true
  },
  
  // INTERMEDIATE CLASSES
  {
    id: 'python-basics',
    name: 'Beginner to Intermediate Python',
    level: 'intermediate',
    instructors: ['Vivaan Parikh'],
    description: 'Master Python programming from basics to intermediate concepts. Cover data types, functions, object-oriented programming, and popular libraries. Students build real projects including games, web scrapers, and data analysis tools.',
    shortDescription: 'Master Python programming from basics to intermediate concepts with real-world projects.',
    icon: '🐍',
    topics: ['Python', 'Programming', 'Object-Oriented', 'Data Analysis'],
    active: true
  },
  {
    id: 'cad-design',
    name: 'Computer Aided Design (CAD)',
    level: 'intermediate',
    instructors: ['Akshayraj Sanjal', 'Shivam Panda'],
    description: 'Learn professional 3D modeling and design using industry-standard CAD software. Students create detailed technical drawings, 3D models, and learn about manufacturing processes. Essential skills for engineering, architecture, and product design.',
    shortDescription: 'Learn professional 3D modeling and design using industry-standard CAD software.',
    icon: '📐',
    topics: ['CAD', '3D Modeling', 'Engineering', 'Design'],
    active: true
  },
  
  // ADVANCED CLASSES
  {
    id: 'advanced-programming',
    name: 'Advanced Programming Concepts',
    level: 'advanced',
    instructors: ['Noah Lee'],
    description: 'Dive deep into advanced programming paradigms, algorithms, and software architecture. Students learn about design patterns, data structures, performance optimization, and large-scale software development practices.',
    shortDescription: 'Dive deep into advanced programming paradigms, algorithms, and software architecture.',
    icon: '💻',
    topics: ['Advanced Programming', 'Algorithms', 'Software Architecture', 'Performance'],
    active: true
  },
  {
    id: 'quantum-mechanics',
    name: 'Quantum Mechanics and Computations',
    level: 'advanced',
    instructors: ['Manas Kamaraju'],
    description: 'This course introduces students to the fascinating world of quantum physics and its applications in modern computing. Students explore quantum principles, quantum algorithms, and the potential of quantum computers to solve complex problems.',
    shortDescription: 'Explore quantum physics and its applications in modern computing and algorithms.',
    icon: '⚛️',
    topics: ['Quantum Physics', 'Quantum Computing', 'Advanced Mathematics', 'Algorithms'],
    active: true
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    level: 'advanced',
    instructors: ['Akshayraj Sanjai', 'Noah Lee', 'Siddarth Shailesh'],
    description: 'This course provides a comprehensive foundation in computer science, combining theory and hands-on practice. Students will explore the principles of cryptography and apply programming techniques to encrypt and decrypt various ciphers. Along the way, they will develop advanced skills in algorithms, data structures, and high-level programming. The course also delves into computer hardware, covering CPUs, GPUs, storage systems, cooling methods, and more. By the end, students will have a strong command of both programming and the inner workings of modern computers.',
    shortDescription: 'Comprehensive computer science foundation covering cryptography, algorithms, and hardware.',
    icon: '💻',
    topics: ['Computer Science', 'Cryptography', 'Algorithms', 'Hardware'],
    active: true
  },
  {
    id: 'physics',
    name: 'Physics',
    level: 'advanced',
    instructors: ['Siddarth Shailesh'],
    description: 'Students will build a solid understanding of the core principles of physics, beginning with vectors, scalars, matrices, gravitation, and Newton\'s laws. From there, they will progress to advanced applications such as predicting particle trajectories with vector calculus, deriving and integrating kinematic equations, modeling simple harmonic oscillators, and exploring the fundamentals of electrodynamics and energy (with much more). By the end of the course, students will be well-prepared for AP Physics concepts and equipped with skills that extend into more advanced topics.',
    shortDescription: 'Build understanding of core physics principles from Newton\'s laws to electrodynamics and AP Physics.',
    icon: '🔬',
    topics: ['Physics', 'Calculus', 'AP Physics', 'Electrodynamics'],
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
