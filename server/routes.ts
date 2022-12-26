import { Router, Request, Response } from 'express'
import { aircraft } from './controller.js'

const routes = Router()

routes.post('/aircraft', (req: Request, res: Response) => {
  res.send(aircraft)
})

export default routes