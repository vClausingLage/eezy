"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.precipFormat = exports.decodeWeather = exports.precipPreposition = exports.visFormat = exports.windVarFormat = exports.windFormat = exports.dateFormat = void 0;
const metar_classes_js_1 = require("./metar-classes.js");
const weatherCodes_json_1 = __importDefault(require("./weatherCodes.json"));
function dateFormat(time) {
    let today = new Date();
    let date = new Date(today.getFullYear(), today.getMonth(), parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)), parseInt(time.slice(4, 6)));
    return date;
}
exports.dateFormat = dateFormat;
function windFormat(wind) {
    let output = new metar_classes_js_1.Wind;
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
exports.windFormat = windFormat;
function windVarFormat(windVar) {
    let output = [parseInt(windVar.slice(0, 3)), parseInt(windVar.slice(4, 7))];
    return output;
}
exports.windVarFormat = windVarFormat;
function visFormat(vis) {
    if (/^CAVOK$/.test(vis)) {
        return vis;
    }
    if (/^\d{4}$/i.test(vis)) {
        return parseInt(vis);
    }
}
exports.visFormat = visFormat;
// ! remove if unneccessary
// function precipPrepare(precip, preposition) {
//   if (precip.length % 2 != 0) {
//     if (precip[0] === '+') {
//       preposition = 'heavy'
//     } else if (precip[0] === '-') {
//       preposition = 'light'
//     }
//   }
//   return [precip, preposition]
// }
function precipPreposition(precip) {
    let formattedPrecip = [];
    if (precip.length % 2 === 0) {
        formattedPrecip = ['null', precip];
    }
    else if (precip.length % 2 != 0) {
        formattedPrecip = [precip.slice(0, 1), precip.slice(1, precip.length)];
    }
    return formattedPrecip;
}
exports.precipPreposition = precipPreposition;
function decodeWeather(precip) {
    console.log(precip[1].length);
    let codes = weatherCodes_json_1.default;
    console.log(codes);
}
exports.decodeWeather = decodeWeather;
function precipFormat(precip) {
    let output = new metar_classes_js_1.Precipitation();
    let newPrecip = precipPreposition(precip);
    let weatherCode = decodeWeather(newPrecip);
    output.intensity = newPrecip[0];
    return output;
}
exports.precipFormat = precipFormat;
