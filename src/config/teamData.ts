// ==============================================
// CENTRALIZED TEAM DATA
// ==============================================
// This file contains all team member data used across the application.
// Edit this file to add/remove team members or update their information.

export interface ImageControls {
  shiftLeft?: number;
  shiftUp?: number;
  scale?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  alt?: string; // Alt text for images
  delay?: string; // Animation delay class
  imageControls?: ImageControls; // Image positioning controls
  classIds?: string[]; // Class IDs from classData.ts that this team member teaches
  socials?: {
    instagram?: string | null;
    twitter?: string | null;
  };
}

// ==============================================
// TEAM MEMBERS DATA
// ==============================================
// Add/Edit team members here. Changes will automatically sync across
// Team page and SignUp page.
export const teamMembers: TeamMember[] = [
  {
    id: 'sudarshan-iyengar',
    name: 'Dr. Sudarshan Iyengar',
    role: 'Professor & Advisor',
    image: '/team-photos/Professor.png',
    alt: 'Dr. Sudarshan Iyengar',
    description: 'Dr. Sudarshan Iyengar, a faculty member at IIT Ropar and PhD graduate from IISc, is a leading educator and researcher known for making technical education engaging through innovative teaching, storytelling, and large-scale online courses like "The Joy of Computing." Currently serving as Director of Annam.AI, he leads major AI education initiatives, coordinates national research fellowships, and heads the Education Design Lab, with his work reaching over 900,000 students and focusing on AI for social good and education design.',
    classIds: ['computer-science'], // References actual classes from classData.ts
    imageControls: {
      shiftLeft: 0,
      shiftUp: -80,
      scale: 1
    }
  },
  {
    id: 'akshayraj',
    name: 'Akshayraj Sanjai',
    role: 'Programming',
    image: '/team-photos/akshay.png',
    alt: 'Akshayraj Sanjai',
    description: 'With 1 year of FTC experience, 2 years of Vex V5RC experience and 1 year of FLL experience, Akshay is a skilled and well versed with robotics and programming and is always ready to jump in and guide students with patience and enthusiasm.',
    classIds: ['python-basics', 'computer-science'], // References actual classes from classData.ts
    delay: '',
    imageControls: { 
      shiftLeft: 0, 
      shiftUp: -30,
      scale: 1.05 
    }
  },
  {
    id: 'vivaan',
    name: 'Vivaan Parikh',
    role: 'Engineering & Brainstorming',
    image: '/team-photos/vivaan.png',
    alt: 'Vivaan Parikh',
    description: 'With 2 years of FTC experience, Vivaan is a skilled and strategic robotics mentor. He excels at explaining technical concepts in a way that clicks with students, and he\'s always ready to jump in and guide with patience and enthusiasm.',
    classIds: ['engineering-brainstorming'], // References actual classes from classData.ts
    delay: '',
    imageControls: { 
      shiftLeft: 0,
      shiftUp: -120,
      scale: 1.05 
    }
  },
  {
    id: 'manas',
    name: 'Shivmanas Kamarsu',
    role: 'CAD',
    image: '/team-photos/manas.png',
    alt: 'Shivmanas Kamarsu',
    description: 'Manas is a 2-year FTC veteran and one of the driving forces behind Gear-Up Robotics.',
    classIds: ['cad'], // References actual classes from classData.ts
    delay: '',
    imageControls: { 
      shiftLeft: 0,
      shiftUp: -15,
      scale: 1.5 
    }
  },
  {
    id: 'siddarth',
    name: 'Siddarth Shailesh',
    role: 'Physics and Quantum Mechanics',
    image: '/team-photos/sid.png',
    alt: 'Siddarth Shailesh',
    description: 'Siddharth Shailesh is a dedicated FTC member with one year of experience, bringing a strong foundation in computer science and physics. He\'s committed to helping guide the organization\'s growth through collaboration and continuous learning.',
    classIds: ['physics', 'quantum-mechanics'], // References actual classes from classData.ts
    imageControls: { 
      shiftLeft: 0, 
      shiftUp: -30,
      scale: 1.05 
    },
    delay: 'delay-200'
  },
  {
    id: 'noah-lee',
    name: 'Noah Lee',
    role: 'Quantum and Computer Science',
    image: '/team-photos/noah-lee.png',
    alt: 'Noah Lee',
    description: 'Coding enthusiast. Quantum fanatic. Biology nerd. I have 5 years of experience of Python, C#, and Java in addition to 2 years of quantum computing experience.',
    classIds: ['quantum-mechanics', 'computer-science'], // References actual classes from classData.ts
    delay: 'delay-400'
  },
  
  {
    id: 'shresh',
    name: 'Shresh Panda',
    role: 'Programming',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Shresh Panda',
    description: 'Shresh brings enthusiasm and technical skills to our programming initiatives, helping students learn coding fundamentals.',
    classIds: ['python-basics'], // References actual classes from classData.ts
    delay: 'delay-300'
  },

];

// ==============================================
// TEAM FILTERS
// ==============================================
// Control which team members appear in which sections
export const mainTeamMembers = ['akshayraj', 'vivaan', 'manas', 'noah'];
export const programDirectors = ['sudarshan-iyengar'];
