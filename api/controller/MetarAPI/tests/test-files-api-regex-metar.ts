export const simple = {
  string: '',
  object: {}
}

export const weatherTwoStrings = {
  string: 'YLHI 071830Z AUTO 35011KT 9999 -RA DRSN SCT018 BKN030 BKN048 23/20 Q1011',
  object: {
    icao: 'YLHI',
    date: '2023-07-07T18:30:00.000Z',
    cavok: false,
    nosig: false,
    auto: true,
    air_pressure: {
      pressure: 'QNH',
      value: 1011,
      unit: 'hPa'
    },
    clouds: [
      {
        cloud_layer: 'SCT',
        cloud_base: 18
      },
      {
        cloud_layer: 'BKN',
        cloud_base: 30
      },
      {
        cloud_layer: 'BKN',
        cloud_base: 48
      }
    ],
    wind: {
      direction: 350,
      speed: 11,
      unit: 'kts'
    },
    temperature: {
      temp: 23,
      dewp: 20
    },
    visibility: {
      value: 9999,
      unit: 'm'
    },
    precepitation: [
      {
        precepitation: '-',
        descriptor: 'RA'
      },
      {
        precepitation: 'DR',
        descriptor: 'SN'
      }
    ],
    recent: [],
    becoming: [],
    tempo: [],
    raw_metar: 'YLHI 071830Z AUTO 35011KT 9999 -RA DRSN SCT018 BKN030 BKN048 23/20 Q1011'
  }
}
