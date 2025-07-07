import { useEffect, useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would send this data to your server
    console.log({
      name,
      email,
      rating,
      feedback
    });
    setSubmitted(true);
    // Reset form
    setName('');
    setEmail('');
    setRating(0);
    setFeedback('');
    // Reset submitted state after showing success message
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  return <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-red-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Rate Us!</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            We value your feedback. Let us know how we're doing and how we can
            better serve our community.
          </p>
        </div>
      </section>
      {/* Rating Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate fade-in-up">
            {submitted ? <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your feedback has been submitted successfully. We appreciate
                  you taking the time to share your thoughts with us.
                </p>
                <button onClick={() => setSubmitted(false)} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Submit Another Response
                </button>
              </div> : <form onSubmit={handleSubmit} className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Share Your Experience
                </h2>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" placeholder="Your Name" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" placeholder="your.email@example.com" required />
                </div>
                <div className="mb-6">
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    Your Rating
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="p-1 focus:outline-none transition-transform hover:scale-110">
                        <Star className={`h-8 w-8 ${star <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </button>)}
                    <span className="ml-2 text-sm text-gray-600">
                      {rating ? `You rated us ${rating} out of 5` : 'Select a rating'}
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Feedback
                  </label>
                  <textarea id="feedback" value={feedback} onChange={e => setFeedback(e.target.value)} rows={4} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" placeholder="Please share your experience with our programs or suggestions for improvement..." required />
                </div>
                <button type="submit" disabled={!rating} className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${rating ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'} transition-colors`}>
                  Submit Feedback <Send className="ml-2 h-5 w-5" />
                </button>
              </form>}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What Others Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate fade-in-up">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-5 w-5 ${star <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
              </div>
              <p className="text-gray-700 mb-4">
                "The robotics program at our school has transformed how our
                students engage with STEM subjects. The curriculum is
                outstanding and the support from the Gear Up team is
                exceptional."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm mr-3">
                  JD
                </div>
                <div>
                  <div className="font-medium text-gray-900">John Doe</div>
                  <div className="text-gray-500 text-sm">School Principal</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate fade-in-up delay-100">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-5 w-5 ${star <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
              </div>
              <p className="text-gray-700 mb-4">
                "My son never showed interest in science until he joined the
                Gear Up Robotics after-school program. Now he's building robots
                at home and talking about becoming an engineer!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm mr-3">
                  SM
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sarah Miller</div>
                  <div className="text-gray-500 text-sm">Parent</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate fade-in-up delay-200">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
              </div>
              <p className="text-gray-700 mb-4">
                "As a teacher with limited technical background, I was nervous
                about implementing a robotics program. The training and
                resources provided by Gear Up made it accessible and enjoyable."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm mr-3">
                  LJ
                </div>
                <div>
                  <div className="font-medium text-gray-900">Lisa Johnson</div>
                  <div className="text-gray-500 text-sm">5th Grade Teacher</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate fade-in-up">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How is my feedback used?
              </h3>
              <p className="text-gray-700">
                Your feedback helps us improve our programs, curriculum, and
                overall approach. We review all feedback regularly and use it to
                guide our strategic planning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Can I provide anonymous feedback?
              </h3>
              <p className="text-gray-700">
                Yes, while we ask for your name and email, you can contact us
                directly at feedback@gearuprobotics.org if you prefer to remain
                anonymous.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How can I get more involved with Gear Up Robotics?
              </h3>
              <p className="text-gray-700">
                There are many ways to get involved! You can volunteer, donate,
                become a mentor, or partner with us if you're an educator or
                school administrator. Visit our "Get Involved" page to learn
                more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate fade-in-up delay-300">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Will someone respond to my feedback?
              </h3>
              <p className="text-gray-700">
                If you've shared specific concerns or questions that require a
                response, a member of our team will reach out to you within 2-3
                business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Rating;