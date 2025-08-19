import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const emailJsPublicKey = 'gU33dTEMvODoA6qw_';
const emailJsServiceId = 'service_71giipo';  // Your EmailJS service ID
const emailJsTemplateId = 'template_rgz4bxp'; // Team notification template ID
const confirmationTemplateId = 'template_confirm_signup'; // New confirmation template ID
const TEAM_EMAIL = 'gear-up-robotics@outlook.com';

const SignUp = () => {
  // Initialize EmailJS when the component mounts
  useEffect(() => {
    console.log('EmailJS Configuration:', {
      publicKey: emailJsPublicKey ? '***' : 'MISSING',
      serviceId: emailJsServiceId,
      templateId: emailJsTemplateId
    });
    
    if (emailJsPublicKey) {
      try {
        emailjs.init(emailJsPublicKey);
        console.log('EmailJS initialized successfully');
      } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
      }
    } else {
      console.error('Missing required EmailJS public key');
    }
  }, []);

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: '',
    course: '',
    interests: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare the template parameters - using the EXACT variable names from the template
      const templateParams = {
        // Basic information
        to_email: TEAM_EMAIL,
        to_name: 'Gear Up Robotics Team',
        from_name: formData.parentName || 'Website Visitor',
        from_email: formData.email,
        reply_to: formData.email,
        
        // Student information - must match template exactly
        studentName: formData.studentName,
        grade: formData.grade || 'Not specified',
        course: formData.course || 'Not specified',
        interests: formData.interests || 'Not specified',
        
        // Parent/Guardian information - must match template exactly
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        
        // Message and metadata
        message: formData.message || 'No additional information provided',
        currentYear: new Date().getFullYear()
      };

      console.log('Sending email with template ID:', emailJsTemplateId);
      console.log('Using service ID:', emailJsServiceId);
      console.log('Template parameters:', JSON.stringify(templateParams, null, 2));

      // Send email to the team
      const teamEmailPromise = emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        templateParams,
        emailJsPublicKey
      );

      // Send confirmation email to the user
      const userConfirmationParams = {
        to_email: formData.email,
        to_name: formData.parentName || 'Valued Member',
        student_name: formData.studentName,
        parent_name: formData.parentName,
        contact_email: TEAM_EMAIL,
        contact_phone: '+1 (647) 999-9999', // Replace with actual contact number
        year: new Date().getFullYear()
      };

      const userEmailPromise = emailjs.send(
        emailJsServiceId,
        confirmationTemplateId,
        userConfirmationParams,
        emailJsPublicKey
      );

      // Wait for both emails to complete
      const [teamResult, userResult] = await Promise.all([
        teamEmailPromise.catch(error => {
          console.error('Team email failed:', error);
          throw new Error('Failed to send team notification');
        }),
        userEmailPromise.catch(error => {
          console.error('Confirmation email failed:', error);
          throw new Error('Failed to send confirmation email');
        })
      ]);

      console.log('EmailJS Responses:', { teamResult, userResult });

      if ((teamResult.status === 200 || teamResult.status === 201) && 
          (userResult.status === 200 || userResult.status === 201)) {
        setSubmitStatus({
          success: true,
          message: `Thank you for signing up, ${formData.studentName || 'Valued Member'}! We've sent a confirmation email to ${formData.email}. Our team will be in touch with you soon.`
        });
        
        // Reset form on successful submission
        setFormData({
          studentName: '',
          parentName: '',
          email: '',
          phone: '',
          grade: '',
          course: '',
          interests: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send one or more emails');
      }
    } catch (error: any) {
      console.error('Error in form submission:', error);
      
      const errorMessage = error?.message || 'There was an error submitting your form. Please try again later or contact us directly.';
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Sign Up for Robotics Classes</h1>
          <p className="text-xl text-gray-600">Join our robotics program and start your journey into the world of technology and innovation!</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jane Doe"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                    Student's Grade (2024-2025) *
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    required
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Grade</option>
                    <option value="3rd">3rd Grade</option>
                    <option value="4th">4th Grade</option>
                    <option value="5th">5th Grade</option>
                    <option value="6th">6th Grade</option>
                    <option value="7th">7th Grade</option>
                    <option value="8th">8th Grade</option>
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a course</option>
                    <option value="Block Coding Course 1">Block Coding Course 1</option>
                    <option value="Block Coding Course 2">Block Coding Course 2</option>
                    <option value="Block Coding Course 3">Block Coding Course 3</option>
                    <option value="Python Intro">Python Intro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                  What interests you most about our robotics program? *
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  rows={3}
                  required
                  value={formData.interests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us what excites you about robotics and what you hope to learn..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any questions or additional information you'd like to share..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
              </div>

              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Sign Up'}
                </button>
                
                {submitStatus && (
                  <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'}`}>
                    <p className="text-center">{submitStatus.message}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Have questions? Email us at <a href="Gear-Up-Robotics@outlook.com" className="text-blue-600 hover:text-blue-800">Gear-Up-Robotics@outlook.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
