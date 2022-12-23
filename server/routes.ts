import { Router, Request, Response } from 'express'
import { aircrat } from './app.js'

const routes = Router()

routes.post('/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})

export default routes