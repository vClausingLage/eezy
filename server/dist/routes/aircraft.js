import { Router } from 'express';
import { query } from '../services/controllers.js';
export const router = Router();
router.post('/aircraft', query);
