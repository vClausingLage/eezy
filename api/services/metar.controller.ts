import { Request, Response } from 'express'

import { metarDecoder } from './MetarAPI/helper/metar-regex-main.js';

export async function decodeMetar(req: Request, res: Response) {
    const icao = req.params.icao
    const headers = req.headers;
    const fetchRawMetar = await fetch(
        `https://aviationweather.gov/api/data/metar?ids=${icao}`
    )
    const rawMetar = await fetchRawMetar.text()
    const decodedMetar = metarDecoder(rawMetar)
    if (fetchRawMetar.status === 200 && rawMetar !== undefined) res.send({ rawMetar, decodedMetar, headers })
    else res.send({ message: 'no data' })
}