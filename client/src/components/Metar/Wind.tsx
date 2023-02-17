import { Box, Typography, Button } from "@mui/material";
import { IWind } from "./IMetar";

function Wind(props: IWind) {
  const opacityNorth =
    typeof props.direction === "number" &&
    (props.direction > 330 || props.direction < 30)
      ? "50%"
      : "100%";
  const compassSVG180 = (
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
            d="M122.879 84.1213C124.05 85.2929 125.95 85.2929 127.121 84.1213L146.213 65.0294C147.385 63.8579 147.385 61.9584 146.213 60.7868C145.042 59.6152 143.142 59.6152 141.971 60.7868L125 77.7574L108.029 60.7868C106.858 59.6152 104.958 59.6152 103.787 60.7868C102.615 61.9584 102.615 63.8579 103.787 65.0294L122.879 84.1213ZM122 0V82H128V0L122 0Z"
            fill="#660000"
          />
          <text
            transform="matrix(0 -1 1 0 133 56)"
            fill="#660000"
            fontFamily="Roboto"
            fontSize="18"
          >
            <tspan x="0.487305" y="16.1523">
              20 kts
            </tspan>
          </text>
          <text
            transform="matrix(0 -1 1 0 97 56)"
            fill="#660000"
            fontFamily="Roboto"
            fontSize="18"
          >
            <tspan x="6.44629" y="16.1523">
              360&#xb0;
            </tspan>
          </text>
        </g>
      </svg>
    </>
  );
  const compassSVG360 = (
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
            d="M122.879 84.1213C124.05 85.2929 125.95 85.2929 127.121 84.1213L146.213 65.0294C147.385 63.8579 147.385 61.9584 146.213 60.7868C145.042 59.6152 143.142 59.6152 141.971 60.7868L125 77.7574L108.029 60.7868C106.858 59.6152 104.958 59.6152 103.787 60.7868C102.615 61.9584 102.615 63.8579 103.787 65.0294L122.879 84.1213ZM122 0V82H128V0L122 0Z"
            fill="#660000"
          />
          <text
            transform="matrix(0 1 -1 0 117 7)"
            fill="#660000"
            fontFamily="Roboto"
            fontSize="18"
          >
            <tspan x="0.487305" y="16.1523">
              20 kts
            </tspan>
          </text>
          <text
            transform="matrix(0 1 -1 0 153 7)"
            fill="#660000"
            fontFamily="Roboto"
            fontSize="18"
          >
            <tspan x="6.44629" y="16.1523">
              360&#xb0;
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
            ? compassSVG180
            : compassSVG360}
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
      <Box>
        {props.runways.map((el, key) => {
          return (
            <Button key={key}>
              {el.he_ident}/{el.le_ident}
            </Button>
          );
        })}
      </Box>
    </>
  );
}

export default Wind;
