import { Router } from 'express';
import { getHint } from '../controllers/hint';

const router = Router();

router.post('/hint', getHint);

export default router;