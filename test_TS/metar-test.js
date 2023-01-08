"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metar_classes_js_1 = require("./metar-classes.js");
const metar_helper_js_1 = require("./metar-helper.js");
let metar = 'ENGM 042300Z 0500/0524 21010G21KT 190V250 7000 +SNRA SCT012 BKN025/// TEMPO 0500/0509 4000 -SN BKN012 BECMG 0510/0512 03005KT=';
// 'EDHK 041050Z 24017G28KT 4000 -RA BRBKN007 OVC014 10/10 Q1005 TEMPO 03005KT='
// https://metar-taf.com/explanation
let metarList = metar.split(' ');
let tempo_metar = [];
let becoming_metar = [];
// the check function cheks if Metar ends with the = sign (and is therefore sanely formatted)
function checkMetarIntegr(metar) {
    if (metar[metar.length - 1].slice(-1) == '=') {
        console.log('metar integrity checked');
    }
    else {
        console.log('metar not complete');
    }
}
checkMetarIntegr(metarList);
// the reduce function removes all TEMPO entries from the original RAW METAR and add them to the TEMPO METAR
function reduceTempo(metar) {
    let length = metar.length;
    metar.forEach((el, idx) => {
        // !CHECK !!!! !!!! !!!! IF WORKS CORRECTLY
        // if (/BECMG/i.test(el)) {
        //   for (let i = idx; i < length; i++) {
        //     becoming_metar.push(metar[i]);
        //   }
        //   for (let i = idx; i < length; i++) {
        //     metar.splice(i);
        //   }
        // }
        if (/TEMPO/i.test(el)) {
            for (let i = idx; i < length; i++) {
                tempo_metar.push(metar[i]);
            }
            for (let i = idx; i < length; i++) {
                metar.splice(i);
            }
        }
    });
}
reduceTempo(metarList);
// the map function generates an object that represents the RAW METAR in KEY-VALUE pairs
function maptoMetarObj(metar) {
    let metarObj = new metar_classes_js_1.Metar();
    // ICAO
    metarObj['ICAO'] = metar[0];
    metar.shift(); // remove ICAO code to avoid conflict with PRECIPITATION codes
    metarObj['Cloud_Layer'] = [];
    metar.forEach(el => {
        // DATE / TIME
        if (/^[0-9]{6}Z$/i.test(el)) {
            let output = (0, metar_helper_js_1.dateFormat)(el);
            metarObj['Date'] = output;
        }
        // WINDS
        if (/^[0-9]{5}KT$/i.test(el) || /^[0-9]{5}G[0-9]{1,2}KT$/i.test(el)) {
            let output = (0, metar_helper_js_1.windFormat)(el);
            metarObj['Winds'] = output;
        }
        // WINDVAR
        if (/^\d{3}V\d{3}$/i.test(el)) {
            let output = (0, metar_helper_js_1.windVarFormat)(el);
            metarObj['Wind_Variation'] = output;
        }
        // VISBILIY
        if (/^CAVOK$/.test(el) || /^\d{4}$/i.test(el)) {
            let output = (0, metar_helper_js_1.visFormat)(el);
            metarObj['Visibility'] = output;
        }
        // PRECIPITATION
        if (/^\+?\D{2,6}$/i.test(el) || /^\-?\D{2,6}$/i.test(el)) {
            let output = (0, metar_helper_js_1.precipFormat)(el);
            metarObj['Precipitation'] = output;
        }
        // CLOUDS
        if (/^\D{3}\d{3}$/i.test(el) || /^\D{3}\d{3}\D$/i.test(el) || /^\D{3}\d{3}\/\/\/$/i.test(el)) {
            console.log(el);
            metarObj['Cloud_Layer'].push(el);
        }
        // TAF PROGNOSIS
        if (/^\d{4}\/\d{4}$/i.test(el)) {
            metarObj['TAF_Prognosis'] = el;
        }
    });
    // LOG
    // console.log(metarObj);
}
maptoMetarObj(metarList);
