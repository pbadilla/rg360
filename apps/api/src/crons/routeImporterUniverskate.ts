import { Router } from 'express';
import { importerUniverskate} from 'src/crons/importerUniverskate';

const router = Router();

router.get('/', importerUniverskate);

export default router;
