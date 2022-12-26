import { Aircraft } from './model.js'

import { Request, Response } from 'express'

import sequelize from './db_connection.js'
import { QueryTypes } from 'sequelize'

// export const aircraft = await Aircraft.findAll()
// console.log(aircraft)

// GET ALL AIRCRAFT FOR SELECTOR 1
// export const getAircraft = await sequelize.query("SELECT * FROM `aircraft`", { 
//   type: QueryTypes.SELECT
//   // model: Aircraft,
//   // mapToModel: true
// })

export const getAircraft = async (req: Request, res: Response) => {
  const aircraft = await sequelize.query("SELECT * FROM `aircraft`", { 
    //   type: QueryTypes.SELECT
    //   // model: Aircraft,
    //   // mapToModel: true
    })
  if (aircraft) {
    res.status(200).json({'message': 'works'})
  } else {
    res.status(400).json({'mesaage': 'failed'})
  }
}