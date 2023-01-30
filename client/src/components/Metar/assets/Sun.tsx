import { Tooltip, Zoom } from "@mui/material";

function Sun() {
  return (
    <Tooltip title="CAVOK" arrow placement="right" TransitionComponent={Zoom}>
      <svg
        width="136"
        height="136"
        viewBox="0 0 136 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Sun" clip-path="url(#clip0_0_1)">
          <circle id="Ellipse 1" cx="68" cy="68" r="41" fill="#E2CD0C" />
          <rect id="Rectangle 1" x="66" width="5" height="25" fill="#E2CD0C" />
          <rect
            id="Rectangle 2"
            x="66"
            y="111"
            width="5"
            height="25"
            fill="#E2CD0C"
          />
          <rect
            id="Rectangle 3"
            x="111"
            y="70"
            width="5"
            height="25"
            transform="rotate(-90 111 70)"
            fill="#E2CD0C"
          />
          <rect
            id="Rectangle 4"
            y="70"
            width="5"
            height="25"
            transform="rotate(-90 0 70)"
            fill="#E2CD0C"
          />
          <rect
            id="Rectangle 5"
            x="17"
            y="22.5355"
            width="5"
            height="25"
            transform="rotate(-45 17 22.5355)"
            fill="#E2CD0C"
          />
          <rect
            id="Rectangle 6"
            x="98"
            y="99.5355"
            width="5"
            height="25"
            transform="rotate(-45 98 99.5355)"
            fill="#E2CD0C"
          />
          <path
            id="Rectangle 7"
            d="M101.536 40.2132L98 36.6777L115.678 19L119.213 22.5355L101.536 40.2132Z"
            fill="#E2CD0C"
          />
          <rect
            id="Rectangle 8"
            x="20.5355"
            y="117.213"
            width="5"
            height="25"
            transform="rotate(-135 20.5355 117.213)"
            fill="#E2CD0C"
          />
        </g>
      </svg>
    </Tooltip>
  );
}

export default Sun;
