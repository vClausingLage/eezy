import { Wind, Precipitation, Clouds } from './metar-classes';
import * as weatherCodes from './assets/weatherCodes.json'; // assert {type: 'json'} //! BABEL PLUGIN
export function dateFormat(time) {
    let today = new Date();
    let date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)), parseInt(time.slice(4, 6))));
    return date;
}
export function windFormat(wind) {
    let output = new Wind();
    if (/^[0-9]{5}KT$/i.test(wind)) {
        output = {
            direction: parseInt(wind.slice(0, 3)),
            speed: parseInt(wind.slice(3, 5)),
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
export function windFormatSpec(wind) {
    let output = new Wind();
    output = {
        direction: 'more than 30',
        speed: parseInt(wind.slice(3, 5)),
        unit: 'kts'
    };
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
        formattedPrecip = ['', precip];
    }
    else if (precip.length % 2 !== 0) {
        let preposition;
        if (precip.slice(0, 1) === '-') {
            preposition = 'light';
        }
        else if (precip.slice(0, 1) === '+') {
            preposition = 'heavy';
        }
        formattedPrecip = [preposition, precip.slice(1, precip.length)];
    }
    return formattedPrecip;
}
export function decodeWeather(precip) {
    let output = [];
    // load JSON weather codes to [VAR]
    let codes = weatherCodes;
    let codeArr = [];
    for (const [k, v] of Object.entries(codes)) {
        for (const [code, descr] of Object.entries(v)) {
            codeArr.push([code, descr]);
        }
    }
    // use VAR to LOOP METAR input
    let result = [];
    if (precip[1].length >= 2) {
        for (let i = 0, charsLength = precip[1].length; i < charsLength; i += 2) {
            result.push(precip[1].substring(i, i + 2));
        }
    }
    else {
        console.log('precipitation code not properly formatted');
        // result.push(precip[1])
    }
    // check RPECIP for WEATHER CODES MATCH
    result.forEach((el) => {
        codeArr.forEach(x => {
            if (x[0] === el) { // check weather code match x[0]
                output.push(x[1]); // push description of code x[1]
            }
        });
    });
    return output;
}
export function precipFormat(precip) {
    precip = precip.replaceAll(' ', '');
    let output = new Precipitation();
    let newPrecip = precipPreposition(precip);
    let weatherCode = decodeWeather(newPrecip);
    output.intensity = newPrecip[0];
    output.elements = weatherCode;
    return output;
}
export function cloudFormat(clouds) {
    let output = new Clouds();
    if (clouds !== 'NCD' && clouds !== 'CLR') {
        let cloudLayer = clouds.slice(0, 3);
        let cloudBase = clouds.slice(3, 6);
        if (clouds.length >= 6) {
            let cloud = clouds.slice(6, 9);
            output['cloud'] = cloud;
        }
        output['cloudLayer'] = cloudLayer;
        output['cloudBase'] = parseInt(cloudBase);
    }
    else if (clouds === 'NCD' || clouds === 'CLR') {
        output['cloudLayer'] = clouds;
        output['cloudBase'] = null;
    }
    return output;
}
export function tempFormat(temperature) {
    let output = [];
    let tempArr = temperature.split('/');
    tempArr.forEach(el => {
        if (el === 'M00') {
            output.push(0);
        }
        else if (el[0] === 'M') {
            el = el.replace('M', '-');
            output.push(Number(el));
        }
        else {
            output.push(Number(el));
        }
    });
    return output;
}
