import {
  dateFormat,
  cloudFormat,
  windFormat,
  windVarFormat,
  tempFormat,
  precipFormat,
} from "./metar-regex-helper-functions.js";

import {
  IResultBasicTokens,
  IResultDynamicTokens,
} from "./interfaces/metar-regex-interfaces.js";

type DynamicTokens = {
  // ! implement
  regexResults: IResultDynamicTokens;
  filteredMetarList: string[];
};

export function findDynamicTokens(metar: string) {
  let resultObj: IResultDynamicTokens = {
    visibility: { value: 0, unit: "" },
    precipitation: [],
  };
  if (/[0-9]{4}/gi.test(metar)) {
    resultObj.visibility.value = /[0-9]{4}/gi.exec(metar)?.[0];
    resultObj.visibility.unit = "m";
  }
  if (/[0-9] [0-9]\/[0-9]SM/gi.test(metar)) {
    let value = /[0-9] [0-9]\/[0-9]SM/gi.exec(metar)?.[0];
    resultObj.visibility.value = value?.replace("SM", "");
    resultObj.visibility.unit = "sm";
  }
  if (/[0-9]{1,2}SM/gi.test(metar)) {
    let value = /[0-9]{1,2}SM/gi.exec(metar)?.[0];
    resultObj.visibility.value = value?.replace("SM", "");
    resultObj.visibility.unit = "sm";
  }
  if (/(-?|\+?|)(?:[a-z]{4}|[a-z]{2})+/gi.test(metar)) {
    let result = metar.match(/(-?|\+?|)(?:[a-z]{4}|[a-z]{2})+/gi);
    if (result)
      for (let el of result) {
        resultObj.precipitation.push(precipFormat(el));
      }
  }
  return resultObj;
  //! { regexResults: resultObj, filteredMetarList: filteredMetar };
}

type BasicTokens = {
  regexResults: IResultBasicTokens;
  filteredMetarList: string[];
};

export function findBasicTokens(metar: string[]): BasicTokens {
  let resultObj: IResultBasicTokens = {
    icao: "",
    date: undefined,
    cavok: false,
    nosig: false,
    auto: false,
    pressure: { pressure: "", value: 0, unit: "" },
    slp: 0,
    clouds: [],
    wind: { direction: 0, speed: 0, unit: "", gusts: 0 },
    wind_var: [],
    temperature: [],
  };
  resultObj["icao"] = metar[0];
  metar.shift();
  let filteredMetar = metar.filter((el) => {
    if (/NOSIG/i.test(el)) resultObj.nosig = true;
    else if (/AUTO/i.test(el)) resultObj.auto = true;
    else if (/CAVOK/i.test(el)) resultObj.cavok = true;
    else if (/Q[0-9]{3,4}/i.test(el)) {
      el = el.replace("Q", "");
      resultObj.pressure.pressure = "QNH";
      resultObj.pressure.value = parseInt(el);
      resultObj.pressure.unit = "hPa";
    } else if (/A[0-9]{3,4}/i.test(el)) {
      el = el.replace("A", "");
      resultObj.pressure.pressure = "Altimeter";
      resultObj.pressure.value = parseInt(el);
      resultObj.pressure.unit = "inHg";
    } else if (/[0-9]{6}Z/i.test(el)) {
      resultObj.date = dateFormat(el);
    } else if (/SLP[0-9]{3}/i.test(el)) {
      el = el.replace("SLP", "");
      resultObj.slp = parseInt(el);
    } else if (
      /[a-z]{3}[0-9]{3}/i.test(el) ||
      /[a-z]{3}[0-9]{3}[a-z]/i.test(el) ||
      /[a-z]{3}[0-9]{3}\/\/\//i.test(el)
    ) {
      resultObj.clouds.push(cloudFormat(el));
    } else if (
      /[0-9]{5}KT/i.test(el) ||
      /[0-9]{5}G[0-9]{1,2}KT/i.test(el) ||
      /VRB[0-9]{2,3}KT/i.test(el)
    ) {
      resultObj.wind = windFormat(el);
    } else if (/[0-9]{3}V[0-9]{3}/i.test(el)) {
      resultObj.wind_var = windVarFormat(el);
    } else if (/M?[0-9]{2}\/M?[0-9]{2}/i.test(el)) {
      resultObj.temperature = tempFormat(el);
    } else return el;
  });
  return { regexResults: resultObj, filteredMetarList: filteredMetar };
}
