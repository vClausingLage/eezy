export function metarToList(metar) {
    const metarList = metar.split(' ');
    return metarList;
}
export function metarToString(metar) {
    const metarString = metar.join(' ');
    return metarString;
}
export function removeEndCharFromString(metar) {
    let result = metar.replace('$', '').replace('=', '');
    result = result.trim();
    return result;
}
export function splitMetarListRemarks(metar) {
    let tempoMetar = [];
    let becomingMetar = [];
    let remarks = [];
    metar.forEach((el, idx) => {
        if (/RMK/i.test(el))
            remarks = metar.slice(idx);
    });
    metar.forEach((el, idx) => {
        if (/TEMPO/i.test(el))
            tempoMetar = metar.slice(idx);
    });
    metar.forEach((el, idx) => {
        if (/BECMG/i.test(el))
            becomingMetar = metar.slice(idx);
    });
    remarks.forEach((el, idx) => {
        if (/TEMPO/i.test(el))
            remarks = remarks.slice(0, idx);
        if (/BECMG/i.test(el))
            remarks = remarks.slice(0, idx);
    });
    tempoMetar.forEach((el, idx) => {
        if (/RMK/i.test(el))
            tempoMetar = tempoMetar.slice(0, idx);
        if (/BECMG/i.test(el))
            tempoMetar = tempoMetar.slice(0, idx);
    });
    becomingMetar.forEach((el, idx) => {
        if (/TEMPO/i.test(el))
            becomingMetar = becomingMetar.slice(0, idx);
        if (/RMK/i.test(el))
            becomingMetar = becomingMetar.slice(0, idx);
    });
    metar.forEach((el, idx) => {
        if (/RMK/i.test(el))
            metar = metar.slice(0, idx);
        if (/BECMG/i.test(el))
            metar = metar.slice(0, idx);
        if (/TEMPO/i.test(el))
            metar = metar.slice(0, idx);
    });
    return {
        metar,
        remarks,
        tempo: tempoMetar,
        becoming: becomingMetar
    };
}
