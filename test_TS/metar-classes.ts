export class Wind {
    direction!: number;
    speed!: number;
    unit!: string;
    gusts?: number;
}

export class Precipitation {
    intensity!: string;
    firstElement!: string;
    secondElement?: string;
    thridElement?: string;
}

export class Metar {
    ICAO!: string;
    Date!: Date;
    Winds: Wind | undefined; // WHY UNDEFINED ???
    Visibility!: string | number | undefined; // WHY UNDEFINED ???
    Precipitation!: Precipitation;
    Cloud_Layer!: Array<string>;
    TAF_Prognosis!: string;
    Wind_Variation?: Array<number>;

    // PLACE FOR IFV VFR METHODS
}

interface Intensity {
    RE: string
    VC: string
}
interface Characterisitc {
    BC: string
    DR: string
    MI: string
    PR: string
    BL: string
    FZ: string
    SH: string
    TS: string
}
interface Type {
    BR: string
    DS: string
    DU: string
    DZ: string
    FC: string
    FG: string
    FU: string
    GR: string
    GS: string
    HZ: string
    IC: string
    PE: string
    PO: string
    PY: string
    RA: string
    SA: string
    SG: string
    SN: string
    SQ: string
    SS: string
    UP: string
    VA: string
}

export interface WeatherCodes {
    intensity: Intensity
    characteristic: Characterisitc
    type: Type
}