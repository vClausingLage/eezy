export function mapToObj(raw_metar) {
  let newObj = {}
  if (raw_metar[0] == 'STRING') {
    newObj['icao'] = raw_metar[0]
  }
}

export function formatDate(raw_metar) {
  let aerodrome = raw_metar[0]
  let time = raw_metar[1]
  let today = new Date()
  let date = time.slice(0, 2) + '.' + ("0" + (today.getMonth() + 1)).slice(-2) + '.' + String(today.getFullYear())
  let tod = time.slice(2, 4) + ':' + time.slice(4, 6)
  // result = result.filter(el => el !== time)
  // result = result.filter(el => el !== aerodrome)
  return `METAR for ${aerodrome} on ${date}, ${tod} Zulu Time`
}

export function winds(raw_metar) {

//   switch (key) {
//     case value:
      
//       break;
  
//     default:
//       break;
//   }
}