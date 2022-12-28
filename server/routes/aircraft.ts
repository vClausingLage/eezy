import { Request, Response, Router } from 'express'
import { query } from '../services/controllers.js'

export const router = Router();

router.get('/aircraft', query)
// https://www.robinwieruch.de/node-express-server-rest-api/