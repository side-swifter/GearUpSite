import { useEffect } from 'react';
import { CalendarIcon, CheckIcon, TrendingUpIcon } from 'lucide-react';
const Progress = () => {
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
          <h1 className="text-4xl font-bold text-white mb-6">Our Progress</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Follow our journey as we continue to expand our impact and develop
            innovative ways to bring robotics education to students everywhere.
          </p>
        </div>
      </section>
      {/* Milestones */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Milestones
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-red-200"></div>
            {/* Milestones */}
            <div className="space-y-12">
              <div className="relative flex flex-col md:flex-row items-center animate fade-in-up">
                <div className="flex md:w-1/2 md:justify-end mb-6 md:mb-0 md:pr-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:max-w-md">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-gray-600">January 2018</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Foundation Established
                    </h3>
                    <p className="text-gray-700">
                      Gear Up Robotics was founded with a mission to democratize
                      access to robotics education for all students.
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-red-600 border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center animate fade-in-up delay-100">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-red-600 border-4 border-white shadow"></div>
                <div className="flex md:w-1/2 md:justify-start mb-6 md:mb-0 md:pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:max-w-md">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-gray-600">September 2019</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      First School Partnership
                    </h3>
                    <p className="text-gray-700">
                      Launched our first school partnership program with 10
                      schools in underserved communities, reaching over 500
                      students.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center animate fade-in-up delay-200">
                <div className="flex md:w-1/2 md:justify-end mb-6 md:mb-0 md:pr-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:max-w-md">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-gray-600">March 2020</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Virtual Learning Platform
                    </h3>
                    <p className="text-gray-700">
                      Developed and launched our virtual robotics learning
                      platform, allowing students to continue their education
                      during the pandemic.
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-red-600 border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center animate fade-in-up delay-300">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-red-600 border-4 border-white shadow"></div>
                <div className="flex md:w-1/2 md:justify-start mb-6 md:mb-0 md:pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:max-w-md">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-gray-600">June 2021</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      National Recognition
                    </h3>
                    <p className="text-gray-700">
                      Received the National STEM Education Award for our
                      innovative approach to robotics education and community
                      impact.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center animate fade-in-up delay-400">
                <div className="flex md:w-1/2 md:justify-end mb-6 md:mb-0 md:pr-12">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:max-w-md">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-gray-600">January 2023</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Global Expansion
                    </h3>
                    <p className="text-gray-700">
                      Expanded our programs internationally, launching
                      partnerships with schools in 5 countries across 3
                      continents.
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-red-600 border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Current Initiatives */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Current Initiatives
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 animate fade-in-left">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUpIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Expanding Rural Access
              </h3>
              <p className="text-gray-700 mb-4">
                We're working to bring our robotics programs to 100 additional
                rural schools by the end of this year, focusing on areas with
                limited STEM resources.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-red-600 h-2.5 rounded-full" style={{
                width: '65%'
              }}></div>
              </div>
              <div className="text-sm text-gray-600">65% Complete</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 animate fade-in-right">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <CheckIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Teacher Training Program
              </h3>
              <p className="text-gray-700 mb-4">
                Our comprehensive teacher training program aims to equip 1,000
                educators with the skills to teach robotics and integrate it
                into their curriculum.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-red-600 h-2.5 rounded-full" style={{
                width: '78%'
              }}></div>
              </div>
              <div className="text-sm text-gray-600">78% Complete</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 animate fade-in-left delay-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUpIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Affordable Robotics Kits
              </h3>
              <p className="text-gray-700 mb-4">
                We're developing low-cost, high-quality robotics kits that
                schools and families can purchase at a fraction of the cost of
                commercial alternatives.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-red-600 h-2.5 rounded-full" style={{
                width: '40%'
              }}></div>
              </div>
              <div className="text-sm text-gray-600">40% Complete</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 animate fade-in-right delay-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <CheckIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Online Learning Platform
              </h3>
              <p className="text-gray-700 mb-4">
                We're enhancing our online learning platform with interactive
                lessons, virtual robotics simulations, and a community forum for
                students to share projects.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-red-600 h-2.5 rounded-full" style={{
                width: '85%'
              }}></div>
              </div>
              <div className="text-sm text-gray-600">85% Complete</div>
            </div>
          </div>
        </div>
      </section>
      {/* Future Goals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Future Goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Our vision for the next five years includes these ambitious goals to
            further our mission.
          </p>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center animate fade-in-up">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Reach 100,000 students annually through our programs
                </h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center animate fade-in-up delay-100">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Establish robotics education centers in 20 major cities
                </h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center animate fade-in-up delay-200">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Develop an accredited robotics curriculum for K-12 schools
                </h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center animate fade-in-up delay-300">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Launch a scholarship program for underrepresented students in
                  STEM
                </h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center animate fade-in-up delay-400">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">5</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Create a global robotics competition with teams from 50+
                  countries
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Progress;