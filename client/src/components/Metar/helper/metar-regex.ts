import { IFlightRule } from '../classes/IMetar';
import { Metar } from '../classes/metar-classes';
import { dateFormat, windFormat, windFormatSpec, windVarFormat, precipFormat, cloudFormat, tempFormat } from './metar-helper-functions';

// PREPARE metar string
export function prepareMetar(metar: string) {
  metar = metar.replace('$', '').replace('=', '')
  let metarList = metar.split(' ')
  if (metarList[metarList.length -1] === '\n') metarList.pop()
  return metarList
}

  // the reduce function removes all TEMPO entries from the original RAW METAR and add them to the TEMPO METAR
  // ALSO for BECOMING
  //! ADD RMK (remarks)
function reduceTempo(metar: string[]) {
  if (metar[metar.length -1].slice(-1) === '=') {
    metar[metar.length -1] = metar[metar.length -1].replace('=', '') // remove = at the END of metar
  }
  let tempoMetar: string[] = [];
  let becomingMetar: string[] = [];
  let remarks: string[] = []
  let recentMetar: string;
  metar.forEach((el, idx) => {
    let length = metar.length
    if (/RMK/i.test(el)) {
      for (let i = idx; i < length; i++) {
        remarks.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  })
  metar.forEach((el, idx) => {
    let length = metar.length
    if (/BECMG/i.test(el)) {
      for (let i = idx; i < length; i++) {
        becomingMetar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  })
  metar.forEach((el, idx) => {
    let length = metar.length
    if (/TEMPO/i.test(el)) {
      for (let i = idx; i < length; i++) {
        tempoMetar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  })
  return [metar, remarks, tempoMetar, becomingMetar]
}

// the map function generates an object that represents the RAW METAR in KEY-VALUE pairs
export function maptoMetarObj(metarInput: string[]) {
  let [metar, remarks, tempoMetar, becomingMetar] = reduceTempo(metarInput)
  let metarObj = new Metar()
  metarObj['remarks'] = remarks
  metarObj['tempo'] = tempoMetar
  metarObj['becoming'] = becomingMetar
  metarObj['flightRule'] = {} as IFlightRule
  metarObj['Cloud_Layer'] = []
  metarObj['NOSIG'] = false 
    // RAW METAR
  metarObj['RawMetar'] = metar.join(' ')
    // ICAO
  metarObj['ICAO'] = metar[0]
  metar.shift()                     // remove ICAO code to avoid conflict with PRECIPITATION codes
  metar.forEach(el => {
      // DATE / TIME
    if (/^\d{6}Z$/i.test(el)) {
      let output = dateFormat(el);
      metarObj['Date'] = output;
      metar = metar.filter(item => !item)
    }
      // NOSIG
    else if (/NOSIG/i.test(el)) {
      metarObj['NOSIG'] = true
      metar = metar.filter(item => !item)
    }
      // CAVOK
    else if (/^CAVOK$/i.test(el)) {
      metarObj['CAVOK'] = true
      metar = metar.filter(item => !item)
    }
    else if (/^RE\D{2,4}/i.test(el)) {
      metarObj['recent'] = el
      metar = metar.filter(item => !item)
    }
      // SLP /* must be before CLOUDS */
    else if (/^SLP\d{3}$/i.test(el)) {
      el = el.replace('SLP', '')
      metarObj['SLP'] = parseInt(el)
      metar = metar.filter(item => !item)
    }
      // WINDS
    else if (/^\d{5}KT$/i.test(el) || /^\d{5}G\d{1,2}KT$/i.test(el)) {
      let output = windFormat(el);
      metarObj['Winds'] = output;
      metar = metar.filter(item => !item)
    }
      // WINDS SPECIAL FORMATS
    else if (/^VRB\d{2,3}KT$/i.test(el)) {
      let output = windFormatSpec(el);
      metarObj['Winds'] = output;
      metar = metar.filter(item => !item)
    }
      // WINDVAR
    else if (/^\d{3}V\d{3}$/i.test(el)) {
      let output = windVarFormat(el)
      metarObj['Wind_Variation'] = output;
      metar = metar.filter(item => !item)
    }
      // VISBILIY
    else if (/^\d{4}$/i.test(el)) {
      let output = {value: parseInt(el), unit: 'meters'}
      metarObj['Visibility'] = output;
      metar = metar.filter(item => !item)
    }
    else if (/^d{1,2}SM$/i.test(el)) {
      el = el.replace('SM', '')
      metarObj['Visibility'] = {value: parseInt(el), unit: 'SM'}
      metar = metar.filter(item => !item)
    }
      // CLOUDS
    else if (/^\D{3}\d{3}$/i.test(el) || /^\D{3}\d{3}\D$/i.test(el) || /^\D{3}\d{3}\/\/\/$/i.test(el) || /^NCD$/i.test(el) || /^CLR$/i.test(el)) {
      let output = cloudFormat(el)
      metarObj['Cloud_Layer'].push(output);
      metar = metar.filter(item => !item)
    }
      // PRECIPITATION
    else if (/^\+?\D{2,6}$/i.test(el) || /^-?\D{2,6}$/i.test(el)) {
      if (el !== 'NOSIG' && el!== 'NCD' && el!== 'CLR') {
        let output = precipFormat(el)
        metarObj['Precipitation'] = output;
        metar = metar.filter(item => !item)
      }
    }
      // TEMPERATURE
    else if (/^M?\d{2}\/M?\d{2}/i.test(el)) {
      let output = tempFormat(el)
      metarObj['Temperature'] = output
      metar = metar.filter(item => !item)
    }
      // QNH
    else if (/^Q\d{3,4}$/i.test(el)) {
      el = el.replace('Q', '')
      metarObj['QNH'] = parseInt(el)
      metar = metar.filter(item => !item)
    }
      // TAF PROGNOSIS
    else if (/^\d{4}\/\d{4}$/i.test(el)) {
      metarObj['TAF_Prognosis'] = el;
      metar = metar.filter(item => !item)
    }
    })
  metarObj['RawMetarDone'] = metar.join(' ')
  return metarObj
}