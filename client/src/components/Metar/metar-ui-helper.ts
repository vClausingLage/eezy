export function getFlightRules(visibility: string | number, cloudBaseInput: number) {
    let flRul = {
        flightRule: '',
        colorCode: '',
        color: ''
    }

    let cloudBase = cloudBaseInput * 100

    if (typeof(visibility) === 'string' && visibility === 'CAVOK') {
        flRul['flightRule'] = 'VFR'
        flRul['colorCode'] = 'green'
        flRul['color'] = 'white'
    } else if ((typeof(visibility) === 'number' && visibility <= 1500) || cloudBase <= 500) {
        flRul['flightRule'] = 'LIFR'
        flRul['colorCode'] = 'purple'
        flRul['color'] = 'white'
    } else if ((typeof(visibility) === 'number' && visibility <= 5000) || cloudBase <= 1000) {
        flRul['flightRule'] = 'IFR'
        flRul['colorCode'] = 'red'
        flRul['color'] = 'white'
    } else if ((typeof(visibility) === 'number' && visibility <= 8000) || cloudBase <= 3000) {
        flRul['flightRule'] = 'MVFR'
        flRul['colorCode'] = 'blue'
        flRul['color'] = 'white'
    } else if ((typeof(visibility) === 'number' && visibility > 8000) || cloudBase > 3000) {
        flRul['flightRule'] = 'VFR'
        flRul['colorCode'] = 'green'
        flRul['color'] = 'white'
    } else {
        flRul['flightRule'] = 'incomplete data'
        flRul['colorCode'] = 'black'
        flRul['color'] = 'white'
    }
    return flRul
}