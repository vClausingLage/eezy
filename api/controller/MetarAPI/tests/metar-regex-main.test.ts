import test, { describe } from 'node:test'

import { metarDecoder } from '../helper/metar-regex-main.js'

describe('metarDecoder', () => {
  test('schould return a metar object', () => {
    expect(metarDecoder('EDHK 020950Z 29007KT 9999 FEW027 19/13 Q1020')).toEqual({
      icao: 'EDHK',
      date: new Date('2023-09-02T09:50:00.000Z'),
      cavok: false,
      nosig: false,
      auto: false,
      air_pressure: {
        pressure: 'QNH',
        value: 1020,
        unit: 'hPa'
      },
      slp: undefined,
      clouds: [
        {
          cloud: undefined,
          cloud_layer: 'FEW',
          cloud_base: 2700
        }
      ],
      wind: {
        direction: 290,
        speed: 7,
        unit: 'kts'
      },
      wind_var: undefined,
      temperature: {
        temp: 19,
        dewp: 13
      },
      visibility: {
        value: 9999,
        unit: 'm'
      },
      precipitation: [
      ],
      taf_prognosis: undefined,
      recent_precipitation: undefined,
      recent: [
      ],
      becoming: [
      ],
      tempo: [
      ],
      remarks: [
      ],
      raw_metar: 'EDHK 020950Z 29007KT 9999 FEW027 19/13 Q1020',
      flight_rule: undefined
    })
  }).catch((error) => {
    console.log(error)
  })
}).catch((error) => {
  console.log(error)
})

// RECENT

// BCMG

// TEMPO
