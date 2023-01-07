export class Wind {
    direction!: number;
    speed!: number;
    unit!: string;
    gusts?: number;
}

export class Precipitation {
    firstElement!: string;
    secondElement?: string;
    thridElement?: string;
    intensity?: string;
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
}