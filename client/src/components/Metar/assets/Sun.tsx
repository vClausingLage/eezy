import { Tooltip, Zoom } from "@mui/material"

function Sun() {
  return(
    <Tooltip  title='CAVOK' arrow placement='right' TransitionComponent={Zoom}>
    <svg width="250" height="200" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Sun">
      <circle id="Ellipse 1" cx="150" cy="100" r="41" fill="#E2CD0C"/>
      <rect id="Rectangle 1" x="148" y="32" width="5" height="25" fill="#E2CD0C"/>
      <rect id="Rectangle 2" x="148" y="143" width="5" height="25" fill="#E2CD0C"/>
      <rect id="Rectangle 3" x="193" y="102" width="5" height="25" transform="rotate(-90 193 102)" fill="#E2CD0C"/>
      <rect id="Rectangle 4" x="82" y="102" width="5" height="25" transform="rotate(-90 82 102)" fill="#E2CD0C"/>
      <rect id="Rectangle 5" x="99" y="54.5355" width="5" height="25" transform="rotate(-45 99 54.5355)" fill="#E2CD0C"/>
      <rect id="Rectangle 6" x="180" y="131.536" width="5" height="25" transform="rotate(-45 180 131.536)" fill="#E2CD0C"/>
      <path id="Rectangle 7" d="M183.536 72.2132L180 68.6777L197.678 51L201.213 54.5355L183.536 72.2132Z" fill="#E2CD0C"/>
      <rect id="Rectangle 8" x="102.536" y="149.213" width="5" height="25" transform="rotate(-135 102.536 149.213)" fill="#E2CD0C"/>
      </g>
    </svg>
    </Tooltip>

  )
}

export default Sun