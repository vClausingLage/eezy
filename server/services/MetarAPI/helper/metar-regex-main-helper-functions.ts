export function metarToList(metar: string): string[] {
  let metarList = metar.split(" ");
  return metarList;
}
export function metarToString(metar: string[]): string {
  let metarString = metar.join(" ");
  return metarString;
}

export function removeEndCharFromString(metar: string) {
  let result = metar.replace("$", "").replace("=", "");
  result = result.trim();
  return result;
}

type ListRemarks = {
  metar: string[];
  remarks: string[];
  tempo: string[];
  becoming: string[];
};

export function splitMetarListRemarks(metar: string[]): ListRemarks {
  let tempoMetar: string[] = [];
  let becomingMetar: string[] = [];
  let remarks: string[] = [];
  metar.forEach((el, idx) => {
    if (/RMK/i.test(el)) remarks = metar.slice(idx);
  });
  metar.forEach((el, idx) => {
    if (/TEMPO/i.test(el)) tempoMetar = metar.slice(idx);
  });
  metar.forEach((el, idx) => {
    if (/BECMG/i.test(el)) becomingMetar = metar.slice(idx);
  });
  remarks.forEach((el, idx) => {
    if (/TEMPO/i.test(el)) remarks = remarks.slice(0, idx);
    if (/BECMG/i.test(el)) remarks = remarks.slice(0, idx);
  });
  tempoMetar.forEach((el, idx) => {
    if (/RMK/i.test(el)) tempoMetar = tempoMetar.slice(0, idx);
    if (/BECMG/i.test(el)) tempoMetar = tempoMetar.slice(0, idx);
  });
  becomingMetar.forEach((el, idx) => {
    if (/TEMPO/i.test(el)) becomingMetar = becomingMetar.slice(0, idx);
    if (/RMK/i.test(el)) becomingMetar = becomingMetar.slice(0, idx);
  });
  metar.forEach((el, idx) => {
    if (/RMK/i.test(el)) metar = metar.slice(0, idx);
    if (/BECMG/i.test(el)) metar = metar.slice(0, idx);
    if (/TEMPO/i.test(el)) metar = metar.slice(0, idx);
  });
  return {
    metar: metar,
    remarks: remarks,
    tempo: tempoMetar,
    becoming: becomingMetar,
  };
}
