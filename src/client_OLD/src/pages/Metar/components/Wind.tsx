export default function Wind() {
  return (
    <>
    </>
  )
}

// import { useState, useEffect } from 'react'

// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'

// import { IWind } from '../types/IMetar'

// const Wind = ({ direction, speed, unit, runways, gusts }: IWind) => {
//   const [runwayDir, setRunwayDir] = useState(0)
//   const opacityNorth =
//     typeof direction === 'number' && (direction > 330 || direction < 30)
//       ? '50%'
//       : '100%'

//   useEffect(() => {
//     setRunwayDir(Number(runways[0].he_ident.slice(0, 2)) * 10)
//   }, [runways])

//   function setRunwayDirection(input: string) {
//     const degrees = Number(input.slice(0, 2)) * 10
//     setRunwayDir(degrees)
//   }

//   const arrow180 = (
//     <g
//       id='Arrow 2'
//       style={{
//         transformBox: 'fill-box',
//         transformOrigin: 'center',
//         transform: `rotate(${direction}deg)`
//       }}
//     >
//       <circle cx='200' cy='200' r='200' stroke='#DCDCDC' strokeWidth='1px' />
//       <path
//         d='M198.939 73.0607C199.525 73.6464 200.475 73.6464 201.061 73.0607L210.607 63.5147C211.192 62.9289 211.192 61.9792 210.607 61.3934C210.021 60.8076 209.071 60.8076 208.485 61.3934L200 69.8787L191.515 61.3934C190.929 60.8076 189.979 60.8076 189.393 61.3934C188.808 61.9792 188.808 62.9289 189.393 63.5147L198.939 73.0607ZM198.5 0V72H201.5V0L198.5 0Z'
//         fill='#C65F00'
//       />
//       <text
//         transform='matrix(0 -1 1 0 180 65)'
//         fill='#C65F00'
//         fontFamily='Roboto'
//         fontSize='18'
//       >
//         <tspan x='13' y='13'>
//           <tspan fontWeight='bold'>{direction}</tspan>°
//         </tspan>
//         <tspan x='9' y='40'>
//           <tspan fontWeight='bold'>{speed}</tspan>kts
//         </tspan>
//         {gusts && (
//           <tspan x='-2' y='60' fill='red'>
//             G <tspan fontWeight='bold'>{gusts}</tspan>kts
//           </tspan>
//         )}
//       </text>
//     </g>
//   )
//   const arrow360 = (
//     <g
//       id='Arrow 1'
//       style={{
//         transformBox: 'fill-box',
//         transformOrigin: 'center',
//         transform: `rotate(${direction}deg)`
//       }}
//     >
//       <circle cx='200' cy='200' r='200' />
//       <path
//         d='M198.939 73.0607C199.525 73.6464 200.475 73.6464 201.061 73.0607L210.607 63.5147C211.192 62.9289 211.192 61.9792 210.607 61.3934C210.021 60.8076 209.071 60.8076 208.485 61.3934L200 69.8787L191.515 61.3934C190.929 60.8076 189.979 60.8076 189.393 61.3934C188.808 61.9792 188.808 62.9289 189.393 63.5147L198.939 73.0607ZM198.5 0V72H201.5V0L198.5 0Z'
//         fill='#C65F00'
//       />
//       <text
//         id='306&#194;&#176; 20kts_2'
//         transform='matrix(0 1 -1 0 220 0)'
//         fill='#C65F00'
//         fontFamily='Roboto'
//         fontSize='18'
//       >
//         <tspan x='13.4463' y='15.6523'>
//           <tspan fontWeight='bold'>{direction}</tspan>°
//         </tspan>
//         <tspan x='9.71973' y='36.6523'>
//           <tspan fontWeight='bold'>{speed}</tspan>kts
//         </tspan>
//         {gusts && (
//           <tspan x='9.71973' y='55.6523' fill='red'>
//             G <tspan fontWeight='bold'>{gusts}</tspan>kts
//           </tspan>
//         )}
//       </text>
//     </g>
//   )

