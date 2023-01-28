import { Typography } from "@mui/material";
import { IWind } from "../../Metar/assets/IMetar";

function Wind(props: IWind) {
  const compassSVG = (
    <>
      <svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle
            cx="125"
            cy="125"
            r="122"
            transform="rotate(1.13182 124.896 124.896)"
            fill="#D9D9D9"
          />
          <path d="M125 -2L148 99H102L125 -2Z" fill="#182849" />
          <path
            d="M132.52 64.6V81.272L115.56 63.48V87H118.28V70.328L135.24 88.12V64.6H132.52Z"
            fill="#D9D9D9"
          />
        </g>
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            transform: `rotate(${props.direction}deg)`,
          }}
        >
          <circle cx="125" cy="125" r="122" />
          <path
            d="M122.71 66.1219C123.881 67.2934 125.781 67.2934 126.953 66.1219L146.044 47.03C147.216 45.8584 147.216 43.9589 146.044 42.7873C144.873 41.6158 142.973 41.6158 141.802 42.7873L124.831 59.7579L107.861 42.7873C106.689 41.6158 104.79 41.6158 103.618 42.7873C102.446 43.9589 102.446 45.8584 103.618 47.03L122.71 66.1219ZM121.831 10.0009V64.0005H127.831V10.0009H121.831Z"
            fill="#9C0303"
            fillOpacity="0.5"
          />
        </g>
      </svg>
    </>
  );

  return (
    <>
      {typeof props.direction === "number" && props.direction > 0 && (
        <>
          {compassSVG}
          <Typography style={{ textAlign: "center" }}>
            {props.speed} {props.unit} from {props.direction}°
          </Typography>
        </>
      )}
      {props.direction === 0 && (
        <>
          <Typography>
            Winds from various directions (VRB) at {props.speed} {props.unit}
          </Typography>
        </>
      )}
    </>
  );
}

export default Wind;
