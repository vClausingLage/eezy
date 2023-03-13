export function findBasicTokens(metar: string[]): {} {
  let resultObj = {
    icao: "",
    cavok: false,
    nosig: false,
    auto: false,
    qnh: "",
    altimeter: "",
  };
  metar.forEach((el) => {
    if (/[a-z]{4}/i.test(el)) {
      resultObj["icao"] = el;
      metar = metar.filter((el) => !el);
    } else if (/^NOSIG$/i.test(el)) {
      resultObj["nosig"] = true;
      metar = metar.filter((el) => !el);
    } else if (/^AUTO$/i.test(el)) {
      resultObj["auto"] = true;
      metar = metar.filter((el) => !el);
    } else if (/^CAVOK$/i.test(el)) {
      resultObj["cavok"] = true;
      metar = metar.filter((el) => !el);
    }
  });
  return { regexResults: resultObj, filteredMetar: metar };
}
