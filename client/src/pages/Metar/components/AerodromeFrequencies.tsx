import { Box, Typography } from "@mui/material";
import CellTowerIcon from "@mui/icons-material/CellTower";

import { IFreq } from "../classes/IMetar";

type Props = {
  props: IFreq[];
};

function Aerodrome({ props }: Props) {
  return (
    <Box
      id="Aerodrome infromation"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <CellTowerIcon fontSize="large" />
      {props.map((el, key) => {
        if (el.type === "GND")
          return (
            <Typography key={key}>
              <Typography display="inline" color={"primary"}>
                Ground{" "}
              </Typography>
              <Typography display="inline" style={{ fontWeight: "bold" }}>
                {el.frequency_mhz}
              </Typography>{" "}
              MHz
            </Typography>
          );
        if (el.type === "TWR")
          return (
            <Typography key={key}>
              <Typography display="inline" color={"primary"}>
                Tower{" "}
              </Typography>
              <Typography display="inline" style={{ fontWeight: "bold" }}>
                {el.frequency_mhz}
              </Typography>{" "}
              MHz
            </Typography>
          );
        if (el.type === "ATIS")
          return (
            <Typography key={key}>
              <Typography display="inline" color={"primary"}>
                ATIS{" "}
              </Typography>
              <Typography display="inline" style={{ fontWeight: "bold" }}>
                {el.frequency_mhz}
              </Typography>{" "}
              MHz
            </Typography>
          );
        if (el.type === "RDR")
          return (
            <Typography key={key}>
              <Typography display="inline" color={"primary"}>
                Radar{" "}
              </Typography>
              <Typography display="inline" style={{ fontWeight: "bold" }}>
                {el.frequency_mhz}
              </Typography>{" "}
              MHz
            </Typography>
          );
        if (el.type === "INFO")
          return (
            <Typography key={key}>
              <Typography display="inline" color={"primary"}>
                Info{" "}
              </Typography>
              <Typography display="inline" style={{ fontWeight: "bold" }}>
                {el.frequency_mhz}
              </Typography>{" "}
              MHz
            </Typography>
          );
      })}
    </Box>
  );
}

export default Aerodrome;
