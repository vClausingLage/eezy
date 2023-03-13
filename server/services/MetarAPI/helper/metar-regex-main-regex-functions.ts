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
  console.log(metar);
  metar.forEach((el, idx) => {
    if (/^NOSIG$/i.test(el)) {
      console.log("nosig");
      resultObj["nosig"] = true;
      metar.splice(idx, 1);
    } else if (/^AUTO$/i.test(el)) {
      resultObj["auto"] = true;
      metar.splice(idx, 1);
    } else if (/^CAVOK$/i.test(el)) {
      resultObj["cavok"] = true;
      metar.splice(idx, 1);
    } // QNH
    else if (/^Q[0-9]{3,4}$/i.test(el)) {
      el = el.replace("Q", "");
      resultObj["pressure"]["pressure"] = "QNH";
      resultObj["pressure"]["value"] = parseInt(el);
      resultObj["pressure"]["unit"] = "hPa";
      metar.splice(idx, 1);
    }
    // ALTIMETER
    else if (/^A[0-9]{3,4}$/i.test(el)) {
      el = el.replace("A", "");
      resultObj["pressure"]["pressure"] = "Altimeter";
      resultObj["pressure"]["value"] = parseInt(el);
      resultObj["pressure"]["unit"] = "inHg";
      metar.splice(idx, 1);
    }
  });
  return { regexResults: resultObj, filteredMetar: metar };
}
