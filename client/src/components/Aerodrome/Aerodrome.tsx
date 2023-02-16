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
      <CellTowerIcon />
      {props.map((el, key) => {
        if (el.type === "GND")
          return <p key={key}>Ground {el.frequency_mhz} MHz</p>;
        if (el.type === "TWR")
          return <p key={key}>Tower {el.frequency_mhz} MHz</p>;
        if (el.type === "ATIS")
          return <p key={key}>ATIS {el.frequency_mhz} MHz</p>;
        if (el.type === "RDR")
          return <p key={key}>Radar {el.frequency_mhz} MHz</p>;
        if (el.type === "INFO")
          return <p key={key}>Info {el.frequency_mhz} MHz</p>;
      })}
    </Box>
  );
}

export default Aerodrome;
