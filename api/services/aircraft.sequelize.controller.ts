import { Request, Response } from 'express'

import { aircraft } from '../models/aircraft.sequelize.model.js'

import { validator } from './Validation/validator.controller.js'

import errorFetchData from './error/errorFetchData.js'

export async function getAircraft (req: Request, res: Response) {
  try {
    const user = req.params.user
    const response = await aircraft.findAll({
      where: {
        user
      }
    })
    if (response.length > 0) {
      res.send({ message: 'fetched', data: response })
    } else {
      res.send({ message: 'no aircraft' })
    }
  } catch (error) {
    errorFetchData(res, error)
  }
}

export async function createAircraft (req: Request, res: Response) {
  try {
    const newAircraft = req.body
    const user = req.body.user
    await aircraft.create(newAircraft)
    const response = await aircraft.findAll({
      where: {
        user
      }
    })
    res.send({ message: 'created', data: response })
  } catch (error) {
    errorFetchData(res, error)
  }
}

export async function editAircraft (req: Request, res: Response) {
  try {
    const id = req.params.id
    const user = req.params.user
    const response = await aircraft.findAll({
      where: {
        user
      }
    })
    res.send({ message: 'edited', data: response })
  } catch (error) {
    errorFetchData(res, error)
  }
}

export async function deleteAircraft (req: Request, res: Response) {
  const id = req.params.id
  const user = req.params.user
  try {
    await aircraft.destroy({
      where: {
        id
      }
    })
    const response = await aircraft.findAll({
      where: {
        user
      }
    })
    res.send({ message: 'deleted', data: response })
  } catch (error) {
    errorFetchData(res, error)
  }
}
