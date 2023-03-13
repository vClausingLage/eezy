export function metarToList(metar: string): string[] {
  let metarList = metar.split(" ");
  return metarList;
}
export function metarToString(metar: string[]): string {
  let metarString = metar.join(" ");
  return metarString;
}

export function splitMetarListRemarks(metar: string[]): {} {
  let tempoMetar: string[] = [];
  let becomingMetar: string[] = [];
  let remarks: string[] = [];
  metar.forEach((el, idx) => {
    let length = metar.length;
    metar.forEach((el, idx) => {
      let length = metar.length;
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
      if (/BECMG/i.test(el)) {
        for (let i = idx; i < length; i++) {
          becomingMetar.push(metar[i]);
        }
        for (let i = idx; i < length; i++) {
          metar.splice(i);
        }
      }
    });
    if (/TEMPO/i.test(el)) {
      for (let i = idx; i < length; i++) {
        tempoMetar.push(metar[i]);
      }
      for (let i = idx; i < length; i++) {
        metar.splice(i);
      }
    }
  });
  return {
    metar: metar,
    remarks: remarks,
    tempo: tempoMetar,
    becoming: becomingMetar,
  };
}
