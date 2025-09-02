import { Router, Request, Response } from 'express';
import { importCSVs } from '@/utils/csv/importCSVs';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await importCSVs(req, res);
  } catch (error: any) {
    console.error("Error processing CSVs:", error.message);
    res.status(500).json({ error: "Failed to process CSV" });
  }
});

export default router;
