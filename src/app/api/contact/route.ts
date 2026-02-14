import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  restaurant?: string;
  service: string;
  message: string;
}

// In-memory store for submitted emails (resets on server restart)
// For production, consider using Redis or a database
const submittedEmails = new Set<string>();

// Email template
function generateEmailHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #000000 0%, #333333 100%);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .field {
      margin-bottom: 24px;
    }
    .field-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: #6b7280;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .field-value {
      font-size: 16px;
      color: #1f2937;
      padding: 12px;
      background-color: #f9fafb;
      border-radius: 8px;
      border-left: 4px solid #000000;
    }
    .message-box {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 16px;
      border-left: 4px solid #000000;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px 30px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
    .badge {
      display: inline-block;
      padding: 6px 12px;
      background-color: #000000;
      color: #ffffff;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Contact Form Submission</h1>
      <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">You have received a new inquiry from your website</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="field-label">Full Name</div>
        <div class="field-value">${data.name}</div>
      </div>

      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value">
          <a href="mailto:${data.email}" style="color: #000000; text-decoration: none;">${data.email}</a>
        </div>
      </div>

      ${data.phone ? `
      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value">
          <a href="tel:${data.phone}" style="color: #000000; text-decoration: none;">${data.phone}</a>
        </div>
      </div>
      ` : ''}

      ${data.restaurant ? `
      <div class="field">
        <div class="field-label">Restaurant</div>
        <div class="field-value">${data.restaurant}</div>
      </div>
      ` : ''}

      <div class="field">
        <div class="field-label">Service Interested In</div>
        <div class="field-value">
          <span class="badge">${data.service}</span>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${data.message}</div>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0;">This email was sent from the contact form on <strong>promith.com</strong></p>
      <p style="margin: 8px 0 0; font-size: 12px;">Please respond to this inquiry within 24 hours</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Plain text version
function generateEmailText(data: ContactFormData): string {
  return `
New Contact Form Submission
============================

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.restaurant ? `Restaurant: ${data.restaurant}` : ''}
Service: ${data.service}

Message:
${data.message}

---
This email was sent from the contact form on promith.com
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.service || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email has already submitted
    const normalizedEmail = body.email.toLowerCase().trim();
    if (submittedEmails.has(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'You have already submitted an inquiry with this email address.' },
        { status: 429 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Send email to company
    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_FORM_TO_EMAIL,
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.name}`,
      text: generateEmailText(body),
      html: generateEmailHTML(body),
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: body.email,
      subject: 'Thank you for contacting Promith',
      text: `Hi ${body.name},\n\nThank you for reaching out to us! We've received your message and will get back to you within 24 hours.\n\nBest regards,\nThe Promith Team`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 40px auto; padding: 30px; background: #ffffff; border-radius: 16px; }
    .header { text-align: center; margin-bottom: 30px; }
    h1 { color: #000000; font-size: 28px; margin: 0 0 10px; }
    .message { font-size: 16px; color: #374151; line-height: 1.8; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #f3f4f6; text-align: center; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us!</h1>
    </div>
    <div class="message">
      <p>Hi <strong>${body.name}</strong>,</p>
      <p>Thank you for reaching out to Promith! We've received your message and our team will review it shortly.</p>
      <p>We typically respond to all inquiries within 24 hours during business days. If your matter is urgent, please feel free to call us directly.</p>
      <p>We look forward to speaking with you soon!</p>
      <p style="margin-top: 30px;"><strong>Best regards,</strong><br>The Promith Team</p>
    </div>
    <div class="footer">
      <p>Promith - AI-Powered Automation Solutions</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    // Add email to submitted list after successful send
    submittedEmails.add(normalizedEmail);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
