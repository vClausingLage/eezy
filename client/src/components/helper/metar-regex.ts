import { Metar } from './metar-classes';
import { dateFormat, windFormat, windVarFormat, visFormat, precipFormat, cloudFormat } from './metar-helper-functions';

// PREPARE metar string
export function prepareMetar(metar: string) {
  let metarList: string[] = metar.split('\n')
  metarList = metarList[0].split(' ');
  return metarList
}

// the check function cheks if Metar ends with the = sign (and is therefore sanely formatted)
export function checkMetarIntegr(metar: string[]) {
  if (metar[metar.length -1].slice(-1) === '=') {
    console.log('metar integrity checked');
  } else {
    console.log('metar not complete');
  }
}

  // the reduce function removes all TEMPO entries from the original RAW METAR and add them to the TEMPO METAR
  // ALSO removes = at the END of metar
export function reduceTempo(metar: string[]) {
  if (metar[metar.length -1].slice(-1) === '=') {
    metar[metar.length -1] = metar[metar.length -1].replace('=', '')
  } else {
    {}
  }
  let tempo_metar: string[] = [];
  let becoming_metar: string[] = [];
  let length = metar.length;
  metar.forEach((el, idx) => {
       // !CHECK !!!! !!!! !!!! IF WORKS CORRECTLY
    // if (/BECMG/i.test(el)) {
    //   for (let i = idx; i < length; i++) {
    //     becoming_metar.push(metar[i]);
    //   }
    //   for (let i = idx; i < length; i++) {
    //     metar.splice(i);
    //   }
    // }
    if (/TEMPO/i.test(el)) {
      for (let i = idx; i < length; i++) {
        tempo_metar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  })
  return [metar, tempo_metar, becoming_metar]
}

// the map function generates an object that represents the RAW METAR in KEY-VALUE pairs
export function maptoMetarObj(metar: string[]) {
  let metarObj = new Metar();
    // RAW METAR
  metarObj['RawMetar'] = metar.join(' ') 
    // ICAO
  metarObj['ICAO'] = metar[0]
  metar.shift()                     // remove ICAO code to avoid conflict with PRECIPITATION codes
  metarObj['Cloud_Layer'] = []
  metar.forEach(el => {
    // DATE / TIME
  if (/^[0-9]{6}Z$/i.test(el)) {
    let output = dateFormat(el);
    metarObj['Date'] = output;
  }
    // WINDS
  if (/^[0-9]{5}KT$/i.test(el) || /^[0-9]{5}G[0-9]{1,2}KT$/i.test(el)) {
    let output = windFormat(el);
    metarObj['Winds'] = output;
  }
    // WINDVAR
  if (/^\d{3}V\d{3}$/i.test(el)) {
    let output = windVarFormat(el)
    metarObj['Wind_Variation'] = output;
  }
    // VISBILIY
  if (/^CAVOK$/.test(el) || /^\d{4}$/i.test(el)) {
    let output = visFormat(el)
    metarObj['Visibility'] = output;
  }
    // PRECIPITATION
  if (/^\+?\D{2,6}$/i.test(el) || /^\-?\D{2,6}$/i.test(el)) {
    if (el === 'NOSIG') {                     //! filter out NOSIG at start
      {}
    }
    let output = precipFormat(el)
    metarObj['Precipitation'] = output;
  }
    // CLOUDS
  if (/^\D{3}\d{3}$/i.test(el) || /^\D{3}\d{3}\D$/i.test(el) || /^\D{3}\d{3}\/\/\/$/i.test(el)) {
    let output = cloudFormat(el)
    metarObj['Cloud_Layer'].push(output);
  }
    // QNH
  if (/^Q\d{3,4}$/i.test(el)) {
    el = el.replace('Q', '')
    metarObj['QNH'] = parseInt(el)
  }
    // TAF PROGNOSIS
  if (/^\d{4}\/\d{4}$/i.test(el)) {
    metarObj['TAF_Prognosis'] = el;
  }
  })
  return metarObj
}