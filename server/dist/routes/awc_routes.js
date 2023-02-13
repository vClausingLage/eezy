import { Router } from 'express';
export const awc_router = Router();
awc_router.get('/:metarID', async (req, res) => {
    // const search = JSON.stringify(req.params);
    const icao = req.params.metarID;
    console.log('icao', icao);
    const fetchMetar = await fetch(`https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=$${icao}&format=json`);
    const data = await fetchMetar.json();
    console.log('result', data);
    // const response = fetchMetar.headers;
    if (data !== undefined)
        res.send(data[0]);
    else
        res.send({ message: 'no data' });
});
awc_router.get('/raw/:metarID', async (req, res) => {
    const icao = req.params.metarID;
    const fetchMetar = await fetch(`https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=${icao}`);
    const data = await fetchMetar.text();
    // const response = fetchMetar.headers;
    if (data !== undefined)
        res.send(data);
    else
        res.send({ message: 'no data' });
});
