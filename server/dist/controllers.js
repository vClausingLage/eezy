import { Router } from 'express';
import { aircrat } from './app';
const routes = Router();
routes.post('/api/aircraft', (req, res) => {
    res.send(aircrat);
});
module.exports = routes;
