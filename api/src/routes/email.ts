import { Router, Request, Response } from 'express';
import sendEmail from '@/controllers/email';

const router = Router();

router.post('/email', async (req: Request, res: Response) => {
  try {
    await sendEmail(req, res);
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
