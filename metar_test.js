let metar = 'EDHK 041050Z 24017G28KT 4000 -RA BRBKN007 OVC014 10/10 Q1005='

metar = metar.split(' ')

function checkMetarIntegr(raw_metar) {
  if (raw_metar[raw_metar.length -1].slice(-1) == '=') {
    console.log('metar integrity checked')
  } else {
    console.log(raw_metar[raw_metar.length -1])
  }
}

checkMetarIntegr(metar)

function mapToObj(raw_metar) {
  let newObj = {}
  // ICAO
  if (/^[a-z]{4}$/i.test(raw_metar[0])) {
    newObj['ICAO'] = raw_metar[0]
  }
  // DATE / TIME
  if (/^[0-9]{6}Z$/) {
    newObj['Date'] = raw_metar[1]
  }

  console.log(newObj)
}

mapToObj(metar)

function formatDate(raw_metar) {
  let aerodrome = raw_metar[0]
  let time = raw_metar[1]
  let today = new Date()
  let date = time.slice(0, 2) + '.' + ("0" + (today.getMonth() + 1)).slice(-2) + '.' + String(today.getFullYear())
  let tod = time.slice(2, 4) + ':' + time.slice(4, 6)
  // result = result.filter(el => el !== time)
  // result = result.filter(el => el !== aerodrome)
  return `METAR for ${aerodrome} on ${date}, ${tod} Zulu Time`
}