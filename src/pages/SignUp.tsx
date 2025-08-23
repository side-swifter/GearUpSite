import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamMembers, TeamMember } from '../config/teamData';
import { getActiveClasses, ClassData, availableTopics } from '../config/classData';
import { Search, Filter, Users, ChevronDown, ChevronRight } from 'lucide-react';

// Classes are now managed in /src/config/classData.ts
// Edit that file to add/remove classes, change levels, icons, and instructors




const SignUp = () => {
  const navigate = useNavigate();
  const [selectedInstructor, setSelectedInstructor] = useState<TeamMember | null>(null);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  
  // New filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['beginner', 'intermediate', 'advanced']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  
  // Get all classes
  const allClasses = getActiveClasses();


  // Filter classes based on selected levels, search query, instructors, and topics
  const filteredClasses = allClasses.filter(cls => {
    const matchesLevel = selectedLevels.includes(cls.level);
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesInstructor = selectedInstructors.length === 0 || 
                             cls.instructors.some(instructor => selectedInstructors.includes(instructor));
    const matchesTopic = selectedTopics.length === 0 || 
                        cls.topics.some(topic => selectedTopics.includes(topic));
    return matchesLevel && matchesSearch && matchesInstructor && matchesTopic;
  });

  // Get unique instructors and use available topics from classData
  const allInstructors = Array.from(new Set(allClasses.flatMap(cls => cls.instructors)));
  
  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleInstructor = (instructor: string) => {
    setSelectedInstructors(prev => 
      prev.includes(instructor) 
        ? prev.filter(i => i !== instructor)
        : [...prev, instructor]
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleClassSelect = (classItem: ClassData) => {
    navigate(`/class/${classItem.id}`);
  };

  const handleInstructorClick = (instructorName: string) => {
    const instructor = teamMembers.find(member => member.name === instructorName);
    if (instructor) {
      setSelectedInstructor(instructor);
      setIsInstructorModalOpen(true);
    }
  };


  const closeInstructorModal = () => {
    setIsInstructorModalOpen(false);
    setSelectedInstructor(null);
  };



  const levelOptions = [
    { id: 'beginner', title: 'Beginner', icon: '🌱', color: 'green' },
    { id: 'intermediate', title: 'Intermediate', icon: '🚀', color: 'blue' },
    { id: 'advanced', title: 'Advanced', icon: '🎯', color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Classes
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect robotics and programming class for your skill level.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search classes..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Level Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Difficulty Level
                </h3>
                <div className="space-y-2">
                  {levelOptions.map(level => (
                    <label key={level.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level.id)}
                        onChange={() => toggleLevel(level.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <span className="mr-2">{level.icon}</span>
                        {level.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Instructor Filters */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Instructor
                </h3>
                <div className="space-y-2">
                  {allInstructors.map(instructor => (
                    <label key={instructor} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedInstructors.includes(instructor)}
                        onChange={() => toggleInstructor(instructor)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {instructor}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topic Filters */}
              <div className="mt-6">
                <button
                  onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
                  className="w-full text-left text-sm font-medium text-gray-700 mb-3 flex items-center justify-between hover:text-gray-900 transition-colors"
                >
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Topics
                  </div>
                  {isTopicsExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {isTopicsExpanded && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableTopics.map((topic: string) => (
                      <label key={topic} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic)}
                          onChange={() => toggleTopic(topic)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {topic}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Results count */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {filteredClasses.length} classes found
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Class List */}
          <div className="flex-1">
            <div className="space-y-4">
              {filteredClasses.map((classItem) => {
                const levelOption = levelOptions.find(l => l.id === classItem.level);
                return (
                  <div
                    key={classItem.id}
                    onClick={() => handleClassSelect(classItem)}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex h-60">
                      {/* Image Section */}
                      <div className="w-80 flex-shrink-0 relative overflow-hidden rounded-l-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <div className="text-6xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                            {classItem.icon}
                          </div>
                        </div>
                        {/* When you add images, replace the above div with:
                        <img 
                          src={`/class-images/${classItem.id}.jpg`} 
                          alt={classItem.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        */}
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-6 flex flex-col justify-between min-h-0">
                        <div className="flex-1 min-h-0">
                          <div className="mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1 line-clamp-2">
                              {classItem.name}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              classItem.level === 'beginner' ? 'bg-green-100 text-green-800' :
                              classItem.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {levelOption?.icon} {levelOption?.title}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                            {classItem.shortDescription}
                          </p>
                          
                          <div className="space-y-2">
                            {/* Topics */}
                            <div>
                              <span className="font-medium text-gray-700 text-sm">Topics:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {classItem.topics.slice(0, 3).map((topic, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs whitespace-nowrap"
                                  >
                                    {topic}
                                  </span>
                                ))}
                                {classItem.topics.length > 3 && (
                                  <span className="text-xs text-gray-500">+{classItem.topics.length - 3}</span>
                                )}
                              </div>
                            </div>
                            
                            {/* Instructor */}
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Instructor:</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleInstructorClick(classItem.instructors[0]);
                                }}
                                className="text-blue-600 ml-1 truncate hover:text-blue-800 hover:underline"
                              >
                                {classItem.instructors[0]}
                              </button>
                              {classItem.instructors.length > 1 && (
                                <span className="text-gray-500"> +{classItem.instructors.length - 1}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover indicator */}
                        <div className="flex justify-end pt-2">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredClasses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📚</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search query.</p>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Instructor Profile Modal */}
        {isInstructorModalOpen && selectedInstructor && (
          <InstructorModal
            instructor={selectedInstructor}
            onClose={closeInstructorModal}
          />
        )}
      </div>
    </div>
  );
};

// Instructor Profile Modal Component
interface InstructorModalProps {
  instructor: TeamMember;
  onClose: () => void;
}


const InstructorModal: React.FC<InstructorModalProps> = ({ instructor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Meet Your Instructor</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-all duration-300 hover:scale-110"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
              <p className="text-lg text-blue-600 font-medium mb-4">{instructor.role}</p>
              <p className="text-gray-700 leading-relaxed">{instructor.description}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
