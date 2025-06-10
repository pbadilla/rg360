import { Router } from 'express';
import { importerRollerblade} from 'src/crons/importerRollerblade';

const router = Router();

router.get('/', importerRollerblade);

export default router;
