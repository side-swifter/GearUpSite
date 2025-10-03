import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { teamMembers, TeamMember } from '../config/teamData';
import { getClassById } from '../config/classData';
import { X, ExternalLink } from 'lucide-react';

// Team members are now managed centrally in /src/config/teamData.ts
// Edit that file to add/remove team members or update their information.





// Class icons are now handled directly from classData.ts

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, image, alt, description, delay = '', imageControls, classIds }) => {
  const [showClassesPopup, setShowClassesPopup] = useState(false);
  
  // Get actual classes this instructor teaches using classIds
  const instructorClasses = classIds ? classIds.map(id => getClassById(id)).filter(Boolean) : [];
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
          <button 
            onClick={() => setShowClassesPopup(true)}
            className="text-blue-600 font-medium mb-3 hover:text-blue-800 transition-colors cursor-pointer text-left"
          >
            {role} {classIds && classIds.length > 0 && '(Click to see classes)'}
          </button>
          
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      
      {/* Classes Popup Modal */}
      {showClassesPopup && classIds && classIds.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                <button 
                  onClick={() => setShowClassesPopup(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Classes Taught</h4>
              
              <div className="grid gap-3">
                {instructorClasses.map((classData, index) => {
                  if (!classData) return null;
                  
                  return (
                    <div key={index}>
                      <Link 
                        to={`/class/${classData.id}`}
                        onClick={() => setShowClassesPopup(false)}
                        className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-md hover:from-blue-100 hover:to-indigo-100 transition-all group cursor-pointer"
                      >
                        <div className="text-blue-600 mr-3 text-2xl">
                          {classData.icon}
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium block">{classData.name}</span>
                          <span className="text-sm text-gray-500">{classData.level} level</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  );
                })}
              </div>
              
              <button 
                onClick={() => setShowClassesPopup(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
    member.id === 'vivaan' ||
    member.id === 'siddarth' ||
    member.id === 'noah-lee' ||
    member.id === 'shresh' ||
    member.id === 'nish'
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
            Meet the people who make Gear Up Foundation possible.
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
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            We're always looking for passionate educators, engineers, and
            volunteers to help us expand our impact.
          </p>
          <a href="contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
            Contact Us!
          </a>
        </div>
      </section>
    </div>;
};
export default Team;