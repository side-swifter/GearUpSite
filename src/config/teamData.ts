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
    role: 'Founder',
    image: '/team-photos/akshayraj-founder.png',
    alt: 'Akshayraj Sanjai',
    description: 'Akshayraj works across programming, robotics, and student-led engineering projects, helping Gear Up turn ambitious ideas into real programs, events, and community technology impact.',
    delay: '',
    imageControls: { 
      shiftLeft: 0, 
      shiftUp: 0,
      scale: 1 
    }
  },
  {
    id: 'shresh',
    name: 'Shresh Panda',
    role: 'Founder',
    image: '/team-photos/shresh.png',
    alt: 'Shresh Panda',
    description: 'Shresh focuses on programming, engineering, and student leadership, helping build the systems and technical programs that let young builders launch serious projects.',
    imageControls: { 
      shiftLeft: 0, 
      shiftUp: -10,
      scale: 1.05 
    },
    delay: 'delay-300'
  }
];

// ==============================================
// TEAM FILTERS
// ==============================================
// Control which team members appear in which sections
export const mainTeamMembers = ['akshayraj', 'shresh'];
export const programDirectors = [];
