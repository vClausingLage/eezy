import { Router } from 'express'

import { decodeMetar } from '../services/metar.controller.js'

export const metarRouter = Router()

metarRouter.get('/:icao', decodeMetar)