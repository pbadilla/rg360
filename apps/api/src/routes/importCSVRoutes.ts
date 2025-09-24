/** import { downloadRollerbladeCSV } from '@/utils/csv/downloadRollerbladeCSV';
import { downloadUniverskateCSV } from '@/utils/csv/downloadUniverskateCSV';
import { Router, Request, Response } from 'express';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const source = req.query.source as string;

  try {
    switch (source) {
      case 'universkate':
        await downloadUniverskateCSV(req, res);
        break;
      case 'rollerblade':
        await downloadRollerbladeCSV(req, res);
        break;
      default:
        res.status(400).json({
          error: "Invalid source. Use ?source=universkate or ?source=rollerblade"
        });
        return;
    }
  } catch (err: any) {
    console.error(`Error processing ${source} CSV:`, err.message);
    res.status(500).json({ error: `Failed to process ${source} CSV` });
  }
});

export default router; **/
