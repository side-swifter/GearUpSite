import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { teamMembers, TeamMember } from '../config/teamData';
import { classData as importedClassData, getClassesByLevel, ClassData, ClassSession } from '../config/classData';

// Class Schedule Types (for compatibility with existing code)
interface ClassSchedule {
  id: string;
  name: string;
  instructors: string[];
  sessions: ClassSession[];
  description?: string;
  icon?: string;
}

// Classes are now managed in /src/config/classData.ts
// Edit that file to add/remove classes, change levels, icons, and instructors

// Filter active classes and convert to the expected format
const classSchedule: { id: string; name: string; instructors: string[]; sessions: ClassSession[]; description: string; icon?: string }[] = importedClassData
  .filter(cls => cls.active !== false)
  .map(cls => ({
    id: cls.id,
    name: cls.name,
    instructors: cls.instructors,
    sessions: cls.sessions,
    description: cls.description,
    icon: cls.icon
  }));

// Custom Dropdown Component
interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  required?: boolean;
  label: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm ${
            !value ? 'text-gray-500' : 'text-gray-900'
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                  value === option.value ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                }`}
              >
                <span className={`block truncate ${value === option.value ? 'font-semibold' : 'font-normal'}`}>
                  {option.label}
                </span>
                {value === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Signup Modal Component
interface SignupModalProps {
  classItem: ClassSchedule;
  session: ClassSession;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ classItem, session, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: '',
    interests: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const gradeOptions: DropdownOption[] = [
    { value: "3rd", label: "3rd Grade" },
    { value: "4th", label: "4th Grade" },
    { value: "5th", label: "5th Grade" },
    { value: "6th", label: "6th Grade" },
    { value: "7th", label: "7th Grade" },
    { value: "8th", label: "8th Grade" },
    { value: "9th", label: "9th Grade" },
    { value: "10th", label: "10th Grade" },
    { value: "11th", label: "11th Grade" },
    { value: "12th", label: "12th Grade" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classItem || !session) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        to_email: 'gear-up-robotics@outlook.com',
        to_name: 'Gear Up Robotics Team',
        from_name: formData.parentName || 'Website Visitor',
        from_email: formData.email,
        reply_to: formData.email,
        
        studentName: formData.studentName,
        grade: formData.grade || 'Not specified',
        class_name: classItem.name,
        class_day: session.day,
        class_time: session.time,
        instructor: classItem.instructors.join(', '),
        interests: formData.interests || 'Not specified',
        
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message || 'No additional information provided',
        currentYear: new Date().getFullYear()
      };

      await emailjs.send(
        'service_71giipo',
        'template_rgz4bxp',
        templateParams,
        'gU33dTEMvODoA6qw_'
      );

      setSubmitStatus({
        success: true,
        message: `Thank you for signing up for ${classItem.name}! We'll send you more details soon.`
      });
      
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        grade: '',
        interests: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'There was an error submitting your form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Register for {classItem.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {classItem && session && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Class Details:</h3>
              <p className="text-blue-800"><strong>Class:</strong> {classItem.name}</p>
              <p className="text-blue-800"><strong>Day:</strong> {session.day}</p>
              <p className="text-blue-800"><strong>Time:</strong> {session.time} ({session.duration})</p>
              <p className="text-blue-800"><strong>Instructor:</strong> {classItem.instructors.join(', ')}</p>
              {classItem.description && (
                <p className="text-blue-800 mt-2">
                  <strong>Description:</strong> {classItem.description}
                </p>
              )}
            </div>
          )}

          {submitStatus ? (
            <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="text-center">{submitStatus.message}</p>
              {submitStatus.success && (
                <button
                  onClick={onClose}
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Close
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Student's Full Name *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <CustomDropdown
                    id="grade"
                    value={formData.grade}
                    onChange={(value) => handleDropdownChange('grade', value)}
                    options={gradeOptions}
                    placeholder="Select Grade"
                    required
                    label="Student's Grade (2024-2025)"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                  What interests you most about this class? *
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  rows={3}
                  required
                  value={formData.interests}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us what excites you about this class..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any questions or additional information..."
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// EmailJS Configuration
const emailJsPublicKey = 'gU33dTEMvODoA6qw_';
const emailJsServiceId = 'service_71giipo';  // Your EmailJS service ID
const emailJsTemplateId = 'template_rgz4bxp'; // Team notification template ID

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<TeamMember | null>(null);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  // Initialize EmailJS when the component mounts
  useEffect(() => {
    console.log('EmailJS Configuration:', {
      publicKey: emailJsPublicKey ? '***' : 'MISSING',
      serviceId: emailJsServiceId,
      templateId: emailJsTemplateId
    });
    
    emailjs.init(emailJsPublicKey);
  }, []);

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);
    setCurrentStep(2);
  };

  const handleClassSelect = (classItem: ClassSchedule) => {
    setSelectedClass(classItem);
    setIsTimeModalOpen(true);
  };

  const handleSessionSelect = (session: ClassSession) => {
    setSelectedSession(session);
    setIsTimeModalOpen(false);
    setIsModalOpen(true);
  };

  const closeTimeModal = () => {
    setIsTimeModalOpen(false);
    setSelectedClass(null);
  };

  const handleInstructorClick = (instructorName: string) => {
    const instructor = teamMembers.find(member => member.name === instructorName);
    if (instructor) {
      setSelectedInstructor(instructor);
      setIsInstructorModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    setSelectedSession(null);
  };

  const closeInstructorModal = () => {
    setIsInstructorModalOpen(false);
    setSelectedInstructor(null);
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setSelectedProgram('');
    setSelectedClass(null);
    setSelectedSession(null);
  };


  const programCategories = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Perfect for newcomers to robotics and programming',
      icon: '🌱',
      classes: getClassesByLevel('beginner').map(cls => ({
        id: cls.id,
        name: cls.name,
        instructors: cls.instructors,
        sessions: cls.sessions,
        description: cls.description,
        icon: cls.icon
      }))
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'For students with some programming or robotics experience',
      icon: '🚀',
      classes: getClassesByLevel('intermediate').map(cls => ({
        id: cls.id,
        name: cls.name,
        instructors: cls.instructors,
        sessions: cls.sessions,
        description: cls.description,
        icon: cls.icon
      }))
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'For experienced students ready for complex challenges',
      icon: '🎯',
      classes: getClassesByLevel('advanced').map(cls => ({
        id: cls.id,
        name: cls.name,
        instructors: cls.instructors,
        sessions: cls.sessions,
        description: cls.description,
        icon: cls.icon
      }))
    }
  ];

  const selectedCategory = programCategories.find(cat => cat.id === selectedProgram);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Join Our Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect robotics and programming class for your skill level. 
            Follow our simple 2-step process to get started.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            <div className="flex items-center transform transition-all duration-500 hover:scale-105">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ${
                currentStep >= 1 ? 'bg-blue-600 shadow-lg' : 'bg-gray-300'
              }`}>
                1
              </div>
              <span className="ml-3 text-lg font-medium text-gray-700">Choose Level</span>
            </div>
            <div className={`w-16 h-1 transition-all duration-700 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center transform transition-all duration-500 hover:scale-105">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ${
                currentStep >= 2 ? 'bg-blue-600 shadow-lg' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="ml-3 text-lg font-medium text-gray-700">Select Class & Time</span>
            </div>
          </div>
        </div>

        {/* Step 1: Program Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 animate-slide-up">
              What's your experience level?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {programCategories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => handleProgramSelect(category.id)}
                  className="group cursor-pointer bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{category.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                      {category.description}
                    </p>
                    <div className="text-sm text-blue-600 font-medium transition-all duration-300 group-hover:text-blue-700 group-hover:font-semibold">
                      {category.classes.length} classes available
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Class Selection */}
        {currentStep === 2 && selectedCategory && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="flex items-center justify-between mb-8 animate-slide-up">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory.title}
                </h2>
                <p className="text-gray-600">{selectedCategory.description}</p>
              </div>
              <button
                onClick={resetFlow}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-all duration-300 hover:scale-105"
              >
                ← Back to Programs
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCategory.classes.map((classItem, index) => (
                <div
                  key={classItem.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 animate-slide-up cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleClassSelect(classItem)}
                >
                  {/* Header with icon/visual */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <span className="text-2xl">
                        {classItem.icon || '📚'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {classItem.name}
                    </h3>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 text-blue-500 mr-2">👨‍🏫</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInstructorClick(classItem.instructors[0]);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                        >
                          {classItem.instructors[0]}
                        </button>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 text-blue-500 mr-2">📅</span>
                        <span>{classItem.sessions.length} session{classItem.sessions.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
                      View Times
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time Selection Modal */}
        {isTimeModalOpen && selectedClass && (
          <TimeSelectionModal
            classItem={selectedClass}
            onClose={closeTimeModal}
            onSelectSession={handleSessionSelect}
            onInstructorClick={handleInstructorClick}
          />
        )}

        {/* Signup Modal */}
        {isModalOpen && selectedClass && selectedSession && (
          <SignupModal
            classItem={selectedClass}
            session={selectedSession}
            onClose={closeModal}
          />
        )}

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

interface TimeSelectionModalProps {
  classItem: ClassSchedule;
  onClose: () => void;
  onSelectSession: (session: ClassSession) => void;
  onInstructorClick: (instructorName: string) => void;
}

const TimeSelectionModal: React.FC<TimeSelectionModalProps> = ({ classItem, onClose, onSelectSession, onInstructorClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Time Slot</h2>
              <p className="text-gray-600">Select when you'd like to attend {classItem.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-all duration-300 hover:scale-110"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {classItem.sessions.map((session, sessionIndex) => (
              <button
                key={sessionIndex}
                onClick={() => onSelectSession(session)}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-center animate-slide-up"
                style={{ animationDelay: `${sessionIndex * 100}ms` }}
              >
                <div className="text-sm text-gray-500 mb-1">{session.day}</div>
                <div className="text-lg font-semibold text-gray-900">{session.time}</div>
                <div className="text-xs text-gray-400 mt-1">{session.duration}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
