"use strict";
exports.__esModule = true;
exports.windFormat = exports.dateFormat = void 0;
var metar_test_js_1 = require("./metar_test.js");
function dateFormat(time) {
    var today = new Date();
    var date = time.slice(0, 2) + '.' + ("0" + (today.getMonth() + 1)).slice(-2) + '.' + String(today.getFullYear());
    var tod = time.slice(2, 4) + ':' + time.slice(4, 6);
    return [date, tod];
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
