import { Tooltip, Zoom } from "@mui/material";

interface Props {
  cloudBase: number | null;
  cloudLayer: string;
}

function Cloud(props: Props) {
  //! if CldCvg1 = OVX and CldBas1 = 0 => CLOUDBASW NJUMBer

  const cloudIcons = (cloudLayer: string) => {
    let cloudIconArray!: string[];
    if (cloudLayer === "FEW") {
      cloudIconArray = ["☁", " ☁ ☁ ☁"];
    } else if (cloudLayer === "SCT") {
      cloudIconArray = ["☁ ☁", " ☁ ☁"];
    } else if (cloudLayer === "BKN") {
      cloudIconArray = ["☁ ☁ ☁", " ☁"];
    } else if (cloudLayer === "OVC") {
      cloudIconArray = ["☁ ☁ ☁ ☁", ""];
    } else if (cloudLayer === "NCD" || cloudLayer === "CLR") {
      cloudIconArray = ["", "☁ ☁ ☁ ☁"];
    } else if (cloudLayer === "OVX") {
      cloudIconArray = ["OVX", ""];
    }
    return cloudIconArray;
  };

  const cloudFull = {
    fill: "rgba(64, 99, 119, 1)",
  };
  const cloudOpac = {
    fill: "rgba(64, 99, 119, 0.3)",
  };

  return (
    <svg
      width="250"
      height="200"
      viewBox="0 0 250 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 121.5C17 145.524 36.2518 165 60 165H233V102C233 74.938 211.062 53 184 53C173.643 53 164.036 56.2135 156.122 61.6978C149.11 45.9663 133.336 35 115 35C90.4197 35 70.4424 54.7078 70.0072 79.1842C66.7962 78.4099 63.4454 78 60 78C36.2518 78 17 97.4756 17 121.5Z"
        fill="#406377"
        fillOpacity="0.35"
      />
      <path d="M73 119H215" stroke="#406377" strokeWidth="2" />
      <Tooltip
        title={
          <div style={{ textAlign: "right" }}>
            ☁ FEW <br /> ☁ ☁ SCT <br /> ☁ ☁ ☁ BKN <br /> ☁ ☁ ☁ ☁ OVC
          </div>
        }
        arrow
        placement="left"
        TransitionComponent={Zoom}
      >
        <text x="110" y="105">
          <tspan style={cloudFull}>{cloudIcons(props.cloudLayer)[0]}</tspan>{" "}
          <tspan style={cloudOpac}>{cloudIcons(props.cloudLayer)[1]}</tspan>
        </text>
      </Tooltip>
      <text x="100" y="145" fill="#406377">
        {typeof props.cloudBase === "number"
          ? props.cloudLayer !== "OVX"
            ? String(props.cloudBase) + "00 ft AGL"
            : "sky obscured"
          : props.cloudLayer}
      </text>
    </svg>
  );
}

// {typeof props.cloudBase === "number"
//           ? String(props.cloudBase) + "00 ft AGL"
//           : props.cloudLayer}

export default Cloud;
