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
    cloudBase!: number;
    cloud?: string;
}

export class Metar {
    ICAO!: string;
    Date!: Date;
    Winds!: Wind; // WHY UNDEFINED ???
    Visibility!: string | number; // WHY UNDEFINED ???
    Precipitation?: Precipitation;
    Cloud_Layer!: Clouds[];
    TAF_Prognosis?: string;
    Wind_Variation?: number[];
    QNH!: number
    RawMetar!: string
    NOSIG!: boolean

    // PLACE FOR IFR VFR METHODS
    get GAFOR() { 
        const visibility = this.Visibility
        const cloudBase = this.Cloud_Layer[0].cloudBase
        const clouds = this.Cloud_Layer[0].cloudLayer
        let flRul
        if (clouds !== 'OVC') {                     //! insert color codes
            if (visibility === 'CAVOK') {
                flRul = 'CHARLIE'
            } else if (visibility === 9999 || cloudBase > 5000) {
                flRul = 'OSKAR'
            } else if ((visibility >= 8000 && visibility < 9999) && (cloudBase >= 2000 && cloudBase <= 5000)) {
                flRul = 'OSKAR'
            } else if (visibility >= 8000 && (cloudBase >= 1000 && cloudBase <= 2000)) {
                flRul = 'DELTA'
            } else if ((visibility >= 5000 && visibility >= 8000) && (cloudBase >= 1000 && cloudBase <= 2000)) {
                flRul = 'DELTA'
            } else if ((visibility >= 5000 && visibility >= 8000) && cloudBase >= 2000) {
                flRul = 'DELTA'
            } else if (visibility >= 1500 && cloudBase >= 500) {
                flRul = 'DELTA'
            } else if (visibility < 1500 && cloudBase < 500) {
                flRul = 'X-RAY'
            } else {flRul = 'unknown'}
        } else {
            flRul = 'OVC -- X-Ray'
        }
        return flRul
    }
}
