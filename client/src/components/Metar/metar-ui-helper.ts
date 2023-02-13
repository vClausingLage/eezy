import weatherCodes from "./assets/weatherCodes.json";

export function getFlightRules(visibility: string | number, cloudBaseInput: number) {

    let flRul = {
        flightRule: '',
        colorCode: '',
    }

    let cloudBase = cloudBaseInput * 100

    if (typeof(visibility) === 'string' && visibility === 'CAVOK') {
        flRul['flightRule'] = 'VFR'
        flRul['colorCode'] = 'green'
    } else if ((typeof(visibility) === 'number' && visibility <= 1500) || cloudBase <= 500) {
        flRul['flightRule'] = 'LIFR'
        flRul['colorCode'] = 'purple'
    } else if ((typeof(visibility) === 'number' && visibility <= 5000) || cloudBase <= 1000) {
        flRul['flightRule'] = 'IFR'
        flRul['colorCode'] = 'red'
    } else if ((typeof(visibility) === 'number' && visibility <= 8000) || cloudBase <= 3000) {
        flRul['flightRule'] = 'MVFR'
        flRul['colorCode'] = 'blue'
    } else if ((typeof(visibility) === 'number' && visibility > 8000) || cloudBase > 3000) {
        flRul['flightRule'] = 'VFR'
        flRul['colorCode'] = 'green'
    } else {
        flRul['flightRule'] = 'incomplete data'
        flRul['colorCode'] = 'black'
    }
    return flRul
}

export function formatWeatherString(weatherString: string) {
    let result: any = [];
    let output = [];
    weatherString = weatherString.replace(/\s/gi, "");
    while (weatherString.length > 0) {
      if (weatherString[0] === "-" || weatherString[0] === "+") {
        weatherString[0] === "-"
          ? (result = [
              ...result,
              ["light", weatherString[1] + weatherString[2]],
            ])
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