import { Router, Request, Response } from 'express';
import { downloadUniverskateCSV } from '@/utils/csv/downloadUniverskateCSV';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await downloadUniverskateCSV(req, res);
  } catch (error: any) {
    console.error("Error processing CSV:", error.message);
    res.status(500).json({ error: "Failed to process CSV" });
  }
});

export default router;
