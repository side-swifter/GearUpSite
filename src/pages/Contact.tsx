import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { emailjsConfig, getAdminNotificationTemplate, getUserConfirmationTemplate } from '../config/emailjs';

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

const Contact = () => {
  const navigate = useNavigate();
  
  // Subject dropdown options
  const subjectOptions: DropdownOption[] = [
    { value: "New Contact Form Submission", label: "General Inquiry" },
    { value: "I want to join the team", label: "I want to join the team" },
    { value: "Partnership Opportunity", label: "Partnership Opportunity" },
    { value: "Other", label: "Other" }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'New Contact Form Submission',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send notification to admin
      const adminTemplate = getAdminNotificationTemplate({
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        adminTemplate,
        emailjsConfig.privateKey // Using private key for authentication
      );

      // Send confirmation to user
      const userTemplate = getUserConfirmationTemplate({
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        userTemplate,
        emailjsConfig.privateKey // Using private key for authentication
      );

      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        subject: 'New Contact Form Submission',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Have questions or want to join our team? Send us a message!</p>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          {submitStatus ? (
            <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50' : 'bg-blue-50'}`}>
              <p className={`text-center text-lg ${submitStatus.success ? 'text-green-800' : 'text-blue-800'}`}>
                {submitStatus.message}
              </p>
              {submitStatus.success && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Return to Home
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <CustomDropdown
                    id="subject"
                    value={formData.subject}
                    onChange={(value) => handleDropdownChange('subject', value)}
                    options={subjectOptions}
                    placeholder="Select a subject"
                    required
                    label="Subject"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
