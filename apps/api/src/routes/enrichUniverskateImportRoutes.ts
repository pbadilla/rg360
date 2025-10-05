import { Router, Request, Response } from 'express';

import { enrichBBDDFromJSON } from '@/services/enrichers/enrichBBDDFromJSON';

import { wss } from 'src/websocket';
import { enrichNotFoundProductsWithAI } from '@/services/enrichers/enrichNotFoundProductsWithAI';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    enrichBBDDFromJSON(wss); // async runs + streams progress
    res.json({ started: true });
  } catch (error: any) {
    console.error("Error processing enrichBBDDFromJSON:", error.message);
    res.status(500).json({ error: "Failed to process enrichBBDDFromJSON" });
  }
});

router.get('/generate-ai', async (req: Request, res: Response) => {
  try {
    const result = await enrichNotFoundProductsWithAI();
    res.json(result);
  } catch (err: any) {
    console.error("Error generating AI descriptions:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
