import { Wind, Clouds } from "../classes/metar-classes";

import weatherCodes from "../assets/weatherCodesClient.json";

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

export function windFormat(wind: string) {
  let output = new Wind();
  if (/^[0-9]{5}KT$/i.test(wind)) {
    output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 5)),
      unit: "kts",
    };
  } else if (/^[0-9]{5}G[0-9]{1,2}KT$/i.test(wind)) {
    output = {
      direction: parseInt(wind.slice(0, 3)),
      speed: parseInt(wind.slice(3, 5)),
      gusts: parseInt(wind.slice(6, 8)),
      unit: "kts",
    };
  }
  return output;
}

export function windFormatSpec(wind: string) {
  let output = new Wind();
  output = {
    direction: "more than 30",
    speed: parseInt(wind.slice(3, 5)),
    unit: "kts",
  };
  return output;
}

export function windVarFormat(windVar: string) {
  let output = [parseInt(windVar.slice(0, 3)), parseInt(windVar.slice(4, 7))];
  return output;
}

export function precipFormat(weatherString: string) {
  let result: any = [];
  let output = [];
  weatherString = weatherString.replace(/\s/gi, "");
  while (weatherString.length > 0) {
    if (weatherString[0] === "-" || weatherString[0] === "+") {
      weatherString[0] === "-"
        ? (result = [...result, ["light", weatherString[1] + weatherString[2]]])
        : (result = [
            ...result,
            ["heavy", weatherString[1] + weatherString[2]],
          ]);
      weatherString = weatherString.slice(3);
    } else if (weatherString[0] !== "-" && weatherString[0] !== "+") {
      result = [...result, ["", weatherString[0] + weatherString[1]]];
      weatherString = weatherString.slice(2);
    }
  }
  for (let el of result) {
    for (const [key, value] of Object.entries(weatherCodes.characteristic)) {
      if (el[1] === key) output.push(el[0] + " " + value);
    }
    for (const [key, value] of Object.entries(weatherCodes.type)) {
      if (el[1] === key) output.push(el[0] + " " + value);
    }
  }
  return output.join(" and ");
}

// export function precipPreposition(precip: string) {
//   let formattedPrecip: string[] = []
//   if (precip.length % 2 === 0) {
//     formattedPrecip = ['', precip];
//   }
//   else if (precip.length % 2 !== 0) {
//     let preposition: string
//     if (precip.slice(0, 1) === '-') {
//       preposition = 'light'
//     } else if (precip.slice(0, 1) === '+') {
//       preposition = 'heavy'
//     }
//     formattedPrecip = [preposition!, precip.slice(1, precip.length)];
//   }
//   return formattedPrecip;
// }

// export function decodeWeather(precip: string[]) {
//   let output: string[] = []
//   // load JSON weather codes to [VAR]
//   let codes = weatherCodes
//   let codeArr: Array<Array<string>> = []
//   for (const [k, v] of Object.entries(codes)) {
//     for (const [code, descr] of Object.entries(v)) {
//       codeArr.push([code, descr])
//     }
//   }
//   // use VAR to LOOP METAR input
//   let result: string[] = []
//   if (precip[1].length >= 2) {
//     for (let i = 0, charsLength = precip[1].length; i < charsLength; i += 2) {
//       result.push(precip[1].substring(i, i + 2));
//     }
//   } else {
//     console.log('precipitation code not properly formatted')
//     // result.push(precip[1])
//   }
//   // check RPECIP for WEATHER CODES MATCH
//   result.forEach((el) => {
//     codeArr.forEach(x => {
//       if (x[0] === el) {      // check weather code match x[0]
//         output.push(x[1])     // push description of code x[1]
//       }
//     })
//   })
//   return output
// }

// export function precipFormat(precip: string) {
//   precip = precip.replaceAll(' ', '')
//   let output = new Precipitation();
//   let newPrecip = precipPreposition(precip);
//   let weatherCode = decodeWeather(newPrecip);
//   output.intensity = newPrecip[0];
//   output.elements = weatherCode;
//   return output;
// }

export function cloudFormat(clouds: string) {
  let output = new Clouds();
  if (clouds !== "NCD" && clouds !== "CLR" && clouds !== "CAVOK") {
    let cloudLayer = clouds.slice(0, 3);
    let cloudBase = clouds.slice(3, 6);
    if (clouds.length >= 6) {
      let cloud = clouds.slice(6, 9);
      output["cloud"] = cloud;
    }
    output["cloudLayer"] = cloudLayer;
    output["cloudBase"] = parseInt(cloudBase);
  } else if (clouds === "NCD" || clouds === "CLR") {
    output["cloudLayer"] = clouds;
    output["cloudBase"] = undefined;
  }
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
