// ==============================================
// CENTRALIZED CLASS DATA MANAGEMENT
// ==============================================
// This file contains all class information used in the signup flow.
// Edit this file to easily add/remove classes, change levels, icons, and instructors.

export interface ClassData {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructors: string[]; // Use exact names from teamData.ts
  description: string;
  icon: string; // Emoji or icon for the class
  topics: string[]; // Topics/tags for the class
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
    icon: '⚙️',
    topics: ['Engineering', 'Problem Solving', 'Design Process', 'Prototyping'],
    active: true
  },
  
  // INTERMEDIATE CLASSES
  {
    id: 'python-basics',
    name: 'Beginner to Intermediate Python',
    level: 'intermediate',
    instructors: ['Akshayraj Sanjai', 'Shresh Panda'],
    description: 'Master Python programming from basics to intermediate concepts. Cover data types, functions, object-oriented programming, file handling, and popular libraries. Students build real projects including games, web scrapers, and data analysis tools.',
    icon: '🐍',
    topics: ['Python', 'Programming', 'Object-Oriented', 'Data Analysis'],
    active: true
  },
  {
    id: 'cad',
    name: 'Computer Aided Design (CAD)',
    level: 'intermediate',
    instructors: ['Manas Kamarsu'],
    description: 'Learn professional 3D modeling and design using industry-standard CAD software. Students create detailed technical drawings, 3D models, and learn about manufacturing processes. Essential skills for engineering, architecture, and product design.',
    icon: '🏗️',
    topics: ['CAD', '3D Modeling', 'Engineering', 'Design'],
    active: true
  },
  
  // ADVANCED CLASSES
  {
    id: 'quantum-mechanics',
    name: 'Quantum Mechanics and Computations',
    level: 'advanced',
    instructors: ['Siddarth Shailesh', 'Noah Lee'],
    description: 'This course introduces students to the fascinating world of quantum physics and its modern applications in computing. Beginning with the fundamentals—wave-particle duality, diffraction and interference, superposition and entanglement, and Schrödinger\'s equation (and much more)—students will gain a strong theoretical foundation. They will then apply these ideas in the realm of quantum computing, working with qubits, matrix-based gate representations, Dirac notation, Quantum Circuits, and Python-based simulations of quantum algorithms. Students will even code their own mini quantum computer projects. By the end, they will have both a deep understanding of quantum mechanics and practical experience in quantum computation.',
    icon: '⚛️',
    topics: ['Quantum Physics', 'Quantum Computing', 'Python', 'Advanced Math'],
    active: true
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    level: 'advanced',
    instructors: ['Akshayraj Sanjai', 'Noah Lee', 'Siddarth Shailesh'],
    description: 'This course provides a comprehensive foundation in computer science, combining theory and hands-on practice. Students will explore the principles of cryptography and apply programming techniques to encrypt and decrypt various ciphers. Along the way, they will develop advanced skills in algorithms, data structures, and high-level programming. The course also delves into computer hardware, covering CPUs, GPUs, storage systems, cooling methods, and more. By the end, students will have a strong command of both programming and the inner workings of modern computers.',
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
