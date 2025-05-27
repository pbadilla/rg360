import { Router } from 'express';
import { importerRollerblade} from '@/controllers/importerRollerblade';

const router = Router();

router.get('/', importerRollerblade);

export default router;
