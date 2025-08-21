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
    sessions: [{ day: 'Sunday', time: '5:00 PM', duration: '1 hour' }],
    description: 'Learn programming fundamentals through visual coding with Scratch',
    icon: '🎮',
    active: true
  },
  {
    id: 'engineering-brainstorming',
    name: 'Engineering & Brainstorming',
    level: 'beginner',
    instructors: ['Vivaan Parikh'],
    sessions: [{ day: 'Wednesday', time: '4:00 PM', duration: '1 hour' }],
    description: 'Develop problem-solving skills and learn engineering design principles',
    icon: '⚙️',
    active: true
  },
  
  // INTERMEDIATE CLASSES
  {
    id: 'python-basics',
    name: 'Python Programming Basics',
    level: 'intermediate',
    instructors: ['Akshayraj Sanjai'],
    sessions: [
      { day: 'Tuesday', time: '6:00 PM', duration: '1.5 hours' },
      { day: 'Saturday', time: '10:00 AM', duration: '1.5 hours' }
    ],
    description: 'Learn Python programming fundamentals and build your first applications',
    icon: '🐍',
    active: true
  },
  {
    id: 'web-development',
    name: 'Web Development Fundamentals',
    level: 'intermediate',
    instructors: ['Akshayraj Sanjai'],
    sessions: [{ day: 'Thursday', time: '7:00 PM', duration: '2 hours' }],
    description: 'Build websites using HTML, CSS, and JavaScript',
    icon: '🌐',
    active: true
  },
  
  // ADVANCED CLASSES
  {
    id: 'java-programming',
    name: 'Advanced Java Programming',
    level: 'advanced',
    instructors: ['Dr. Sudarshan Iyengar'],
    sessions: [{ day: 'Friday', time: '6:30 PM', duration: '2 hours' }],
    description: 'Master object-oriented programming with Java',
    icon: '☕',
    active: true
  },
  {
    id: 'robotics-advanced',
    name: 'Advanced Robotics & AI',
    level: 'advanced',
    instructors: ['Dr. Sudarshan Iyengar', 'Akshayraj Sanjai'],
    sessions: [
      { day: 'Monday', time: '7:00 PM', duration: '2.5 hours' },
      { day: 'Saturday', time: '2:00 PM', duration: '2.5 hours' }
    ],
    description: 'Build intelligent robots using advanced programming and AI concepts',
    icon: '🤖',
    active: true
  },
  {
    id: 'ai-machine-learning',
    name: 'AI & Machine Learning',
    level: 'advanced',
    instructors: ['Dr. Sudarshan Iyengar'],
    sessions: [{ day: 'Wednesday', time: '8:00 PM', duration: '2 hours' }],
    description: 'Explore artificial intelligence and machine learning algorithms',
    icon: '🧠',
    active: true
  },
  {
    id: 'competitive-programming',
    name: 'Competitive Programming',
    level: 'advanced',
    instructors: ['Akshayraj Sanjai'],
    sessions: [{ day: 'Sunday', time: '3:00 PM', duration: '2 hours' }],
    description: 'Prepare for programming competitions and technical interviews',
    icon: '🏆',
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
