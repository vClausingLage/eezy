import { Router } from 'express'

import { decodeMetar } from '../services/metar.controller.js'

export const metar_router = Router()

metar_router.get('/:icao', decodeMetar)