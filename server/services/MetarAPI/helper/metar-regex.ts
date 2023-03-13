import { IAirPressure, IFlightRule, IMetar } from "../interfaces/IMetar.js";
import { Metar } from "../classes/metar-classes.js";
import {
  dateFormat,
  windFormat,
  windFormatSpec,
  windVarFormat,
  cloudFormat,
  tempFormat,
  precipFormat,
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
  metarObj["AUTO"] = false;
  metarObj["flightRule"] = {} as IFlightRule;
  metarObj["AirPressure"] = {} as IAirPressure;
  metarObj["Cloud_Layer"] = [];
  metarObj["Precipitation"] = [];
  // ICAO
  metarObj["ICAO"] = metar[0];
  metar.shift(); // remove ICAO code to avoid conflict with PRECIPITATION codes
  // LOOP ELEMENTS
  metar.forEach((el) => {
    // DATE / TIME
    if (/^\d{6}Z$/i.test(el)) {
      let output = dateFormat(el);
      metarObj["Date"] = output;
      metar = metar.filter((el) => !el);
    }
    // NOSIG
    else if (/NOSIG/i.test(el)) {
      metarObj["NOSIG"] = true;
      metar = metar.filter((el) => !el);
    } else if (/AUTO/i.test(el)) {
      metarObj["AUTO"] = true;
      metar = metar.filter((el) => !el);
    }
    // CAVOK //! NCD CLR HERE
    else if (/^CAVOK$/i.test(el)) {
      metarObj["CAVOK"] = true;
      metar = metar.filter((el) => !el);
    }
    // SLP /* must be before CLOUDS */
    else if (/^SLP[0-9]{3}$/i.test(el)) {
      el = el.replace("SLP", "");
      metarObj["SLP"] = parseInt(el);
      metar = metar.filter((el) => !el);
    }
    // WINDS
    else if (/^[0-9]{5}KT$/i.test(el) || /^[0-9]{5}G[0-9]{1,2}KT$/i.test(el)) {
      let output = windFormat(el);
      metarObj["Winds"] = output;
      metar = metar.filter((el) => !el);
    }
    // WINDS SPECIAL FORMATS
    else if (/^VRB[0-9]{2,3}KT$/i.test(el)) {
      let output = windFormatSpec(el);
      metarObj["Winds"] = output;
      metar = metar.filter((el) => !el);
    }
    // WINDVAR
    else if (/^[0-9]{3}V[0-9]{3}$/i.test(el)) {
      let output = windVarFormat(el);
      metarObj["Wind_Variation"] = output;
      metar = metar.filter((el) => !el);
    }
    // VISBILIY
    else if (/^[0-9]{4}$/i.test(el)) {
      let output = { value: parseInt(el), unit: "meters" };
      metarObj["Visibility"] = output;
      metar = metar.filter((el) => !el);
    } else if (/^[0-9]{1,2}SM$/i.test(el)) {
      el = el.replace("SM", "");
      metarObj["Visibility"] = { value: parseInt(el), unit: "SM" };
      metar = metar.filter((el) => !el);
    }
    // CLOUDS
    else if (
      /^[a-z]{3}[0-9]{3}$/i.test(el) ||
      /^[a-z]{3}[0-9]{3}[a-z]$/i.test(el) ||
      /^[a-z]{3}[0-9]{3}\/\/\/$/i.test(el) ||
      /^NCD$/i.test(el) ||
      /^CLR$/i.test(el)
    ) {
      let output = cloudFormat(el);
      metarObj["Cloud_Layer"].push(output);
      metar = metar.filter((el) => !el);
    }
    // RECENT PRECIPITAION //! must be formatted -> connected weather string
    else if (/^RE[a-z]{2,4}/i.test(el)) {
      metarObj["recent"] = el;
      metar = metar.filter((el) => !el);
    }
    // PRECIPITATION
    else if (/^(-?|\+?|)(?:[a-z]{4}|[a-z]{2})$/i.test(el)) {
      if (el !== "AUTO") {
        let output = precipFormat(el);
        output = output.replace("  ", " ").trim();
        console.log(output);
        metarObj["Precipitation"].push(output);
      }
    }
    // TEMPERATURE
    else if (/^M?[0-9]{2}\/M?[0-9]{2}/i.test(el)) {
      let output = tempFormat(el);
      metarObj["Temperature"] = output;
      metar = metar.filter((el) => !el);
    }
    // QNH
    else if (/^Q[0-9]{3,4}$/i.test(el)) {
      el = el.replace("Q", "");
      metarObj["AirPressure"]["pressure"] = "QNH";
      metarObj["AirPressure"]["value"] = parseInt(el);
      metarObj["AirPressure"]["unit"] = "hPa";
      metar = metar.filter((el) => !el);
    }
    // ALTIMETER
    else if (/^A[0-9]{3,4}$/i.test(el)) {
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
  return metarObj;
}

function addToRemarks(metarObj: IMetar) {
  console.log(metarObj.remarks);
}
