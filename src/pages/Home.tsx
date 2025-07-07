import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lightbulb, Award } from 'lucide-react';
const Home = () => {
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 transform -skew-y-6 origin-top-right z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center md:text-left md:max-w-2xl">
            <div className="flex justify-center md:justify-start mb-6">
              <img src="/transparentGearup.png" alt="Gear Up Robotics Logo" className="h-32 w-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate fade-in-left">
              Powering the Future Through Robotics
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 animate fade-in-left delay-200">
              At Gear Up Robotics, we're revolutionizing STEM education by
              making robotics accessible, engaging, and empowering. Join our
              movement to inspire the next generation of innovators who will
              build the technologies of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate fade-in-up delay-400">
              <Link to="/impact" className="bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                See Our Impact
              </Link>
              <Link to="/team" className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all transform hover:scale-105">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate fade-in-up">
              What We Do
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 animate fade-in-up delay-200">
              We're on a mission to democratize robotics education and inspire
              the next generation of engineers and innovators.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 animate fade-in-up">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                STEM Education
              </h3>
              <p className="text-gray-600">
                We provide hands-on robotics programs that make STEM learning
                exciting and accessible to students of all backgrounds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 animate fade-in-up delay-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Building
              </h3>
              <p className="text-gray-600">
                We foster inclusive communities where young minds can
                collaborate, share ideas, and grow together.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 animate fade-in-up delay-200">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We develop cutting-edge teaching methods and tools that make
                complex robotics concepts accessible and engaging.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 animate fade-in-up delay-300">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Competitions
              </h3>
              <p className="text-gray-600">
                We organize and support robotics competitions that challenge
                students to apply their skills in real-world scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-white">
                Ready to join our mission?
              </h2>
              <p className="mt-2 text-lg text-red-100">
                Help us inspire the next generation of robotics engineers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/rate-us" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-red-600 bg-white hover:bg-red-50 transition-colors">
                Support Us
              </Link>
              <Link to="/progress" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-red-700 transition-colors">
                See Our Progress <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;