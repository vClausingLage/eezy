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

// export function precipFormatOld(weatherString: string) {
//   let result: any = [];
//   let output = [];
//   weatherString = weatherString.replace(/\s/gi, "");
//   while (weatherString.length > 0) {
//     if (weatherString[0] === "-" || weatherString[0] === "+") {
//       weatherString[0] === "-"
//         ? (result = [...result, ["light", weatherString[1] + weatherString[2]]])
//         : (result = [
//             ...result,
//             ["heavy", weatherString[1] + weatherString[2]],
//           ]);
//       weatherString = weatherString.slice(3);
//     } else if (weatherString[0] !== "-" && weatherString[0] !== "+") {
//       result = [...result, ["", weatherString[0] + weatherString[1]]];
//       weatherString = weatherString.slice(2);
//     }
//   }
//   for (let el of result) {
//     for (const [key, value] of Object.entries(weatherCodes.characteristic)) {
//       if (el[1] === key) output.push(el[0] + " " + value);
//     }
//     for (const [key, value] of Object.entries(weatherCodes.type)) {
//       if (el[1] === key) output.push(el[0] + " " + value);
//     }
//   }
//   return output.join(" and ");
// }
export function precipFormat(weatherString: string): string {
  let result: any = [];
  let output = [];
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
  return output.join("").trim();
}

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
