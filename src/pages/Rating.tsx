import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  delay?: string;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
  delay?: string;
};

// ==============================================
// TESTIMONIALS DATA
// ==============================================
// Add/Edit testimonials below. Each will be automatically displayed in the grid.
const testimonials: Testimonial[] = [

];

// ==============================================
// FAQ DATA
// ==============================================
const faqs: FAQ[] = [
  {
    id: 'feedback-usage',
    question: 'How is my feedback used?',
    answer: 'Your feedback helps us improve our programs, curriculum, and overall approach. We review all feedback regularly and use it to guide our strategic planning.',
    delay: ''
  },
  {
    id: 'anonymous-feedback',
    question: 'Can I provide anonymous feedback?',
    answer: 'Yes, while we ask for your name and email, we never release your personal information.',
    delay: 'delay-100'
  },
  {
    id: 'get-involved',
    question: 'How can I get more involved with Gear Up Robotics?',
    answer: 'There are many ways to get involved! You can volunteer, donate, become a mentor, or partner with us if\'re an educator or school administrator. Visit our "Contact Us" page to learn more.',
    delay: 'delay-200'
  },
  {
    id: 'response-time',
    question: 'Will someone respond to my feedback?',
    answer: 'If you\'ve submitted specific concerns or questions that require a response, a member of our team will reach out to you within 2-3 business days.',
    delay: 'delay-300'
  }
];

// ==============================================
// FAQ ITEM COMPONENT
// ==============================================
const FAQItem: React.FC<FAQ> = ({ id, question, answer, delay = '' }) => (
  <div key={id} className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate fade-in-up ${delay}`}>
    <h3 className="text-lg font-bold text-gray-900 mb-2">
      {question}
    </h3>
    <p className="text-gray-700">
      {answer}
    </p>
  </div>
);

// ==============================================
// TESTIMONIAL CARD COMPONENT
// ==============================================
const TestimonialCard: React.FC<Testimonial> = ({ name, role, content, rating, delay = '' }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 animate fade-in-up ${delay}`}>
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map(star => (
        <div 
          key={star} 
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        >
          ★
        </div>
      ))}
    </div>
    <p className="text-gray-700 mb-6">"{content}"</p>
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm mr-3">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <div className="font-medium text-gray-900">{name}</div>
        <div className="text-gray-500 text-sm">{role}</div>
      </div>
    </div>
  </div>
);

const Rating = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    experience: '',
    feedback: '',
    wouldRecommend: 'yes'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isRecommendDropdownOpen, setIsRecommendDropdownOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleRatingSelect = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    setIsRatingDropdownOpen(false);
  };

  const handleRecommendSelect = (value: string) => {
    setFormData(prev => ({ ...prev, wouldRecommend: value }));
    setIsRecommendDropdownOpen(false);
  };

  const getRatingText = (rating: number) => {
    const ratingMap = {
      5: '⭐⭐⭐⭐⭐ Excellent',
      4: '⭐⭐⭐⭐ Very Good',
      3: '⭐⭐⭐ Good',
      2: '⭐⭐ Fair',
      1: '⭐ Poor'
    };
    return ratingMap[rating as keyof typeof ratingMap];
  };

  const getRecommendText = (value: string) => {
    const recommendMap = {
      'yes': 'Yes, definitely!',
      'maybe': 'Maybe',
      'no': 'No'
    };
    return recommendMap[value as keyof typeof recommendMap];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const ratingData = {
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        experience: formData.experience,
        feedback: formData.feedback,
        wouldRecommend: formData.wouldRecommend,
        submittedAt: serverTimestamp(),
        documentName: formData.name
      };

      await addDoc(collection(db, 'ratings'), ratingData);

      setSubmitStatus({
        success: true,
        message: 'Thank you for your feedback! We really appreciate it.'
      });
      
      setFormData({
        name: '',
        email: '',
        rating: 5,
        experience: '',
        feedback: '',
        wouldRecommend: 'yes'
      });

    } catch (error) {
      console.error('Error submitting rating:', error);
      setSubmitStatus({
        success: false,
        message: 'There was an error submitting your rating. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Rate Us!</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            We value your feedback. Let us know how we're doing and how we can
            better serve our community.
          </p>
        </div>
      </section>

      {/* Rating Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Rating Field - Custom Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating *
                </label>
                <button
                  type="button"
                  onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
                >
                  <span>{getRatingText(formData.rating)}</span>
                  <svg className={`w-5 h-5 transition-transform ${isRatingDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isRatingDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingSelect(rating)}
                        className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none first:rounded-t-md last:rounded-b-md"
                      >
                        {getRatingText(rating)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience Field */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Which program did you participate in?
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Robotics Basics, Advanced Programming, etc."
                />
              </div>

              {/* Feedback Field */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your experience, what you liked, and how we can improve..."
                />
              </div>

              {/* Would Recommend Field - Custom Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Would you recommend Gear Up Robotics to others? *
                </label>
                <button
                  type="button"
                  onClick={() => setIsRecommendDropdownOpen(!isRecommendDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
                >
                  <span>{getRecommendText(formData.wouldRecommend)}</span>
                  <svg className={`w-5 h-5 transition-transform ${isRecommendDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isRecommendDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {['yes', 'maybe', 'no'].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRecommendSelect(value)}
                        className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none first:rounded-t-md last:rounded-b-md"
                      >
                        {getRecommendText(value)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-md font-medium text-white transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Divider - Full width */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <hr className="border-gray-200 my-12" />
        </div>
      </div>

      {/* Testimonials - Only show if there are testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              What Others Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  {...testimonial}
                  delay={`delay-${(index % 3) * 100}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                delay={faq.delay || ''}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rating;