import { TextField, Box, IconButton } from '@mui/material'
import { Search, Check } from '@mui/icons-material'

interface Props {
  value: string
  adornment: string
  submit: (icao: string) => void
}

function IcaoInput (props: Props) {
  const inputPropsSearch = {
    endAdornment: (
      <IconButton
        id='search-button'
        type='submit'
        spellCheck={false}
        onClick={handleSubmit}
        disabled={props.value.length !== 4}
      >
        <Search />
      </IconButton>
    )
  }
  const inputPropsCheck = {
    endAdornment: (
      <Check color={props.value.length === 4 ? 'success' : 'disabled'} />
    )
  }

  function handleChange (e: any) {
    props.submit(e.target.value)
  }
  function handleSubmit (e: any) {
    e.preventDefault()
    props.submit(e.target.value)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          type='search'
          label='enter ICAO Code'
          value={props.value}
          onChange={(e) => handleChange(e)}
          InputProps={
            props.adornment === 'search' ? inputPropsSearch : inputPropsCheck
          }
        />
      </form>
    </Box>
  )
}

export default IcaoInput
