import { Request, Response } from 'express'

import { metarDecoder } from './MetarAPI/main.js';

import { metarDecoderLogs } from '../models/metarDecoder.sequelize.model.js';

export async function decodeMetar (req: Request, res: Response): Promise<void> {
    //! FETCH EVERYTHING SAME TIME
    // try {
    //     let [items, contactlist, itemgroup] = await Promise.all([
    //       fetch("http://localhost:3000/items/get"),
    //       fetch("http://localhost:3000/contactlist/get"),
    //       fetch("http://localhost:3000/itemgroup/get")
    //     ]);

    //     ReactDOM.render(
    //       <Test items={items} contactlist={contactlist} itemgroup={itemgroup} />,
    //         document.getElementById('overview');
    //     );
    //   }
    //   catch(err) {
    //     console.log(err);
    //   };

    let rawMetar: string = ''
    let airportDBResult = {} as AirportDBResult

    const icao = req.params.icao
    let [fetchMetar, fetchAirportDB] = await Promise.all([
        fetch(`https://aviationweather.gov/api/data/metar?ids=${icao}`),
        fetch(`https://airportdb.io/api/v1/airport/${icao.toUpperCase()}?apiToken=${process.env.AIRPORT_DB_API_KEY}`)
    ])
    if (fetchMetar.status === 200 && fetchMetar !== undefined) {
        rawMetar = await fetchMetar.text()
    }
    if (fetchAirportDB.status === 200 && fetchAirportDB !== undefined) {
        airportDBResult = await fetchAirportDB.json()
    }

    const airport = {
        name: airportDBResult.name,
        lat: airportDBResult.latitude_deg,
        long: airportDBResult.longitude_deg,
        runways: filterRunways(airportDBResult.runways),
        frequencies: filterFrequencies(airportDBResult.freqs)
    }
    try {
        const decodedMetar = metarDecoder(rawMetar)
        res.status(200).send({ rawMetar, decodedMetar, airport })
        saveLogs(icao, rawMetar, JSON.stringify(decodedMetar))
    } catch (error: any) {
        saveLogs(icao, rawMetar, error.message)
        console.log('error decoding metar: ', error)
        res.status(500).send({ error: error.message })
    }
}

function filterRunways (runways: Runway[]) {
    return runways.map(runway => {
        return {
            length: runway.length,
            surface: runway.surface,
            le_ident: parseInt(runway.le_ident),
            le_heading_degT: parseInt(runway.le_heading_degT),
            he_ident: parseInt(runway.he_ident),
            he_heading_degT: parseInt(runway.he_heading_degT),
            le_ils: runway.le_ils?.freq,
            he_ils: runway.he_ils?.freq
        }
    })
}

function filterFrequencies (frequencies: Frequency[]) {
    return frequencies.map(frequency => {
        return {
            type: frequency.type,
            frequency: frequency.frequency_mhz
        }
    })
}

function saveLogs (icao: string, rawMetar: string, decodedMetar: string) {
    let errorLog = ''
    metarDecoderLogs.create({ icao: icao, errorLog: errorLog, rawMetar: rawMetar, decodedMetar: decodedMetar })
}

type AirportDBResult = {
    name: string
    latitude_deg: number
    longitude_deg: number
    runways: Runway[]
    freqs: Frequency[]
}

type Runway = {
    length: number
    surface: string
    le_ident: string
    le_heading_degT: string
    he_ident: string
    he_heading_degT: string
    le_ils: ILS
    he_ils: ILS
}

type ILS = {
    freq: number
    course: number
}

type Frequency = {
    type: string
    frequency_mhz: number
}