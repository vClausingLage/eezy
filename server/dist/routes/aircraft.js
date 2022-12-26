import { Router } from 'express';
import { query } from '../services/controllers.js';
export const router = Router();
router.get('/aircraft', (req, res) => {
    if (res.status(200)) {
        const result = query();
        res.json(result);
    }
    else {
        res.json({ 'message': 'query dead' });
    }
});
