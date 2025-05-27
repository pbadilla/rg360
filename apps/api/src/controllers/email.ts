import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

const sendEmail = async (req: Request, res: Response): Promise<void> => {
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
  } catch (err: any) {
    res.status(500).send('Failed to send email: ' + err.message);
  }
};

export { sendEmail };
