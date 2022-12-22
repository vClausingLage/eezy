import { Router, Request, Response } from 'express'
import { aircrat } from './app'

const router = Router()

router.post('/api/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})

export default router