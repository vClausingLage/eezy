import { IAirPressure, IFlightRule, IMetar } from "../interfaces/IMetar.js";
import { Metar } from "../classes/metar-classes.js";
import {
  dateFormat,
  windFormat,
  windFormatSpec,
  windVarFormat,
  precipFormat,
  cloudFormat,
  tempFormat,
} from "./metar-helper-functions.js";
import { reduceTempo } from "./metar-regex-helper-functions.js";

// the map function generates an object that represents the RAW METAR in KEY-VALUE pairs
export function mapToMetarObj(metarInput: string[]) {
  let [metar, remarks, tempoMetar, becomingMetar] = reduceTempo(metarInput);
  let metarObj = new Metar();
  metarObj["RawMetar"] =
    metar.join(" ") +
    " " +
    remarks.join(" ") +
    " " +
    tempoMetar.join(" ") +
    " " +
    becomingMetar.join(" ");
  // INITIALISATIONS
  metarObj["remarks"] = remarks;
  metarObj["tempo"] = tempoMetar;
  metarObj["becoming"] = becomingMetar;
  metarObj["NOSIG"] = false;
  metarObj["flightRule"] = {} as IFlightRule;
  metarObj["AirPressure"] = {} as IAirPressure;
  metarObj["Cloud_Layer"] = [];
  metarObj["Precipitation"] = [];
  // ICAO
  metarObj["ICAO"] = metar[0];
  metar.shift(); // remove ICAO code to avoid conflict with PRECIPITATION codes
  // LOOP ELEMENTS
  metar.forEach((el) => {
    console.log(el);
    console.log(metar);
    // DATE / TIME
    if (/^\d{6}Z$/i.test(el)) {
      let output = dateFormat(el);
      metarObj["Date"] = output;
      metar = metar.filter((el) => !el);
    }
    // NOSIG NCD CLR
    else if (/NOSIG/i.test(el)) {
      metarObj["NOSIG"] = true;
      metar = metar.filter((el) => !el);
    }
    // CAVOK
    else if (/^CAVOK$/i.test(el)) {
      metarObj["CAVOK"] = true;
      metar = metar.filter((el) => !el);
    }
    // SLP /* must be before CLOUDS */
    else if (/^SLP\d{3}$/i.test(el)) {
      el = el.replace("SLP", "");
      metarObj["SLP"] = parseInt(el);
      metar = metar.filter((el) => !el);
    }
    // WINDS
    else if (/^\d{5}KT$/i.test(el) || /^\d{5}G\d{1,2}KT$/i.test(el)) {
      let output = windFormat(el);
      metarObj["Winds"] = output;
      metar = metar.filter((el) => !el);
    }
    // WINDS SPECIAL FORMATS
    else if (/^VRB\d{2,3}KT$/i.test(el)) {
      let output = windFormatSpec(el);
      metarObj["Winds"] = output;
      metar = metar.filter((el) => !el);
    }
    // WINDVAR
    else if (/^\d{3}V\d{3}$/i.test(el)) {
      let output = windVarFormat(el);
      metarObj["Wind_Variation"] = output;
      metar = metar.filter((el) => !el);
    }
    // VISBILIY
    else if (/^\d{4}$/i.test(el)) {
      let output = { value: parseInt(el), unit: "meters" };
      metarObj["Visibility"] = output;
      metar = metar.filter((el) => !el);
    } else if (/^d{1,2}SM$/i.test(el)) {
      el = el.replace("SM", "");
      metarObj["Visibility"] = { value: parseInt(el), unit: "SM" };
      metar = metar.filter((el) => !el);
    }
    // CLOUDS
    else if (
      /^\D{3}\d{3}$/i.test(el) ||
      /^\D{3}\d{3}\D$/i.test(el) ||
      /^\D{3}\d{3}\/\/\/$/i.test(el) ||
      /^NCD$/i.test(el) ||
      /^CLR$/i.test(el)
    ) {
      let output = cloudFormat(el);
      metarObj["Cloud_Layer"].push(output);
      metar = metar.filter((el) => !el);
    }
    // PRECIPITATION
    else if (/^\+?\D{2}$/i.test(el) || /^-?\D{2}$/i.test(el)) {
      if (el !== "NOSIG" && el !== "NCD" && el !== "CLR" && el !== "AUTO") {
        let output = precipFormat(el);
        metarObj.Precipitation.push(output);
        metar = metar.filter((el) => !el);
      }
    }
    // RECENT PRECIPITAION //! must be formatted
    else if (/^RE\D{2,4}/i.test(el)) {
      metarObj["recent"] = el;
      metar = metar.filter((el) => !el);
    }
    // TEMPERATURE
    else if (/^M?\d{2}\/M?\d{2}/i.test(el)) {
      let output = tempFormat(el);
      metarObj["Temperature"] = output;
      metar = metar.filter((el) => !el);
    }
    // QNH
    else if (/^Q\d{3,4}$/i.test(el)) {
      el = el.replace("Q", "");
      metarObj["AirPressure"]["pressure"] = "QNH";
      metarObj["AirPressure"]["value"] = parseInt(el);
      metarObj["AirPressure"]["unit"] = "hPa";
      metar = metar.filter((el) => !el);
    }
    // ALTIMETER
    else if (/^A\d{3,4}$/i.test(el)) {
      el = el.replace("A", "");
      metarObj["AirPressure"]["pressure"] = "Altimeter";
      metarObj["AirPressure"]["value"] = parseInt(el);
      metarObj["AirPressure"]["unit"] = "inHg";
      metar = metar.filter((el) => !el);
    }
    // ! LESSER TOKENS
    // TAF PROGNOSIS
    else if (/^\d{4}\/\d{4}$/i.test(el)) {
      metarObj["TAF_Prognosis"] = el;
      metar = metar.filter((el) => !el);
    }
    // PRESSURE FALLING_RISING
    else if (/^PRESFR$/i.test(el)) {
      metarObj["remarks"].push("pressure falling rapidly");
      metar = metar.filter((el) => !el);
    } else if (/^PRESRR$/i.test(el)) {
      metarObj["remarks"].push("pressure rising rapidly");
      metar = metar.filter((el) => !el);
    }
    // No Significant Weather
    else if (/^NSW$/i.test(el)) {
      metarObj["remarks"].push("no significatn weather");
      metar = metar.filter((el) => !el);
    }
  });
  metarObj["RawMetarDone"] = metar.join(" ");
  return metarObj;
}

function addToRemarks(metarObj: IMetar) {
  console.log(metarObj.remarks);
}
