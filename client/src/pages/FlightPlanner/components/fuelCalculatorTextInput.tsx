import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import "../CSS/planner-calculator.css";

type Props = {
  label: string;
  unit: string;
  value: number | undefined;
  placeholder: string;
  helperText: string;
  handleChange: (e: any) => void;
};

function FuelCalculatorTextInput(props: Props) {
  function onSubmit(e: any) {
    e.preventDefault();
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      className="fuel-calculator-stack"
    >
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          label={props.label}
          type="number"
          required
          value={props.value}
          placeholder={props.placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{props.unit}</InputAdornment>
            ),
          }}
          onChange={(e) => props.handleChange(e)}
          onSubmit={(e) => onSubmit(e)}
          className="fuel-selection"
        ></TextField>
      </form>
      <Typography display="inline"> {props.helperText}</Typography>
    </Stack>
  );
}

export default FuelCalculatorTextInput;
