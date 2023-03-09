import { IFlightRule } from "../classes/IMetar.js";
import { Metar } from "../classes/metar-classes.js";
import {
  dateFormat,
  windFormat,
  windFormatSpec,
  windVarFormat,
  precipFormat,
  cloudFormat,
  tempFormat,
} from "./metar-helper-functions.js";

import { METARSdev } from "../metarsDEV.js";

("http://localhost:4000/api/metardecoder/LBBG%20071830Z%20AUTO%2012010KT%209999%20NCD%2008/07%20Q1009%20NOSIG");

// CLASSES

class PrepareMetar {
  metarString: string;
  constructor(metarString: string) {
    this.metarString = metarString;
  }

  split(metarString: string): void {
    console.log("hi");
  }
}
