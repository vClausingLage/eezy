import { Router } from 'express';
import { getAirport, getDistance } from '../services/airport.controller.js';
export const airport_router = Router();
// airportDB -> metar
airport_router.get('/:airportID', getAirport);
// airport -> route calculator
airport_router.get('/distance/:icao', getDistance);
