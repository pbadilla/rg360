import { Router, Request, Response } from 'express';
import { downloadAndProcessCSV } from '@/controllers/csv';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await downloadAndProcessCSV(req, res);
  } catch (error: any) {
    console.error("Error processing CSV:", error.message);
    res.status(500).json({ error: "Failed to process CSV" });
  }
});

export default router;
