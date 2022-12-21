import express, { Request, Response } from 'express'
import { app } from './app'
import { aircrat } from './app'

app.post('/api/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})