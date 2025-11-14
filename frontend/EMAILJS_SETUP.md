# EmailJS Setup Guide

## Steps to Configure EmailJS

### 1. Create Email Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates** in the sidebar
3. Click **"Create New Template"**
4. Use this template structure:

```
Subject: New Portfolio Contact from {{from_name}}

Hello Arpan,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply to: {{from_email}}
```

5. Save the template and copy the **Template ID** (e.g., `template_xxxxxxx`)

### 2. Update .env File

Open `.env` file and replace `your_template_id_here` with your actual template ID:

```env
VITE_EMAILJS_SERVICE_ID=service_arpan
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx  # Replace with your actual template ID
VITE_EMAILJS_PUBLIC_KEY=xGZz2dZ87evBJDUC2
```

### 3. Test the Contact Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your email inbox for the message

## Troubleshooting

- **"Template not found" error**: Double-check your template ID in the .env file
- **"Service not found" error**: Verify your service ID is correct
- **"Public key invalid" error**: Confirm your public key is correct
- **No email received**: Check your EmailJS dashboard for delivery status

## Environment Variables

- `VITE_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID`: Your email template ID
- `VITE_EMAILJS_PUBLIC_KEY`: Your EmailJS public key

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.
