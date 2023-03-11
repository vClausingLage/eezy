import weatherCodes from "../assets/weatherCodes.json";

export function formatWeatherString(weatherString: string) {
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

export function convertDate(dateString: string) {
  const date = new Date(parseInt(dateString));
  const localTime = date.toLocaleString(navigator.language, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const utcTime =
    String(date.getUTCHours()) + ":" + String(date.getUTCMinutes());
  return { local: localTime, utc: utcTime };
}

export async function checkLocation() {
  //! add return
  let locationCheck = false;
  const response = await fetch("https://ipapi.co/json/");
  const location = await response.json();
  //! check for CAN | US | EN -> Statute Miles : -> Meters

  //! return Miles && Meters --> check in JSX
}

export function tempoInformation(rawMetar: string) {
  let metar = rawMetar.split(" ");
  let tempoMetar: string[] = [];
  metar.forEach((el, idx) => {
    let length = metar.length;
    if (/^TEMPO$/i.test(el)) {
      for (let i = idx; i < length; i++) {
        tempoMetar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  });
  let output = { gusts: [], precipitation: [] } as {
    gusts: string[];
    precipitation: string[];
  };
  // console.log(tempoMetar)
  // console.log(metar)
  if (tempoMetar.length > 0) {
    tempoMetar.forEach((el) => {
      if (/^\d{5}G\d{1,2}KT$/gi.test(el)) {
        console.log(output.gusts);
        if (el.match(/G\d{1,2}/gi)?.length === 1)
          output.gusts.push(el.slice(6, 8));
      }
    });
  }
  if (
    /^\+?\D{2,6}$/gi.test(tempoMetar.join()) ||
    /^-?\D{2,6}$/gi.test(tempoMetar.join())
  )
    output.precipitation.push(formatWeatherString(tempoMetar.join())); // ! working as exspected?
  return output;
}
