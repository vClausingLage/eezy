"use strict";
exports.__esModule = true;
exports.precipFormat = exports.visFormat = exports.windVarFormat = exports.windFormat = exports.dateFormat = void 0;
var metar_test_js_1 = require("./metar_test.js");
function dateFormat(time) {
    var today = new Date();
    var date = new Date(today.getFullYear(), today.getMonth(), parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)), parseInt(time.slice(4, 6)));
    return date;
}
exports.dateFormat = dateFormat;
function windFormat(wind) {
    if (/^[0-9]{5}KT$/i.test(wind)) {
        var output = new metar_test_js_1.Wind;
        output = {
            direction: parseInt(wind.slice(0, 3)),
            speed: parseInt(wind.slice(3, 4)),
            unit: 'kts'
        };
        return output;
    }
    if (/^[0-9]{5}G[0-9]{1,2}KT$/i.test(wind)) {
        var output = new metar_test_js_1.Wind;
        output = {
            direction: parseInt(wind.slice(0, 3)),
            speed: parseInt(wind.slice(3, 5)),
            gusts: parseInt(wind.slice(6, 8)),
            unit: 'kts'
        };
        return output;
    }
}
exports.windFormat = windFormat;
function windVarFormat(windVar) {
    var output = [parseInt(windVar.slice(0, 3)), parseInt(windVar.slice(4, 7))];
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
function precipFormat(precip) {
    var output = new metar_test_js_1.Precipitation;
    if (precip.length % 2 != 0) {
        console.log(precip.length);
    }
    return output;
}
exports.precipFormat = precipFormat;
/*



*/ 
