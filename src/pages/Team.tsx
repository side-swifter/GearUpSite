import React, { useEffect } from 'react';

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
    instagram?: string | null;
    twitter?: string | null;
  };
};

// ==============================================
// TEAM MEMBERS DATA
// ==============================================
// Add/Edit team members below. Each member will automatically
// appear in the appropriate section based on the filters below.
const teamMembers: TeamMember[] = [
  {
    id: 'sudarshan-iyengar',
    name: 'Dr. Sudarshan Iyengar',
    role: 'Professor & Advisor',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Dr. Sudarshan Iyengar',
    description: 'Dr. Sudarshan Iyengar, a faculty member at IIT Ropar and PhD graduate from IISc, is a leading educator and researcher known for making technical education engaging through innovative teaching, storytelling, and large-scale online courses like "The Joy of Computing." Currently serving as Director of Annam.AI, he leads major AI education initiatives, coordinates national research fellowships, and heads the Education Design Lab, with his work reaching over 900,000 students and focusing on AI for social good and education design.'
  },
  {
    id: 'akshayraj',
    name: 'Akshayraj Sanjai',
    role: 'Programming',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Akshayraj Sanjai',
    description: 'With 1 year of FTC experience, 2 years of Vex V5RC experience and 1 year of FLL experience, Akshayraj is a skilled and well versed with robotics and programming and is always ready to jump in and guide students with patience and enthusiasm.',
    delay: ''
  },
  {
    id: 'vivaan',
    name: 'Vivaan Parikh',
    role: 'Engineering & Brainstorming',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Vivaan Parikh',
    description: 'With 2 years of FTC experience, Vivaan is a skilled and strategic robotics mentor. He excels at explaining technical concepts in a way that clicks with students, and he\'s always ready to jump in and guide with patience and enthusiasm.',
    delay: 'delay-100'
  },
  {
    id: 'manas',
    name: 'Manas Kamarsu',
    role: 'CAD',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Manas Kamarsu',
    description: 'Manas is a 2-year FTC veteran and one of the driving forces behind Gear-Up Robotics.'
  },
  {
    id: 'siddarth',
    name: 'Siddarth Shailesh',
    role: 'Physics and Quantum Mechanics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Siddarth Shailesh',
    description: 'Sid brings 1 year of FTC experience and a talent for making learning both educational and fun.'
  },

  {
    id: 'noah',
    name: 'Noah',
    role: 'Physics and Quantum Mechanics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    alt: 'Noah',
    description: 'Noah bring a first place Science Olympiad medal in quantum detanglers and is always ready to jump in and guide students with patience and enthusiasm.'
  },




];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, image, alt, description, delay = '' }) => (
  <div className={`bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up ${delay} flex flex-col h-full`}>
    <div className="h-64 overflow-hidden flex-shrink-0">
      <img src={image} alt={alt} className="w-full h-full object-cover object-center" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-red-600 font-medium mb-3">{role}</p>
      </div>
      <div className="mt-auto">
        <p className="text-gray-600">{description}</p>
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
    member.id === 'akshayraj' || 
    member.id === 'vivaan' ||
    member.id === 'manas' ||
    member.id === 'siddarth' ||
    member.id === 'noah'
  );
  
  // Professors & Advisors
  const professors = teamMembers.filter(member => 
    member.role.toLowerCase().includes('professor')
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
            Meet the people who make Gear Up Robotics possible.
          </p>
        </div>
      </section>
      
      {/* Professors & Advisors Section */}
      {professors.length > 0 && (
        <section className="py-16 bg-white min-h-[70vh] flex items-center">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Our Professors & Advisors
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
                Guiding us with their expertise and experience.
              </p>
              <div className="flex justify-center px-4">
                <div className="w-full max-w-md">
                  {professors.map((member) => (
                    <TeamMemberCard key={member.id} {...member} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Founding Members
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Our Founding Members bring years of experience in
            education, robotics, recruiting, marketing, and non-profit management and the passion to educate students about robotics.
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
      

      {/* Join Our Team */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            We're always looking for passionate educators, engineers, and
            volunteers to help us expand our impact.
          </p>
          <a href="contact" className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-red-50 transition-all transform hover:scale-105 shadow-lg">
            Contact Us!
          </a>
        </div>
      </section>
    </div>;
};
export default Team;