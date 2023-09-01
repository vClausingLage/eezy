import { Request, Response } from 'express'

import { validator } from './Validation/validator.controller.js'

import { metarDecoder } from './MetarAPI/helper/metar-regex-main.js'

import {
  metarToList,
  metarToString,
  splitMetarListRemarks
} from './MetarAPI/helper/metar-regex-main-helper-functions.js'
import getFlightRule from '../services/MetarAPI/helper/flight-rule-helper-function.js'

interface ListRemarks {
  metar: string[]
  remarks: string[]
  tempo: string[]
  becoming: string[]
}

export async function decodeRawMetar (req: Request, res: Response) {
  const metarString = validator(req.params.metarstring)
  const metarListRemarks: ListRemarks = splitMetarListRemarks(
    metarToList(metarString)
  )
  const metarObject = metarDecoder(metarToString(metarListRemarks.metar))
  // metarObject.tempo = metarDecoder(metarToString(metarListRemarks.tempo));
  // metarObject.becoming = metarDecoder(metarToString(metarListRemarks.becoming));
  // metarObject.remarks = metarDecoder(metarToString(metarListRemarks.remarks));
  metarObject.flight_rule = getFlightRule(
    metarObject.visibility,
    metarObject.clouds[0].cloud_base,
    metarObject.visibility.unit
  )
  res.send({ metarJSON: metarObject })
}
