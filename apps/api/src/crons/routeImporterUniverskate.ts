import { Router } from 'express';
import { importHTTPUniverskate} from 'src/scripts/universkate/downloadUniverskateCSV';

const router = Router();

router.get('/', importHTTPUniverskate);

export default router;
