import { Router } from 'express';
export const router = Router();
router.get('/test', (req, res) => {
    res.send('hi');
});
