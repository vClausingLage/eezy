// PREPARE metar string
export function prepareMetar(metar: string) {
  metar = metar.replace("$", "").replace("=", "");
  let metarList = metar.split(" ");
  if (metarList[metarList.length - 1] === "\n") metarList.pop();
  return metarList;
}

// -> metar-regex (mapToMetarObject)
// the reduce function removes all TEMPO entries from the original RAW METAR and add them to the TEMPO METAR
// ALSO for BECOMING
//! ADD RMK (remarks)
export function reduceTempo(metar: string[]) {
  if (metar[metar.length - 1].slice(-1) === "=") {
    metar[metar.length - 1] = metar[metar.length - 1].replace("=", ""); // remove = at the END of metar
  }
  let tempoMetar: string[] = [];
  let becomingMetar: string[] = [];
  let remarks: string[] = [];
  metar.forEach((el, idx) => {
    let length = metar.length;
    if (/RMK/i.test(el)) {
      for (let i = idx; i < length; i++) {
        remarks.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  });
  metar.forEach((el, idx) => {
    let length = metar.length;
    if (/BECMG/i.test(el)) {
      for (let i = idx; i < length; i++) {
        becomingMetar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  });
  metar.forEach((el, idx) => {
    let length = metar.length;
    if (/TEMPO/i.test(el)) {
      for (let i = idx; i < length; i++) {
        tempoMetar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  });
  return [metar, remarks, tempoMetar, becomingMetar];
}
