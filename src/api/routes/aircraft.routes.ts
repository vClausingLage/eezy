import { Router } from 'express'

import {
  createAircraft,
  getAircraft,
  deleteAircraft,
  editAircraft
} from '../controller/aircraft.sequelize.controller.js'

export const aircraftRouter = Router()

aircraftRouter.post('/create', createAircraft)
aircraftRouter.get('/create/:user', getAircraft)
aircraftRouter.put('/create/:id:user', editAircraft)
aircraftRouter.delete('/create/:id:user', deleteAircraft)
