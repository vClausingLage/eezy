import { Request, Response } from 'express'
import { Aircraft } from "./models.js"

export async function query(req: Request, res: Response) {
  const result = await Aircraft.findAll({ 
    where: {
      manufacturer: 'Cessna'
    }
  })
  try {
    res.send(result)
  } catch {
    console.error('error')
  }
}

// https://stackoverflow.com/questions/45859745/where-should-i-write-queries-in-model-or-controller-sequelize
// https://stackoverflow.com/questions/62685728/use-model-in-sequelize-from-a-controller

// localhost:4000/api/aircraft

// https://expressjs.com/en/guide/routing.html