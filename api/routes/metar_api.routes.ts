import { Router } from 'express'

import { decodeRawMetar } from '../controller/metarApi.controller.js'

export const metar_api_router = Router()

metar_api_router.get('/:metarstring(*)', decodeRawMetar)
