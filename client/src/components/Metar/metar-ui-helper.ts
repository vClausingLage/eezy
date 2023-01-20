export const precipitation = () => {
  
  return 'precipitation'
}

export function getFlightRules(visibility: string | number, cloudBaseInput: number) {
    let flRul = {
        flightRule: '',
        colorCode: ''
    }

    let cloudBase = cloudBaseInput * 100

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

export function getGafor(visibility: string | number, cloudBase?: number) {
  let flRul = {
      GaforCode: '',
      ColorCode: ''
  }

  if (visibility !== 'OVC' && cloudBase !== undefined) {            //! REFACTOR WITH MIKE (ORANGE)
      if (visibility === 'CAVOK') {
          flRul['GaforCode'] = 'CHARLIE'
          flRul['ColorCode'] = 'blue'
      } else if (visibility === 9999 || cloudBase > 5000) {
          flRul['GaforCode'] = 'OSCAR'
          flRul['ColorCode'] = 'green'
      } else if ((visibility >= 8000 && visibility < 9999) && (cloudBase >= 2000 && cloudBase <= 5000)) {
          flRul['GaforCode'] = 'OSCAR'
          flRul['ColorCode'] = 'green'
      } else if (visibility >= 8000 && (cloudBase >= 1000 && cloudBase <= 2000)) {
          flRul['GaforCode'] = 'DELTA'
          flRul['ColorCode'] = 'yellow'
      } else if ((visibility >= 5000 && visibility >= 8000) && (cloudBase >= 1000 && cloudBase <= 2000)) {
          flRul['GaforCode'] = 'DELTA'
          flRul['ColorCode'] = 'yellow'
      } else if ((visibility >= 5000 && visibility >= 8000) && cloudBase >= 2000) {
          flRul['GaforCode'] = 'DELTA'
          flRul['ColorCode'] = 'yellow'
      } else if (visibility >= 1500 && cloudBase >= 500) {
          flRul['GaforCode'] = 'DELTA'
          flRul['ColorCode'] = 'yellow'
      } else if (visibility < 1500 && cloudBase < 500) {
          flRul['GaforCode'] = 'X-RAY'
          flRul['ColorCode'] = 'red'
      } else {flRul['GaforCode'] = 'unknown'; flRul['ColorCode'] = 'purple'}
  } else {
      flRul['GaforCode'] = 'X-Ray'
      flRul['ColorCode'] = 'red'
  }
  return flRul
}