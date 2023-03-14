import { IResultBasicTokens } from "./interfaces/metar-regex-interfaces.js";

export function findBasicTokens(metar: string[]): {} {
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

export function dateFormat(time: string) {
  let today = new Date();
  let date = new Date(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      parseInt(time.slice(0, 2)),
      parseInt(time.slice(2, 4)),
      parseInt(time.slice(4, 6))
    )
  );
  return date;
}
export function cloudFormat(clouds: string) {
  let output = new Clouds();
  if (clouds !== "NCD" && clouds !== "CLR" && clouds !== "CAVOK") {
    let cloudLayer = clouds.slice(0, 3);
    let cloudBase = clouds.slice(3, 6);
    if (clouds.length >= 6) {
      let cloud = clouds.slice(6, 9);
      output.cloud = cloud;
    }
    output.cloudLayer = cloudLayer;
    output.cloudBase = parseInt(cloudBase);
  } else if (clouds === "NCD" || clouds === "CLR") {
    output.cloudLayer = clouds;
    output.cloudBase = undefined;
  }
  return output;
}
class Clouds {
  cloudLayer!: string;
  cloudBase!: number | undefined;
  cloud?: string;
}
class Wind {
  direction!: number | string;
  speed!: number;
  unit!: string;
  gusts?: number;
}
export function windFormat(wind: string) {
  let output = new Wind();
  if (/[0-9]{5}KT/i.test(wind)) {
    output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 5)),
      unit: "kts",
    };
  } else if (/[0-9]{5}G[0-9]{1,2}KT/i.test(wind)) {
    output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 5)),
      gusts: parseInt(wind.slice(6, 8)),
      unit: "kts",
    };
  } else if (/VRB[0-9]{1,2}KT/i.test(wind)) {
    output = {
      direction: "variable",
      speed: parseInt(wind.slice(3, 5)),
      unit: "kts",
    };
  }
  return output;
}
export function windVarFormat(windVar: string) {
  let output = [parseInt(windVar.slice(0, 3)), parseInt(windVar.slice(4, 7))];
  return output;
}
export function tempFormat(temperature: string) {
  let output: number[] = [];
  let tempArr = temperature.split("/");
  tempArr.forEach((el) => {
    if (el === "M00") {
      output.push(0);
    } else if (el[0] === "M") {
      el = el.replace("M", "-");
      output.push(Number(el));
    } else {
      output.push(Number(el));
    }
  });
  return output;
}
