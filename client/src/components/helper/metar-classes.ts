export class Wind {
    direction!: number;
    speed!: number;
    unit!: string;
    gusts?: number;
}

export class Precipitation {
    intensity!: string;
    elements!: string[];
}

export class Clouds {
    cloudLayer!: string;
    height!: number;
    cloud?: string;
}

export class Metar {
    ICAO!: string;
    Date!: Date;
    Winds: Wind | undefined; // WHY UNDEFINED ???
    Visibility!: string | number | undefined; // WHY UNDEFINED ???
    Precipitation?: Precipitation;
    Cloud_Layer!: Clouds[];
    TAF_Prognosis?: string;
    Wind_Variation?: number[];
    QNH?: number
    RawMetar!: string

    // PLACE FOR IFR VFR METHODS
}
