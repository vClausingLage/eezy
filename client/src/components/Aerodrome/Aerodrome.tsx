import { Box, Typography } from "@mui/material";
import CellTowerIcon from "@mui/icons-material/CellTower";

type Props = {
  props: [
    {
      id: string;
      airport_ref: string;
      airport_ident: string;
      type: string;
      description: string;
      frequency_mhz: string;
    }
  ];
};

function Aerodrome({ props }: Props) {
  return (
    <Box
      id="Aerodrome infromation"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2">Airport</Typography>
      <CellTowerIcon fontSize="large" />
      {props.map((el, key) => {
        if (el.type === "GND")
          return (
            <p key={key}>
              Ground{" "}
              <span style={{ fontWeight: "bold" }}>{el.frequency_mhz}</span> MHz
            </p>
          );
        if (el.type === "TWR")
          return (
            <p key={key}>
              Tower{" "}
              <span style={{ fontWeight: "bold" }}>{el.frequency_mhz}</span> MHz
            </p>
          );
        if (el.type === "ATIS")
          return (
            <p key={key}>
              ATIS{" "}
              <span style={{ fontWeight: "bold" }}>{el.frequency_mhz}</span> MHz
            </p>
          );
        if (el.type === "RDR")
          return (
            <p key={key}>
              Radar{" "}
              <span style={{ fontWeight: "bold" }}>{el.frequency_mhz}</span> MHz
            </p>
          );
        if (el.type === "INFO")
          return (
            <p key={key}>
              Info{" "}
              <span style={{ fontWeight: "bold" }}>{el.frequency_mhz}</span> MHz
            </p>
          );
      })}
    </Box>
  );
}

export default Aerodrome;
