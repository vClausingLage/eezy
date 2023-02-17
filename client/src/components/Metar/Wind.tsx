import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { IWind } from "./IMetar";

function Wind(props: IWind) {
  const [runwayDir, setRunwayDir] = useState(0);

  useEffect(() => {
    setRunwayDir(parseInt(props.runways[0].he_ident.slice(0, 2)));
  }, []);

  const arrow180 = (
    <g
      id="Arrow Wind"
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
        transform: `rotate(${props.direction}deg)`,
      }}
    >
      <circle cx="200" cy="200" r="200" />
      <path
        d="M197.879 88.1213C199.05 89.2929 200.95 89.2929 202.121 88.1213L221.213 69.0294C222.385 67.8579 222.385 65.9584 221.213 64.7868C220.042 63.6152 218.142 63.6152 216.971 64.7868L200 81.7574L183.029 64.7868C181.858 63.6152 179.958 63.6152 178.787 64.7868C177.615 65.9584 177.615 67.8579 178.787 69.0294L197.879 88.1213ZM197 1V86H203V1L197 1Z"
        fill="#660000"
      />
      <text
        transform="matrix(0 -1 1 0 208 59)"
        fill="#660000"
        fontFamily="Roboto"
        fontSize="18"
      >
        <tspan x="1.40194" y="16.1523">
          {props.speed} kts
        </tspan>
      </text>
      <text
        transform="matrix(0 -1 1 0 172 59)"
        fill="#660000"
        fontFamily="Roboto"
        fontSize="18"
      >
        <tspan x="7.36092" y="16.1523">
          {props.direction}°
        </tspan>
      </text>
    </g>
  );
  const arrow360 = (
    <g
      id="Arrow Wind"
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
        transform: `rotate(${props.direction}deg)`,
      }}
    >
      <circle cx="200" cy="200" r="200" />
      <path
        d="M197.879 88.1213C199.05 89.2929 200.95 89.2929 202.121 88.1213L221.213 69.0294C222.385 67.8579 222.385 65.9584 221.213 64.7868C220.042 63.6152 218.142 63.6152 216.971 64.7868L200 81.7574L183.029 64.7868C181.858 63.6152 179.958 63.6152 178.787 64.7868C177.615 65.9584 177.615 67.8579 178.787 69.0294L197.879 88.1213ZM197 1V86H203V1L197 1Z"
        fill="#660000"
      />
      <text
        transform="matrix(0 1 -1 0 225 8)"
        fill="#660000"
        fontFamily="Roboto"
        fontSize="18"
      >
        <tspan x="1.40194" y="16.1523">
          {props.speed} kts
        </tspan>
      </text>
      <text
        transform="matrix(0 1 -1 0 193 8)"
        fill="#660000"
        fontFamily="Roboto"
        fontSize="18"
      >
        <tspan x="7.36092" y="16.1523">
          {props.direction}°
        </tspan>
      </text>
    </g>
  );

  function setRunwayDirection(input: string) {
    let degrees = parseInt(input.slice(0, 2));
    setRunwayDir(degrees);
  }
  const opacityNorth =
    typeof props.direction === "number" &&
    (props.direction > 330 || props.direction < 30)
      ? "50%"
      : "100%";
  const compass = (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="400" fill="white" />
      <g id="Compass">
        <path
          d="M323 199.5C323 267.155 268.155 322 200.5 322C132.845 322 78 267.155 78 199.5C78 131.845 132.845 77 200.5 77C268.155 77 323 131.845 323 199.5Z"
          fill="#D9D9D9"
        />
        <circle cx="83" cy="200" r="5" fill="#182849" />
        <circle cx="318" cy="200" r="5" fill="#182849" />
        <circle cx="200" cy="317" r="5" fill="#182849" />
        <circle cx="200" cy="97" r="20" fill="#182849" id="north" />
        <text fill="white" fontFamily="Jost" fontSize="24">
          <tspan x="191.042" y="105.334">
            N
          </tspan>
        </text>
      </g>
      {typeof props.direction === "number" &&
      props.direction > 0 &&
      props.direction <= 180
        ? arrow180
        : arrow360}
      <g
        id="Runway"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: `rotate(${runwayDir}deg)`,
        }}
      >
        <rect x="100" y="182" width="200" height="35" fill="#1E1E1E" />
        <rect x="105" y="197" width="20" height="5" fill="white" />
        <rect x="190" y="197" width="20" height="5" fill="white" />
        <rect x="232" y="197" width="20" height="5" fill="white" />
        <rect x="232" y="197" width="20" height="5" fill="white" />
        <rect x="147" y="197" width="20" height="5" fill="white" />
        <rect x="105" y="187" width="20" height="5" fill="white" />
        <rect x="105" y="207" width="20" height="5" fill="white" />
        <rect x="275" y="197" width="20" height="5" fill="white" />
        <rect x="275" y="187" width="20" height="5" fill="white" />
        <rect x="275" y="207" width="20" height="5" fill="white" />
      </g>
    </svg>
  );

  return (
    <>
      {typeof props.direction === "number" && props.direction > 0 && (
        <>
          {compass}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {props.runways.map((el, key) => {
          return (
            <Button key={key} onClick={() => setRunwayDirection(el.he_ident)}>
              RWY {el.he_ident}/{el.le_ident}
            </Button>
          );
        })}
      </Box>
    </>
  );
}

export default Wind;
