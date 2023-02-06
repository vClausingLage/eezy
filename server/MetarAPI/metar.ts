// import {
//   prepareMetar,
//   checkMetarIntegr,
//   reduceTempo,
//   maptoMetarObj,
// } from "./Metar/metar-regex";
// import { precipitation, getFlightRules } from "./Metar/metar-ui-helper";
// import { IMetar, IFlightRule } from "./Metar/assets/IMetar";

import { prepareMetar, checkMetarIntegr, reduceTempo, maptoMetarObj } from "./helper/metar-regex.js";
import { precipitation, getFlightRules } from "./helper/metar-ui-helper.js";
import { IMetar, IFlightRule } from "./assets/IMetar.js";


// send logs


//! Precipitation can be in seperate Strings OR one