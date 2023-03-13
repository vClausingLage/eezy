export function findBasicTokens(metar: string[]): {} {
  let resultObj = {
    icao: "",
    cavok: false,
    nosig: false,
    auto: false,
    pressure: { pressure: "", value: 0, unit: "" },
  };
  resultObj["icao"] = metar[0];
  metar.shift();
  //! use filter
  let filteredArray = metar.filter((el) => {
    if (/^NOSIG$/i.test(el)) return el;
    else if (/^AUTO$/i.test(el)) return el;
    else if (/^CAVOK$/i.test(el)) return el;
  });
  console.log(filteredArray);
  // metar.forEach((el) => {
  //   if (/^NOSIG$/i.test(el)) {
  //     resultObj["nosig"] = true;
  //   } else if (/^AUTO$/i.test(el)) {
  //     resultObj["auto"] = true;
  //   } else if (/^CAVOK$/i.test(el)) {
  //     resultObj["cavok"] = true;
  //   } // QNH
  //   else if (/^Q[0-9]{3,4}$/i.test(el)) {
  //     el = el.replace("Q", "");
  //     resultObj["pressure"]["pressure"] = "QNH";
  //     resultObj["pressure"]["value"] = parseInt(el);
  //     resultObj["pressure"]["unit"] = "hPa";
  //   }
  //   // ALTIMETER
  //   else if (/^A[0-9]{3,4}$/i.test(el)) {
  //     el = el.replace("A", "");
  //     resultObj["pressure"]["pressure"] = "Altimeter";
  //     resultObj["pressure"]["value"] = parseInt(el);
  //     resultObj["pressure"]["unit"] = "inHg";
  //   }
  // });
  return { regexResults: resultObj, filteredMetar: metar };
}
