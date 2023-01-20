import { Typography } from "@mui/material"
import { IWind } from "../../Metar/assets/IMetar"

function Wind(props: IWind) {

const compassSVG = <>
  <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="175" cy="175" r="160" fill="#D9D9D9"/>
  <g>
  <path d="M175 0L198 126H152L175 0Z" fill="#182849"/>
  <path d="M182.52 91.6V108.272L165.56 90.48V114H168.28V97.328L185.24 115.12V91.6H182.52Z" fill="#D9D9D9"/>
  </g>
  
  <g style={{transformBox: 'fill-box', transformOrigin: 'center', transform: `rotate(${props.direction}deg)`}} >
  <circle cx="175" cy="175" r="160"/>
  <path d="M175 146.121C174.05 147.293 175.95 147.293 177.121 146.121L196.213 127.029C197.385 125.858 197.385 123.958 196.213 122.787C195.042 121.615 193.142 121.615 191.971 122.787L175 139.757L158.029 122.787C156.858 121.615 154.958 121.615 153.787 122.787C152.615 123.958 152.615 125.858 153.787 127.029L172.879 146.121ZM172 0V144H178V0L172 0Z" fill="#9C0303" fillOpacity='0.5' />
  </g>
  </svg>
</>

  return (
    <>
    {typeof(props.direction) === 'number' && 
    <>
      {compassSVG}
      <Typography style={{textAlign: 'center'}}>{props.speed} {props.unit} from {props.direction}°</Typography>
    </>
    }
    {typeof(props.direction) === 'string' && 
      <>
      <Typography>
        Winds from various directions (VRB) at {props.speed} {props.unit}
      </Typography>
      </>
    }
      
    </>
  )
}

export default Wind

// {metarCode.Winds && metarCode.Winds.speed} {metarCode.Winds && metarCode.Winds.unit} from {metarCode.Winds && metarCode.Winds.direction}{metarCode.Winds && typeof(metarCode.Winds.direction) === 'number'? '°' : '° variation'}