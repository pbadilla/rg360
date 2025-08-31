import { Router } from 'express';
import { importHTTPUniverskate} from '@/utils/csv/downloadUniverskateCSV';

const router = Router();

router.get('/', importHTTPUniverskate);

export default router;
