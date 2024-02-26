import { Request, Response } from 'express'

import { metarDecoder } from './MetarAPI/helper/metar-regex-main.js';

export async function decodeMetar(req: Request, res: Response) {
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
    const headers = req.headers;
    const fetchRawMetar = await fetch(
        `https://aviationweather.gov/api/data/metar?ids=${icao}`
    )
    const rawMetar = await fetchRawMetar.text()
    // const airportAWS = await fetchAirportAWS(icao)
    const airportAirportDB = await fetchAirportAirportDB(icao)
    const decodedMetar = metarDecoder(rawMetar)
    if (fetchRawMetar.status === 200 && rawMetar !== undefined) res.send({ rawMetar, decodedMetar, airportAirportDB, headers })
    else res.send({ message: 'no data' })
}

async function fetchAirportAWS(icao: string) {
    const fetchAirport = await fetch(
        `https://aviationweather.gov/api/data/airport?ids=${icao.toUpperCase()}&format=json`
    )
    const airport = await fetchAirport.json()
    if (fetchAirport.status === 200 && airport !== undefined) return airport
    else return { message: 'no airport data' }
}

async function fetchAirportAirportDB(icao: string) {
    const fetchAirport = await fetch(
        `https://airportdb.io/api/v1/airport/${icao.toUpperCase()}?apiToken=${process.env.AIRPORT_DB_API_KEY}`
    )
    const airport = await fetchAirport.json()
    if (fetchAirport.status === 200 && airport !== undefined) return airport
    else return { message: 'no airport data' }
}