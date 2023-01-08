"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.precipFormat = exports.decodeWeather = exports.precipPreposition = exports.visFormat = exports.windVarFormat = exports.windFormat = exports.dateFormat = void 0;
const metar_classes_js_1 = require("./metar-classes.js");
const weatherCodes = __importStar(require("./weatherCodes.json"));
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
    let output;
    if (/^CAVOK$/.test(vis)) {
        output = vis;
    }
    if (/^\d{4}$/i.test(vis)) {
        output = parseInt(vis);
    }
    return output;
}
exports.visFormat = visFormat;
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
    // load JSON weather codes to VAR
    let codes = weatherCodes;
    let codeArr = [];
    for (const [k, v] of Object.entries(codes.characteristic)) {
        codeArr.push(k, v);
    }
    for (const [k, v] of Object.entries(codes.intensity)) {
        codeArr.push(k, v);
    }
    for (const [k, v] of Object.entries(codes.type)) {
        codeArr.push(k, v);
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
    console.log(codeArr);
    result.forEach((el) => {
        codeArr.forEach(x => {
            // console.log(el, x[0])
            if (x[0] === el) {
                // console.log(x, el)
            }
        });
    });
}
exports.decodeWeather = decodeWeather;
function precipFormat(precip) {
    let output = new metar_classes_js_1.Precipitation();
    let newPrecip = precipPreposition(precip);
    let weatherCode = decodeWeather(newPrecip);
    output.intensity = newPrecip[0];
    // output.elements = weatherCode;
    return output;
}
exports.precipFormat = precipFormat;
