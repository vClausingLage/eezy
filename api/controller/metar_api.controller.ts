import { Request, Response } from 'express'
import fs from 'fs'

import { getRawMetar } from './awc.controller.js'

import { validator } from './Validation/validator.controller.js'

import { metarDecoder } from './MetarAPI/helper/metar-regex-main.js'

import {
  metarToList,
  metarToString,
  splitMetarListRemarks
} from './MetarAPI/helper/metar-regex-main-helper-functions.js'
import getFlightRule from '../controller/MetarAPI/helper/flight-rule-helper-function.js'

type ListRemarks = {
  metar: string[]
  remarks: string[]
  tempo: string[]
  becoming: string[]
}

export async function decodeRawMetar(req: Request, res: Response): Promise<void> {
  try {
    console.log(req)
    const content = `${req.params.metarstring} from ${req.headers['x-forwarded-for']}\n`
    fs.appendFile('file.log', content, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('File written successfully\n'); //! remove
      }
    });
    const metarString = validator(req.params.metarstring)
    console.log(metarString)

    // const metarListRemarks: ListRemarks = splitMetarListRemarks(
    //   metarToList(metarString)
    // )
    // const metarObject = metarDecoder(metarToString(metarListRemarks.metar))
    // metarObject.tempo = metarDecoder(metarToString(metarListRemarks.tempo));
    // metarObject.becoming = metarDecoder(metarToString(metarListRemarks.becoming));
    // metarObject.remarks = metarDecoder(metarToString(metarListRemarks.remarks));
    // metarObject.flight_rule = getFlightRule(
    //   metarObject.visibility,
    //   metarObject.clouds[0].cloud_base,
    //   metarObject.visibility.unit
    // )
    // res.send({ metarJSON: metarObject })
    res.status(200).send('hi')
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
  } finally {
    console.log('done')
  }
}
