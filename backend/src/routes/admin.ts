import { Router } from 'express';
import { getScenarios } from '../controllers/admin';

const router = Router();

router.get('/scenarios', getScenarios);

export default router;