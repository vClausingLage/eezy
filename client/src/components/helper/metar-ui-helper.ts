import { IMetar } from "./assets/IMetar"

export const clouds = (visibility: string | number, el: string, idx: number) => {
  console.log('el', el)
  if (visibility === 'CAVOK') {
    return '☼'
  } else if (el !== undefined ) {
    if (el[idx] === 'FEW') {
        return '☁'
      } else if (el === 'SCT') {      // metarCode.Cloud_Layer[idx].cloudLayer
        return '☁ ☁'
      } else if (el === 'BKN') {
        return '☁ ☁ ☁'
      } else if (el === 'OVC') {
        return '☁ ☁ ☁ ☁'
      }
    }
  return 'clouds'
}

export const precipitation = () => {
  
  return 'precipitation'
}

export function getGafor(visibility: string | number, cloudBase?: number) {
  let flRul = {
      GaforCode: '',
      ColorCode: ''
  }
  const clouds = visibility

  if (clouds !== 'OVC' && cloudBase !== undefined) {            //! REFACTOR WITH MIKE (ORANGE)
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