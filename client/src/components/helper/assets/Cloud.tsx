import { Tooltip, Zoom } from '@mui/material'

interface Props {
  visibility: string | number;
  cloudBase: number;
  cloudLayer: string;
}

function Cloud(props: Props) {

const cloudIcons = (cloudLayer: string) => {
  let cloudIconArray!: string[]
  if (cloudLayer === 'FEW') {
    cloudIconArray = ['☁', ' ☁ ☁ ☁']
  } else if (cloudLayer === 'SCT') {
    cloudIconArray = ['☁ ☁', ' ☁ ☁']
  } else if (cloudLayer === 'BKN') {
    cloudIconArray = ['☁ ☁ ☁', ' ☁']
  } else if (cloudLayer === 'OVC') {
    cloudIconArray = ['☁ ☁ ☁ ☁', '']
  } else if (cloudLayer === 'NCD' || cloudLayer === 'CLR') {
    cloudIconArray = ['', '☁ ☁ ☁ ☁']
  }
  return cloudIconArray
}

const cloudFull = {
  fill: 'rgba(64, 99, 119, 1)'
}
const cloudOpac = {
  fill: 'rgba(64, 99, 119, 0.3)'
}

  return (
    <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Cloud">
        <path id="Union" d="M42 121.5C42 145.524 61.2518 165 85 165H258V102C258 74.938 236.062 53 209 53C198.643 53 189.036 56.2135 181.122 61.6978C174.11 45.9663 158.336 35 140 35C115.42 35 95.4424 54.7078 95.0072 79.1842C91.7962 78.4099 88.4454 78 85 78C61.2518 78 42 97.4756 42 121.5Z" fill="#406377" fillOpacity="0.35"/>
        <path id="HR" d="M99 105H241" stroke="#406377" strokeWidth="2"/>
        <Tooltip title={<div style={{textAlign: 'right'}}>☁ FEW <br/> ☁ ☁ SCT <br/> ☁ ☁ ☁ BKN <br/> ☁ ☁ ☁ ☁ OVC</div>} arrow placement='right' TransitionComponent={Zoom}>
          <text x="140" y="90"><tspan style={cloudFull}>{cloudIcons(props.cloudLayer)[0]}</tspan> <tspan style={cloudOpac}>{cloudIcons(props.cloudLayer)[1]}</tspan></text>
        </Tooltip>
        <text x="150" y="130" fill="#406377">{props.cloudBase !== 0? String(props.cloudBase) + '00 ft GND' : props.cloudLayer}</text>
      </g>
    </svg>
  )
}

export default Cloud