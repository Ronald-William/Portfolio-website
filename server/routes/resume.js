const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/download', (req, res) => {
  // Place your resume PDF at server/assets/resume.pdf
  const resumePath = path.join(__dirname, '../assets/resume.pdf');

  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ error: 'Resume not found. Please add resume.pdf to server/assets/' });
  }

  res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(resumePath);
});

module.exports = router;
