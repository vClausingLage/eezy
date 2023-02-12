import { Box, Typography } from "@mui/material";
import { IWind } from "./IMetar";

function Wind(props: IWind) {
  const compassSVGfirst = (
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
          <circle cx="10" cy="125" r="5" fill="#182849" />
          <circle cx="239" cy="125" r="5" fill="#182849" />
          <circle cx="125" cy="239" r="5" fill="#182849" />
          <circle cx="125" cy="28" r="20" fill="#182849" />
          <path
            d="M130.682 19.2V31.704L117.962 18.36V36H120.002V23.496L132.722 36.84V19.2H130.682Z"
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
            d="M122.71 67.1213C123.881 68.2929 125.781 68.2929 126.953 67.1213L146.044 48.0294C147.216 46.8579 147.216 44.9584 146.044 43.7868C144.873 42.6152 142.973 42.6152 141.802 43.7868L124.831 60.7574L107.861 43.7868C106.689 42.6152 104.79 42.6152 103.618 43.7868C102.446 44.9584 102.446 46.8579 103.618 48.0294L122.71 67.1213ZM121.831 0V65H127.831V0L121.831 0Z"
            fill="#660a0a"
            opacity="0.75"
          />
          <text
            transform="matrix(0 -1 1 0 108 35)"
            fill="#660000"
            fontSize="16"
          >
            <tspan x="0" y="11.8636">
              {props.direction}°
            </tspan>
          </text>
          <text
            transform="matrix(0 -1 1 0 128 35)"
            fill="#660000"
            fontSize="16"
          >
            <tspan x="0" y="11.8636">
              {props.speed} kts
            </tspan>
          </text>
        </g>
      </svg>
    </>
  );
  const compassSVGsecond = (
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
          <circle cx="10" cy="125" r="5" fill="#182849" />
          <circle cx="239" cy="125" r="5" fill="#182849" />
          <circle cx="125" cy="239" r="5" fill="#182849" />
          <circle cx="125" cy="28" r="20" fill="#182849" />
          <path
            d="M130.682 19.2V31.704L117.962 18.36V36H120.002V23.496L132.722 36.84V19.2H130.682Z"
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
            d="M122.71 67.1213C123.881 68.2929 125.781 68.2929 126.953 67.1213L146.044 48.0294C147.216 46.8579 147.216 44.9584 146.044 43.7868C144.873 42.6152 142.973 42.6152 141.802 43.7868L124.831 60.7574L107.861 43.7868C106.689 42.6152 104.79 42.6152 103.618 43.7868C102.446 44.9584 102.446 46.8579 103.618 48.0294L122.71 67.1213ZM121.831 0V65H127.831V0L121.831 0Z"
            fill="#660a0a"
            opacity="0.75"
          />
          <text transform="matrix(0 1 -1 0 143 2)" fill="#660000" fontSize="16">
            <tspan x="0" y="11.8636">
              {props.direction}°
            </tspan>
          </text>
          <text transform="matrix(0 1 -1 0 121 2)" fill="#660000" fontSize="16">
            <tspan x="0" y="11.8636">
              {props.speed} kts
            </tspan>
          </text>
        </g>
      </svg>
    </>
  );

  return (
    <>
      {typeof props.direction === "number" && props.direction > 0 && (
        <>
          {props.direction > 0 && props.direction <= 180
            ? compassSVGfirst
            : compassSVGsecond}
          <Box
            sx={{
              textAlign: "right",
              color: "white",
              border: 1,
              borderColor: "primary.main",
              borderRadius: 2,
              ml: -2.5,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                opacity: "60%",
                pl: 2,
                pr: 2,
                pt: 0.4,
                pb: 0.4,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {props.speed} {props.unit}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "primary.main",
                opacity: "60%",
                pl: 2,
                pr: 2,
                pt: 0.4,
                pb: 0.4,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {props.direction}°
              </Typography>
            </Box>
            {props.gusts && (
              <Box
                sx={{
                  backgroundColor: "warning.main",
                  opacity: "60%",
                  pl: 2,
                  pr: 2,
                  pt: 0.4,
                  pb: 0.4,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  G {props.gusts} kts.
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
      {props.direction === 0 && (
        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "primary.main",
            borderRadius: 2,
            mt: 2,
            mb: 2,
            overflow: "hidden",
          }}
        >
          <Typography>
            Winds from various directions (VRB) at {props.speed} {props.unit}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Wind;
