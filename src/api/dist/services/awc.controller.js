export async function getMetar(req, res) {
    const icao = req.params.metarID;
    const date = new Date();
    const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}_${date.getHours()}${date.getMinutes()}`;
    const url = `https://aviationweather.gov/api/data/metar?ids=${icao}&date=${dateString}&format=json`; //! Date must be Zulu
    try {
        const fetchMetar = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await fetchMetar.json();
        console.log(data);
        if (fetchMetar.status === 200 && data.length > 0)
            res.send(data[0]);
        else
            res.send({ message: 'error' });
    }
    catch (error) {
        console.log(error);
    }
}
export async function getRawMetar(req, res) {
    const icao = req.params.metarID;
    const fetchRawMetar = await fetch(`https://aviationweather.gov/api/data/metar?ids=${icao}` //! change url
    );
    const data = await fetchRawMetar.text();
    // const response = fetchMetar.headers;
    if (data !== undefined)
        res.send(data);
    else
        res.send({ message: 'no data' });
}
