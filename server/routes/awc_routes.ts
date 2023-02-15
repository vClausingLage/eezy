import { Request, Response, Router } from 'express'

export const awc_router = Router()

awc_router.get('/:metarID', async (req: Request, res: Response) => {
  const icao = req.params.metarID

  const fetchMetar = await fetch(
    `https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=$${icao}&format=json`, 
    {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  const data = await fetchMetar.json();
  if (fetchMetar.status === 200 && data.length > 0) res.send(data[0])
  else res.send({message: 'error'})
})

awc_router.get('/raw/:metarID', async (req: Request, res: Response) => {
  const icao = req.params.metarID

  const fetchRawMetar = await fetch(
    `https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=${icao}`
  );
  const data = await fetchRawMetar.text();
  // const response = fetchMetar.headers;
  if (data !== undefined) res.send(data)
  else res.send({message: 'no data'})
})