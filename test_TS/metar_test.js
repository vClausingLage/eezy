var metar = 'ENGM 042300Z 0500/0524 03015KT 7000 -SN SCT012 BKN025 TEMPO 0500/0509 4000 -SN BKN012 BECMG 0510/0512 03005KT=';
// 'EDHK 041050Z 24017G28KT 4000 -RA BRBKN007 OVC014 10/10 Q1005 TEMPO 03005KT='
// does a class make sense?
// ALWAYS LOOP WHOLE METAR AFTER REDUCING !!!!!
var metarList = metar.split(' ');
var tempo_metar = [];
// the check function cheks if Metar ends with the = sign (and is therefore sanely formatted)
function checkMetarIntegr(metar) {
    if (metar[metar.length - 1].slice(-1) == '=') {
        console.log('metar integrity checked');
    }
    else {
        console.log(metar[metar.length - 1]);
    }
}
checkMetarIntegr(metarList);
// the reduce function removes all TEMPO entries from the original RAW METAR and add them to the TEMPO METAR
function reduceTempo(metar) {
    var length = metar.length;
    metar.forEach(function (el, idx) {
        if (/TEMPO/i.test(el)) {
            for (var i = idx; i < length; i++) {
                tempo_metar.push(metar[i]);
            }
            for (var i = idx; i < length; i++) {
                metar.splice(i);
            }
        }
    });
}
reduceTempo(metarList);
// the map function generates an object that represents the RAW METAR in KEY-VALUE pairs
function maptoMetarObj(metar) {
    var metarObj = {};
    metar.forEach(function (el) {
        // ICAO
        if (/^[a-z]{4}$/i.test(el)) {
            metarObj['ICAO'] = el;
        }
        // DATE / TIME
        if (/^[0-9]{6}Z$/i.test(el)) {
            metarObj['Date'] = el;
        }
        // WINDS
        if (/^[0-9]{5}KT$/i.test(el) || /^[0-9]{5}G[0-9]{1,2}KT$/i.test(el)) {
            metarObj['Winds'] = el;
        }
        // WINDVAR
        if (/^\d{3,4}(V|[\/])\d{3,4}$/i.test(el)) {
            metarObj['Wind_Variation'] = el;
        }
        // VISBILIY
        if (/^CAVOK$/.test(el) || /^\d{4}$/i.test(el)) {
            metarObj['Visibility'] = el;
        }
        // PRECIPITATION
        if (/(^+?)(^-?)\w{2}$/.test(el)) {
            metarObj['Precipitation'] = el;
        }
    });
    // LOG
    console.log(metarObj);
}
maptoMetarObj(metarList);
function formatDate(metar) {
    var aerodrome = metar[0];
    var time = metar[1];
    var today = new Date();
    var date = time.slice(0, 2) + '.' + ("0" + (today.getMonth() + 1)).slice(-2) + '.' + String(today.getFullYear());
    var tod = time.slice(2, 4) + ':' + time.slice(4, 6);
    return "METAR for ".concat(aerodrome, " on ").concat(date, ", ").concat(tod, " Zulu Time");
}
// TESTS
// class Metar {
//   constructor(icao, date, winds, windvar, vis, precip, cloud1, cloud2, cloud3, temp, qnh, tempo, change) {
//   }
// }
// let edds_metar = `EDDS 041750Z 23015KT 190V270 9999 FEW034 10/05 Q1022 NOSIG=
// EDDS 041820Z 23013G24KT 190V270 CAVOK 10/06 Q1022 NOSIG=
// EDDS 041850Z 23013G23KT 190V250 CAVOK 10/06 Q1022=
// EDDS 041920Z 23015KT 190V260 CAVOK 10/06 Q1022 NOSIG=
// EDDS 041950Z 23014G24KT 190V250 9999 FEW027 10/06 Q1022 NOSIG=
// EDDS 042020Z 23015G28KT 200V280 9999 FEW017 OVC048 10/07 Q1023 NOSIG=
// EDDS 042050Z 22013G23KT 160V260 9999 FEW014 BKN025 OVC032 10/07 Q1023 NOSIG=
// EDDS 042120Z 21009KT 180V260 9999 FEW014 OVC032 09/07 Q1023=
// EDDS 042150Z 21010KT 180V250 9999 SCT026 OVC044 09/07 Q1022=
// EDDS 042220Z 21009G19KT 170V240 9999 SCT032 09/07 Q1022=
// EDDS 042250Z 21010KT 180V250 9999 SCT035 10/07 Q1022=
// EDDS 042320Z 21011KT 180V250 9999 BKN043 10/07 Q1021=
// EDDS 042350Z 22011KT 160V260 9999 BKN021 BKN044 10/07 Q1021=
// EDDS 050020Z 21011KT 170V240 9999 BKN024 10/07 Q1021=
// EDDS 050050Z 22011KT 180V250 9999 FEW022 BKN029 OVC044 10/07 Q1021=
// EDDS 050120Z 22011KT 180V260 9999 FEW016 OVC029 10/07 Q1021=
// EDDS 050150Z 21010KT 170V260 9999 FEW018 OVC027 10/07 Q1021=
// EDDS 050220Z 21010G21KT 160V250 9999 BKN017 BKN021 OVC025 10/07 Q1020=
// EDDS 050250Z 22009KT 170V260 9999 BKN016 10/07 Q1020=
// EDDS 050320Z 22009KT 170V250 9999 BKN016 OVC022 10/07 Q1020=
// EDDS 050350Z 22008KT 170V250 9999 BKN017 BKN022 10/08 Q1020=
// EDDS 050420Z 21007KT 180V240 9999 BKN018 OVC023 10/08 Q1020=
// EDDS 050450Z 22008G18KT 180V270 9999 BKN018 BKN023 OVC029 10/08 Q1020=
// EDDS 050520Z 23009KT 200V260 9999 BKN019 BKN025 10/08 Q1020 NOSIG=
// EDDS 050550Z 23008KT 200V260 9999 -SHRA FEW008 BKN026 OVC041 FEW///TCU 10/08 Q1021 NOSIG=
// EDDS 050620Z 24006KT 210V270 9999 -SHRA BKN019 BKN025 OVC031 FEW///TCU 10/08 Q1021 NOSIG=
// EDDS 050650Z 31006KT 240V360 9999 -SHRA SCT016 BKN022 OVC029 FEW///TCU 10/09 Q1022 NOSIG=
// EDDS 050720Z 28012KT 9999 -SHRA FEW009 BKN021 BKN027 FEW///TCU 10/08 Q1022 NOSIG=
// EDDS 050750Z 27006KT 9999 FEW022 BKN040 10/08 Q1022 NOSIG=
// EDDS 050820Z 25006KT 9999 FEW022 BKN034 10/08 Q1023 NOSIG=
// EDDS 050850Z 26013KT 9999 FEW024 BKN045 10/07 Q1023 NOSIG=
// EDDS 050920Z 27017KT 9999 SCT027 BKN033 10/06 Q1023 NOSIG=
// EDDS 050950Z 27019G30KT 230V290 9999 FEW026 BKN040 10/06 Q1023 NOSIG=
// EDDS 051020Z 27016KT 9999 FEW037 11/06 Q1024 NOSIG=
// EDDS 051050Z 26015KT 9999 FEW033 11/05 Q1023 NOSIG=
// EDDS 051120Z 25011KT 220V280 9999 BKN033 11/05 Q1023 NOSIG=
// EDDS 051150Z 27015G25KT 9999 BKN033 11/05 Q1023 NOSIG=
// EDDS 051220Z 26013KT 210V290 9999 BKN033 11/05 Q1023 TEMPO 27015G25KT=
// EDDS 051250Z 26013KT 9999 BKN033 BKN042 11/05 Q1023 TEMPO 27015G25KT=
// EDDS 051320Z 27014KT 9999 BKN030 OVC037 11/05 Q1024 TEMPO 27015G25KT=
// EDDS 051350Z 26013KT 9999 BKN033 11/05 Q1024 NOSIG=
// EDDS 051420Z 27011KT 9999 OVC031 11/05 Q1024 NOSIG=
// EDDS 051450Z 27008KT 9999 BKN034 11/05 Q1024 NOSIG=
// EDDS 051520Z 26007KT 9999 OVC035 10/05 Q1024 NOSIG=
// EDDS 051550Z 24005KT 200V280 9999 SCT037 10/05 Q1024 NOSIG=
// EDDS 051620Z 22003KT 180V250 9999 SCT029 SCT036 10/06 Q1024 NOSIG=
// EDDS 051650Z 24005KT 200V270 9999 SCT026 10/06 Q1024 NOSIG=
// EDDS 051720Z 25006KT 9999 FEW029 09/06 Q1024 NOSIG=`
// let phnl_metar = `PHNL 041947Z 0420/0524 02008KT P6SM VCSH FEW015 SCT025 BKN050 TEMPO 0420/0422 3SM -SHRA BKN030 FM042200 07010KT P6SM SCT025 BKN035 BKN045 FM050500 04005KT P6SM SCT030 SCT045 FM050700 35005KT P6SM SCT030 SCT045 FM052100 13005KT P6SM FEW030 SCT045=
// PHNL 042105Z 0421/0524 02008KT P6SM VCSH FEW015 SCT025 BKN050 TEMPO 0421/0423 3SM -SHRA BKN030 FM042300 07010KT P6SM SCT025 BKN035 BKN045 FM050500 04005KT P6SM SCT030 SCT045 FM050700 35005KT P6SM SCT030 SCT045 FM052100 13005KT P6SM FEW030 SCT045=
// PHNL 042326Z 0500/0606 07010KT 6SM -SHRA SCT025 BKN035 BKN045 TEMPO 0500/0504 3SM -SHRA BKN020 FM050600 03005KT P6SM VCSH SCT030 SCT045 FM051000 34003KT P6SM SCT030 SCT045 FM052100 13005KT P6SM FEW030 SCT045 FM060300 07007KT P6SM FEW030 FEW045=
// PHNL 050250Z 0503/0606 07010KT 6SM -SHRA SCT025 BKN035 BKN045 FM050600 03005KT P6SM VCSH SCT030 SCT045 FM051000 34003KT P6SM SCT030 SCT045 FM052100 13005KT P6SM FEW030 SCT045 FM060300 07007KT P6SM FEW030 FEW045=
// PHNL 050532Z 0506/0612 03005KT P6SM VCSH SCT030 BKN045 TEMPO 0506/0510 BKN030 FM051000 34003KT P6SM SCT030 SCT045 FM052100 13005KT P6SM FEW030 SCT045 FM060300 07007KT P6SM FEW030 FEW045=
// PHNL 050902Z 0509/0612 01006KT P6SM VCSH SCT025 BKN045 TEMPO 0509/0512 BKN025 FM051200 34003KT P6SM SCT030 BKN045 FM052100 13005KT P6SM FEW030 SCT045 FM060300 07007KT P6SM FEW030 FEW045=
// PHNL 051129Z 0512/0618 35004KT P6SM SCT025 BKN045 TEMPO 0512/0515 BKN030 FM052100 12007KT P6SM SCT030 SCT045 FM060600 05007KT P6SM FEW030 SCT045 FM061200 01005KT P6SM FEW030 SCT045=
// PHNL 051510Z 0515/0618 35004KT P6SM SCT025 BKN045 TEMPO 0515/0519 BKN030 FM052100 12007KT P6SM SCT030 SCT045 FM060600 05007KT P6SM FEW030 SCT045 FM061200 01005KT P6SM FEW030 SCT045=`
// let engm_metar = `ENGM 042300Z 0500/0524 03015KT 7000 -SN SCT012 BKN025 TEMPO 0500/0509 4000 -SN BKN012 BECMG 0510/0512 03005KT=
// ENGM 050500Z 0506/0606 03015KT 7000 -SN SCT020 BKN025 BECMG 0510/0512 03005KT=
// ENGM 050751Z 0507/0606 01010KT 7000 -SN SCT020 BKN030 TEMPO 0507/0606 2000 -SN=
// ENGM 051100Z 0512/0612 02008KT 6000 -SN SCT020 BKN030 PROB40 TEMPO 0512/0601 3500 -SN BECMG 0601/0603 12010KT 3500 -SN VV010 TEMPO 0605/0612 0400 SN VV003=
// ENGM 051700Z 0518/0618 07008KT 9999 -SN SCT020 BKN030 TEMPO 0518/0603 3500 -SN BECMG 0603/0605 3500 -SN BKN012 TEMPO 0605/0618 1200 SN VV005=
// ENGM 041820Z 03012KT 5000 -SN FEW013 BKN015 M05/M06 Q1003 TEMPO 2000 SN VV012=
// ENGM 041850Z 03012KT 4400 -SN BKN016 M05/M06 Q1003 TEMPO 2000 SN VV012=
// ENGM 041920Z 03013KT 4000 -SN FEW016 BKN020 M05/M06 Q1002 TEMPO 2000 SN VV012=
// ENGM 041950Z 03013KT 3800 -SN FEW018 BKN022 M05/M06 Q1002 TEMPO 2000 SN=
// ENGM 042020Z 03013KT 4500 -SN FEW010 BKN021 M05/M06 Q1003 TEMPO 2000 SN=
// ENGM 042050Z 03012KT 4200 -SN FEW018 OVC026 M05/M06 Q1003 NOSIG=
// ENGM 042120Z 03013KT 4400 -SN FEW019 BKN023 M04/M05 Q1003 NOSIG=
// ENGM 042150Z 02014KT 4000 -SN FEW010 BKN024 M04/M05 Q1003 NOSIG=
// ENGM 042220Z 03014KT 5000 -SN FEW013 SCT018 OVC037 M04/M05 Q1003=
// ENGM 042250Z 03013KT 9000 -SN SCT022 BKN042 M04/M05 Q1004=
// ENGM 042320Z 03016KT 8000 -SN SCT025 BKN042 M04/M06 Q1004=
// ENGM 042350Z 03015KT 9000 -SN FEW021 BKN025 M04/M06 Q1004=
// ENGM 050020Z 03014KT 9000 -SN BKN023 M04/M06 Q1004=
// ENGM 050050Z 03015KT 9000 -SN SCT025 BKN032 M04/M06 Q1005=
// ENGM 050120Z 03014KT 3400 -SN BKN022 M04/M06 Q1005=
// ENGM 050150Z 02014KT 3800 -SN BKN022 M04/M06 Q1006=
// ENGM 050220Z 02014KT 6000 -SN BKN049 M04/M06 Q1006=
// ENGM 050250Z 03013KT 9999 -SN FEW027 BKN049 M04/M06 Q1007=
// ENGM 050320Z 03015KT 9999 -SN FEW037 BKN053 M04/M06 Q1007=
// ENGM 050350Z 03015KT 7000 -SN SCT026 BKN031 M04/M06 Q1007=
// ENGM 050420Z 03013KT 4500 -SN FEW027 BKN038 M05/M06 Q1008=
// ENGM 050450Z 02013KT 4500 -SN FEW032 BKN037 M05/M06 Q1009 NOSIG=
// ENGM 050520Z 02011KT 5000 -SN SCT040 BKN068 M05/M06 Q1009 NOSIG=
// ENGM 050550Z 02012KT 8000 -SN FEW049 BKN061 M05/M06 Q1009 NOSIG=
// ENGM 050620Z 02011KT 9999 -SN BKN049 M05/M07 Q1010 NOSIG=
// ENGM 050650Z 01009KT 5000 -SN SCT040 BKN068 M05/M06 Q1011 TEMPO 3000 -SN=
// ENGM 050720Z 02010KT 6000 -SN FEW037 BKN047 M05/M06 Q1011 TEMPO 3000 -SN=
// ENGM 050750Z 01009KT 3400 -SN FEW028 BKN032 M05/M06 Q1012 TEMPO 2000 -SN=
// ENGM 050820Z 01009KT 4000 -SN SCT043 BKN054 M05/M06 Q1013 TEMPO 5000 -SN=
// ENGM 050850Z 02008KT 4300 -SN FEW047 BKN056 M05/M06 Q1013 NOSIG=
// ENGM 050920Z 01008KT 6000 -SN FEW033 BKN070 M05/M06 Q1014 NOSIG=
// ENGM 050950Z 01007KT 6000 -SN SCT040 BKN073 M05/M06 Q1014 NOSIG=
// ENGM 051020Z 01007KT 6000 -SN SCT040 BKN070 M05/M06 Q1015 NOSIG=
// ENGM 051050Z 01006KT 5000 -SN BR FEW042 BKN055 M05/M06 Q1015 TEMPO 4000 -SN BR=
// ENGM 051120Z 02008KT 5000 -SN BR FEW041 BKN053 M05/M06 Q1016 NOSIG=
// ENGM 051150Z 03007KT 4200 -SN BR SCT042 BKN050 M05/M06 Q1016 TEMPO 2500 -SN BR=
// ENGM 051220Z 02006KT 5000 -SN BR FEW021 BKN060 M05/M06 Q1016 TEMPO 2500 -SN BR=
// ENGM 051250Z 02006KT 4500 -SN BR FEW040 BKN065 M05/M07 Q1017 TEMPO 6000 -SN=
// ENGM 051320Z 02006KT 7000 -SN FEW019 BKN052 M05/M07 Q1017 NOSIG=
// ENGM 051350Z 01005KT 9000 -SN FEW019 BKN050 M05/M07 Q1018 NOSIG=
// ENGM 051420Z 02004KT 7000 -SN FEW025 BKN050 M05/M07 Q1018 NOSIG=
// ENGM 051450Z 35003KT 9999 -SN FEW034 BKN050 M05/M07 Q1018 NOSIG=
// ENGM 051520Z 36003KT 330V030 9999 -SN SCT033 BKN040 M06/M07 Q1019 NOSIG=
// ENGM 051550Z 03002KT 9999 -SN BKN034 M06/M07 Q1019 NOSIG=
// ENGM 051620Z VRB03KT 9999 -SN BKN034 M05/M07 Q1019 NOSIG=
// ENGM 051650Z 03002KT 9999 -SN BKN034 M05/M08 Q1019 NOSIG=
// ENGM 051720Z VRB01KT 9999 -SN BKN034 M05/M08 Q1019 TEMPO 4000 -SN=
// ENGM 051750Z VRB02KT 9999 -SN BKN021 M05/M08 Q1019 TEMPO 4000 -SN=`
// function count(name, metar) {
//   let arr = []
//   let res = []
//   arr = metar.split('\n')
//   arr.forEach(el => res.push(el.split(' ')))
// }
// count('STR',edds_metar)
// count('HNL',phnl_metar)
// count('OSL',engm_metar)
