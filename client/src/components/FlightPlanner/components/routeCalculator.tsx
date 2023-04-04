import IcaoInput from "../../General/TextFields/icaoInput";
import TextFieldContainer from "../../General/TextFields/TextFieldContainer";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

function InputDestination() {
  const textInput = <IcaoInput submit={(e) => console.log(e)} />;

  return (
    <Box>
      <Typography variant="h5" color="primary.main">
        Departure & Destination
      </Typography>
      <Alert severity="error">disabled for DEMO</Alert>
      <Box>
        <Box>
          <TextFieldContainer
            icon={<FlightTakeoffIcon />}
            textInput={textInput}
          ></TextFieldContainer>
          <TextFieldContainer
            icon={<FlightLandIcon />}
            textInput={textInput}
          ></TextFieldContainer>
        </Box>
        <Box>!Search Button!</Box>
      </Box>
    </Box>
  );
}

export default InputDestination;
