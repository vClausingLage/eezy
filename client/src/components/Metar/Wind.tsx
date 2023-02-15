import { Box, Typography } from "@mui/material";
import { IWind } from "./IMetar";

function Wind(props: IWind) {
  const opacityNorth = "lalal";
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
          <circle
            cx="125"
            cy="28"
            r="20"
            fill="#182849"
            fillOpacity={opacityNorth}
          />
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
            d="M122.879 78.1213C124.05 79.2929 125.95 79.2929 127.121 78.1213L146.213 59.0294C147.385 57.8579 147.385 55.9584 146.213 54.7868C145.042 53.6152 143.142 53.6152 141.971 54.7868L125 71.7574L108.029 54.7868C106.858 53.6152 104.958 53.6152 103.787 54.7868C102.615 55.9584 102.615 57.8579 103.787 59.0294L122.879 78.1213ZM122 0V76H128V0L122 0Z"
            fill="#660000"
          />
          <text
            transform="matrix(0 -1 1 0 133 50)"
            fill="#660000"
            fontSize="17"
          >
            <tspan x="0" y="14.4545">
              {props.speed} kts
            </tspan>
          </text>
          <text
            transform="matrix(0 -1 1 0 100 48)"
            fill="#660000"
            fontSize="17"
          >
            <tspan x="0" y="14.4545">
              {props.direction}°
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
          <circle
            cx="125"
            cy="28"
            r="20"
            fill="#182849"
            fillOpacity={opacityNorth}
          />
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
            d="M122.879 78.1213C124.05 79.2929 125.95 79.2929 127.121 78.1213L146.213 59.0294C147.385 57.8579 147.385 55.9584 146.213 54.7868C145.042 53.6152 143.142 53.6152 141.971 54.7868L125 71.7574L108.029 54.7868C106.858 53.6152 104.958 53.6152 103.787 54.7868C102.615 55.9584 102.615 57.8579 103.787 59.0294L122.879 78.1213ZM122 0V76H128V0L122 0Z"
            fill="#660000"
          />
          <text
            transform="matrix(0 1 -1 0 150 15)"
            fill="#660000"
            fontSize="17"
          >
            <tspan x="0" y="14.4545">
              {props.direction}°
            </tspan>
          </text>
          <text
            transform="matrix(0 1 -1 0 115 12)"
            fill="#660000"
            fontSize="17"
          >
            <tspan x="0" y="14.4545">
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
              ml: -1.3,
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
                {props.direction}°
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
                {props.speed} {props.unit}
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
