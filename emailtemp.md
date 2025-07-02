<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Class Signup - Gear Up Robotics</title>
    <style type="text/css">
        /* Base Styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f7fafc;
        }
        
        /* Email Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        /* Header */
        .email-header {
            background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        
        .email-subheader {
            font-size: 16px;   

            opacity: 0.9;
            margin-top: 10px;
        }
        
        /* Content */
        .email-content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 25px;
            padding-bottom: 25px;
            border-bottom: 1px solid #edf2f7;
        }
        
        .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        h2 {
            color: #2d3748;
            font-size: 20px;
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f4f8;
        }
        
        .info-row {
            margin-bottom: 12px;
            display: flex;
            flex-wrap: wrap;
        }
        
        .label {
            font-weight: 600;
            color: #4a5568;
            width: 150px;
            flex-shrink: 0;
        }
        
        .value {
            flex: 1;
            min-width: 0;
            word-break: break-word;
        }
        
        /* Message Box */
        .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #e53e3e;
            padding: 15px;
            margin-top: 10px;
            border-radius: 0 4px 4px 0;
            font-style: italic;
        }
        
        /* Footer */
        .email-footer {
            background-color: #f7fafc;
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
        }
        
        .logo {
            max-width: 180px;
            height: auto;
            margin-bottom: 15px;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                border-radius: 0;
            }
            
            .email-content {
                padding: 20px;
            }
            
            .info-row {
                display: block;
            }
            
            .label {
                display: block;
                width: 100%;
                margin-bottom: 5px;
                color: #4a5568;
            }
            
            .value {
                margin-bottom: 15px;
                display: block;
                width: 100%;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 20px 0; background-color: #f7fafc; font-family: 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; font-size: 15px; line-height: 1.6; color: #333333;">
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>New Class Signup</h1>
            <div class="email-subheader">Submitted on {{submissionDate}}</div>
        </div>
        
        <!-- Content -->
        <div class="email-content">
            <div class="section">
                <h2>Student Information</h2>
                <div class="info-row">
                    <div class="label">Student Name:</div>
                    <div class="value">{{studentName}}</div>
                </div>
                <div class="info-row">
                    <div class="label">Grade Level:</div>
                    <div class="value">{{grade}}</div>
                </div>
                <div class="info-row">
                    <div class="label">Experience Level:</div>
                    <div class="value">{{experience}}</div>
                </div>
                <div class="info-row">
                    <div class="label">Areas of Interest:</div>
                    <div class="value">{{interests}}</div>
                </div>
            </div>
            
            <div class="section">
                <h2>Parent/Guardian Information</h2>
                <div class="info-row">
                    <div class="label">Parent Name:</div>
                    <div class="value">{{parentName}}</div>
                </div>
                <div class="info-row">
                    <div class="label">Email:</div>
                    <div class="value">
                        <a href="mailto:{{email}}" style="color: #e53e3e; text-decoration: none;">{{email}}</a>
                    </div>
                </div>
                <div class="info-row">
                    <div class="label">Phone:</div>
                    <div class="value">
                        <a href="tel:{{phone}}" style="color: #e53e3e; text-decoration: none;">{{phone}}</a>
                    </div>
                </div>
            </div>
            
            {% if message %}
            <div class="section">
                <h2>Additional Message</h2>
                <div class="message-box">
                    {{message}}
                </div>
            </div>
            {% endif %}
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <img src="https://www.gearuprobotics.com/logo.png" alt="Gear Up Robotics" class="logo" style="max-width: 180px; height: auto;">
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #718096;">
                This email was sent from the Gear Up Robotics website contact form.<br>
                &copy; {{currentYear}} Gear Up Robotics. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>