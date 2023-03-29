import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  label: string;
  unit: string;
  value: number;
  handleChange: (e: any) => void;
};

function FuelCalculatorTextInput(props: Props) {
  return (
    <>
      <TextField
        label={props.label}
        type="number"
        required
        value={props.value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{props.unit}</InputAdornment>
          ),
        }}
        onChange={(e) => props.handleChange(e)}
        sx={{ width: 190 }}
      ></TextField>
    </>
  );
}

export default FuelCalculatorTextInput;
