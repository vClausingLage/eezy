export const precipitation = () => {
  
  return 'precipitation'
}

export function getFlightRules(visibility: string | number, cloudBaseInput: number) {
    let flRul = {
        flightRule: '',
        colorCode: ''
    }

    let cloudBase = cloudBaseInput * 100
console.log(cloudBase)
    if (typeof(visibility) === 'string' && visibility === 'CAVOK') {
        flRul['flightRule'] = 'VFR'
        flRul['colorCode'] = 'green'
    } else if ((typeof(visibility) === 'number' && visibility <= 1500) || cloudBase <= 500) {
        flRul['flightRule'] = 'LIFR'
        flRul['colorCode'] = 'purple'
    } else if ((typeof(visibility) === 'number' && visibility <= 5000) || cloudBase <= 1000) {
        flRul['flightRule'] = 'IFR'
        flRul['colorCode'] = 'red'
    } else if ((typeof(visibility) === 'number' && visibility <= 8000) || cloudBase <= 3000) {
        flRul['flightRule'] = 'MVFR'
        flRul['colorCode'] = 'blue'
    } else if ((typeof(visibility) === 'number' && visibility > 8000) || cloudBase > 3000) {
        flRul['flightRule'] = 'VFR'
        flRul['colorCode'] = 'green'
    } else {
        flRul['flightRule'] = 'incomplete data'
        flRul['colorCode'] = 'black'
    }
    return flRul
}