//   const compass = (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
//       <svg
//         width='350'
//         height='350'
//         viewBox='0 0 400 400'
//         fill='none'
//         xmlns='http://www.w3.org/2000/svg'
//       >
//         <g id='Compass'>
//           <rect width='400' height='400' fill='white' />
//           <path
//             id='Circle'
//             d='M323 199.5C323 267.155 268.155 322 200.5 322C132.845 322 78 267.155 78 199.5C78 131.845 132.845 77 200.5 77C268.155 77 323 131.845 323 199.5Z'
//             fill='#D9D9D9'
//           />
//           <circle id='West' cx='83' cy='200' r='5' fill='#182849' />
//           <circle id='East' cx='318' cy='200' r='5' fill='#182849' />
//           <circle id='South' cx='200' cy='317' r='5' fill='#182849' />
//           <g id='North' opacity={opacityNorth}>
//             <circle id='North_2' cx='200' cy='97' r='20' fill='#182849' />
//             <text id='N' fill='#fff' fontFamily='Jost' fontSize='24'>
//               <tspan x='191.042' y='105.334'>
//                 N
//               </tspan>
//             </text>
//           </g>
//           <g
//             id='Runway'
//             style={{
//               transformBox: 'fill-box',
//               transformOrigin: 'center',
//               transform: `rotate(${runwayDir}deg)`
//             }}
//           >
//             <rect
//               id='Rectangle 11'
//               x='183'
//               y='112'
//               width='35'
//               height='180'
//               fill='#1E1E1E'
//             />
//             <rect
//               id='Rectangle 12'
//               x='188'
//               y='118'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 13'
//               x='198'
//               y='118'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 18'
//               x='198'
//               y='192'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 19'
//               x='198'
//               y='155'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 20'
//               x='198'
//               y='229'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 17'
//               x='198'
//               y='267'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 14'
//               x='208'
//               y='118'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 15'
//               x='188'
//               y='267'
//               width='5'
//               height='18'
//               fill='white'
//             />
//             <rect
//               id='Rectangle 16'
//               x='208'
//               y='267'
//               width='5'
//               height='18'
//               fill='white'
//             />
//           </g>
//           {typeof direction === 'number' && direction > 0 && direction <= 180
//             ? arrow180
//             : arrow360}
//         </g>
//       </svg>
//     </Box>
//   )

//   const compassWind = (
//     <Box>
//       {compass}
//       <Box>
//         {runways.length > 1 && (
//           <>
//             <Typography
//               textAlign='center'
//               color='primary.main'
//               borderBottom='solid 1px'
//               marginBottom='.3rem'
//             >
//               select Runway
//             </Typography>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexFlow: 'row wrap',
//                 justifyContent: 'center',
//                 gap: '.3rem'
//               }}
//             >
//               {runways.map((el) => {
//                 return (
//                   <Box key={el.he_ident}>
//                     <Button
//                       onClick={() => setRunwayDirection(el.he_ident)}
//                       variant='contained'
//                     >
//                       <Typography fontSize='small'>
//                         RWY {el.he_ident}/{el.le_ident}
//                       </Typography>
//                     </Button>
//                   </Box>
//                 )
//               })}
//             </Box>
//           </>
//         )}
//       </Box>
//     </Box>
//   )

//   const noWind = (
//     <Box
//       sx={{
//         textAlign: 'center',
//         border: 1,
//         borderColor: 'primary.main',
//         borderRadius: 2,
//         mt: 2,
//         mb: 2,
//         overflow: 'hidden',
//         padding: 2
//       }}
//     >
//       <Typography>no wind</Typography>
//     </Box>
//   )

//   const varWind = (
//     <Box
//       sx={{
//         textAlign: 'center',
//         border: 1,
//         borderColor: 'primary.main',
//         borderRadius: 2,
//         mt: 2,
//         mb: 2,
//         overflow: 'hidden',
//         padding: 2
//       }}
//     >
//       <Typography>
//         Winds from various directions (VRB) at {speed} {unit}
//       </Typography>
//     </Box>
//   )

//   return (
//     <Box>
//       {typeof direction === 'number' && direction > 0
//         ? compassWind
//         : direction === 0 && speed === 0
//           ? noWind
//           : varWind}
//     </Box>
//   )
// }

// export default Wind
