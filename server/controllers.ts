import express, { Request, Response } from 'express'
import { aircrat } from './app'
import { app } from './app'

app.post('/api/aircraft', (req: Request, res: Response) => {
  res.send(aircrat)
})