// ==============================================
// CENTRALIZED TEAM DATA
// ==============================================
// This file contains all team member data used across the application.
// Edit this file to add/remove team members or update their information.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  imageControls?: {
    shiftLeft?: number;
    shiftUp?: number;
    scale?: number;
  };
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
    description: 'Dr. Sudarshan Iyengar, a faculty member at IIT Ropar and PhD graduate from IISc, is a leading educator and researcher known for making technical education engaging through innovative teaching, storytelling, and large-scale online courses like "The Joy of Computing." Currently serving as Director of Annam.AI, he leads major AI education initiatives, coordinates national research fellowships, and heads the Education Design Lab, with his work reaching over 900,000 students and focusing on AI for social good and education design.',
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
    description: 'With 1 year of FTC experience, 2 years of Vex V5RC experience and 1 year of FLL experience, Akshay is a skilled and well versed with robotics and programming and is always ready to jump in and guide students with patience and enthusiasm.',
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
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'With 2 years of FTC experience, Vivaan is a skilled and strategic robotics mentor. He excels at explaining technical concepts in a way that clicks with students, and he\'s always ready to jump in and guide with patience and enthusiasm.'
  },
  {
    id: 'manas',
    name: 'Manas Kamarsu',
    role: 'CAD',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Manas is a 2-year FTC veteran and one of the driving forces behind Gear-Up Robotics.'
  },
  {
    id: 'noah-lee',
    name: 'Noah Lee',
    role: 'Outreach & Marketing',
    image: '/team-photos/noah-lee.png',
    description: 'Noah brings creativity and strategic thinking to our outreach efforts, helping connect with students and families in the community.'
  }
];

// ==============================================
// TEAM FILTERS
// ==============================================
// Control which team members appear in which sections
export const mainTeamMembers = ['akshayraj', 'vivaan', 'manas', 'noah-lee'];
export const programDirectors = ['sudarshan-iyengar'];
