import { Metar } from './metar-classes';
import { dateFormat, windFormat, windFormatSpec, windVarFormat, visFormat, precipFormat, cloudFormat, cloudFormatSpec } from './metar-helper-functions';

// PREPARE metar string
export function prepareMetar(metar: string) {
  let metarList: string[] = metar.split('\n')             // split the raw METAR strings 
  metarList = metarList.filter(item => item)              // remove possible empty strings
  metarList = metarList[metarList.length -1].split(' ');  // get latest METAR at the end of list
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
  // ALSO 
export function reduceTempo(metar: string[]) {
  if (metar[metar.length -1].slice(-1) === '=') {
    metar[metar.length -1] = metar[metar.length -1].replace('=', '') // remove = at the END of metar
  }
  let tempo_metar: string[] = [];
  let becoming_metar: string[] = [];
  let recent_metar: string;
  let length = metar.length;
  metar.forEach((el, idx) => {
       // !CHECK !!!! !!!! !!!! IF WORKS CORRECTLY
    if (/^RE\D{2}/i.test(el)) {
      recent_metar = el
      console.log('index RE',metar[idx])
      metar.splice(idx)
    }
    if (/BECMG/i.test(el)) {
      for (let i = idx; i < length; i++) {
        becoming_metar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
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
  metarObj['Cloud_Layer'] = []
  metarObj['NOSIG'] = false 
    // RAW METAR
  metarObj['RawMetar'] = metar.join(' ')
    // ICAO
  metarObj['ICAO'] = metar[0]
  metar.shift()                     // remove ICAO code to avoid conflict with PRECIPITATION codes
  metar.forEach(el => {
      // DATE / TIME
    if (/^[0-9]{6}Z$/i.test(el)) {
      let output = dateFormat(el);
      metarObj['Date'] = output;
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // WINDS //! not working
    if (/^[0-9]{5}KT$/i.test(el) || /^[0-9]{5}G[0-9]{1,2}KT$/i.test(el)) {
      let output = windFormat(el);
      metarObj['Winds'] = output;
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // WINDS SPECIAL FORMATS
    if (/^VRB\d{2,3}KT$/i.test(el)) {
      let output = windFormatSpec(el);
      metarObj['Winds'] = output;
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // WINDVAR
    if (/^\d{3}V\d{3}$/i.test(el)) {
      let output = windVarFormat(el)
      metarObj['Wind_Variation'] = output;
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // VISBILIY   //! not working
    if (/^CAVOK$/.test(el) || /^\d{4}$/i.test(el)) {
      let output = visFormat(el)
      metarObj['Visibility'] = output;
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // PRECIPITATION
    if (/^\+?\D{2,6}$/i.test(el) || /^-?\D{2,6}$/i.test(el)) {
      if (el !== 'NOSIG') {
        let output = precipFormat(el)
        metarObj['Precipitation'] = output;
      }
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // CLOUDS //! not working correctly
    if (/^\D{3}\d{3}$/i.test(el) || /^\D{3}\d{3}\D$/i.test(el) || /^\D{3}\d{3}\/\/\/$/i.test(el)) {
      let output = cloudFormat(el)
      metarObj['Cloud_Layer'].push(output);
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // CLOUDS SPECIAL CODES
    if (/^NCD$/i.test(el) || /^CLR$/i.test(el)) {
      let output = cloudFormatSpec(el)
      metarObj['Cloud_Layer'].push(output)
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // QNH
    if (/^Q\d{3,4}$/i.test(el)) {
      el = el.replace('Q', '')
      metarObj['QNH'] = parseInt(el)
      metar.splice(metar.findIndex(e => e === el),1);
    }
      // TAF PROGNOSIS
    if (/^\d{4}\/\d{4}$/i.test(el)) {
      metarObj['TAF_Prognosis'] = el;
      metar.splice(metar.findIndex(e => e === el),1);
    }
    // NOSIG
    if (/NOSIG/i.test(el)) {
      console.log(el, metarObj['NOSIG'])
      metarObj['NOSIG'] = true
      metar.splice(metar.findIndex(e => e === el),1);
    }
    })
  console.log(metar)
  return metarObj
}