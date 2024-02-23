import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

type Props = {
  date: string
}

function Sun({ date }: Props) {
  const hours = Number(date.split(':')[0])
  const isDayTime = hours >= 6 && hours <= 18
  const sun = (
    <g id='Sun'>
      <circle id='Ellipse 1' cx='68' cy='68' r='41' fill='#E2CD0C' />
      <rect id='Rectangle 1' x='66' width='5' height='25' fill='#E2CD0C' />
      <rect
        id='Rectangle 2'
        x='66'
        y='111'
        width='5'
        height='25'
        fill='#E2CD0C'
      />
      <rect
        id='Rectangle 3'
        x='111'
        y='70'
        width='5'
        height='25'
        transform='rotate(-90 111 70)'
        fill='#E2CD0C'
      />
      <rect
        id='Rectangle 4'
        y='70'
        width='5'
        height='25'
        transform='rotate(-90 0 70)'
        fill='#E2CD0C'
      />
      <rect
        id='Rectangle 5'
        x='17'
        y='22.5355'
        width='5'
        height='25'
        transform='rotate(-45 17 22.5355)'
        fill='#E2CD0C'
      />
      <rect
        id='Rectangle 6'
        x='98'
        y='99.5355'
        width='5'
        height='25'
        transform='rotate(-45 98 99.5355)'
        fill='#E2CD0C'
      />
      <path
        id='Rectangle 7'
        d='M101.536 40.2132L98 36.6777L115.678 19L119.213 22.5355L101.536 40.2132Z'
        fill='#E2CD0C'
      />
      <rect
        id='Rectangle 8'
        x='20.5355'
        y='117.213'
        width='5'
        height='25'
        transform='rotate(-135 20.5355 117.213)'
        fill='#E2CD0C'
      />
    </g>
  )
  const moon = (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M68 109C90.6437 109 109 90.6437 109 68C109 45.3563 90.6437 27 68 27C60.8678 27 54.161 28.8211 48.3191 32.0237C67.5903 32.7178 83 48.5593 83 68C83 87.4407 67.5903 103.282 48.3191 103.976C54.161 107.179 60.8678 109 68 109Z'
      fill='#E2CD0C'
    />
  )

  return (
    <Tooltip title='CAVOK' arrow placement='left' TransitionComponent={Zoom}>
      <svg
        width='250'
        height='250'
        viewBox='0 0 136 136'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        {isDayTime ? sun : moon}
      </svg>
    </Tooltip>
  )
}

export default Sun
