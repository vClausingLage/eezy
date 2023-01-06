import { Wind } from './metar_test.js'

export function dateFormat(time: string) {
  let today = new Date();
  let date = time.slice(0, 2) + '.' + ("0" + (today.getMonth() + 1)).slice(-2) + '.' + String(today.getFullYear());
  let tod = time.slice(2, 4) + ':' + time.slice(4, 6);
  return [date, tod]
}

export function windFormat(wind: string) {
  if (/^[0-9]{5}KT$/i.test(wind)) {
    let output = new Wind;
    output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 4)),
      unit: 'kts'
    }
    return output
  }
  if (/^[0-9]{5}G[0-9]{1,2}KT$/i.test(wind)) {
    let output = new Wind;
      output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 5)),
      gusts: parseInt(wind.slice(6, 8)),
      unit: 'kts'
    }
    return output
  }
}