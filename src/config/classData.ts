// ==============================================
// CENTRALIZED CLASS DATA MANAGEMENT
// ==============================================
// This file contains all class information used in the signup flow.
// Edit this file to easily add/remove classes, change levels, icons, and instructors.

export interface ClassSession {
  day: string;
  time: string;
  duration: string;
}

export interface ClassData {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructors: string[]; // Use exact names from teamData.ts
  sessions: ClassSession[];
  description: string;
  icon: string; // Emoji or icon for the class
  active?: boolean; // Set to false to temporarily hide a class
}

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
    sessions: [{ day: 'Sunday', time: '5:00-6:00 PM', duration: '1 hour' }],
    description: 'Discover the world of programming through Scratch\'s intuitive drag-and-drop interface. Students learn fundamental programming concepts like loops, conditionals, and variables while creating interactive stories, games, and animations. Perfect for young minds to develop logical thinking and creativity.',
    icon: '🎮',
    active: true
  },
  {
    id: 'engineering-brainstorming',
    name: 'Engineering & Brainstorming',
    level: 'beginner',
    instructors: ['Vivaan Parikh'],
    sessions: [{ day: 'Wednesday', time: '4:00-5:00 PM', duration: '1 hour' }],
    description: 'Develop critical thinking and problem-solving skills through hands-on engineering challenges. Students learn the engineering design process, brainstorming techniques, and how to approach complex problems systematically. Includes building prototypes and testing solutions.',
    icon: '⚙️',
    active: true
  },
  
  // INTERMEDIATE CLASSES
  {
    id: 'python-basics',
    name: 'Beginner to Intermediate Python',
    level: 'intermediate',
    instructors: ['Akshayraj Sanjai', 'Shresh Panda'],
    sessions: [
      { day: 'Saturday', time: '11:00 AM-12:00 PM', duration: '1 hour' },
      { day: 'Sunday', time: '11:00 AM-12:00 PM', duration: '1 hour' }
    ],
    description: 'Master Python programming from basics to intermediate concepts. Cover data types, functions, object-oriented programming, file handling, and popular libraries. Students build real projects including games, web scrapers, and data analysis tools.',
    icon: '🐍',
    active: true
  },
  {
    id: 'cad',
    name: 'Computer Aided Design (CAD)',
    level: 'intermediate',
    instructors: ['Manas Kamarsu'],
    sessions: [{ day: 'Saturday', time: '5:00-6:00 PM', duration: '1 hour' }],
    description: 'Learn professional 3D modeling and design using industry-standard CAD software. Students create detailed technical drawings, 3D models, and learn about manufacturing processes. Essential skills for engineering, architecture, and product design.',
    icon: '🏗️',
    active: true
  },
  
  // ADVANCED CLASSES
  {
    id: 'quantum-mechanics',
    name: 'Quantum Mechanics and Computations',
    level: 'advanced',
    instructors: ['Siddarth Shailesh', 'Noah Lee'],
    sessions: [
      { day: 'Wednesday', time: '6:00-7:00 PM', duration: '1 hour' },
      { day: 'Sunday', time: '2:00-3:00 PM', duration: '1 hour' }
    ],
    description: 'Explore the fascinating world of quantum physics and quantum computing. Students learn quantum principles, superposition, entanglement, and how quantum computers work. Includes hands-on experience with quantum simulators and programming quantum algorithms.',
    icon: '⚛️',
    active: true
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    level: 'advanced',
    instructors: ['Siddarth Shailesh', 'Noah Lee', 'Dr. Sudarshan Iyengar'],
    sessions: [
      { day: 'Saturday', time: '9:00-10:00 AM', duration: '1 hour' },
      { day: 'Sunday', time: '9:00-10:00 AM', duration: '1 hour' }
    ],
    description: 'Comprehensive computer science fundamentals covering algorithms, data structures, computational complexity, and software engineering principles. Students solve challenging problems and learn to think like computer scientists through theoretical concepts and practical applications.',
    icon: '💻',
    active: true
  },
  {
    id: 'physics',
    name: 'Physics',
    level: 'advanced',
    instructors: ['Siddarth Shailesh'],
    sessions: [
      { day: 'Monday', time: '4:00-5:00 PM', duration: '1 hour' },
      { day: 'Friday', time: '4:00-5:00 PM', duration: '1 hour' }
    ],
    description: 'Advanced physics concepts including mechanics, thermodynamics, electromagnetism, and modern physics. Students conduct virtual experiments, solve complex problems, and understand the mathematical foundations that govern our universe.',
    icon: '🔬',
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
