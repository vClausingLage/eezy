import { Router } from 'express'

import { decodeMetar } from '../controller/metar.controller.js'

export const metarRouter = Router()

metarRouter.get('/:icao', decodeMetar)