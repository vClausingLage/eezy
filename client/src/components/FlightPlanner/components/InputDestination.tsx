import IcaoInput from "../../General/TextFields/icaoInput";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

function InputDestination() {
  return (
    <Box>
      <Typography variant="h5" color="primary.main">
        Departure & Destination
      </Typography>
      <Alert severity="error">disabled for DEMO</Alert>
      <Stack direction="row" alignItems="center" gap={1}>
        <FlightTakeoffIcon />
        <IcaoInput submit={(e) => console.log(e)} />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <FlightLandIcon />
        <IcaoInput submit={(e) => console.log(e)} />
      </Stack>
    </Box>
  );
}

export default InputDestination;
