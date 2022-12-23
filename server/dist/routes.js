import { Router } from 'express';
import { aircrat } from './app.js';
const routes = Router();
routes.post('/aircraft', (req, res) => {
    res.send(aircrat);
});
export default routes;
