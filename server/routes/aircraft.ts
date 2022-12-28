import { Request, Response, Router } from 'express'
import { query } from '../services/controllers.js'

export const router = Router();

router.get('/aircraft', query)