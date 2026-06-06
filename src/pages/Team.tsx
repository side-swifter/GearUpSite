import { useEffect } from 'react';
import { teamMembers, TeamMember } from '../config/teamData';
import { ArrowRight } from 'lucide-react';

// Team members are now managed centrally in /src/config/teamData.ts
// Edit that file to add/remove team members or update their information.
const TeamMemberCard: React.FC<TeamMember> = ({ name, role, image, alt, description, delay = '', imageControls }) => {
  // Calculate transform values from simple controls
  const getImageStyle = () => {
    if (!imageControls) return {};
    
    const transforms = [];
    
    // Handle scaling
    if (imageControls.scale && imageControls.scale !== 1) {
      transforms.push(`scale(${imageControls.scale})`);
    }
    
    // Handle shifting (convert to percentages for object-position)
    let objectPosition = 'center center'; // default
    if (imageControls.shiftLeft !== undefined || imageControls.shiftUp !== undefined) {
      const xPos = 50 + (imageControls.shiftLeft || 0); // 50% is center, shift from there
      const yPos = 50 + (imageControls.shiftUp || 0);   // 50% is center, shift from there
      objectPosition = `${Math.max(0, Math.min(100, xPos))}% ${Math.max(0, Math.min(100, yPos))}%`;
    }
    
    return {
      transform: transforms.length > 0 ? transforms.join(' ') : undefined,
      objectPosition: objectPosition
    };
  };

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up ${delay} flex flex-col h-full transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}>
      <div className="h-64 overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-full object-cover"
          style={getImageStyle()}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-blue-600 font-semibold mb-3">{role}</p>
          
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// ==============================================
// FILTER TEAM MEMBERS
// ==============================================
// Update these filters to control which members appear in each section
// Add/remove member IDs as needed
const Team = () => {
  // Main Team Members - appears in the top section
  const mainTeamMembers = teamMembers.filter(member => 
    member.id === 'akshayraj' || 
    member.id === 'shresh' ||
    member.id === 'noah-lee'
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
  return <div className="w-full bg-white relative">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Our Team</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Meet the student founders building Gear Up Foundation into infrastructure for hackathons,
            robotics, STEAM programs, and youth-led technology projects.
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
            Founded by student builders in North Carolina.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Gear Up Foundation is led by students building the infrastructure for hackathons,
            robotics, STEAM programs, and youth-led technology projects across the community.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
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
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            We're looking for builders, engineers, organizers, mentors, and sponsors who want to
            help students launch ambitious technology projects.
          </p>
          <a href="contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
            Contact Us <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>;
};
export default Team;
