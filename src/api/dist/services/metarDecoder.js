export default function metarDecoder(rawMetar) {
    const metar = {
        raw: rawMetar,
        station: '',
        time: '',
        wind: '',
        visibility: '',
        weather: '',
        skyCondition: '',
        temperature: '',
        dewPoint: '',
        altimeter: ''
    };
    return metar;
}
