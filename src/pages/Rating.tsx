import { useEffect } from 'react';

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
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
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
      document.body.removeChild(script);
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