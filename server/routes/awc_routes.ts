import { Request, Response, Router } from 'express'

export const awc_router = Router()

awc_router.get('/:metarID', async (req: Request, res: Response) => {
  const search = JSON.stringify(req.params);
  const icao = req.params.metarID

  const fetchMetar = await fetch(
    `https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=$${icao}&format=json`
  );
  const data = await fetchMetar.json();
  // const response = fetchMetar.headers;
  if (data[0] !== undefined && data[0].obs[0] !== undefined) res.send(data)
  else res.send({message: 'no data'})
})