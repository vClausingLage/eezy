import { Router } from 'express';
import { createAircraft, getAircraft, deleteAircraft, editAircraft } from '../services/aircraft.sequelize.controller.js';
export const aircraft_router = Router();
aircraft_router.post('/create', createAircraft);
aircraft_router.get('/create/:user', getAircraft);
aircraft_router.put('/create/:id:user', editAircraft);
aircraft_router.delete('/create/:id:user', deleteAircraft);
