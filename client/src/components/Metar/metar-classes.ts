export class Wind {
    direction!: number | string;
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
    cloudBase!: number;
    cloud?: string;
}

export class Metar {
    ICAO!: string;
    Date!: Date;
    Winds!: Wind;
    Visibility!: string | number;
    Precipitation!: Precipitation;
    Cloud_Layer!: Clouds[];
    TAF_Prognosis!: string;
    Wind_Variation!: number[];
    QNH!: number
    RawMetar!: string
    NOSIG!: boolean
}
