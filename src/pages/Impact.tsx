import React, { useEffect } from 'react';
import { CheckCircleIcon, TrendingUpIcon, GlobeIcon } from 'lucide-react';
const Impact = () => {
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
          <h1 className="text-4xl font-bold text-white mb-6">Our Impact</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Discover how Gear Up Robotics is transforming STEM education and
            inspiring the next generation of innovators around the world.
          </p>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-100 animate fade-in-up">
              <div className="text-5xl font-bold text-red-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600 text-lg">Students Reached</div>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-100 animate fade-in-up delay-100">
              <div className="text-5xl font-bold text-red-600 mb-2">250+</div>
              <div className="text-gray-600 text-lg">Schools Partnered</div>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-100 animate fade-in-up delay-200">
              <div className="text-5xl font-bold text-red-600 mb-2">35</div>
              <div className="text-gray-600 text-lg">States Served</div>
            </div>
          </div>
        </div>
      </section>
      {/* Impact Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Impact Stories
          </h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center animate fade-in-left">
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Students working with robots" className="rounded-lg shadow-md w-full h-64 object-cover" />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Transforming Rural Education
                </h3>
                <p className="text-gray-700 mb-4">
                  In partnership with local communities, we've brought robotics
                  programs to over 100 rural schools, providing students with
                  access to cutting-edge STEM education they wouldn't otherwise
                  receive.
                </p>
                <div className="flex items-center text-red-600">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    87% increase in STEM interest among participants
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center animate fade-in-right">
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Girls coding workshop" className="rounded-lg shadow-md w-full h-64 object-cover" />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Closing the Gender Gap in STEM
                </h3>
                <p className="text-gray-700 mb-4">
                  Our Girls in Robotics initiative has empowered thousands of
                  young women to pursue their interest in engineering and
                  technology, creating a more diverse and inclusive STEM
                  community.
                </p>
                <div className="flex items-center text-red-600">
                  <TrendingUpIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    42% increase in female participation in robotics
                    competitions
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center animate fade-in-left">
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Global robotics competition" className="rounded-lg shadow-md w-full h-64 object-cover" />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Global Robotics Competitions
                </h3>
                <p className="text-gray-700 mb-4">
                  Our international robotics competitions have brought together
                  students from over 30 countries, fostering cross-cultural
                  collaboration and friendship while tackling global challenges
                  through technology.
                </p>
                <div className="flex items-center text-red-600">
                  <GlobeIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    5,000+ students participated in our global competitions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What People Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate fade-in-up">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
                  MS
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">Maria Smith</div>
                  <div className="text-gray-500 text-sm">
                    Science Teacher, Lincoln High School
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "Gear Up Robotics transformed our science program. Students who
                were previously disengaged are now leading robotics projects and
                considering STEM careers."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate fade-in-up delay-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">James Davis</div>
                  <div className="text-gray-500 text-sm">Parent</div>
                </div>
              </div>
              <p className="text-gray-700">
                "My daughter never showed interest in technology until she
                joined a Gear Up workshop. Now she's captain of her robotics
                team and planning to study computer engineering."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate fade-in-up delay-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
                  AR
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    Alex Rodriguez
                  </div>
                  <div className="text-gray-500 text-sm">Student, Age 15</div>
                </div>
              </div>
              <p className="text-gray-700">
                "Gear Up Robotics showed me that I can use technology to solve
                real problems. I've learned more from building robots than I
                ever did from textbooks alone."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Impact;