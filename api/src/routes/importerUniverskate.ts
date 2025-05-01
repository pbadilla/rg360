import { Router } from 'express';
import { importerUniverskate} from '@/controllers/importerUniverskate';

const router = Router();

router.get('/', importerUniverskate);

export default router;
