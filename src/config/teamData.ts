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
    image: '/team-photos/shresh.png',
    alt: 'Shresh Panda',
    description: 'Having passed PCEP Entry Level Certification and Python IT Specialist Certification, Shresh is well versed with Python and is always ready to provide the best learning experience for your student.',
    classIds: ['python-basics'], // References actual classes from classData.ts
    imageControls: { 
      shiftLeft: 0, 
      shiftUp: -10,
      scale: 1.05 
    },
    delay: 'delay-300'
  },
  {
    id: 'nish',
    name: 'Nishant Kulkarni',
    role: 'CAD & Brainstorming',
    image: '/team-photos/Nish.png',
    alt: 'Nishant Kulkarni',
    description: 'With 2 years of FTC experience, Nish knows his way around onshape and ready to make your student learn like never before.',
    classIds: ['cad', 'engineering-brainstorming'], // References actual classes from classData.ts
    imageControls: { 
      shiftLeft: 0, 
      shiftUp: -30,
      scale: 1.05 
    },
    delay: 'delay-200'
  }

];

// ==============================================
// TEAM FILTERS
// ==============================================
// Control which team members appear in which sections
export const mainTeamMembers = ['akshayraj', 'vivaan', 'noah','nish'];
export const programDirectors = [];
