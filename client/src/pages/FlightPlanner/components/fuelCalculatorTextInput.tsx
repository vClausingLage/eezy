import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import '../CSS/planner-calculator.css'

interface Props {
  label: string
  unit: string
  value: number | undefined
  placeholder: string
  helperText: string
  handleChange: (e: any) => void
}

function FuelCalculatorTextInput ({
  label,
  unit,
  value,
  placeholder,
  helperText,
  handleChange
}: Props) {
  function onSubmit (e: any) {
    e.preventDefault()
  }
  return (
    <Stack
      direction='row'
      alignItems='center'
      className='fuel-calculator-stack'
    >
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          label={label}
          type='number'
          required
          value={value}
          placeholder={placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{unit}</InputAdornment>
            )
          }}
          onChange={(e) => handleChange(e)}
          onSubmit={(e) => onSubmit(e)}
          className='fuel-selection'
        />
      </form>
      <Typography display='inline'> {helperText}</Typography>
    </Stack>
  )
}

export default FuelCalculatorTextInput
