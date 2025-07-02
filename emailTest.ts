// Simple EmailJS test script using Node.js
import * as EmailJS from '@emailjs/nodejs';

// Your EmailJS credentials
const emailJsPublicKey = 'gU33dTEMvODoA6qw_';
const emailJsServiceId = 'service_71giipo';
const emailJsTemplateId = 'template_dI2xxIK';

// Test email function
async function sendTestEmail() {
  try {
    console.log('Sending test email...');
    
    const response = await EmailJS.send(
      emailJsServiceId,
      emailJsTemplateId,
      {
        to_email: 'gear-up-robotics@outlook.com',
        to_name: 'Gear Up Team',
        from_name: 'Test Sender',
        from_email: 'test@example.com',
        reply_to: 'test@example.com',
        message: 'This is a test email from EmailJS',
        studentName: 'Test Student',
        parentName: 'Test Parent',
        phone: '123-456-7890',
        grade: '5th',
        experience: 'Beginner',
        interests: 'Robotics'
      },
      {
        publicKey: emailJsPublicKey
      }
    );

    console.log('Email sent successfully!', response);
  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
  }
}

// Run the test
sendTestEmail();
