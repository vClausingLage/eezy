import { Router } from 'express';
import { aircraft } from './controller.js';
const routes = Router();
routes.post('/aircraft', (req, res) => {
    res.send(aircraft);
});
export default routes;
