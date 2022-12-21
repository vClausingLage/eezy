import express from 'express';
import { aircrat } from './app';
const router = express.Router();
router.post('/api/aircraft', (req, res) => {
    res.send(aircrat);
});
module.exports = router;
