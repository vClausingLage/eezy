import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  label: string;
  unit: string;
  value: number;
  placeholder: string;
  helperText: string;
  handleChange: (e: any) => void;
};

function FuelCalculatorTextInput(props: Props) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
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
        sx={{ width: 200 }}
      ></TextField>
      <Typography display="inline">{props.helperText}</Typography>
    </Stack>
  );
}

export default FuelCalculatorTextInput;
