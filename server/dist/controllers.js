import { Router } from 'express';
import { aircrat } from './app';
const router = Router();
router.post('/api/aircraft', (req, res) => {
    res.send(aircrat);
});
export default router;
