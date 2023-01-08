import { Wind, Precipitation } from './metar-classes.js';
import * as weatherCodes from './weatherCodes.json' assert { type: 'json' };
export function dateFormat(time) {
    let today = new Date();
    let date = new Date(today.getFullYear(), today.getMonth(), parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)), parseInt(time.slice(4, 6)));
    return date;
}
export function windFormat(wind) {
    let output = new Wind;
    if (/^[0-9]{5}KT$/i.test(wind)) {
        output = {
            direction: parseInt(wind.slice(0, 3)),
            speed: parseInt(wind.slice(3, 4)),
            unit: 'kts'
        };
    }
    else if (/^[0-9]{5}G[0-9]{1,2}KT$/i.test(wind)) {
        output = {
            direction: parseInt(wind.slice(0, 3)),
            speed: parseInt(wind.slice(3, 5)),
            gusts: parseInt(wind.slice(6, 8)),
            unit: 'kts'
        };
    }
    return output;
}
export function windVarFormat(windVar) {
    let output = [parseInt(windVar.slice(0, 3)), parseInt(windVar.slice(4, 7))];
    return output;
}
export function visFormat(vis) {
    let output;
    if (/^CAVOK$/.test(vis)) {
        output = vis;
    }
    if (/^\d{4}$/i.test(vis)) {
        output = parseInt(vis);
    }
    return output;
}
export function precipPreposition(precip) {
    let formattedPrecip = [];
    if (precip.length % 2 === 0) {
        formattedPrecip = ['null', precip];
    }
    else if (precip.length % 2 != 0) {
        formattedPrecip = [precip.slice(0, 1), precip.slice(1, precip.length)];
    }
    return formattedPrecip;
}
export function decodeWeather(precip) {
    let output = [];
    // load JSON weather codes to VAR
    let codes = weatherCodes;
    let codeArr = [];
    for (const [k, v] of Object.entries(codes.default)) {
        for (const [code, descr] of Object.entries(v)) {
            codeArr.push([code, descr]);
        }
    }
    // use VAR to LOOP METAR input
    let result = [];
    if (precip[1].length > 2) {
        for (let i = 0, charsLength = precip[1].length; i < charsLength; i += 2) {
            result.push(precip[1].substring(i, i + 2));
        }
    }
    else {
        result.push(precip[1]);
    }
    // check RPECIP for WEATHER CODES MATCH
    result.forEach((el) => {
        codeArr.forEach(x => {
            if (x[0] === el) {
                output.push(x[1]);
            }
        });
    });
    return output;
}
export function precipFormat(precip) {
    let output = new Precipitation();
    let newPrecip = precipPreposition(precip);
    let weatherCode = decodeWeather(newPrecip);
    output.intensity = newPrecip[0];
    output.elements = weatherCode;
    return output;
}
