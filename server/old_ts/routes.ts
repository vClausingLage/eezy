import { Router, Request, Response } from 'express'
import { getAircraft } from './controller.js'

const routes = Router()

routes.post('/aircraft', getAircraft)

export default routes