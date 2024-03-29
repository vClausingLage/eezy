import { Request, Response } from 'express'

import { metarDecoder } from './MetarAPI/helper/metar-regex-main.js';

export async function decodeMetar(req: Request, res: Response): Promise<void> {
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

    const icao = req.params.icao
    let [metar, airportDB] = await Promise.all([
        fetch(`https://aviationweather.gov/api/data/metar?ids=${icao}`),
        fetch(`https://airportdb.io/api/v1/airport/${icao.toUpperCase()}?apiToken=${process.env.AIRPORT_DB_API_KEY}`)
    ])
    const rawMetar = await metar.text()
    const result = await airportDB.json()

    const airport = {
        name: result.name,
        lat: result.latitude_deg,
        long: result.longitude_deg,
        runways: filterRunways(result.runways),
        frequencies: filterFrequencies(result.freqs)
    }

    res.send({ rawMetar, decodedMetar: metarDecoder(rawMetar), airport })


    // const headers = req.headers;
    // const fetchRawMetar = await fetch(
    //     `https://aviationweather.gov/api/data/metar?ids=${icao}`
    // )
    // const rawMetar = await fetchRawMetar.text()
    // // const airportAWS = await fetchAirportAWS(icao)
    // const airportAirportDB = await fetchAirportAirportDB(icao)
    const decodedMetar = metarDecoder(rawMetar)
    // if (fetchRawMetar.status === 200 && rawMetar !== undefined) res.send({ rawMetar, decodedMetar, airportAirportDB, headers })
    // else res.send({ message: 'no data' })
}

async function fetchAirportAirportDB(icao: string): Promise<any> {
    const fetchAirport = await fetch(
        `https://airportdb.io/api/v1/airport/${icao.toUpperCase()}?apiToken=${process.env.AIRPORT_DB_API_KEY}`
    )
    const result = await fetchAirport.json()
    const airport = {
        name: result.name,
        lat: result.latitude_deg,
        long: result.longitude_deg,
        runways: filterRunways(result.runways),
        frequencies: filterFrequencies(result.freqs)
    }
    if (fetchAirport.status === 200 && airport !== undefined) return airport
    else return { message: 'no airport data' }
}

function filterRunways(runways: Runway[]) {
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

function filterFrequencies(frequencies: Frequency[]) {
    return frequencies.map(frequency => {
        return {
            type: frequency.type,
            frequency: frequency.frequency_mhz
        }
    })
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