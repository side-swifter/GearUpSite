import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActiveClasses, ClassData } from '../config/classData';
import { teamMembers } from '../config/teamData';
import { SignupModal } from '../components/SignupModal';

const ClassDetail = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allClasses = getActiveClasses();
    const foundClass = allClasses.find(cls => cls.id === classId);
    if (foundClass) {
      setClassData(foundClass);
    } else {
      // Redirect back to signup page if class not found
      navigate('/signup');
    }
  }, [classId, navigate]);

  const handleSignupClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading class details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/signup')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Classes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Class Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(classData.level)}`}>
                  {classData.level}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{classData.name}</h1>
              
              
              {/* Topics */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {classData.topics.map((topic, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructors */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Instructor{classData.instructors.length > 1 ? 's' : ''}</h3>
                <div className="space-y-2">
                  {classData.instructors.map((instructor, idx) => (
                    <div key={idx} className="text-gray-700">
                      {instructor}
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Duration</h3>
                <p className="text-gray-700">1 hour per session</p>
              </div>

              {/* Sign Up Button */}
              <div className="mb-6 text-center">
                <button
                  onClick={handleSignupClick}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Sign Up for {classData.name}
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Sign up for this {classData.level} level class!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Description and Schedule */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {classData.description}
                </p>
                
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Meet Your Instructor{classData.instructors.length > 1 ? 's' : ''}</h3>
                  <div className="space-y-6">
                    {classData.instructors.map((instructorName, idx) => {
                      const instructor = teamMembers.find(member => member.name === instructorName);
                      return (
                        <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                          <div className="flex">
                            {instructor && (
                              <div className="w-48 h-40 flex-shrink-0 overflow-hidden rounded-l-lg">
                                <img 
                                  src={instructor.image} 
                                  alt={instructor.name}
                                  className="w-full h-full object-cover"
                                  style={instructor.imageControls ? {
                                    transform: instructor.imageControls.scale ? `scale(${instructor.imageControls.scale})` : undefined,
                                    objectPosition: instructor.imageControls.shiftLeft !== undefined || instructor.imageControls.shiftUp !== undefined 
                                      ? `${50 + (instructor.imageControls.shiftLeft || 0)}% ${50 + (instructor.imageControls.shiftUp || 0)}%`
                                      : 'center center'
                                  } : {}}
                                />
                              </div>
                            )}
                            <div className="flex-1 p-6 flex flex-col justify-start">
                              <h4 className="text-xl font-bold text-gray-900 mb-1">{instructorName}</h4>
                              {instructor && (
                                <>
                                  <p className="text-blue-600 font-medium mb-3">{instructor.role}</p>
                                  <p className="text-gray-600 leading-relaxed">{instructor.description}</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>


              {/* About This Class */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Class</h2>
                <p className="text-gray-600 mb-6">
                  Our classes are designed to provide hands-on learning experiences that build foundational skills in STEM fields. Each session focuses on practical application and creative problem-solving.
                </p>

                {/* Learning Outcomes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: '🎯', title: 'Core Concepts', description: 'Master fundamental principles through interactive lessons' },
                      { icon: '🛠️', title: 'Hands-On Projects', description: 'Apply knowledge through real-world building and coding' },
                      { icon: '🤝', title: 'Collaboration', description: 'Work with peers on team-based challenges' },
                      { icon: '🚀', title: 'Innovation', description: 'Develop creative solutions to complex problems' }
                    ].map((outcome, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{outcome.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{outcome.title}</h4>
                          <p className="text-sm text-gray-600">{outcome.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Our Mission</h4>
                  <p className="text-blue-800 text-sm">
                    At Gear Up Foundation, we believe every student deserves access to quality STEM education. Our free classes are designed to inspire the next generation of innovators, regardless of their background or financial situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {isModalOpen && classData && (
        <SignupModal
          classItem={classData}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ClassDetail;
