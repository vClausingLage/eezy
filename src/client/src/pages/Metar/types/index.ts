export type IMetarObject = {
    airport: {
        frequencies: [{
            type: string,
            frequency: string
        }],
        lat: number,
        long: number,
        name: string,
        runways: [{
            he_heading_degT: number,
            he_ident: number,
            he_ils: number,
            le_heading_degT: number,
            le_ident: number,
            le_ils: number,
            surface: string
        }],
    },
    decodedMetar: {
        icao: string,
        air_pressure: {
            pressure: string,
            unit: string,
            value: number
        },
        auto: boolean,
        cavok: boolean,
        clouds: [{
            altitude: number,
            modifier: string,
            type: string
        }],
        date: string,
        nosig: boolean,
        precipitation: string[],
        slp: number,
        temperature: {
            dewp: number,
            temp: number,
            unit: string
        },
        visibility: {
            unit: string,
            value: number
        },
        wind: {
            degrees: number,
            speed: number,
            gust: number,
            variable: number
        },
        wind_var: number
    }
}