import express, { Request, Response } from 'express'
import { aircrat } from './app'

const router = express.Router()

router.post('/api/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})

module.exports = router