const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  const { subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'ventasonline@rollergrind360.com',
      subject,
      text: message,
    });
    res.send('Email sent successfully!');
  } catch (err) {
    res.status(500).send('Failed to send email: ' + err.message);
  }
};

module.exports = { sendEmail };
