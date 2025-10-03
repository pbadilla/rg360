import { Router, Request, Response } from 'express';

import { enrichBBDDFromJSON } from '@/services/importers/enrichBBDDFromJSON';

import { wss } from 'src/websocket';

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

export default router;
