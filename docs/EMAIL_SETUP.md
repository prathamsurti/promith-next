# Email Configuration Guide

This project uses **nodemailer** to send emails from the contact form via SMTP.

## Setup Instructions

### 1. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Update SMTP Credentials

Edit `.env.local` with your SMTP provider details:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@promith.com
SMTP_FROM_NAME=Promith
CONTACT_FORM_TO_EMAIL=hello@promith.com
```

## SMTP Provider Options

### Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Google Account
2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
   - Use this as `SMTP_PASSWORD`

**Configuration:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
```

### SendGrid

**Configuration:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### Mailgun

**Configuration:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-smtp-password
```

### AWS SES (Simple Email Service)

**Configuration:**
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
```

### Resend (Modern Alternative)

**Configuration:**
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=resend
SMTP_PASSWORD=re_your_api_key
```

## Email Features

### Contact Form Submission

When a user submits the contact form at `/contact`, the system:

1. **Validates** form data (required fields, email format)
2. **Sends notification email** to your business email (`CONTACT_FORM_TO_EMAIL`)
3. **Sends confirmation email** to the user

### Email Templates

The API route includes two templates:

1. **Notification Email** - Sent to your business with:
   - Customer name, email, phone, company
   - Selected service
   - Message content
   - Professional HTML design with neumorphism styling

2. **Confirmation Email** - Sent to the customer with:
   - Thank you message
   - Expected response time
   - Professional branding

## API Endpoint

### POST `/api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 000-0000",
  "company": "Example Corp",
  "service": "ai-assistant",
  "message": "I'm interested in your services..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Testing

### Test Email Configuration

You can test your SMTP setup using a simple curl command:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "consultation",
    "message": "This is a test message"
  }'
```

### Development Testing

For development, you can use **Ethereal Email** (fake SMTP service):

1. Visit https://ethereal.email/
2. Create a free account
3. Use the provided SMTP credentials
4. View sent emails in the Ethereal dashboard

**Ethereal Configuration:**
```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ethereal-username
SMTP_PASSWORD=your-ethereal-password
```

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use App Passwords** - Don't use your main email password
3. **Rotate credentials** regularly
4. **Use environment-specific configs** for dev/staging/production
5. **Enable rate limiting** in production (consider adding middleware)
6. **Verify sender domain** for production (SPF, DKIM, DMARC records)

## Troubleshooting

### "Invalid credentials" error
- Double-check `SMTP_USER` and `SMTP_PASSWORD`
- For Gmail, ensure you're using an App Password, not your regular password

### "Connection refused" error
- Verify `SMTP_HOST` and `SMTP_PORT`
- Check if your hosting provider blocks outbound SMTP connections
- Try different ports: 587 (TLS), 465 (SSL), 25 (plain)

### Emails going to spam
- Configure SPF records for your domain
- Set up DKIM signing
- Use a verified sender domain
- Avoid spam trigger words in templates

### Rate limiting
- Most providers have sending limits (Gmail: 500/day)
- Consider using a dedicated email service for production
- Implement queueing for high-volume scenarios

## Production Considerations

1. **Use a dedicated email service** (SendGrid, Mailgun, AWS SES)
2. **Implement rate limiting** to prevent abuse
3. **Add CAPTCHA** to the contact form (Google reCAPTCHA or hCaptcha)
4. **Monitor email delivery** and bounces
5. **Set up webhooks** for delivery notifications
6. **Use a queue system** (Bull, BullMQ) for async processing
7. **Add logging** and error tracking (Sentry, LogRocket)

## Customization

### Modify Email Templates

Edit templates in `app/api/contact/route.ts`:

- `generateEmailHTML()` - HTML template for notification email
- `confirmationMailOptions.html` - Confirmation email template

### Add Attachments

```typescript
const mailOptions = {
  // ... existing options
  attachments: [
    {
      filename: 'brochure.pdf',
      path: './public/downloads/brochure.pdf'
    }
  ]
};
```

### Add CC/BCC Recipients

```typescript
const mailOptions = {
  // ... existing options
  cc: 'sales@promith.com',
  bcc: 'archive@promith.com'
};
```

## Support

For issues or questions:
- Check the [nodemailer documentation](https://nodemailer.com/)
- Review SMTP provider's documentation
- Check Next.js API routes documentation
