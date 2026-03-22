const express = require('express');
const router  = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  try {
    await resend.emails.send({
      from:     'Portfolio Contact <onboarding@resend.dev>',
      to:       process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo:  email,
      subject:  subject || `Portfolio Contact from ${name}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Resend error:', err.message);
    res.status(500).json({ error: `Failed to send: ${err.message}` });
  }
});

module.exports = router;