// EmailJS Configuration
// SECURITY NOTE: In production, consider moving email sending to a backend service
// to avoid exposing your private key in client-side code.
const emailjsConfig = {
  serviceId: 'service_71giipo',
  templateId: 'template_841xcls',
  privateKey: 'oTqSNywuo3iOtXO9F4-6_', // Using private key as requested
  publicKey: 'YOUR_PUBLIC_KEY' // Keep this as a fallback
};

// HTML Email Template for Admin Notification
const getAdminNotificationTemplate = (data: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}) => ({
  to_email: 'Gear-Up-Robotics@outlook.com',
  from_name: data.from_name,
  from_email: data.from_email,
  subject: `New Contact: ${data.subject}`,
  message: data.message,
  reply_to: data.from_email,
  html_content: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #e53e3e;
        padding: 20px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .content {
        padding: 30px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-top: none;
        border-radius: 0 0 5px 5px;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #718096;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #e53e3e;
        color: white !important;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
      }
      .details {
        background-color: #f7fafc;
        padding: 20px;
        border-radius: 4px;
        margin: 20px 0;
      }
      .detail-item {
        margin-bottom: 10px;
      }
      .detail-label {
        font-weight: bold;
        color: #4a5568;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <p>You've received a new message through the contact form on your website.</p>
      
      <div class="details">
        <div class="detail-item">
          <span class="detail-label">From:</span> ${data.from_name} &lt;${data.from_email}&gt;
        </div>
        <div class="detail-item">
          <span class="detail-label">Subject:</span> ${data.subject}
        </div>
        <div class="detail-item">
          <span class="detail-label">Message:</span>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      
      <p>To respond to this inquiry, simply reply to this email or use the contact information provided above.</p>
      
      <a href="mailto:${data.from_email}" class="button">Reply to ${data.from_name.split(' ')[0]}</a>
      
      <p>Best regards,<br>The Gear Up Robotics Team</p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Gear Up Robotics. All rights reserved.</p>
    </div>
  </body>
  </html>
  `
});

// HTML Email Template for User Confirmation
const getUserConfirmationTemplate = (data: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}) => ({
  to_email: data.from_email,
  from_name: 'Gear Up Robotics',
  from_email: 'noreply@gearuprobotics.org',
  subject: `Thank you for contacting us!`,
  message: `Hello ${data.from_name},\n\nThank you for reaching out to Gear Up Robotics. We've received your message and will get back to you as soon as possible.\n\nHere's a copy of your message for your records:\n\n---\nSubject: ${data.subject}\n\n${data.message}\n---\n\nBest regards,\nThe Gear Up Robotics Team`,
  reply_to: 'Gear-Up-Robotics@outlook.com',
  html_content: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Us</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #e53e3e;
        padding: 20px;
        text-align: center;
        border-radius: 5px 5px 0 0;
        color: white;
      }
      .content {
        padding: 30px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-top: none;
        border-radius: 0 0 5px 5px;
      }
      .message-box {
        background-color: #f8f9fa;
        border-left: 4px solid #e53e3e;
        padding: 15px;
        margin: 20px 0;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #718096;
        border-top: 1px solid #e2e8f0;
        padding-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1 style="margin: 0; color: white;">Thank You for Contacting Us!</h1>
    </div>
    
    <div class="content">
      <p>Hello ${data.from_name},</p>
      
      <p>Thank you for reaching out to Gear Up Robotics. We've received your message and will get back to you as soon as possible.</p>
      
      <div class="message-box">
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Your Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <p>If you have any additional information to add, please reply to this email.</p>
      
      <p>Best regards,<br>The Gear Up Robotics Team</p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Gear Up Robotics. All rights reserved.</p>
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `
});

export { emailjsConfig, getAdminNotificationTemplate, getUserConfirmationTemplate };

