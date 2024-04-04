import { Router } from 'express'

import { getAirport, getDistance } from '../services/airport.controller.js'

export const airportRouter = Router()

// airportDB -> metar
airportRouter.get('/:airportID', getAirport)

// airport -> route calculator
airportRouter.get('/distance/:icao', getDistance)
