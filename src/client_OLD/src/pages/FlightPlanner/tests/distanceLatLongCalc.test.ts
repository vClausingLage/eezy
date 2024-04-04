import calcLatLong from '../helper/distanceLatLongCalc'

describe('calcLatLong', () => {
  test('schould return XXX if [XXX, XXX] is passed', () => {
    expect(
      calcLatLong([
        { icao: 'EDDS', latitude: 48.68, longitude: 9.22 },
        { icao: 'EDDH', latitude: 53.63, longitude: 10 },
      ])
    ).toBe(299)
  })
})
