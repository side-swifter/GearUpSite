import React, { useEffect } from 'react';
import { LinkedinIcon, TwitterIcon, MailIcon } from 'lucide-react';

/**
 * Team Member Type Definition
 * 
 * To add a new team member:
 * 1. Add a new object to the teamMembers array below
 * 2. Follow this structure:
 * {
 *   id: 'unique-id',         // Lowercase, no spaces (e.g., 'firstname' or 'firstname-lastname')
 *   name: 'Full Name',       // Full name to display
 *   role: 'Team Role',       // Their position/role
 *   image: 'image-url.jpg',  // URL to their profile image
 *   alt: 'Alt text',         // Alt text for the image
 *   description: '...',      // Brief bio/description
 *   socials: {              // Social media links (optional)
 *     linkedin: '#',        // LinkedIn profile URL
 *     twitter: '#',         // Twitter profile URL
 *     email: '#'            // Email address (without mailto:)
 *   }
 * }
 * 
 * To control which section a member appears in:
 * - Main Team: Add their ID to mainTeamMembers filter
 * - Program Directors: Add their ID to programDirectors filter
 */
type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  description: string;
  delay?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
};

// ==============================================
// TEAM MEMBERS DATA
// ==============================================
// Add/Edit team members below. Each member will automatically
// appear in the appropriate section based on the filters below.
const teamMembers: TeamMember[] = [
  {
    id: 'akshayraj',
    name: 'Akshayraj Sanjai',
    role: 'Lead Programmer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Akshayraj Sanjai',
    description: 'With 1 year of FTC experience, 2 years of Vex V5RC experience and 1 year of FLL experience, Akshayraj is a skilled and well versed with robotics and is always ready to jump in and guide students with patience and enthusiasm.',
    delay: '',
    socials: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },
  {
    id: 'vivaan',
    name: 'Vivaan Parikh',
    role: 'Teaching Team Lead',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Vivaan Parikh',
    description: 'With 2 years of FTC experience, Vivaan is a skilled and strategic robotics mentor. He excels at explaining technical concepts in a way that clicks with students, and he\'s always ready to jump in and guide with patience and enthusiasm.',
    delay: 'delay-100',
    socials: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },
  {
    id: 'manas',
    name: 'Manas Kamarsu',
    role: 'Co-Founder & Lead Instructor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Manas Kamarsu',
    description: 'Manas is a 2-year FTC veteran and one of the driving forces behind Gear-Up Robotics.',
    socials: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },
  {
    id: 'siddarth',
    name: 'Siddarth Shailesh',
    role: 'Program Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Siddarth Shailesh',
    description: 'Sid brings 1 year of FTC experience and a talent for making learning both educational and fun.',
    socials: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },

  {
    id: 'deekshita',
    name: 'Deekshita Gunturu',
    role: 'Marketing Lead',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Deekshita Gunturu',
    description: 'With 1 year of FTC experience, Deekshita is a skilled with marketing and knows how to get the word out about Gear-Up Robotics and our acheivements',
    delay: '',
    socials: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },
  {
    id: 'suresh',
    name: 'Suresh Panda',
    role: 'Instructor',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Suresh Panda',
    description: 'Suresh is already a teacher and has experience with controling and managing students, he also PCEP and IT Specialist certificates and is able to code in many languages, allowing your student to have the best learning experience.',
    delay: '',
    socials: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  }
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, image, alt, description, delay = '', socials }) => (
  <div className={`bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up ${delay}`}>
    <div className="h-64 overflow-hidden">
      <img src={image} alt={alt} className="w-full h-full object-cover object-center" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-red-600 font-medium mb-3">{role}</p>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex space-x-3">
        {socials?.linkedin && (
          <a href={socials.linkedin} className="text-gray-500 hover:text-red-600 transition-colors">
            <LinkedinIcon className="h-5 w-5" />
          </a>
        )}
        {socials?.twitter && (
          <a href={socials.twitter} className="text-gray-500 hover:text-red-600 transition-colors">
            <TwitterIcon className="h-5 w-5" />
          </a>
        )}
        {socials?.email && (
          <a href={`mailto:${socials.email}`} className="text-gray-500 hover:text-red-600 transition-colors">
            <MailIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  </div>
);

// ==============================================
// FILTER TEAM MEMBERS
// ==============================================
// Update these filters to control which members appear in each section
// Add/remove member IDs as needed
const Team = () => {
  // Main Team Members - appears in the top section
  const mainTeamMembers = teamMembers.filter(member => 
    member.id === 'akshayraj' || member.id === 'vivaan' || member.id === 'deekshita' || member.id === 'suresh'
    // Add more IDs to include in main team: member.id === 'new-member-id'
  );
  
  // Program Directors - appears in the bottom section
  const programDirectors = teamMembers.filter(member => 
    member.id === 'manas' || member.id === 'siddarth'
    // Add more IDs to include as program directors: member.id === 'new-director-id'
  );

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-red-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Our Team</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Meet the passionate educators, robotics experts, and innovators who are
            making our mission possible.
          </p>
        </div>
      </section>
      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Our Team bring years of combined experience in
            education, robotics, recruiting, marketing, and non-profit management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mainTeamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                {...member}
                delay={`delay-${(index % 3) * 100}`}
              />
            ))}




          </div>
        </div>

    


      </section>
      
      {/* Team Member Details */} 
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Program Directors
          </h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8 w-full" style={{ maxWidth: 'fit-content' }}>
            {programDirectors.map((director, index) => (
              <div key={director.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up w-64" style={{ animationDelay: `${(index % 4) * 100}ms` }}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={director.image} 
                    alt={director.alt} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {director.name}
                  </h3>
                  <p className="text-red-600 font-medium mb-2">
                    {director.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {director.description}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>


      {/* Join Our Team */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            We're always looking for passionate educators, engineers, and
            volunteers to help us expand our impact.
          </p>
          <a href="#" className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-red-50 transition-all transform hover:scale-105 shadow-lg">
            Contact Us!
          </a>
        </div>
      </section>
    </div>;
};
export default Team;