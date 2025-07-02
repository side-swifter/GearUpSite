import React, { useEffect } from 'react';
import { LinkedinIcon, TwitterIcon, MailIcon } from 'lucide-react';
const Team = () => {
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
            Meet the passionate educators, engineers, and innovators who are
            making our mission possible.
          </p>
        </div>
      </section>
      {/* Leadership Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Our leadership team brings decades of combined experience in
            education, engineering, and non-profit management.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up">
              <div className="h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Michael Johnson" className="w-full h-full object-cover object-center" />
              </div>

              {/* Team Member Details */} // Manas Kamarsu
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Manas Kamarsu
                </h3>
                <p className="text-red-600 font-medium mb-3">
                  Co-Founder & Lead Instructor
                </p>
                <p className="text-gray-600 mb-4">
                Manas is a 2-year FTC veteran and one of the driving forces behind Gear-Up Robotics. 
                Known for his innovative thinking and strong leadership,he’s passionate about making robotics 
                approachable and exciting for young learners. Manas brings creativity, technical skill,
                and a genuine love for teaching into every session.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <MailIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member Details */} 
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up delay-100">
              <div className="h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Sarah Williams" className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Abhinav Basava
                </h3>
                <p className="text-red-600 font-medium mb-3">
                  Co-Founder & Lead Instructor
                </p>
                <p className="text-gray-600 mb-4">
                As a co-founder and 1-year FTC competitor, Abhinav plays a key leadership role in shaping the vision of Gear-Up Robotics. 
                He’s a high-energy mentor who thrives on helping students grow in confidence and skill. Abhinav’s 
                teaching style is fun, friendly,
                and always focused on making robotics engaging for everyone.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <MailIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member Details */} 
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up delay-200">
              <div className="h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="David Chen" className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Vivaan Parikh
                </h3>
                <p className="text-red-600 font-medium mb-3">
                  Instructor
                </p>
                <p className="text-gray-600 mb-4">
                With 2 years of FTC experience, Vivaan is a skilled and strategic robotics mentor. He excels at explaining 
                technical concepts in a way that clicks with students, and he’s always ready to jump in and 
                guide with patience and enthusiasm. Vivaan’s passion for robotics shines through in every class.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                    <MailIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Member Details */} 
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Program Directors
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Emily Rodriguez" className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Siddarth Shailesh
                </h3>
                <p className="text-red-600 font-medium mb-2">K-5 Programs</p>
                <p className="text-gray-600 text-sm">
                  EInstructor
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up delay-100">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Marcus Lee" className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Marcus Lee
                </h3>
                <p className="text-red-600 font-medium mb-2">
                  Middle School Programs
                </p>
                <p className="text-gray-600 text-sm">
                  Former science teacher specializing in hands-on learning
                  methods.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up delay-200">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Aisha Patel" className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Aisha Patel
                </h3>
                <p className="text-red-600 font-medium mb-2">
                  High School Programs
                </p>
                <p className="text-gray-600 text-sm">
                  Engineering educator focused on college-preparatory robotics
                  training.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate fade-in-up delay-300">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Robert Kim" className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Robert Kim
                </h3>
                <p className="text-red-600 font-medium mb-2">
                  Competition Director
                </p>
                <p className="text-gray-600 text-sm">
                  Organizes our regional and national robotics competitions and
                  events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Board of Advisors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Board of Advisors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Our advisors provide strategic guidance and industry connections to
            help us maximize our impact.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate fade-in-up">
              <div className="flex-shrink-0 mr-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Dr. James Wilson" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Dr. James Wilson
                </h3>
                <p className="text-red-600">University of Technology</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-100">
              <div className="flex-shrink-0 mr-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Linda Martinez" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Linda Martinez
                </h3>
                <p className="text-red-600">Tech Innovations Inc.</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-200">
              <div className="flex-shrink-0 mr-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Thomas Greene" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Thomas Greene
                </h3>
                <p className="text-red-600">Education Foundation</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-300">
              <div className="flex-shrink-0 mr-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Dr. Maya Singh" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Dr. Maya Singh
                </h3>
                <p className="text-red-600">National Science Institute</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-400">
              <div className="flex-shrink-0 mr-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Carlos Mendez" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Carlos Mendez
                </h3>
                <p className="text-red-600">Global Robotics Association</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-500">
              <div className="flex-shrink-0 mr-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Jennifer Taylor" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Jennifer Taylor
                </h3>
                <p className="text-red-600">School District Superintendent</p>
              </div>
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
            View Open Positions
          </a>
        </div>
      </section>
    </div>;
};
export default Team;