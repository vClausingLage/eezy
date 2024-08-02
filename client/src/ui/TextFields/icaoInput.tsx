import { Search, Check } from '@mui/icons-material'

type Props = {
  id: string
  value: string
  adornment: string
  submit: (icao: string) => void
}

function IcaoInput(props: Props) {
  const inputPropsSearch =
    <button
      id='search-button'
      type='submit'
      spellCheck={false}
      onClick={handleSubmit}
      disabled={props.value.length !== 4}
    >
      <Search />
    </button>
  const inputPropsCheck = <Check color={props.value.length === 4 ? 'success' : 'disabled'} />

  function handleChange(e: any) {
    props.submit(e.target.value)
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    props.submit(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor={props.id}>enter ICAO Code</label>
        <input
          id={props.id}
          type='search'
          value={props.value}
          onChange={(e) => handleChange(e)}
        >
          {props.adornment === 'search' ? inputPropsSearch : inputPropsCheck}
        </input>
      </form>
    </div>
  )
}

export default IcaoInput
