import { Router, Request, Response } from 'express'
import { aircrat } from './app'

const routes = Router()

routes.post('/api/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})

module.exports = routes